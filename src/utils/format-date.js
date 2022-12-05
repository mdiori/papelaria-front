const formatDate = (date) => {
  const newDate = new Date(date);
  let day = newDate.getDate();
  let month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();
  let hour = newDate.getHours();
  let minute = newDate.getMinutes();

  if (day < 10) {
    day = `0${day}`;
  }

  if (month < 10) {
    month = `0${month}`;
  }

  if (hour < 10) {
    hour = `0${hour}`;
  }

  if (minute < 10) {
    minute = `0${minute}`;
  }

  const formatedDate = `${day}/${month}/${year} - ${hour}:${minute}`;

  return formatedDate;
};

export default formatDate;
