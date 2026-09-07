import { useEffect, useState } from "react";
import {
  Loading,
  TableNavbar,
  MenuItem,
  OrderBar,
  OrderPanel,
} from "../components";
import {
  getMenu,
  getTableInfo,
  createOrder,
  getOrder,
} from "../services/tables-services";
import { useNavigate, useParams } from "react-router";

export default function TableViewPage() {
  const [table, setTable] = useState(null);
  const [menu, setMenu] = useState([]);
  const [type, setType] = useState("entrante");
  const [order, setOrder] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [showOrder, setShowOrder] = useState(false);
  const { number } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadAssets() {
      try {
        const [tableData, menuData] = await Promise.all([
          getTableInfo(number),
          getMenu(),
        ]);

        setTable(tableData.data);
        setMenu(menuData.data);

        try {
          const orderData = await getOrder(number);
          setCurrentOrder(orderData.data);
          // eslint-disable-next-line no-unused-vars
        } catch (error) {
          setCurrentOrder(null);
        }
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

  const handleExitTable = () => {
    if (order.length > 0) {
      const confirmExit = window.confirm(
        "Hay artículos en el pedido que todavía no han sido enviados. ¿Seguro que quieres salir de la mesa?",
      );

      if (!confirmExit) return;

      navigate("/tables");
    }

    navigate("/tables");
  };

  const sendOrder = async () => {
    try {
      const items = order.map((item) => ({
        menuItem: item.id,
        quantity: item.quantity,
      }));

      const orderData = await createOrder(number, items);

      console.log("Pedido enviado:", orderData);

      setCurrentOrder(orderData.data);
      setOrder([]);
      setShowOrder(false);
    } catch (error) {
      console.error("Error al enviar el pedido:", error);
    }
  };

  return (
    <div className="h-screen bg-background">
      <TableNavbar
        table={table}
        type={type}
        onTypeChange={setType}
        onExit={handleExitTable}
      />

      <main className="px-6 pb-24 pt-32">
        <div className="grid grid-cols-1 gap-3">
          {visibleItems.map((item) => (
            <MenuItem key={item.id} item={item} onAdd={addToOrder} />
          ))}
        </div>
      </main>

      {(currentOrder || order.length > 0) && (
        <OrderBar
          order={order}
          currentOrder={currentOrder}
          onOpen={() => setShowOrder(true)}
        />
      )}

      {showOrder && (
        <OrderPanel
          table={table}
          order={order}
          currentOrder={currentOrder}
          onClose={() => setShowOrder(false)}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
          onSend={sendOrder}
        />
      )}
    </div>
  );
}
