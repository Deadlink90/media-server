const path = require("path");
const shortid = require("shortid");
const { validExtensions: ar } = require("../config");

const uploadVideo = (files, validExtensions = ar.video, folder = "") => {
  return new Promise((resolve, reject) => {
    const { file } = files;
    const splitName = file.name.split(".");
    const ext = splitName[splitName.length - 1];

    if (!validExtensions.includes(ext)) {
      return reject(`.${ext} files are not admited`);
    }

    const tempName = shortid.generate() + "." + ext;
    const uploadPath = path.join(__dirname, "../uploads", folder, tempName);

    file.mv(uploadPath, (err) => {
      if (err) {
        return reject(err);
      }
      resolve(tempName);
    });
  });
};

const uploadFile = (files, validExtensions = ar.images, folder = "") => {
  return new Promise((resolve, reject) => {
    const { file } = files;
    const splitName = file.name.split(".");
    const ext = splitName[splitName.length - 1];

    // if (!validExtensions.includes(ext)) {
    //   return reject(`.${ext} files are not admited`);
    // }

    const tempName = shortid.generate() + "." + ext;
    const uploadPath = path.join(__dirname, "../uploads", folder, tempName);

    file.mv(uploadPath, (err) => {
      if (err) {
        return reject(err);
      }
      resolve(tempName);
    });
  });
};

module.exports = {
  uploadFile,
  uploadVideo
};
