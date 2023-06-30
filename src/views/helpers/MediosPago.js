import React from 'react';
import '../../css/terminosycond.css';
import logo from '../../assets/images/Nuevo-Logo-negativo.png';
import MediosPagoImg from '../../assets/images/MediosPago-img.png';
import MediosPagoImg1 from '../../assets/images/MediosPago-img1.png';


const MediosPago = () => {
  return (
    <>
      <header className="header-style">
        <div className="title">
          <strong>Medios de pago</strong>
        </div>
        <div>
          <img src={logo} alt="logo-farmageo" className="imagen-logo" />
        </div>
      </header>
      <div className="body-text">
        <br></br>
        <h3>MEDIOS DE PAGO</h3>
        <p>
        <br></br>
        Podés concretar el pago de tus compras en las farmacias con los medios de pagos aceptados por cada una. Hay que consultar en tú farmacia amiga que tarjetas de débito y/o crédito aceptan, como también otros medios digitales: Mercadopago, Billetera Santa Fe, Plus Pagos, MODO, etc.
        </p>
        <p>
        No te olvides de los descuentos, beneficios y financiación a los cuales podés acceder combinando los medios de pago con tus bancos preferidos.
        </p>
        <img src={MediosPagoImg} alt="logo-tarjetas"/>
        <br></br>
        <br></br>
        <img src={MediosPagoImg1} alt="logo-tarjetas1" />
       
      </div>
    </>
  );
};

export default MediosPago;