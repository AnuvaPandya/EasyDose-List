import "./App.css";
import { Lists, MyNav, Home } from "./components";
import { Routes, Route } from "react-router-dom";
import React, { useContext, createContext, useState } from "react";

const initialInventory = [
  { name: "Item 1", quantity: 10 },
  { name: "Item 2", quantity: 4 },
  { name: "Item 3", quantity: 2 },
];

export const ItemContext = React.createContext(null);

function App() {
  const [inventory, updateInventory] = useState(initialInventory);

  return (
    <div>
      <ItemContext.Provider value={{ inventory, updateInventory }}>
        <MyNav expand="sm" />
        <div className="App">
          <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/lists" element={<Lists />} />
          </Routes>
        </div>
      </ItemContext.Provider>
    </div>
  );
}

export default App;
