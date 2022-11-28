import { Link } from "react-router-dom";
import sidebarElements from "./sidebar-elements";

const Sidebar = ({ children }) => {
  const SidebarBody = () => {
    let sidebarElementsLinks = sidebarElements.map((el, index) => {
      return (
        <li className="relative" key={`${index}-${el.url}`}>
          <Link to={el.url}>
            {el.icon}
            <span className="px-3 text-xl">{el.text}</span>
          </Link>
        </li>
      );
    });

    return <>{sidebarElementsLinks}</>;
  };

  return (
    <>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">{children}</div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 overflow-y-auto w-72 bg-gray-100 text-base-content">
            <SidebarBody />
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
