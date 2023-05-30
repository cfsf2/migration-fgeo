import { Link } from 'react-router-dom';

function FooterHome() {
  const fecha = new Date();
  const ano = fecha.getFullYear();

  return (
    <footer>
      <div className="container-fluid">
        <div className="row centrado-2" align="left">
          <div className="col-md-3 col-6 pt-5">
            <b>Nosotros</b>
            {/* <a
              href="https://www.farmageo.com.ar/novedades/nuestro-equipo/"
              target="_blank"
              rel="noopener"
            >
              Quienes somos
            </a> */}
            <Link to="/quienes-somos" target="_self" rel="noopener noreferrer">
                        Quienes somos</Link>
            {/* <a href="https://www.farmageo.com.ar/novedades/medios-de-pago/">
              Medios de pago
            </a> */}
            <Link to="/medios-pago" target="_self" rel="noopener noreferrer">
                        Medios de pago</Link>
            {/* <a href="https://www.farmageo.com.ar/novedades/medios-de-envio/">
              Medios de envio
            </a> */}
            <Link to="/medios-envio" target="_self" rel="noopener noreferrer">
                        Medios de envio</Link>
          </div>
          <div className="col-md-3 col-6 pt-5">
          <b>Ayuda</b>
            {/* <a href="https://www.farmageo.com.ar/novedades/preguntas-frecuentes/">
              Preguntas frecuentes
            </a> */}
              <Link to="/cambios-devoluciones" target="_self" rel="noopener noreferrer">
                         Cambios y devoluciones</Link>
            {/* <a href="https://www.farmageo.com.ar/novedades/cambios-y-devoluciones/">
              Cambios y devoluciones
            </a> */}
            <Link to="/preguntas-frecuentes" target="_self" rel="noopener noreferrer">
                         Preguntas frecuentes</Link>
            <Link
              to={{
                pathname: '/novedades/terminos-y-condiciones/',
              }}
              style={{ fontSize: "1rem" }}
              target="_self"
            >
              Términos y condiciones
            </Link>
          </div>
          <div className="col-md-3 col-6 pt-5">
            <b>Contacto</b>
            <a href="mailto:soportefarmageo@cfsf2.org.ar">soportefarmageo@cfsf2.org.ar</a>
              <a
                target="_self"
                href="https://www.google.com/maps/place/Buenos+Aires+1262,+S2000+Rosario,+Santa+Fe/data=!4m2!3m1!1s0x95b7ab04a721ba5d:0x1080c44b44f427bf?sa=X&ved=2ahUKEwi36ryKmczxAhXnqJUCHdvjCToQ8gEwAHoECAYQAQ"
              >
                Buenos aires 1262, Rosario
              </a>
              <a
                href="https://wa.me/543412104056"
                target="_self"
                rel="noopener noreferrer"
              >
                <p>341 2104056</p>
                </a>
          </div>
          <div className="col-md-3 col-6 pt-5">
            <b>Compra 100% segura</b>
            <p>Farmageo garantiza la seguridad transaccional de sus clientes</p>
          </div>
        </div>
        <div className="row centrado-2" align="left">
          <div
            className="col-sm-12 py-4 mt-5"
            style={{ borderTop: 'solid 1px #0000000f', fontWeight: 600 }}
          >
            &copy; Copyright {ano} - Desarrollo por Departamento de desarrollo y
            tecnología / Cfsf2
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterHome;
