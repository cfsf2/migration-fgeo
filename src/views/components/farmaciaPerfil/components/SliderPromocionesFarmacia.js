import ofertaicon from "../../../../assets/images/oferta-icon.png";

function SliderPromocionesFarmacia(props) {
  const { productos } = props;
  return (
    <div id="slider-promo" className="carousel slide" data-ride="carousel">
      <img src={ofertaicon} className="icon-oferta" alt="" />
      <div className="carousel-inner">
        {productos
          ? productos
              .filter((p) => {
                return p.favorito;
              })
              .map((p, i) => {
                return (
                  <div
                    className={
                      i === 0 ? "carousel-item active" : "carousel-item"
                    }
                    key={i}
                  >
                    <div className="bg-claro mt-2 pl-4 pb-2 rounded">
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col">
                            <h3>{p.nombre}</h3>
                            <p></p>
                            <p></p>
                          </div>
                          <div className="col pt-4">
                            <div className="p-2 line-left">
                              <p id="precio">${p.precio}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
          : null}
      </div>
      <ol className="carousel-indicators">
        {productos
          ? productos
              .filter((p) => {
                return p.favorito;
              })
              .map((p, i) => {
                return (
                  <li
                    data-target="#slider-promo"
                    data-slide-to={i}
                    className={i === 0 ? "active" : ""}
                    key={i}
                  ></li>
                );
              })
          : null}
      </ol>
    </div>
  );
}

export default SliderPromocionesFarmacia;
