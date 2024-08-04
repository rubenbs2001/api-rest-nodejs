const { ObjectId } = require("mongodb");

const { Database } = require("../database/index");

const COLLECTION = "users";

const getAll = async () => {
  const collection = await Database(COLLECTION);
  return await collection.find({}).toArray();
};

const getById = async (id) => {
  const collection = await Database(COLLECTION);
  return collection.findOne({ _id: new ObjectId(id) });
};

const create = async (user) => {
  const collection = await Database(COLLECTION);
  let result = await collection.insertOne(user);
  return result.insertedId;
};

const updateUser = async (id, body) => {
  let user = await getById(id);
  if (!user) {
    return null;
  }
  const collection = await Database(COLLECTION);
  return await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: body }
  );
};

const deleteUser = async (id) => {
  let user = await getById(id);
  if (!user) {
    return null;
  }
  const collection = await Database(COLLECTION);
  return await collection.deleteOne({ _id: new ObjectId(id) });
};

module.exports.UsersService = {
  getAll,
  getById,
  create,
  updateUser,
  deleteUser,
};
