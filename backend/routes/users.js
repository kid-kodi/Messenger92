const User = require("../models/User");
const auth = require("../middleware/auth");
const router = require("express").Router();
const formidable = require("formidable");
const fs = require("fs");
const extend = require("extend");

// Create a user
router.post("/", auth, async (req, res, next) => {
  try {
    // create new users
    const user = await User(req.body);
    const response = await user.save();
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

//List all users
router.get("/", auth, async (req, res, next) => {
  try {
    let users = await User.find().select(
      "firstName lastName email code telephone createdAt"
    );
    res.status(201).json(users);
  } catch (error) {
    next(error);
  }
});

//Find people to follow
router.get("/findpeople", auth, async (req, res, next) => {
  let following = req.user.following;
  following.push(req.user._id);
  try {
    let users = await User.find({ _id: { $nin: following } }).select(
      "firstName lastName fullName"
    );
    res.status(201).json(users);
  } catch (error) {
    next(error);
  }
});

//Fetch a user
router.get("/:id", auth, async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id)
      .populate("following", "_id firstName lastName")
      .populate("followers", "_id firstName lastName");
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

//Follow a user
router.put("/follow", auth, async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $push: { following: req.body.followId },
    });
    let response = await User.findByIdAndUpdate(
      req.body.followId,
      { $push: { followers: req.user._id } },
      { new: true }
    )
      .populate("following", "_id name")
      .populate("followers", "_id name");

    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

//Unfollow a user
router.put("/unfollow", auth, async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { following: req.body.unfollowId },
    });
    let response = await User.findByIdAndUpdate(
      req.body.unfollowId,
      { $pull: { followers: req.user._id } },
      { new: true }
    )
      .populate("following", "_id name")
      .populate("followers", "_id name");
    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
});

//Update a user
router.put("/:id", auth, async (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Photo could not be uploaded",
      });
    }

    let user = await User.findById(req.params.id);
    user = extend(user, fields);
    console.log(fields);
    if (files.profilePicture) {
      user.profilePicture.data = fs.readFileSync(files.profilePicture.filepath);
      user.profilePicture.contentType = files.profilePicture.type;
    }
    if (files.coverPicture) {
      user.coverPicture.data = fs.readFileSync(files.coverPicture.path);
      user.coverPicture.contentType = files.coverPicture.type;
    }
    try {
      const response = await user.save();
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  });
});

//Delete a user
router.delete("/:id", auth, async (req, res, next) => {
  try {
    const response = await User.findByIdAndDelete(req.params.id);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/profile-picture/:userId", async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  if (user.profilePicture.data) {
    res.set("Content-Type", user.profilePicture.contentType);
    return res.send(user.profilePicture.data);
  } else {
    return res.sendFile(process.cwd() + "/assets/images/profile-pic.jpg");
  }
});

router.get("/cover-picture/:userId", async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  if (user.coverPicture.data) {
    res.set("Content-Type", user.coverPicture.contentType);
    return res.send(user.coverPicture.data);
  } else {
    return res.sendFile(process.cwd() + "/assets/images/profile-pic.jpg");
  }
});

module.exports = router;
