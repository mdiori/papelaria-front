import PageLayout from "../../components/page-layout";

const NotFound = () => {
  return (
    <PageLayout>
      <div className="flex h-screen">
        <div className="mx-auto mt-44">
          <h3 className="text-4xl text-appgreen">
            Bom não era para você estar aqui, mas já que você chegou toma um 404
            🥸
          </h3>
        </div>
      </div>
    </PageLayout>
  );
};

export default NotFound;
