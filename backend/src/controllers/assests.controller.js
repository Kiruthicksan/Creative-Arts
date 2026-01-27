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

export const getAssetsById = async (req, res) => {
  try {
    const asset = await Assests.findById(req.params.id);
    res.status(200).json(asset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createAssest = async (req, res) => {
  const uploadedImagePublicIds = [];
  let uploadedDownloadPublicId = null;

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

    /* -------------------- BASIC VALIDATION -------------------- */
    if (!title || !description || !category || !price || !author) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    /* -------------------- PREVIEW IMAGES -------------------- */
    let imageData = [];

    if (req.files?.images?.length) {
      imageData = await Promise.all(
        req.files.images.map(
          (file) =>
            new Promise((resolve, reject) => {
              const stream = cloudinary.uploader.upload_stream(
                { folder: "creative-arts/previews" },
                (error, result) => {
                  if (error) return reject(error);

                  uploadedImagePublicIds.push(result.public_id);

                  resolve({
                    public_id: result.public_id,
                    secure_url: result.secure_url,
                  });
                },
              );
              stream.end(file.buffer);
            }),
        ),
      );
    }

    /* -------------------- DOWNLOAD FILE (ZIP) -------------------- */
    if (!req.files?.downloadFile?.length) {
      throw new Error("Product ZIP file is required");
    }

    const downloadFile = req.files.downloadFile[0];

    if (downloadFile.mimetype !== "application/zip") {
      throw new Error("Only ZIP files are allowed");
    }

    const downloadFileData = await new Promise((resolve, reject) => {
      const slug = slugify(title);
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "creative-arts/downloads",
          resource_type: "raw",
          public_id: slug,
          unique_filename: false,
          overwrite: true,
        },
        (error, result) => {
          if (error) return reject(error);

          uploadedDownloadPublicId = result.public_id;

          resolve({
            public_id: result.public_id,
            secure_url: result.secure_url,
            format: result.format,
            size: result.bytes,
          });
        },
      );
      stream.end(downloadFile.buffer);
    });

    const assest = await Assests.create({
      title,
      description,
      included,
      category,
      image: imageData,
      downloadFile: downloadFileData,
      price,
      originalPrice,
      discount,
      author,
      rating,
    });

    return res.status(201).json(assest);
  } catch (error) {
    /* -------------------- ROLLBACK -------------------- */
    try {
      if (uploadedDownloadPublicId) {
        await cloudinary.uploader.destroy(uploadedDownloadPublicId, {
          resource_type: "raw",
        });
      }

      if (uploadedImagePublicIds.length) {
        await Promise.all(
          uploadedImagePublicIds.map((id) =>
            cloudinary.uploader.destroy(id),
          ),
        );
      }
    } catch {}

    return res.status(500).json({ error: error.message });
  }
};


export const updateAssest = async (req, res) => {
  const uploadedImageIds = [];
  let uploadedDownloadId = null;

  try {
    const { id } = req.params;

    const assest = await Assests.findById(id);
    if (!assest) {
      return res.status(404).json({ error: "Asset not found" });
    }

    /* ---------- UPDATE TEXT FIELDS ---------- */
    const allowedFields = [
      "title",
      "description",
      "included",
      "category",
      "price",
      "originalPrice",
      "discount",
      "author",
      "rating",
      "featured",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        assest[field] = req.body[field];
      }
    });

    /* ---------- UPDATE PREVIEW IMAGES ---------- */
    if (req.files?.images?.length) {
      await Promise.all(
        assest.image.map((img) =>
          cloudinary.uploader.destroy(img.public_id),
        ),
      );

      const newImages = await Promise.all(
        req.files.images.map(
          (file) =>
            new Promise((resolve, reject) => {
              const stream = cloudinary.uploader.upload_stream(
                { folder: "creative-arts/previews" },
                (error, result) => {
                  if (error) return reject(error);

                  uploadedImageIds.push(result.public_id);

                  resolve({
                    public_id: result.public_id,
                    secure_url: result.secure_url,
                  });
                },
              );
              stream.end(file.buffer);
            }),
        ),
      );

      assest.image = newImages;
    }

    /* ---------- UPDATE DOWNLOAD ZIP ---------- */
    if (req.files?.downloadFile?.length) {
      const file = req.files.downloadFile[0];

      if (file.mimetype !== "application/zip") {
        throw new Error("Only ZIP files allowed");
      }

      if (assest.downloadFile?.public_id) {
        await cloudinary.uploader.destroy(
          assest.downloadFile.public_id,
          { resource_type: "raw" },
        );
      }

      const newDownloadFile = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "creative-arts/downloads",
            resource_type: "raw",
          },
          (error, result) => {
            if (error) return reject(error);

            uploadedDownloadId = result.public_id;

            resolve({
              public_id: result.public_id,
              secure_url: result.secure_url,
              format: result.format,
              size: result.bytes,
            });
          },
        );
        stream.end(file.buffer);
      });

      assest.downloadFile = newDownloadFile;
    }

    await assest.save();
    return res.status(200).json(assest);
  } catch (error) {
    /* ---------- ROLLBACK ---------- */
    try {
      if (uploadedDownloadId) {
        await cloudinary.uploader.destroy(uploadedDownloadId, {
          resource_type: "raw",
        });
      }
      if (uploadedImageIds.length) {
        await Promise.all(
          uploadedImageIds.map((id) =>
            cloudinary.uploader.destroy(id),
          ),
        );
      }
    } catch {}

    return res.status(500).json({ error: error.message });
  }
};
