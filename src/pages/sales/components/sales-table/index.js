import React, { useState } from "react";
import formatDate from "../../../../utils/format-date";
import formatMoney from "../../../../utils/format-money";
import saleDetailsTable from "./../sale-details-table";
import { Edit, Trash } from "../../../../utils/icons";
import { Link } from "react-router-dom";
import api from "../../../../services/api";
import * as fireToast from "../../../../utils/fire-toast";
import messages from "../../../../misc/messages";

const SalesTable = ({ sales, getSales }) => {
  const [deletionSale, setDeletionSale] = useState(null);

  const handleSaleDeletion = () => {
    if (deletionSale) {
      api
        .delete(`/sale/${deletionSale}`)
        .then((response) => {
          if (response.status === 204) {
            fireToast.success(messages.form.success.sale_remotion);
            getSales();
          }
        })
        .catch((error) => {
          console.log(error);
          fireToast.error(messages.form.error.sale_remotion);
        });
    }
  };

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

                <label
                  htmlFor="deletion-modal"
                  onClick={() => {
                    setDeletionSale(id);
                  }}
                >
                  <Trash />
                </label>
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
      <input type="checkbox" id="deletion-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative rounded-sm">
          <label htmlFor="deletion-modal" className="absolute right-4 top-4">
            ✕
          </label>
          <div className="border-b-2  border-appgray">
            <h3 className="font-bold text-lg pb-4">Remover Venda</h3>
          </div>

          <p className="border-b-2 border-appgray py-12">
            Deseja remover esta venda?
          </p>
          <div className="flex">
            <div className="modal-action flex-1">
              <label htmlFor="deletion-modal" className="btn btn-outline">
                Não
              </label>
            </div>
            <div className="modal-action flex-none ml-3">
              <label
                onClick={() => handleSaleDeletion()}
                className="btn bg-appgreen"
                htmlFor="deletion-modal"
              >
                Sim
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesTable;
