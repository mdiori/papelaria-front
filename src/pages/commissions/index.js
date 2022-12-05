import Datepicker from "../../components/datepicker";
import { useState } from "react";
import PageLayout from "../../components/page-layout";
import { Search } from "../../utils/icons";
import api from "../../services/api";
import messages from "../../misc/messages";
import * as fireToast from "../../utils/fire-toast";
import CommissionsTable from "./components/commissions-table";

const Commissions = () => {
  const [loading, setLoading] = useState(false);
  const [initialDate, setInitialDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [sales, setSales] = useState([]);
  const [informationalText, setInformationalText] = useState(
    "Para visualizar o relatório, selecione um período nos campos acima."
  );

  const getSales = () => {
    let initial_date = new Date(initialDate).toISOString();
    let end_date = new Date(endDate).toISOString();
    setLoading(true);
    api
      .get(`/sale/?initial_date=${initial_date}&end_date=${end_date}`)
      .then((response) => {
        setSales(response.data.results);
        setLoading(false);
        setInformationalText("Nenhum dado encontrado nesse período.");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (initialDate && endDate) {
      getSales();
    } else {
      fireToast.error(messages.form.error.select_initial_and_end_date);
    }
    return;
  };

  return (
    <PageLayout title="Comissões">
      <div className="flex flex-col ">
        <div className="navbar flex-col">
          <div className="w-full">
            <div className="flex-1">
              <h1 className="text-2xl text-appgreen">
                Relatório de Commissões
              </h1>
            </div>

            <form onSubmit={(e) => handleSearch(e)} className="flex-none flex">
              <div className="flex-none">
                <Datepicker
                  label="Período de Início"
                  value={initialDate}
                  onChange={(val) => {
                    setInitialDate(val);
                  }}
                />
              </div>
              <div className="flex-none ml-3">
                <Datepicker
                  label="Período de Fim"
                  value={endDate}
                  onChange={(val) => {
                    setEndDate(val);
                  }}
                />
              </div>
              <div className="flex-none ml-3 m-auto">
                <button className="btn rounded-sm bg-appgreen" type="submit">
                  <Search />
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="max-h-[70vh] overflow-scroll mt-8">
          {loading ? (
            <div className="flex">
              <div className="mx-auto mt-44">
                <h3 className="text-4xl text-appgreen">Carregando...</h3>
              </div>
            </div>
          ) : sales.length > 0 ? (
            <CommissionsTable sales={sales} />
          ) : (
            <div className="flex">
              <div className="mx-auto mt-44">
                <h3 className=" text-appgreen">{informationalText}</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Commissions;
