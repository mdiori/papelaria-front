import { IconContext } from "react-icons";

import {
  FaCashRegister as Sales,
  FaCalculator as Commissions,
} from "react-icons/fa";

const sidebarElementsList = [
  {
    url: "/",
    text: "Vendas",
    icon: (
      <>
        <IconContext.Provider value={{ size: "22" }}>
          <Sales />
        </IconContext.Provider>
      </>
    ),
  },
  {
    url: "/commissions",
    text: "Comissões",
    icon: (
      <>
        <IconContext.Provider value={{ size: "22" }}>
          <Commissions />
        </IconContext.Provider>
      </>
    ),
  },
];

export default sidebarElementsList;
