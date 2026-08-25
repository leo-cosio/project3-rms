const createHttpError = require("http-errors");
const Item = require("../lib/models/item.model");

module.exports.create = async (req, res, next) => {
  const item = await Item.create({ ...req.body });

  res.status(201).json({ data: item });
};

module.exports.read = async (req, res, next) => {
  const items = await Item.find();

  res.json({ data: items });
};

module.exports.update = async (req, res, next) => {
  const { itemId } = req.params;
  const item = await Item.findByIdAndUpdate(itemId, req.body, {
    runValidators: true,
    returnDocument: "after",
  });

  if (!item) return next(createHttpError(404, "Item not found"));

  res.json({ data: item });
};

module.exports.remove = async (req, res, next) => {
  const { itemId } = req.params;
  const item = await Item.findByIdAndDelete(itemId);

  if (!item) return next(createHttpError(404, "Item not found"));

  res.status(204).send();
};
