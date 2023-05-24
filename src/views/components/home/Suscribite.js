import instagram from "../../../assets/images/instagram.png";
import facebook from "../../../assets/images/facebook.png";
import mail from "../../../assets/images/mail.png";

function Suscribite() {
  return (
    <div className="row suscribite py-4 centrado">
      <div className="col-sm-4">
        <div className="container">
          <div className="row">
            <div className="col-2">
              <img alt="" src={mail} />
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
      <div className="col-sm-4 mb-3 mt-1" align="center">
        <button
          type="button"
          className="btn-sm btn-info w-100"
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

      <div className="col-sm-4" align="right">
        <a
          href="https://www.instagram.com/farmageoapp/"
          target="_blank"
          rel="noopener"
        >
          <img alt="" src={instagram} className="icons-md" />
        </a>
        <a
          href="https://www.facebook.com/farmageoapp"
          target="_blank"
          rel="noopener"
        >
          <img alt="" src={facebook} className="icons-md mx-3" />
        </a>
      </div>
    </div>
  );
}

export default Suscribite;
