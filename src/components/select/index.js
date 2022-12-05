import ReactSelect from "react-select";

const reactSelectStyle = {
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  control: (provided, state) => ({
    ...provided,
    background: "#fff",
    minHeight: "65px",
    height: "50px",
    boxShadow: state.isFocused ? null : null,
    borderRadius: "2px",
    fontSize: "18px",
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    height: "30px",
    padding: "0 6px",
  }),

  input: (provided, state) => ({
    ...provided,
    fontWeight: "4px",
    fontSize: 18,
  }),
  indicatorSeparator: (state) => ({
    display: "none",
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: "50px",
  }),
};

const Select = ({
  name,
  placeholder,
  options,
  onInputChange,
  onChange,
  noOptionsMessage,
  value,
}) => {
  return (
    <ReactSelect
      name={name}
      placeholder={placeholder}
      styles={reactSelectStyle}
      options={options}
      onInputChange={onInputChange}
      onChange={onChange}
      noOptionsMessage={noOptionsMessage}
      value={value}
    />
  );
};

export default Select;
