import React from "react";
import formatDate from "../../../../utils/format-date";
import formatMoney from "../../../../utils/format-money";
import saleDetailsTable from "./../sale-details-table";
import { Edit, Trash } from "../../../../utils/icons";
import { Link } from "react-router-dom";

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
    return sales?.map((sale, index) => {
      const {
        id,
        invoice,
        client,
        employee,
        date,
        sale_products,
        commission_min,
        commission_max,
      } = sale;

      const totalValue = calculateTotalSaleValue(sale_products);

      return (
        <React.Fragment key={id}>
          <tr>
            <td>{invoice}</td>
            <td>{client.name}</td>
            <td>{employee.name}</td>
            <td>{formatDate(date)}</td>
            <td>{formatMoney(totalValue)}</td>
            <td>
              <div className="grid grid-cols-12 text-appgreen font-[600]">
                <div className="col-span-6">
                  <button id={`btn-${id}`} onClick={() => showSaleDetails(id)}>
                    <p>Ver Itens</p>
                  </button>
                </div>
                <Link
                  className="col-span-3"
                  to="/sale/configuration"
                  state={{ sale }}
                >
                  <button className="col-span-3">
                    <Edit />
                  </button>
                </Link>

                <button className="col-span-3">
                  <Trash />
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td id={`info-${id}`} className="hidden" colSpan={6}>
              {saleDetailsTable(commission_min, commission_max, sale_products)}
            </td>
          </tr>
        </React.Fragment>
      );
    });
  };

  return (
    <>
      <table id="sale-table" className="sale-table w-full striped_table">
        <thead className="bg-white-100 sticky top-0">
          <tr>
            <th>Nota Fiscal</th>
            <th>Cliente</th>
            <th>Vendedor</th>
            <th>Data da Venda</th>
            <th>Valor Total</th>
            <th className="w-64">Opções</th>
          </tr>
        </thead>
        <tbody>{salesTableBody()}</tbody>
      </table>
    </>
  );
};

export default SalesTable;
