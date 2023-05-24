import React from 'react';
import '../../css/terminosycond.css';
import logo from '../../assets/images/Nuevo-Logo-negativo.png';

const QuienesSomos = () => {
  return (
    <>
      <header className="header-style">
        <div className="title">
          <strong>Quienes Somos</strong>
        </div>
        <div>
          <img src={logo} alt="logo-farmageo" className="imagen-logo" />
        </div>
      </header>
      <div className="body-text">
        <h3>En desarrollo</h3>
       
      </div>
    </>
  );
};

export default QuienesSomos;
