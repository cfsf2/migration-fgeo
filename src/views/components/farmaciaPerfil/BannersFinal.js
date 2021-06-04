import grupo505 from "../../../assets/images/Grupo 505.png";
import grupo503 from "../../../assets/images/Grupo 503.png";

function BannersFinal() {
  return (
    <div className="row centrado-2 banners mt-5">
      <div className="col-sm-6">
        <div className="container">
          <div className="row " style={{ backgroundColor: "#DCF9F7" }}>
            <div className="col-sm-6 pt-4 pl-4">
              <p>Descargate la App</p>
              <h3>Tu farmacia digital al alcance de tu mano</h3>
              <small>Enviá tus recetas y pedidos </small>
              <br />
              <small>sin moverte de tu casa.</small>
            </div>
            <div className="col-sm-6" align="center">
              <img src={grupo505} className="w-75 pt-3 pb-0 px-3" />
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-6" align="center">
        <img src={grupo503} className="w-50 pb-5" alt="" />
      </div>
    </div>
  );
}

export default BannersFinal;
