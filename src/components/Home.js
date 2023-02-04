import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Table, Card, CardBody, NavItem } from "reactstrap";
import { ItemContext } from "../App";

const Home = (props) => {
  const { inventory } = useContext(ItemContext);

  return (
    <div>
      <h2 className="App-header mb-3">Inventory List</h2>
      <div className="d-flex justify-content-center">
        <Card className="w-50">
          <CardBody>
            <Table striped className="">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <button className="btn btn-primary">
              <Link className="nav-link" to="/lists">
                Edit List
              </Link>
            </button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
export { Home };
