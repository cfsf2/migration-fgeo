// src/components/home/RedFarmaciasTA.js
function RedFarmaciasTa() {
  return (
    <section className="cta-presion mt-2">
      <div className="cta-presion__container">
        {/* Icono */}
        <div className="cta-presion__icon" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M3 11a8 8 0 0 1 14.32-4.906" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M21 13c0 4.418-3.582 8-8 8-2.761 0-5.2-1.393-6.664-3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M4 13h3l1.2-2.4L10 15l1.4-2.2H14l1-2h3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Texto */}
        <div className="cta-presion__text">
          <h3 className="cta-presion__title">
            Red de farmacias validadas para la toma y registro de la presión arterial
          </h3>
          <p className="cta-presion__subtitle">
            Encontrá un punto cercano y seguro para tu control.
          </p>
        </div>

        {/* Botón */}
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
    </section>
  );
}

export default RedFarmaciasTa;
