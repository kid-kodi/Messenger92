const User = require("../models/User");
const auth = require("../middleware/auth");
const router = require("express").Router();
const Utility = require("../helpers/utility");
const Email = require("../helpers/email");

// User sign-up
router.post("/register", async (req, res, next) => {
  try {
    const user = new User(req.body);
    user.verificationToken = Utility.randomTokenString();
    await user.save();
    // await Email.sendVerificationEmail(user, req.get("origin"));
    res.status(201).send({ user });
  } catch (error) {
    next(error);
  }
});

// User verify email
router.post("/verify-email", async (req, res, next) => {
  try {
    const user = await User.findOne({ verificationToken: req.body.token });
    if (!user) {
      res.status(401).send({ error: true, message: "User not found!" });
    }
    user.verified = Date.now();
    user.verificationToken = undefined;
    await user.save();
    res.status(201).send({ error: false, message: "Account verified" });
  } catch (error) {
    next(error);
  }
});

//User login
router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(201).send({ profile: user, token });
  } catch (error) {
    next(error);
  }
});

// User logout
router.post("/logout", auth, async (req, res, next) => {
  try {
    let tokenIndex = req.user.tokens.findIndex((obj) => obj.token == req.token);
    // Here we keep the old token to be used as EasyLogin authenticator
    req.user.tokens[tokenIndex].status = "trashed";
    req.user.tokens[tokenIndex].easy_login_count = 0;

    await req.user.save();
    res.status(201).send({ message: "user disconnected!" });
  } catch (e) {
    next(error);
  }
});

// User forgot password
router.post("/forgot-password", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (!user) return;

    user.resetToken = {
      token: Utility.randomTokenString(),
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    };
    await user.save();
    await Email.sendPasswordResetEmail(user, req.get("origin"));
    res.status(201).send({
      message:
        "Veuillez vérifier votre adresse électronique pour les instructions de réinitialisation du mot de passe",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// User reset password
router.post("/reset-password", async (req, res, next) => {
  try {
    const user = await User.findOne({
      "resetToken.token": req.body.token,
      "resetToken.expires": { $gt: Date.now() },
    });
    if (!user) throw new Error("Jeton invalide");

    // update password and remove reset token
    user.password = req.body.password;
    user.resetToken = undefined;
    await user.save();
    res.status(201).send({
      message:
        "Réinitialisation du mot de passe réussie, vous pouvez maintenant vous connecter",
    });
  } catch (error) {
    next(error);
  }
});

//Fetch a user
router.get("/me", auth, async (req, res, next) => {
  try {
    let user = await User.findById(req.user._id)
      .select(" _id firstName lastName")
      .populate("following", "_id firstName lastName")
      .populate("followers", "_id firstName lastName");
    console.log(user);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
