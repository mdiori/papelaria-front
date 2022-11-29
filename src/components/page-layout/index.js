import { Header, Sidebar } from "../";

const PageLayout = ({ children }) => {
  return (
    <div>
      <Sidebar>
        <Header />
        <div id="page">
          <div className="mx-20 mt-32 mb-20">{children}</div>
        </div>
      </Sidebar>
    </div>
  );
};

export default PageLayout;
