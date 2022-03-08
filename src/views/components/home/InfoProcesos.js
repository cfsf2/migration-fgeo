import icono4 from "../../../assets/images/icono4.png";
import icono5 from "../../../assets/images/icono5.png";
import icono3 from "../../../assets/images/icono3.png";
import icono6 from "../../../assets/images/icono6.png";

function InfoProcesos() {
  return (
    <div
      className="row pt-4 bg-claro centrado-2"
      align="left"
      id="info-proceso"
    >
      <div className="col-md-3 col-6 py-4 mt-2 mobile-py-1">
        <div className="row">
          <div className="col-sm-4 px-2">
            <img alt="" src={icono4} className="p-2" />
          </div>
          <div className="col-sm pt-3 pl-0 mobile-py-1">
            <b>Encontrá</b> tu farmacia más cercana
          </div>
        </div>
      </div>
      <div className="col-md-3 col-6 py-4 mt-2 mobile-py-1">
        <div className="row">
          <div className="col-sm-4 px-1">
            <img alt="" src={icono5} />
          </div>
          <div className="col-sm pt-3 pl-1 mobile-py-1">
            <b>Enviá</b> tus recetas o comprá tu producto
          </div>
        </div>
      </div>
      <div className="col-md-3 py-4 mt-2 hide-mobile">
        <div className="row">
          <div className="col-4 px-1">
            <img alt="" src={icono3} className="p-2" />
          </div>
          <div className="col pt-3 pl-0">
            <b>Hablá</b> con un profesional al instante
          </div>
        </div>
      </div>
      <div className="col-md-3 py-4 mt-2 hide-mobile">
        <div className="row">
          <div className="col-4 px-1">
            <img alt="" src={icono6} className="px-2 pt-3" />
          </div>
          <div className="col pt-3 pl-0">
            <b>Te lo llevamos</b> a tu casa
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoProcesos;
