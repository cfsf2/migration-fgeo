function FooterHome() {

    const fecha = new Date();
    const ano = fecha.getFullYear();

    return (
        <footer>
            <div className="container-fluid">
                <div className="row centrado-2" align="left">
                    <div className="col-md-3 col-6 pt-5">
                        <b>Nosotros</b>
                        <a href="https://www.farmageo.com.ar/novedades/nuestro-equipo/" target="_blank" rel="noopener">Quienes somos</a>
                        <a href="https://www.farmageo.com.ar/novedades/medios-de-pago/">Medios de pago</a>
                        <a href="https://www.farmageo.com.ar/novedades/medios-de-envio/">Medios de envio</a>
                    </div>
                    <div className="col-md-3 col-6 pt-5">
                        <b>Ayuda</b>
                        <a href="https://www.farmageo.com.ar/novedades/preguntas-frecuentes/">Preguntas frecuentes</a>
                        <a href="https://www.farmageo.com.ar/novedades/cambios-y-devoluciones/">Cambios y devoluciones</a>
                        <a href="https://www.farmageo.com.ar/novedades/terminos-y-condiciones/">Términos y condiciones</a>
                    </div>
                    <div className="col-md-3 col-6 pt-5">
                        <b>Contacto</b>
                        <a href="mailto:soporte@farmageo.com.ar">soporte@farmageo.com.ar</a>
            Buenos aires 1262, Rosario
          </div>
                    <div className="col-md-3 col-6 pt-5">
                        <b>Compra 100% segura</b>
                        <p>Farmageo garantiza la seguridad transaccional de sus clientes</p>
                    </div>
                </div>
                <div className="row centrado-2" align="left">
                    <div
                        className="col-sm-12 py-4 mt-5"
                        style={{ borderTop: "solid 1px #0000000f", fontWeight: 600 }}
                    >
                        &copy; Copyright {ano} - Desarrollo por Departamento de desarrollo y tecnología / AxyomaGlobal
          </div>
                </div>
            </div>
        </footer>
    );
}

export default FooterHome;
