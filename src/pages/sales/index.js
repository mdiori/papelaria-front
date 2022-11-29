import { useEffect, useState } from "react";
import api from "../../services/api";
import PageLayout from "../../components/page-layout";
import SalesTable from "./components/sales-table";

const Sales = () => {
  const [loading, setLoading] = useState(true);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    getSales();
  }, []);

  const getSales = () => {
    api
      .get("/sale/")
      .then((response) => {
        setSales(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <PageLayout title="Vendas">
      {loading ? (
        <div class="flex h-screen">
          <div class="mx-auto mt-44">
            <h3 className="text-4xl text-appgreen">Carregando...</h3>
          </div>
        </div>
      ) : (
        <div className="flex flex-col ">
          <div className="navbar flex-col">
            <div className="w-full">
              <div className="flex-1">
                <h1 className="text-4xl text-appgreen">Vendas Realizadas</h1>
              </div>

              <div className="ml-3 flex-none">
                <label className="btn rounded-sm bg-appgreen">
                  Inserir nova Venda
                </label>
              </div>
            </div>
          </div>

          <div className="max-h-[70vh] overflow-scroll mt-8">
            <SalesTable sales={sales} />
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default Sales;
