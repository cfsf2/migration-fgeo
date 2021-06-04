import { image_path_server } from "../../../../config";

function SliderBannersPromocionesFarmacia(props) {
  const { productos } = props;
  return (
    <div id="slider-home" className="carousel slide p-1" data-ride="carousel">
      <div className="carousel-inner">
        <div className={"carousel-item active"}>
          <div className="mt-2 rounded ">
            <img
              src={image_path_server + "farmacias/1615324318289-lg.jpg"}
              alt=""
              className="descuento-banner"
            />
          </div>
        </div>
        {productos
          ? productos
              .filter((p) => {
                return p.esPromocion;
              })
              .map((p, i) => {
                return (
                  <div className={"carousel-item"} key={i}>
                    <div className="mt-2 rounded ">
                      <img
                        src={image_path_server + p.imagen}
                        alt=""
                        className="descuento-banner"
                      />
                    </div>
                  </div>
                );
              })
          : null}
      </div>
      <ol className="carousel-indicators">
        <li data-target="#slider-home" data-slide-to={0}></li>
        {productos
          ? productos
              .filter((p) => {
                return p.esPromocion;
              })
              .map((p, i) => {
                return (
                  <li
                    data-target="#slider-home"
                    data-slide-to={i + 1}
                    key={i + 1}
                  ></li>
                );
              })
          : null}
      </ol>
    </div>
  );
}

export default SliderBannersPromocionesFarmacia;
