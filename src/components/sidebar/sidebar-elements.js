import { IconContext } from "react-icons";

import {
  FaCashRegister as Sales,
  FaCalculator as Commissions,
} from "react-icons/fa";

const sidebarElementsList = [
  {
    url: "/",
    text: "Sales",
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
    text: "Commisoes",
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
