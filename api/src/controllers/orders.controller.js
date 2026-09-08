const createHttpError = require("http-errors");

const Order = require("../lib/models/order.model");
const Table = require("../lib/models/table.model");
const Item = require("../lib/models/item.model");

module.exports.create = async (req, res, next) => {
  try {
    const { number } = req.params;
    const { items } = req.body;

    const table = await Table.findOne({ number });

    if (!table) {
      return next(createHttpError(404, "Table not found"));
    }

    let order = await Order.findOne({
      table: table._id,
      status: "open",
    });

    if (!order) {
      order = new Order({
        table: table._id,
        items: [],
        subtotal: 0,
        status: "open",
      });

      table.status = "ocupada";
    }

    if (items && items.length > 0) {
      for (const newItem of items) {
        const { menuItem, quantity } = newItem;

        if (!quantity || quantity < 1) {
          return next(createHttpError(400, "Quantity must be at least 1"));
        }

        const item = await Item.findById(menuItem);

        if (!item) {
          return next(createHttpError(404, "Menu item not found"));
        }

        if (!item.available) {
          return next(createHttpError(400, `${item.name} is not available`));
        }

        const existingItem = order.items.find(
          (orderItem) => orderItem.menuItem.toString() === menuItem.toString(),
        );

        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          order.items.push({
            menuItem,
            quantity,
          });
        }
      }
    }

    let subtotal = 0;

    for (const orderItem of order.items) {
      const item = await Item.findById(orderItem.menuItem);

      if (!item) {
        return next(
          createHttpError(404, "One of the menu items no longer exists"),
        );
      }

      subtotal += item.price * orderItem.quantity;
    }

    order.subtotal = subtotal;

    await order.save();
    await table.save();

    await order.populate("table");
    await order.populate("items.menuItem");

    res.status(201).json({
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.read = async (req, res, next) => {
  try {
    const { number } = req.params;

    const table = await Table.findOne({ number });

    if (!table) {
      return next(createHttpError(404, "Table not found"));
    }

    const order = await Order.findOne({
      table: table._id,
      status: "open",
    })
      .populate("table")
      .populate("items.menuItem");

    if (!order) {
      return next(createHttpError(404, "Open order not found"));
    }

    res.json({
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    const { number } = req.params;
    const { items } = req.body;

    const table = await Table.findOne({ number });

    if (!table) {
      return next(createHttpError(404, "Table not found"));
    }

    const order = await Order.findOne({
      table: table._id,
      status: "open",
    });

    if (!order) {
      return next(createHttpError(404, "Open order not found"));
    }

    if (items !== undefined) {
      order.items = [];

      for (const newItem of items) {
        const { menuItem, quantity } = newItem;

        if (!quantity || quantity < 1) {
          return next(createHttpError(400, "Quantity must be at least 1"));
        }

        const item = await Item.findById(menuItem);

        if (!item) {
          return next(createHttpError(404, "Menu item not found"));
        }

        if (!item.available) {
          return next(createHttpError(400, `${item.name} is not available`));
        }

        order.items.push({
          menuItem,
          quantity,
        });
      }
    }

    let subtotal = 0;

    for (const orderItem of order.items) {
      const item = await Item.findById(orderItem.menuItem);

      if (!item) {
        return next(
          createHttpError(404, "One of the menu items no longer exists"),
        );
      }

      subtotal += item.price * orderItem.quantity;
    }

    order.subtotal = subtotal;

    await order.save();

    await order.populate("table");
    await order.populate("items.menuItem");

    res.json({
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.close = async (req, res, next) => {
  try {
    const { number } = req.params;

    const table = await Table.findOne({ number });

    if (!table) {
      return next(createHttpError(404, "Table not found"));
    }

    const order = await Order.findOne({
      table: table._id,
      status: "open",
    });

    if (!order) {
      return next(createHttpError(404, "Open order not found"));
    }

    order.status = "closed";

    table.status = "libre";

    await order.save();
    await table.save();

    await order.populate("table");
    await order.populate("items.menuItem");

    res.json({
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.remove = async (req, res, next) => {
  try {
    const { number } = req.params;

    const table = await Table.findOne({ number });

    if (!table) {
      return next(createHttpError(404, "Table not found"));
    }

    const order = await Order.findOne({
      table: table._id,
      status: "open",
    });

    if (!order) {
      return next(createHttpError(404, "Open order not found"));
    }

    await Order.findByIdAndDelete(order._id);

    table.status = "libre";
    await table.save();

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
