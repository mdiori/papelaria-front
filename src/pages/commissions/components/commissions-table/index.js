import React from "react";
import { useEffect, useState } from "react";
import api from "../../../../services/api";
import formatMoney from "../../../../utils/format-money";

const CommissionsTable = ({ sales }) => {
  const [employees, setEmployees] = useState([]);

  const getEmployees = () => {
    api
      .get("/employee/")
      .then((response) => {
        setEmployees(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const calculateCommissionValidPercentage = (
    commission,
    commission_min,
    commission_max
  ) => {
    if (commission_min <= commission && commission <= commission_max) {
      return commission;
    } else if (commission < commission_min) {
      return commission_min;
    }
    return commission_max;
  };

  const calculateEmployeeCommissionTotal = (employeeSales) => {
    let commissionTotal = 0;
    employeeSales.forEach((sale) => {
      const { sale_products, commission_min, commission_max } = sale;
      sale_products.forEach((sale_product) => {
        const { quantity, product } = sale_product;
        const { commission, value } = product;

        const valid_commission = calculateCommissionValidPercentage(
          commission,
          commission_min,
          commission_max
        );

        commissionTotal += (quantity * value * valid_commission) / 100;
      });
    });

    return commissionTotal;
  };

  const filterEmployeeSales = (id) => {
    let employeeSales = [];
    if (sales.length > 0) {
      sales.forEach((sale) => {
        if (sale.employee.id === id) {
          employeeSales.push(sale);
        }
      });
    }
    return employeeSales;
  };

  const commissionsTableBody = () => {
    let totalCommissions = 0;
    let tableRows = employees?.map((employee, index) => {
      const { id, name } = employee;

      const employeeSales = filterEmployeeSales(id);
      const employeeCommissionTotal =
        calculateEmployeeCommissionTotal(employeeSales);
      totalCommissions += employeeCommissionTotal;

      return (
        <tr key={id}>
          <td>{index + 1}</td>
          <td>{name}</td>
          <td>{employeeSales.length}</td>
          <td>{formatMoney(employeeCommissionTotal)}</td>
        </tr>
      );
    });

    tableRows.push(
      <tr key="commission-footer-table">
        <td colSpan={2}>Total de Commissões do Período</td>
        <td></td>
        <td>{formatMoney(totalCommissions)}</td>
      </tr>
    );

    return tableRows;
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <table id="sale-details-table" className="sale-table w-full">
      <thead className="bg-white-100 sticky top-0">
        <tr>
          <th>Cód.</th>
          <th>Vendedor</th>
          <th>Total de Vendas</th>
          <th>Total de Commissões</th>
        </tr>
      </thead>
      <tbody>{commissionsTableBody()}</tbody>
    </table>
  );
};

export default CommissionsTable;
