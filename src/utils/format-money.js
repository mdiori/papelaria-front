const formatMoney = (value) => {
  let real = 0;
  if (value) {
    real = (value / 100).toFixed(2);
  }
  return `R$ ${real}`;
};

export default formatMoney;
