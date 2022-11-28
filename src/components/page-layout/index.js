import { Header, Sidebar } from "../";

const PageLayout = ({ children }) => {
  return (
    <div>
      <Sidebar>
        <Header />
        <div id="page" className="mt-24">
          {children}
        </div>
      </Sidebar>
    </div>
  );
};

export default PageLayout;
