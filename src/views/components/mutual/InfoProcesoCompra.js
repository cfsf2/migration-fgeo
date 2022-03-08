import tel from "../../../assets/images/tel2.png";
import icono4 from "../../../assets/images/farm2.png";
import icono5 from "../../../assets/images/bancarios.png";
import icono6 from "../../../assets/images/wapp2.png";

function InfoProcesoCompra() {
  return (
    <div
      className="row pt-4 bg-claro centrado-2"
      align="left"
      id="info-proceso"
    >
      <div className="col-sm-3 py-4 mt-2">
        <div className="row">
          <div className="col-4 px-2">
            <img src={icono4} className="p-2 " />
          </div>
          <div className="col pt-3 pl-0">
            <b>Retiro gratis</b> <p>en nuestras sucursales</p>
          </div>
        </div>
      </div>
      <div className="col-sm-3 py-4 mt-2">
        <div className="row">
          <div className="col-4 px-1">
            <img src={icono5} />
          </div>
          <div className="col pt-3 pl-1">
            <b>Promociones bancarias</b> <p>y medios de pago</p>
          </div>
        </div>
      </div>
      <div className="col-sm-3 py-4 mt-2">
        <div className="row">
          <div className="col-4 px-1">
            <img src={tel} className="p-2" />
          </div>
          <div className="col pt-3 pl-0">
            <b>Atención al cliente</b> 0341-2432522
          </div>
        </div>
      </div>
      <div className="col-sm-3 py-4 mt-2">
        <div className="row">
          <div className="col-4 px-1">
            <img src={icono6} className="px-2 pt-3" />
          </div>
          <div className="col pt-3 pl-0">
            <b>Whatsapp/ Ventas</b> +543412283167
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoProcesoCompra;
