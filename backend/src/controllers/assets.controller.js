import { Assets } from "../models/assets.schema.js";
import cloudinary from "../config/cloudinary.js";
import slugify from "slugify";

export const getAssets = async (req, res) => {
  try {
    const assets = await Assets.find();
    res.status(200).json(assets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAssetsById = async (req, res) => {
  try {
    const asset = await Assets.findById(req.params.id);
    if (!asset) {
      res.json({ message: "Asset Not found" });
    }
    res.status(200).json(asset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createAsset = async (req, res) => {
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
      trending,
      featured,
      tags,
    } = req.body;

    const parsedPrice = parseFloat(price);
    const parsedOriginalPrice = originalPrice ? parseFloat(originalPrice) : 0;
    const parsedDiscount = discount ? parseFloat(discount) : 0;
    const parsedRating = rating ? parseFloat(rating) : 0;
    const parsedTrending = trending === "true" || trending === true;
    const parsedFeatured = featured === "true" || featured === true;

    let parsedTags = [];
    if (tags) {
      if (Array.isArray(tags)) {
        parsedTags = tags;
      } else if (typeof tags === "string") {
        // Handle comma separated tags "tag1, tag2"
        parsedTags = tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0);
      }
    }

    /* -------------------- BASIC VALIDATION -------------------- */
    if (!title || !description || !category || !price || !author) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    /* -------------------- PREVIEW IMAGES -------------------- */
    let imageData = [];

    if (req.files?.previewImages?.length) {
      imageData = await Promise.all(
        req.files.previewImages.map(
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

    const asset = await Assets.create({
      title,
      description,
      included,
      category,
      previewImages: imageData,
      downloadFile: downloadFileData,
      price: parsedPrice,
      originalPrice: parsedOriginalPrice,
      discount: parsedDiscount,
      author,
      rating: parsedRating,
      trending: parsedTrending,
      featured: parsedFeatured,
      tags: parsedTags,
    });

    return res.status(201).json(asset);
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
          uploadedImagePublicIds.map((id) => cloudinary.uploader.destroy(id)),
        );
      }
    } catch {}

    console.log("Error in createAsset:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const updateAsset = async (req, res) => {
  const uploadedImageIds = [];
  let uploadedDownloadId = null;

  try {
    const { id } = req.params;

    const asset = await Assets.findById(id);
    if (!asset) {
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
      "trending",
      "tags",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        asset[field] = req.body[field];
      }
    });

    /* ---------- UPDATE PREVIEW IMAGES ---------- */
    let currentImages = asset.previewImages || [];

    // 1. Handle deletion/keeping of existing images
    if (req.body.existingImageIds) {
      try {
        const keptIds = JSON.parse(req.body.existingImageIds);

        // Find images to delete (those in DB but NOT in the kept list)
        const imagesToDelete = currentImages.filter(
          (img) => !keptIds.includes(img.public_id),
        );

        // Keep only the ones in the list
        currentImages = currentImages.filter((img) =>
          keptIds.includes(img.public_id),
        );

        if (imagesToDelete.length > 0) {
          await Promise.all(
            imagesToDelete.map((img) =>
              cloudinary.uploader.destroy(img.public_id),
            ),
          );
        }
      } catch (e) {
        console.error("Error parsing existingImageIds:", e);
      }
    }

    // 2. Add new images
    if (req.files?.previewImages?.length) {
      const newImages = await Promise.all(
        req.files.previewImages.map(
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

      currentImages = [...currentImages, ...newImages];
    }

    asset.previewImages = currentImages;

    /* ---------- UPDATE DOWNLOAD ZIP ---------- */
    if (req.files?.downloadFile?.length) {
      const file = req.files.downloadFile[0];

      if (file.mimetype !== "application/zip") {
        throw new Error("Only ZIP files allowed");
      }

      if (asset.downloadFile?.public_id) {
        await cloudinary.uploader.destroy(asset.downloadFile.public_id, {
          resource_type: "raw",
        });
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

      asset.downloadFile = newDownloadFile;
    }

    await asset.save();
    return res.status(200).json(asset);
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
          uploadedImageIds.map((id) => cloudinary.uploader.destroy(id)),
        );
      }
    } catch {}

    return res.status(500).json({ error: error.message });
  }
};

export const deleteAsset = async (req, res) => {
  try {
    const { id } = req.params;
    const asset = await Assets.findById(id);

    if (!asset) {
      return res.status(404).json({ error: "Asset not found" });
    }

    // Delete files from Cloudinary
    if (asset.downloadFile?.public_id) {
      await cloudinary.uploader.destroy(asset.downloadFile.public_id, {
        resource_type: "raw",
      });
    }

    if (asset.previewImages?.length > 0) {
      await Promise.all(
        asset.previewImages.map((img) =>
          cloudinary.uploader.destroy(img.public_id),
        ),
      );
    }

    await Assets.deleteOne({ _id: id });
    res.status(200).json({ message: "Asset deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
