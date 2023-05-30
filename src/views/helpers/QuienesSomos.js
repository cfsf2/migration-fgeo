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
        <p>
        <br></br>
        <strong>FARMAGEO </strong><a href="https://www.linkedin.com/feed/hashtag/?keywords=farmageoapp&highlightedUpdateUrns=urn%3Ali%3Aactivity%3A6922344962571255808" target="_blank" rel="noreferrer">
        (#farmageoapp)
          </a>, es un desarrollo digital originado en el seno del Colegio de Farmacéuticos de la Provincia de Santa Fe Segunda Circunscripción <a href="https://www.linkedin.com/feed/hashtag/?keywords=cfsf2&highlightedUpdateUrns=urn%3Ali%3Aactivity%3A6922344962571255808" target="_blank" rel="noreferrer">
          (#cfsf2)
          </a>. 
        </p>
        <p>
        NO es una droguería. NO es una distribuidora. NO es una farmacia ni red de farmacias. NO es de un privado. ES del colegio profesional y tiene el aval del mismo.
        </p>
        <p>
          <strong>FARMAGEO </strong>surgió en 2019 y su lanzamiento tuvo lugar en 2020, en el marco de la pandemia causada por el COVID 19, un momento en el cual reunirnos no era la mejor opción y donde la mayoría de las compras se realizaban a través de internet. 
        </p>
        <p>
          <strong>FARMAGEO es la herramienta digital, </strong> gratuita y de libre uso <strong>para todas las farmacias del Colegio de Farmacéuticos de la Provincia de Santa Fe 2da Circunscripción,</strong> permitiendo una igualdad de accesibilidad y así estar posicionados en el nuevo mercado que hoy ya trasciende lo que es el mostrador físico.
        </p>
        <p>
        Desde sus orígenes, el propósito de fue crear un mostrador virtual que permita a las farmacias captar nuevos pacientes/clientes y fidelizar los que ya tienen. Se trata de una herramienta que llegó en el momento oportuno, posibilitando a cada farmacia administrar su mostrador virtual y así brindar una solución.
        </p>
        <p>
          <strong>FARMAGEO, </strong>tiene como finalidad que el paciente/cliente pueda localizar la farmacia más cercana a su ubicación (Geolocalización), establecer un contacto directo y coordinar la compra. Se trata de un desarrollo exclusivo para las farmacias de la segunda circunscripción, en la cual no existen intermediarios en las compras que realice el paciente/cliente ni en las ofertas que se publiquen a través de su panel de herramientas.
        </p>
        <p>
        Brinda excelentes ventajas económicas, ya que las farmacias podrán promocionar los rubros de perfumería, dermocosmética, suplementos nutricionales, marroquinería, regalería, accesorios y otros, estando prohibido la publicidad y venta a medicamentos de todo tipo (Venta Libre y Venta Bajo Receta), y se presenta como un medio de comunicación directo entre las farmacias y el colegio, manteniendo información actualizada, vínculos y un nexo informativo, fortaleciendo de este modo el trabajo que realizamos los farmacéuticos a diario.
        </p>
        <p>
        Concentramos en una plataforma digital distintas herramientas para ayudar al mostrador de nuestras farmacias:
        </p>
        <p>
        - Micrositio web para cada farmacia, con todos los datos de la misma para su geolocalización.<br></br>
        - E-commerce opcional y gratuito para cada farmacia.<br></br>
        - Panel de administración.<br></br>
        - Módulo de Proveeduría, para ofertas de las Droguerías asociadas al sistema.<br></br>
        - Módulo de Transfers, para nivelar las ofertas de los laboratorios hacia todas nuestras farmacias, sin discriminar tamaño, localidad ni ubicación.<br></br>
        - Panel de control de débitos de Pami y del cronograma de pagos de Pami.<br></br>
        - Y otras funciones más.
        </p>
      </div>
    </>
  );
};

export default QuienesSomos;
