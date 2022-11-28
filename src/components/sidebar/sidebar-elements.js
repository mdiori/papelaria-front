import { IconContext } from "react-icons";

import { FaRegBuilding as Sales, FaBook as Commissions } from "react-icons/fa";

const sidebarElementsList = [
  {
    url: "/",
    text: "Sales",
    icon: (
      <>
        <IconContext.Provider value={{ size: "17" }}>
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
        <IconContext.Provider value={{ size: "17" }}>
          <Commissions />
        </IconContext.Provider>
      </>
    ),
  },
];

export default sidebarElementsList;
