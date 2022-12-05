import { IconContext } from "react-icons";

import {
  FaCashRegister,
  FaCalculator,
  FaEdit,
  FaTrash,
  FaSearch,
} from "react-icons/fa";

const Sales = () => {
  return (
    <>
      <IconContext.Provider value={{ size: "22" }}>
        <FaCashRegister />
      </IconContext.Provider>
    </>
  );
};

const Commissions = () => {
  return (
    <>
      <IconContext.Provider value={{ size: "22" }}>
        <FaCalculator />
      </IconContext.Provider>
    </>
  );
};

const Edit = () => {
  return (
    <>
      <IconContext.Provider value={{ size: "22", color: "#00585e" }}>
        <FaEdit />
      </IconContext.Provider>
    </>
  );
};

const Trash = () => {
  return (
    <>
      <IconContext.Provider value={{ size: "22", color: "#BE0000" }}>
        <FaTrash />
      </IconContext.Provider>
    </>
  );
};

const Search = () => {
  return (
    <>
      <IconContext.Provider value={{ size: "22", color: "#FFFFFF" }}>
        <FaSearch />
      </IconContext.Provider>
    </>
  );
};

export { Sales, Commissions, Edit, Trash, Search };
