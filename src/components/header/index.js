import logo from "../../images/logoipsum.svg";

const Header = () => {
  return (
    <div className="navbar h-24 bg-gray-100 fixed z-50">
      <div className="flex-none">
        <label htmlFor="my-drawer" className="drawer-button">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            className="mx-10 inline-block w-10 h-10 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="flex-1">
        <img alt="logo" src={logo} />
      </div>
    </div>
  );
};

export default Header;
