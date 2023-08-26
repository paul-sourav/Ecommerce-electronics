const asyncHandler = require("express-async-handler");
const Item = require("../models/itemsModel");
const fs = require("fs");

const setItem = asyncHandler(async (req, resp) => {
  const { name, description, category } = req.fields;
  const { itemImg } = req.files;

  if (!name || !description || !category || !itemImg) {
    resp.status(404);
    throw new Error("please fill all the fields");
  } else {
    try {
      const createItem = new Item(req.fields);
      if (itemImg) {
        createItem.itemImg.data = fs.readFileSync(itemImg.path);
        createItem.itemImg.contentType = itemImg.type;
      }

      await createItem.save();
      console.log("you data saved sucessful");
      resp.status(201).json("data saved sucessful");
    } catch (error) {
      console.log(error);
      resp.status(500);
      throw new Error(error);
    }
  }
});
const getItem = asyncHandler(async (req, resp) => {
  const { id } = req.params;
  try {
    const item = await Item.findById(id).select("itemImg");
    resp.set("content-type", item.itemImg.data);
    return resp.send(item.itemImg.data);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});
const getphoto = asyncHandler(async (req, resp) => {
    const { pid } = req.params;
  try {
    const product = await Item.findById(pid).select("photo");
    if (product.itemImg.data) {
      console.log(product.itemImg.data)
      resp.set("Content-type", product.itemImg.data);
      return resp.status(201).send(product.itemImg.data);
    } else {
      console.log("no data found");
    }
  } catch (error) {
    console.log(error);
    resp.status(500);
    throw new Error(error);
  }
});

module.exports = { setItem, getItem ,getphoto};
