import { Header, Sidebar } from "../";

const PageLayout = ({ children, title }) => {
  return (
    <div>
      <Header title={title} />
      <Sidebar>
        <div id="page" className="h-screen overflow-hidden">
          <div className="mx-20 mt-32 mb-20">{children}</div>
        </div>
      </Sidebar>
    </div>
  );
};

export default PageLayout;
