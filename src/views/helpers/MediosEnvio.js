import React from 'react';
import '../../css/terminosycond.css';
import logo from '../../assets/images/Nuevo-Logo-negativo.png';

const MediosEnvio = () => {
  return (
    <>
      <header className="header-style">
        <div className="title">
          <strong>Medios de envio</strong>
        </div>
        <div>
          <img src={logo} alt="logo-farmageo" className="imagen-logo" />
        </div>
      </header>
      <div className="body-text">
        <br></br>
        <p>
        Podes optar por elegir el <strong>retiro</strong> del producto seleccionado en el e-commerce de la FARMACIA o bien el <strong>envío a un domicilio</strong> seleccionado, que puede coincidir o no con el propio o con el que hayas registrado. <strong>Cada farmacia dispondrá de sus formas de entrega.</strong>
        </p>
        <h4>RETIRO EN FARMACIAS</h4>
        <p>
        Cuando selecciones la opción de retiro en FARMACIA, tu compra estará disponible para su retiro una vez confirmada la operación. Contacta con la farmacia para verificar, o bien se te notificara que tu pedido está listo para ser retirado.<br></br>
        El retiro del producto en las FARMACIAS será siempre sin costo.
        </p>
        <h4>ENVÍOS A DOMICILIO</h4>
        <p>
        La forma y costos de los envíos a domicilio serán notificados por cada farmacia en forma particular.<br></br>
        El costo del envío aparecerá claramente expresado durante el proceso de compra y antes de confirmar y realizar el pedido. Al confirmar tu pedido, aceptas los costos de envío estipulados por el servicio de entrega a domicilio de la Farmacia.
        </p>
        <p>
        ¡Importante! Los tiempos de entrega pueden variar en fechas exclusivamente comerciales como: Día del Padre, Hot Sale, Día de la Madre, Cyber Monday, Navidad. En dichas fechas los plazos se pueden ver extendidos.
        </p>

      </div>
    </>
  );
};

export default MediosEnvio;
