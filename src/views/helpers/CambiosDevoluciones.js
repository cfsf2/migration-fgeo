import React from 'react';
import '../../css/terminosycond.css';
import logo from '../../assets/images/Nuevo-Logo-negativo.png';

const CambiosDevoluciones = () => {
  return (
    <>
      <header className="header-style">
        <div className="title">
          <strong>Cambios y devoluciones</strong>
        </div>
        <div>
          <img src={logo} alt="logo-farmageo" className="imagen-logo" />
        </div>
      </header>
      <div className="body-text">
        <br></br>
        <h3>Devoluciones Y Reembolsos</h3><br></br>
        <p>
        POLÍTICA DE CAMBIO Y DEVOLUCIÓN DE MERCADERÍA
        </p>
        <p>
        El reemplazo o cambio de la mercadería será motivada por fallas o defectos de fabricación, clasificación, empaque o por falta de identidad entre lo adquirido y lo recibido. El Usuario dispondrá de un plazo máximo de diez (10) días para efectuar el cambio. Este plazo comenzará a computarse desde el momento de la entrega al destinatario final en su domicilio o desde el retiro en la farmacia, según corresponda.
        </p>
        <p>
        PARA REALIZAR UN CAMBIO LOS PRODUCTOS DEBERÁN CUMPLIR LAS SIGUIENTES CONDICIONES:
        </p>
        <p>
        <strong>A) Encontrarse en perfectas condiciones y no pueden haber sido utilizados.</strong>
        </p>
        <p>
        <strong>B) Deberá conservar todas sus insignias y etiquetas identificadoras colocadas sin que presenten signos de rotura o destrucción.</strong>
        </p>
        <p>
        <strong>C) Deberá conservar el envoltorio original sin roturas o signos de apertura.</strong>
        </p>
        <p>
        <strong>D) Deberá presentar la factura de la compra.</strong>
        </p>
       
      </div>
    </>
  );
};

export default CambiosDevoluciones;
