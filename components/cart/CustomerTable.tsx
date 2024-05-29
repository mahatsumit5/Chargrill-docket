import { useAppSelector } from "@/hook";
import { ICustomer } from "@/types";
import React from "react";
type key = keyof ICustomer;
function CustomerTable() {
  const { customer } = useAppSelector((s) => s.cart);
  if (!customer) return null;
  return (
    <table className=" ">
      <tbody>
        {Object.entries(customer as Object).map((item) => (
          <tr key={item[0]} className="border">
            <th>{item[0].toUpperCase()}</th>

            <td>{item[1] ? item[1] : ""}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CustomerTable;
