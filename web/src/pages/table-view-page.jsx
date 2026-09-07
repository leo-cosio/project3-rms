import { useEffect, useState } from "react";
import {
  Loading,
  TableNavbar,
  MenuItem,
  OrderBar,
  OrderPanel,
} from "../components";
import { getMenu, getTableInfo } from "../services/tables-services";
import { useParams } from "react-router";

export default function TableViewPage() {
  const [table, setTable] = useState(null);
  const [menu, setMenu] = useState([]);
  const [type, setType] = useState("entrante");
  const [order, setOrder] = useState([]);
  const [showOrder, setShowOrder] = useState(false);

  const { number } = useParams();

  useEffect(() => {
    async function loadAssets() {
      try {
        const [tableData, menuData] = await Promise.all([
          getTableInfo(number),
          getMenu(),
        ]);

        setTable(tableData.data);
        setMenu(menuData.data);
      } catch (error) {
        console.error(error);
      }
    }

    loadAssets();
  }, [number]);

  if (!table) {
    return <Loading />;
  }

  const visibleItems = menu.filter((item) => item.type === type);

  const addToOrder = (item) => {
    setOrder((currentOrder) => {
      const existingItem = currentOrder.find(
        (orderItem) => orderItem.id === item.id,
      );

      if (existingItem) {
        return currentOrder.map((orderItem) =>
          orderItem.id === item.id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem,
        );
      }

      return [...currentOrder, { ...item, quantity: 1 }];
    });
  };

  const increaseQuantity = (itemId) => {
    setOrder((currentOrder) =>
      currentOrder.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (itemId) => {
    setOrder((currentOrder) =>
      currentOrder
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  return (
    <div className="h-screen bg-background">
      <TableNavbar table={table} type={type} onTypeChange={setType} />

      <main className="px-6 pb-24 pt-32">
        <div className="grid grid-cols-1 gap-3">
          {visibleItems.map((item) => (
            <MenuItem key={item.id} item={item} onAdd={addToOrder} />
          ))}
        </div>
      </main>

      {order.length > 0 && (
        <OrderBar order={order} onOpen={() => setShowOrder(true)} />
      )}

      {showOrder && (
        <OrderPanel
          table={table}
          order={order}
          onClose={() => setShowOrder(false)}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
        />
      )}
    </div>
  );
}
