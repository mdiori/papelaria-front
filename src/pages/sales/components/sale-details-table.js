import formatMoney from "../../../utils/format-money";

const saleDetailsTable = (sale_products) => {
  const salesInfoTableBody = () => {
    let totalQuantity = 0;
    let totalValue = 0;
    let totalCommission = 0;

    let talbeRows = sale_products.map((sale_prod) => {
      const { id, product, quantity } = sale_prod;
      const { name, code, value } = product;

      totalQuantity += quantity;
      totalValue += quantity * value;

      return (
        <tr key={`sale-details-table-${id}`}>
          <td>{`${code} - ${name}`}</td>
          <td>{quantity}</td>
          <td>{formatMoney(value)}</td>
          <td>{formatMoney(quantity * value)}</td>
          <td></td>
          <td></td>
        </tr>
      );
    });

    talbeRows.push(
      <tr key="sale-details-table" className="text-appgreen font-[600]">
        <td>Total da Venda</td>
        <td>{totalQuantity}</td>
        <td></td>
        <td>{formatMoney(totalValue)}</td>
        <td></td>
        <td>{formatMoney(totalCommission)}</td>
      </tr>
    );

    return talbeRows;
  };

  return (
    <table id="sale-details-table" className="w-full">
      <thead>
        <tr>
          <th>Produtos/Serviços</th>
          <th>Quantidade</th>
          <th>Preço unitário</th>
          <th>Total do Produto</th>
          <th>% de Comissão</th>
          <th>Comissão</th>
        </tr>
      </thead>
      <tbody>{salesInfoTableBody()}</tbody>
    </table>
  );
};

export default saleDetailsTable;
