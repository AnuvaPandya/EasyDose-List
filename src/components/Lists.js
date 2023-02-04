import React, { useContext, useEffect, useReducer, useState } from "react";
import { Button, Card, CardBody, CardHeader, Table, Input } from "reactstrap";
import increase from "../images/increase.png";
import decrease from "../images/decrease.png";
import erase from "../images/delete.png";
import { ItemContext } from "../App";

const reducer = (state, action) => {
  switch (action.type) {
    case "INCREASE": {
      const itemIndex = state.findIndex(
        (item) => item.name === action.payload.name
      );
      return state.map((item, index) =>
        index === itemIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
    }

    case "DECREASE": {
      const itemIndex = state.findIndex(
        (item) => item.name === action.payload.name
      );
      return state.map((item, index) =>
        index === itemIndex
          ? { ...item, quantity: item.quantity - 1 > 1 ? item.quantity - 1 : 1 }
          : item
      );
    }

    case "ADD": {
      return [...state, action.payload];
    }

    case "REMOVE": {
      const filteredList = state.filter(
        (item) => item.name !== action.payload.name
      );
      return filteredList;
    }
  }
};

const Lists = (props) => {
  const { inventory, updateInventory } = useContext(ItemContext);
  const [newItem, updateNewItem] = useState({
    name: "Asprin mg-100",
    quantity: 1,
  });
  const [state, dispatch] = useReducer(reducer, inventory);

  const updateName = (e) => updateNewItem({ ...newItem, name: e.target.value });
  const updateQuantity = (e) =>
    updateNewItem({ ...newItem, quantity: parseInt(e.target.value) });

  useEffect(() => {
    updateInventory(state);
  }, [state]);

  return (
    <div>
      <h2 className="App-header">Edit List</h2>
      <div className="d-flex justify-content-center">
        <Card className="w-50">
          <CardHeader>Item Name</CardHeader>
          <div>
            <Input
              className="input"
              placeholder="Item Name"
              onChange={(e) => updateName(e)}
            />
            <Input
              className="input"
              type="number"
              min="1"
              placeholder="Quantity"
              onChange={(e) => updateQuantity(e)}
            />
            <button
              className="btn btn-primary"
              onClick={() => dispatch({ type: "ADD", payload: newItem })}
            >
              Add
            </button>
          </div>
          <CardBody>
            <Table striped>
              <thead>
                <tr>
                  <th>Inventory List</th>
                </tr>
              </thead>
              <tbody>
                {state.map((item) => {
                  return (
                    <tr>
                      <td>{item.name}</td>
                      <td>Quantity : {item.quantity}</td>
                      <Button
                        className="increase"
                        type="button"
                        onClick={() =>
                          dispatch({ type: "INCREASE", payload: item })
                        }
                      >
                        <img
                          className="increase-img"
                          src={increase}
                          alt="increase"
                        />
                      </Button>
                      <Button
                        className="decrease"
                        onClick={() =>
                          dispatch({ type: "DECREASE", payload: item })
                        }
                      >
                        <img
                          className="decrease-img"
                          src={decrease}
                          alt="decrease"
                        />
                      </Button>

                      <td>
                        <Button
                          className="erase"
                          style={{ background: "none" }}
                          type="button"
                          onClick={() =>
                            dispatch({ type: "REMOVE", payload: item })
                          }
                        >
                          <img className="erase-img" src={erase} alt="erase" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export { Lists };
