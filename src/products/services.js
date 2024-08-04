const { ObjectId } = require("mongodb");

const { Database } = require("../database/index");
const { ProductsUtils } = require("./utils");

const COLLECTION = "products";

const getAll = async () => {
  const collection = await Database(COLLECTION);
  return await collection.find({}).toArray();
};

const getById = async (id) => {
  const collection = await Database(COLLECTION);
  return collection.findOne({ _id: new ObjectId(id) });
};

const create = async (product) => {
  const collection = await Database(COLLECTION);
  let result = await collection.insertOne(product);
  return result.insertedId;
};

const generateReport = async (name, res) => {
  let products = await getAll();
  ProductsUtils.excelGenerator(products, name, res);
};

const updateProduct = async (id, body) => {
  let product = await getById(id);
  if (!product) {
    return null;
  }
  const collection = await Database(COLLECTION);
  return await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: body }
  );
};

const deleteProduct = async (id) => {
  let product = await getById(id);
  if (!product) {
    return null;
  }
  const collection = await Database(COLLECTION);
  return await collection.deleteOne({ _id: new ObjectId(id) });
};

module.exports.ProductsService = {
  getAll,
  getById,
  create,
  generateReport,
  updateProduct,
  deleteProduct,
};
