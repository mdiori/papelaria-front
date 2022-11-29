import { useEffect, useState } from "react";
import PageLayout from "../../../components/page-layout";
import { useLocation } from "react-router-dom";
import formatMoney from "../../../utils/format-money";

const SaleConfiguration = () => {
  const location = useLocation();
  const { sale, index } = location.state;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sale) {
      fillForm();
    }
    setLoading(false);
  }, [sale]);

  const fillForm = () => {};

  return (
    <PageLayout
      title={`${sale ? `Alterar Venda - N° ${index + 1}` : "Nova Venda"}`}
    >
      {loading ? (
        <div className="flex h-screen">
          <div className="mx-auto mt-44">
            <h3 className="text-4xl text-appgreen">Carregando...</h3>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3">
          <div className="col-span-2">
            <div className="flex flex-row ">
              <div className="basis-auto">
                <h1 className="text-3xl">Produtos</h1>
              </div>
            </div>
            <div className="grid grid-cols-5 pt-8">
              <div className="col-span-3 mr-8">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-xl">
                      Buscar pelo código de barras ou descrição
                    </span>
                  </label>
                  <input
                    className="input input-bordered w-full rounded-sm h-16 text-xl"
                    type="text"
                    placeholder="Digite o código ou nome do produto"
                  />
                </div>
              </div>
              <div className="col-span-1 mr-8">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-xl">
                      Quantidade de itens
                    </span>
                  </label>
                  <input
                    className="input input-bordered w-full rounded-sm h-16 text-xl"
                    type="text"
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="col-span-1 my-auto mt-11">
                <label className="btn rounded-sm bg-appgreen h-16 w-40">
                  Adicionar
                </label>
              </div>
            </div>

            <div className="flex flex-col mt-24">
              <table>
                <thead>
                  <tr>
                    <th>Produtos/Servicos</th>
                    <th>Quantidade</th>
                    <th>Preco unitario</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>

          <div className="col-span-1">
            <div className="flex flex-row">
              <div className="basis-auto">
                <h1 className="text-3xl ml-8">Dados da venda</h1>
              </div>
            </div>

            <div className="flex flex-col mt-8">
              <div className="border-l-2 border-appgray h-[45vw]">
                <div className="ml-8">
                  <div className="flex flex-row">
                    <div className="w-full">
                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text text-xl">
                            Data e Hora da Venda
                          </span>
                        </label>
                        <input
                          className="input input-bordered w-full rounded-sm h-16 text-xl"
                          type="text"
                          placeholder="Erro"
                          disabled
                        />
                      </div>
                      <div className="form-control w-full pt-12">
                        <label className="label">
                          <span className="label-text text-xl">
                            Escolha um vendedor
                          </span>
                        </label>
                        <input
                          className="input input-bordered w-full rounded-sm h-16 text-xl"
                          type="text"
                          placeholder="Selecione o nome"
                        />
                      </div>
                      <div className="form-control w-full pt-12">
                        <label className="label">
                          <span className="label-text text-xl">
                            Escolha um cliente
                          </span>
                        </label>
                        <input
                          className="input input-bordered w-full rounded-sm h-16 text-xl"
                          type="text"
                          placeholder="Selecione o nome"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-28">
                    <div className="grid grid-cols-8">
                      <div className="col-span-4 text-xl font-bold">
                        <h1>Valor total da venda:</h1>
                      </div>
                      <div className="col-start-6 col-span-2 text-3xl font-extrabold">
                        <h1>{formatMoney(1000)}</h1>
                      </div>
                    </div>

                    <div className="grid grid-cols-8 mt-24">
                      <div className="col-start-1 col-span-2">
                        <label className="btn rounded-sm bg-appgreen h-16 w-40">
                          Cancelar
                        </label>
                      </div>
                      <div className="col-start-6 col-span-2">
                        <label className="btn rounded-sm bg-appgreen h-16 w-40 text-xl">
                          Finalizar
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default SaleConfiguration;
