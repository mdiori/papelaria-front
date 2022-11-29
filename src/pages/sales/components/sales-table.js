import React from "react";
import formatDate from "../../../utils/format-date";
import formatMoney from "../../../utils/format-money";
import saleDetailsTable from "./sale-details-table";
import { Edit, Trash } from "../../../utils/icons";

const SalesTable = ({ sales }) => {
  const calculateTotalSaleValue = (sale_products) => {
    let totalValue = 0;

    sale_products.forEach((sale_prod) => {
      const { quantity, product } = sale_prod;
      totalValue += quantity * product.value;
    });

    return totalValue;
  };

  const showSaleDetails = (id) => {
    let saleDetails = document.querySelector(`#info-${id}`);
    let button = document.querySelector(`#btn-${id}`);

    if (saleDetails.classList.contains("hidden")) {
      saleDetails.classList.remove("hidden");
      button.innerHTML = "Fechar";
      return;
    }

    saleDetails.classList.add("hidden");
    button.innerHTML = "Ver Itens";
    return;
  };

  const salesTableBody = () => {
    return sales?.map((sale) => {
      const { id, invoice, client, employee, date, sale_products } = sale;

      const totalValue = calculateTotalSaleValue(sale_products);

      return (
        <React.Fragment key={id}>
          <tr>
            <th>{invoice}</th>
            <th>{client.name}</th>
            <th>{employee.name}</th>
            <th>{formatDate(date)}</th>
            <th>{formatMoney(totalValue)}</th>
            <th className="flex">
              <div className="flex-2">
                <button id={`btn-${id}`} onClick={() => showSaleDetails(id)}>
                  Ver Itens
                </button>
              </div>
              <div className="flex-1 grid place-items-center">
                <Edit />
              </div>
              <div className="flex-1 grid place-items-center">
                <Trash />
              </div>
            </th>
          </tr>
          <tr>
            <th id={`info-${id}`} className="hidden" colSpan={6}>
              {saleDetailsTable(sale_products)}
            </th>
          </tr>
        </React.Fragment>
      );
    });
  };

  return (
    <>
      <table className="table w-full mt-8">
        <thead className="bg-white-100">
          <tr>
            <th>Nota Fiscal</th>
            <th>Cliente</th>
            <th>Vendedor</th>
            <th>Data da Venda</th>
            <th>Valor Total</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>{salesTableBody()}</tbody>
      </table>
    </>
  );
};

export default SalesTable;
