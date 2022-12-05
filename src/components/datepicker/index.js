import { DatePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import ptBR from "dayjs/locale/pt-br";
import DayJsUtils from "@date-io/dayjs";

const Datepicker = ({ label, value, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={DayJsUtils} adapterLocale={ptBR}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default Datepicker;
