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
          <th>{`${code} - ${name}`}</th>
          <th>{quantity}</th>
          <th>{formatMoney(value)}</th>
          <th>{formatMoney(quantity * value)}</th>
          <th></th>
          <th></th>
        </tr>
      );
    });

    talbeRows.push(
      <tr key="sale-details-table">
        <th>Total da Venda</th>
        <th>{totalQuantity}</th>
        <th></th>
        <th>{formatMoney(totalValue)}</th>
        <th></th>
        <th>{formatMoney(totalCommission)}</th>
      </tr>
    );

    return talbeRows;
  };

  return (
    <table className="table w-full">
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
