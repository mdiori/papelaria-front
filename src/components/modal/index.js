const Modal = ({ sale_id, show, close }) => {
  return (
    <>
      <div className={`modal ${show ? "" : "hidden"}`}>
        <div className="modal-box relative rounded-sm">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg">Remover Venda</h3>
          <p className="py-4">Deseja remover esta venda?</p>
          <div className="flex">
            <div className="modal-action flex-1">
              <label htmlFor="my-modal" className="btn btn-outline">
                Não
              </label>
            </div>
            <div className="modal-action flex-none ml-3">
              <label onClick={() => console.log("delete")} className="btn">
                Sim
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
