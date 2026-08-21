const createHttpError = require("http-errors");
const Order = require("../lib/models/order.model");
const Table = require("../lib/models/table.model");

module.exports.create = async (req, res, next) => {
  const { tableId } = req.params;
  const table = await Table.findOneAndUpdate(
    { table: tableId, status: "libre" },
    { status: "ocupada" },
    { returnDocument: "after" },
  );

  if (!table) return next(createHttpError(404, "Table not found"));

  const order = await Order.create({ ...req.body });

  res.status(201).json({ data: order });
};

module.exports.read = async (req, res, next) => {
  const { tableId } = req.params;
  const order = await Order.findOne({ tableId })
    .populate("table")
    .populate("items.menuItem");

  if (!order) return next(createHttpError(404, "Order not found"));

  res.json({ data: order });
};

module.exports.update = async (req, res, next) => {
  const { tableId } = req.params;
  const order = await Order.findByIdAndUpdate({ table: tableId }, req.body, {
    runValidators: true,
    returnDocument: "after",
  });

  if (!order) return next(createHttpError(404, "Order not found"));

  res.json({ data: order });
};

module.exports.remove = async (req, res, next) => {
  const { tableId } = req.params;
  const order = await Order.findOneAndDelete({ tableId });

  if (!order) return next(createHttpError(404, "Order not found"));

  res.status(204).send();
};
