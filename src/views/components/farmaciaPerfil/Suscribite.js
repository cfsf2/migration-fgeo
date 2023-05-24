import mail from "../../../assets/images/mail.png";
import instagram from "../../../assets/images/instagram.png";
import facebook from "../../../assets/images/facebook.png";

function Suscribite() {
  return (
    <div className="row mt-5 suscribite py-5">
      <div className="col-md-3"></div>
      <div className="col-md-3">
        <div className="container">
          <div className="row">
            <div className="col-2">
              <img src={mail} />
            </div>
            <div className="col">
              <div align="left">
                <p>
                  <b>Suscribite al Newsletter</b>
                </p>
                <p>para recibir nuestras ofertas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-3" align="center">
        <button
          type="button"
          className="btn btn-light w-100"
        >
          Suscripción (próximamente)
        </button>
        <div
          className="modal fade"
          id="newsletter-modal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header" style={{ border: "none" }}>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <iframe
                  src="https://admin.farmageo.com.ar/newsletter.html"
                  style={{ width: "100%", height: "70vh", borderWidth: 0 }}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-3" align="center">
        <img src={instagram} className="icons-md " />
        <img src={facebook} className="icons-md mx-3" />
      </div>
    </div>
  );
}

export default Suscribite;
