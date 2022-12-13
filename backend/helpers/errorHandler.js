module.exports = errorHandler;

const getUniqueErrorMessage = (err) => {
  let output;
  try {
    let fieldName = err.message.substring(
      err.message.lastIndexOf(".$") + 2,
      err.message.lastIndexOf("_1")
    );
    output =
      fieldName.charAt(0).toUpperCase() +
      fieldName.slice(1) +
      "' already exists'";
  } catch (ex) {
    output = "Unique field already exists";
  }
  return output;
};

function errorHandler(err, req, res, next) {
  if (err.code === 11000) {
    console.log(getUniqueErrorMessage(err));
    return res.status(400).json({ message: getUniqueErrorMessage(err) });
  }
  if (typeof err === "string") {
    // custom application error
    return res.status(400).json({ message: err });
  }

  if (err.name === "ValidationError") {
    // mongoose validation error
    return res.status(400).json({ message: err.message });
  }

  if (err.name === "UnauthorizedError") {
    // jwt authentication error
    return res.status(401).json({ message: "Invalid Token" });
  }

  // default to 500 server error
  return res.status(500).json({ message: err.message });
}
