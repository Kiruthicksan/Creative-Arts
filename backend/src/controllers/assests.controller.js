import { Assests } from "../models/assests.schema";

const getAssests = async (req, res) => {
  try {
    const assests = await Assests.find();
    res.status(200).json(assests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createAssest = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      image,
      price,
      orginalPrice,
      discount,
      downloads,
      author,
    } = req.body;

    // validation

    if (
      !title ||
      !description ||
      !category ||
      !image ||
      !price ||
      !orginalPrice ||
      !discount ||
      !downloads ||
      !author
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const assest = await Assests.create({
      title,
      description,
      category,
      image,
      price,
      orginalPrice,
      discount,
      downloads,
      author,
    });
    res.status(201).json(assest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
