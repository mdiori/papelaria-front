import { useEffect, useState } from "react";
import api from "../../services/api";
import PageLayout from "../../components/page-layout";
import SalesTable from "./components/sales-table";

const Sales = () => {
  const [loading, setLoading] = useState(false);
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
    <PageLayout>
      {!loading && (
        <>
          <div className="navbar flex-col">
            <div className="w-full">
              <div className="flex-1">
                <h1 className="text-4xl">Vendas Realizadas</h1>
              </div>

              <div className="flex-none">
                <input
                  type="text"
                  placeholder="Pesquisar"
                  className="input input-bordered input-primary"
                />
              </div>

              <div className="ml-3 flex-none">
                <label
                  htmlFor="my-modal-3"
                  className="btn btn-primary modal-button"
                >
                  Inserir nova Venda
                </label>
              </div>
            </div>
          </div>

          <SalesTable sales={sales} />
        </>
      )}
    </PageLayout>
  );
};

export default Sales;
