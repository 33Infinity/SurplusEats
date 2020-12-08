import React, { useState } from "react";

type InventoryState = {
  description: string;
  quantity: string;
  price: string;
};

const Inventory: React.FC = () => {
  const [inventory, setInventory] = useState<Partial<InventoryState>>({});

  const onInventoryUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInventory({ ...inventory, [event.target.name]: event.target.value });
  };

  const getInventory = async () => {};

  const inventoryItems = await getInventory();

  return (
    <div>
      <h1>Inventory Header</h1>
    </div>
  );
};

export default Inventory;
