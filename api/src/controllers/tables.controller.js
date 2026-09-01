const createHttpError = require("http-errors");
const Table = require("../lib/models/table.model");

module.exports.create = async (req, res, next) => {
  const table = await Table.create({ ...req.body });

  res.status(201).json({ data: table });
};

module.exports.list = async (req, res, next) => {
  const tables = await Table.find().select("number status -_id").lean();

  res.json({ data: tables });
};

module.exports.read = async (req, res, next) => {
  const { number } = req.params;

  const table = await Table.findOne({ number });

  if (!table) {
    return next(createHttpError(404, "Table not found"));
  }

  res.json({ data: table });
};

module.exports.update = async (req, res, next) => {
  const { number } = req.params;

  const table = await Table.findOneAndUpdate({ number }, req.body, {
    runValidators: true,
    returnDocument: "after",
  });

  if (!table) {
    return next(createHttpError(404, "User not found"));
  }

  res.json({ data: table });
};

module.exports.remove = async (req, res, next) => {
  const { number } = req.params;

  const table = await Table.findOneAndDelete({ number });

  if (!table) {
    return next(createHttpError(404, "Table not found"));
  }

  res.status(204).send();
};
