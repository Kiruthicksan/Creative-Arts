import { Assests } from "../models/assests.schema.js";
import cloudinary from "../config/cloudinary.js";

export const getAssests = async (req, res) => {
  try {
    const assests = await Assests.find();
    res.status(200).json(assests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createAssest = async (req, res) => {
  try {
    const {
      title,
      description,
      included,
      category,
      price,
      originalPrice,
      discount,
      author,
      rating,
    } = req.body;

    let imageData = [];

if (req.files && req.files.length > 0) {
  const uploadPromises = req.files.map((file) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "creative-arts/assets" },
        (error, result) => {
          if (error) return reject(error);
       
          resolve({
            public_id: result.public_id,
            secure_url: result.secure_url,
          });
        }
      );
      stream.end(file.buffer);
    });
  });


  imageData = await Promise.all(uploadPromises);
}

    const assest = await Assests.create({
      title,
      description,
      included,
      category,
      image: imageData,
      price,
      originalPrice,
      discount,
      author,
      rating,
    });
    res.status(201).json(assest);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};
