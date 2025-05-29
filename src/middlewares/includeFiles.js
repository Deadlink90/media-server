const thereIsFiles = (req, res, next) => {
  
  if (!req.files || Object.keys(req.files) === 0 || !req.files.file) {
    return res.status(400).json({
      message: "there is not files to upload ):",
      status: "false",
    });
  }

  next();
};

module.exports = {
  thereIsFiles,
};
