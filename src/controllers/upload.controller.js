const { response } = require("express");
const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const { uploadFile: sendFile, uploadVideo: sendVideo } = require("../helpers");
const { validExtensions, assetsPath } = require("../config");
const { User, Product } = require("../models");

const uploadVideo = async (req, res = response) => {
  const { video } = validExtensions;
  const { idOdt, idServicio } = req.body;

  try {
    const fullPath = await sendVideo(
      req.files,
      video,
      `videos/${idOdt}/${idServicio}`
    );
    res.json({
      success: true,
      msg: "File uploaded successfully",
      filePath: `${req.protocol}://${req.get("host")}/videos/${idOdt}/${idServicio}/${fullPath}`,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      msg: "The file was not uploaded",
      err,
    });
  }
};

const uploadFile = async (req, res = response) => {
  const { text } = validExtensions;

  try {
    const fullPath = await sendFile(req.files, text, "text_files");
    res.json({
      fullPath,
    });
  } catch (err) {
    res.status(400).json({
      err,
    });
  }
};

const updateImage = async (req, res = response) => {
  const { collection, id } = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model)
        return res.status(400).json({
          message: "User not founded",
          status: "false",
        });
      break;

    case "products":
      model = await Product.findById(id);
      if (!model)
        return res.status(400).json({
          message: "User not founded",
          status: "false",
        });
      break;

    default:
      return res.status(500).json({
        message: "Not created yet",
        status: "false",
      });
  }

  if (model.img) {
    const imagePath = path.join(__dirname, "../uploads", collection, model.img);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  try {
    const name = await sendFile(req.files, undefined, collection);
    model.img = name;
    await model.save();
    res.json(model);
  } catch (err) {
    res.status(400).json({
      err,
    });
  }
};

const updateImageCloudinary = async (req, res = response) => {
  const { collection, id } = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model)
        return res.status(400).json({
          message: "User not founded",
          status: "false",
        });
      break;

    case "products":
      model = await Product.findById(id);
      if (!model)
        return res.status(400).json({
          message: "User not founded",
          status: "false",
        });
      break;

    default:
      return res.status(500).json({
        message: "Not created yet",
        status: "false",
      });
  }

  if (model.img) {
    const splitUrl = model.img.split("/");
    const imageName = splitUrl[splitUrl.length - 1];
    const [image_id] = imageName.split(".");
    await cloudinary.uploader.destroy(image_id);
  }

  const { tempFilePath } = req.files.file;

  try {
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    model.img = secure_url;
    await model.save();
    res.json(model);
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong!!",
      status: "false",
    });
  }
};

const showImage = async (req, res = response) => {
  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model) res.sendFile(`${assetsPath}/noimage.jpg`);
      break;

    case "products":
      model = await Product.findById(id);
      if (!model) res.sendFile(`${assetsPath}/noimage.jpg`);
      break;

    default:
      res.status(500).json({
        message: "not implemented yet ):",
        status: "false",
      });
  }

  if (model.img) {
    const imgPath = path.join(__dirname, "../uploads", collection, model.img);
    console.log(imgPath);
    if (fs.existsSync(imgPath)) {
      return res.sendFile(imgPath);
    }
  }

  res.sendFile(`${assetsPath}/noimage.jpg`);
};

module.exports = {
  uploadFile,
  uploadVideo,
  updateImage,
  showImage,
  updateImageCloudinary,
};
