import logo from "../../images/logoipsum.svg";

const Header = ({ title }) => {
  return (
    <div className="navbar h-24 bg-appgray fixed z-50 shadow-lg">
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
      <div>
        <img alt="logo" src={logo} />
      </div>
      <div className="flex-1 flex justify-center mr-80">
        <p className="text-4xl text-appgreen font-extrabold">{title}</p>
      </div>
    </div>
  );
};

export default Header;
