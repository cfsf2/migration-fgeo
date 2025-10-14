import instagram from "../../../assets/images/instagram.png";
import facebook from "../../../assets/images/facebook.png";
import mail from "../../../assets/images/mail.png";

function RedFarmaciasTa() {
  return (
    <>
    <section className="cta-presion mt-5">
      <div className="cta-presion__container">
        {/* Icono */}
        <div className="cta-presion__icon" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 11a8 8 0 0 1 14.32-4.906"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M21 13c0 4.418-3.582 8-8 8-2.761 0-5.2-1.393-6.664-3.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M4 13h3l1.2-2.4L10 15l1.4-2.2H14l1-2h3"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Texto */}
        <div className="cta-presion__text">
          <h3 className="cta-presion__title">
            Red de farmacias validadas para la toma y registro de la presión
            arterial
          </h3>
          <p className="cta-presion__subtitle">
            Encontrá un punto cercano y seguro para tu control.
          </p>
        </div>

        {/* Botón */}
        <div className="cta-presion__actions " align="right">
          <a
            className="btn-cta"
            href="https://adm.cfsf2.org.ar/#/public/PANTALLA_MAPA_PRESION"
            target="_blank"
            rel="noopener"
            aria-label="Abrir mapa de farmacias para control de presión arterial"
          >
            Encontrá tu farmacia más cercana aquí
          </a>

        </div>
      </div>
    </section>
    {/* Redes sociales */}
    <div className="cta-presion__social" role="contentinfo">
      <div className="cta-presion__social-inner">
        <div className="cta-presion__social-icons">
          <a className="social-btn" href="https://www.instagram.com/farmageoapp/" target="_blank" rel="noopener" aria-label="Instagram">
            <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="white" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.8a5.2 5.2 0 1 1 0 10.4 5.2 5.2 0 0 1 0-10.4zm0 2a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4zM18.2 6a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z"/>
            </svg>
          </a>

          <a className="social-btn" href="https://www.facebook.com/farmageoapp" target="_blank" rel="noopener" aria-label="Facebook">
            <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="white" d="M13 22v-7h2.5l.5-3H13V9.5c0-.9.3-1.5 1.6-1.5H16V5.2c-.3 0-1.2-.2-2.3-.2-2.3 0-3.7 1.3-3.7 3.8V12H7v3h3v7h3z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
    </>
  );
}

export default RedFarmaciasTa;
