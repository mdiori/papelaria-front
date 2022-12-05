import { useEffect, useMemo, useState } from "react";
import PageLayout from "../../../components/page-layout";
import { useLocation } from "react-router-dom";
import formatMoney from "../../../utils/format-money";
import formatDate from "../../../utils/format-date";
import debounce from "../../../utils/debounce";
import api from "../../../services/api";
import { Link } from "react-router-dom";
import * as fireToast from "../../../utils/fire-toast";
import messages from "../../../misc/messages";
import getRandomInteger from "../../../utils/get-random-integer";
import { useNavigate } from "react-router-dom";
import { Trash } from "../../../utils/icons";
import Select from "../../../components/select";

const SaleConfiguration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sale } = location.state;
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [loading, setLoading] = useState(true);
  const [productsListed, setProductsListed] = useState([]);
  const [saleProductToDelete, setSaleProductToDelete] = useState([]);
  const [saleTime, setSaleTime] = useState(formatDate(new Date()));

  const removeProductFromListing = (index) => {
    let copyProductsListed = [...productsListed];
    let removedSaleProduct = copyProductsListed.splice(index, 1);

    if (removedSaleProduct[0]?.sale_product_id) {
      setSaleProductToDelete([...saleProductToDelete, removedSaleProduct[0]]);
    }
    return setProductsListed(copyProductsListed);
  };

  const renderProductsList = () => {
    const productRows = productsListed?.map((prd, index) => {
      const { id, code, name, value, quantity } = prd;
      return (
        <tr key={id}>
          <td>{`${code} - ${name}`}</td>
          <td>{quantity}</td>
          <td>{formatMoney(value)}</td>
          <td>{formatMoney(quantity * value)}</td>
          <td>
            <button
              className="col-span-3"
              onClick={() => removeProductFromListing(index)}
            >
              <Trash />
            </button>
          </td>
        </tr>
      );
    });

    return productRows ? <tbody>{productRows}</tbody> : <tbody></tbody>;
  };

  const calculateSaleTotal = useMemo(() => {
    let saleTotalValue = 0;
    productsListed.forEach((el) => {
      saleTotalValue += el.value * el.quantity;
    });
    return saleTotalValue;
  }, [productsListed]);

  const addProductToListing = (product, quantity) => {
    const { value } = product;

    quantity = parseInt(quantity);

    const productIndex = productsListed.findIndex(
      (prod) => prod.id === value.id
    );

    if (productIndex < 0) {
      return setProductsListed([
        ...productsListed,
        {
          id: value.id,
          code: value.code,
          name: value.name,
          value: value.value,
          quantity,
        },
      ]);
    }

    let copyProductedsListed = [...productsListed];
    copyProductedsListed[productIndex].quantity += quantity;

    return setProductsListed(copyProductedsListed);
  };

  const handleAddProducts = (e) => {
    e.preventDefault();
    const { product, quantity } = e.target.elements;

    if (product.value && quantity.value) {
      addProductToListing(selectedProduct, quantity.value);
    } else {
      fireToast.error(messages.form.error.select_product_and_quantity);
      return;
    }
  };

  const deleteInMemorySaleProducts = () => {
    saleProductToDelete.forEach((el) => {
      if (!productsListed.find((prodListed) => prodListed.id === el.id)) {
        api.delete(`/sale/${sale.id}/product/${el.id}/`).catch((error) => {
          console.log(error);
        });
      }
    });
    return;
  };

  const editSale = (employee, client) => {
    const submitData = {
      employee,
      client,
      productsListed,
      sale,
    };

    if (saleProductToDelete.length > 0) {
      deleteInMemorySaleProducts();
    }

    api
      .put(`/sale/${sale.id}/`, submitData)
      .then((response) => {
        if (response.status === 204) {
          fireToast.success(messages.form.success.sale_edition);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        fireToast.error(messages.form.error.sale_edition);
      });
  };

  const addSale = (employee, client) => {
    const submitData = {
      employee,
      client,
      invoice: getRandomInteger(0, 10000),
      productsListed,
    };

    api
      .post("/sale/", submitData)
      .then((response) => {
        if (response.status === 201) {
          fireToast.success(messages.form.success.sale_creation);
          navigate("/");
        }
      })
      .catch(() => {
        fireToast.error(messages.form.error.sale_creation);
      });
  };

  const handleSubmitSale = (e) => {
    e.preventDefault();
    const { employee, client } = e.target.elements;

    if (employee.value && client.value) {
      if (productsListed.length <= 0) {
        fireToast.error(messages.form.error.add_at_least_one_product);
        return;
      }
    } else {
      fireToast.error(messages.form.error.select_employee_and_client);
      return;
    }

    if (sale) {
      editSale(employee.value, client.value);
      return;
    }

    addSale(employee.value, client.value);
  };

  const treatProductData = (data) => {
    return data.map((dt) => {
      const { id, code, name, value } = dt;

      return { label: `${code} - ${name}`, value: { id, name, code, value } };
    });
  };

  const treatData = (data) => {
    return data.map((dt) => {
      return { label: dt.name, value: dt.id };
    });
  };

  const fillForm = () => {
    const { client, employee, sale_products } = sale;
    setSelectedClient({ label: client.name, value: client.id });
    setSelectedEmployee({ label: employee.name, value: employee.id });
    setSaleTime(formatDate(sale.date));

    let sale_prod = [];
    sale_products.forEach((prod) => {
      const { id, product, quantity } = prod;

      sale_prod.push({
        id: product.id,
        code: product.code,
        name: product.name,
        value: product.value,
        quantity,
        sale_product_id: id,
      });
    });

    setProductsListed(sale_prod);
  };

  const getEmployees = (value) => {
    api
      .get(`/employee/?name=${value}&active=True`)
      .then((response) => {
        const treatedEmployees = treatData(response.data.results);
        setEmployees(treatedEmployees);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getClients = (value) => {
    api
      .get(`/client/?name=${value}&active=True`)
      .then((response) => {
        const treatedClients = treatData(response.data.results);
        setClients(treatedClients);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getProducts = (value) => {
    api
      .get(`/product/?description=${value}&code=${value}`)
      .then((response) => {
        const treatedProducts = treatProductData(response.data);
        setProducts(treatedProducts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const debouncedEmployeeSearch = debounce(getEmployees, 450);
  const debouncedClientSearch = debounce(getClients, 450);
  const debouncedProductSearch = debounce(getProducts, 450);

  useEffect(() => {
    if (sale) {
      fillForm();
    }
    getEmployees("");
    getClients("");
    getProducts("");
    setLoading(false);
  }, []);

  return (
    <PageLayout
      title={`${sale ? `Alterar Venda - N° ${sale.id}` : "Nova Venda"}`}
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
            <div>
              <form
                onSubmit={(e) => handleAddProducts(e)}
                className="grid grid-cols-5 pt-8"
              >
                <div className="col-span-3 mr-8">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-xl">
                        Buscar pelo código de barras ou descrição
                      </span>
                    </label>
                    <Select
                      name="product"
                      placeholder="Selecione o nome"
                      options={products}
                      onInputChange={debouncedProductSearch}
                      onChange={(event) => setSelectedProduct(event)}
                      noOptionsMessage={() => "Nenhum produto encontrado"}
                      value={selectedProduct}
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
                      id="qunatity"
                      name="quantity"
                      className="input input-bordered w-full rounded-sm h-16 text-xl"
                      type="number"
                      placeholder="0"
                      min="1"
                    />
                  </div>
                </div>
                <div className="col-span-1 my-auto mt-11">
                  <button
                    className="btn rounded-sm bg-appgreen h-16 w-40"
                    button="submit"
                  >
                    Adicionar
                  </button>
                </div>
              </form>
            </div>

            <div className="flex flex-col mt-24">
              <table>
                <thead>
                  <tr>
                    <th>Produtos/Serviços</th>
                    <th>Quantidade</th>
                    <th>Preço unitário</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                {renderProductsList()}
              </table>
            </div>
          </div>

          <div className="col-span-1">
            <div className="flex flex-row">
              <div className="basis-auto">
                <h1 className="text-3xl ml-8">Dados da venda</h1>
              </div>
            </div>

            <form
              className="flex flex-col mt-8"
              onSubmit={(e) => handleSubmitSale(e)}
            >
              <div className="border-l-2 border-appgray h-[45vw]">
                <div className="flex flex-col">
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
                            placeholder="Data e hora"
                            disabled
                            value={saleTime}
                          />
                        </div>
                        <div className="form-control w-full pt-12">
                          <label className="label">
                            <span className="label-text text-xl">
                              Escolha um vendedor
                            </span>
                          </label>
                          <Select
                            name="employee"
                            placeholder="Selecione o nome"
                            options={employees}
                            onInputChange={debouncedEmployeeSearch}
                            onChange={(event) => setSelectedEmployee(event)}
                            noOptionsMessage={() =>
                              "Nenhum vendedor encontrado"
                            }
                            value={selectedEmployee}
                          />
                        </div>
                        <div className="form-control w-full pt-12">
                          <label className="label">
                            <span className="label-text text-xl">
                              Escolha um cliente
                            </span>
                          </label>
                          <Select
                            name="client"
                            placeholder="Selecione o nome"
                            options={clients}
                            onInputChange={debouncedClientSearch}
                            onChange={(event) => setSelectedClient(event)}
                            noOptionsMessage={() => "Nenhum cliente encontrado"}
                            value={selectedClient}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ml-8 mb-20 mr-10 mt-auto w-full absolute bottom-0">
                  <div className="grid grid-cols-8 w-[30%]">
                    <div className="col-span-4 text-xl font-bold">
                      <h1>Valor total da venda:</h1>
                    </div>
                    <div className="col-start-6 col-span-3 text-3xl font-extrabold">
                      <h1>{formatMoney(calculateSaleTotal)}</h1>
                    </div>
                  </div>

                  <div className="flex justify-between pt-10  w-[30%]">
                    <Link to="/">
                      <button
                        className="btn rounded-sm bg-appgreen h-14 w-40"
                        type="button"
                      >
                        Cancelar
                      </button>
                    </Link>

                    <button
                      className="btn rounded-sm bg-appgreen h-14 w-40 text-xl"
                      type="submit"
                    >
                      Finalizar
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default SaleConfiguration;
