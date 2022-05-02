import grupo2 from "../../../../assets/images/Grupo 2.png";

function BannerFarmaciasCercanas() {
  return (
    <div className="row centrado-2 mt-5" id="cercanas-y-de-turno-banner">
      {/*<div
        className="col-md-4 p-4 rounded-left"
        style={{ backgroundColor: "#d1ebf052" }}
      >
        <img alt="" src={grupo2} style={{ width: "3em" }} />
      </div>*/}
      <div
        className="col-md-12"
        style={{ backgroundColor: "#d1ebf052" }}
        align="center"
      >
        <h1>
          SOY UN TITULO <b>CERCANO</b>
        </h1>
        <p>Elegí tu farmacia para acceder a su tienda online</p>
      </div>
      <div
        className="col-md rounded-right"
        style={{ backgroundColor: "#d1ebf052" }}
      ></div>
    </div>
  );
}

export default BannerFarmaciasCercanas;
