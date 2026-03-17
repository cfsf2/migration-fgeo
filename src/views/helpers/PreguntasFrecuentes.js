import React from 'react';
import '../../css/terminosycond.css';
import logo from '../../assets/images/Nuevo-Logo-negativo.png';

const PreguntasFrecuentes = () => {
  return (
    <>
      <header className="header-style">
        <div className="title">
          <strong>Preguntas frecuentes</strong>
        </div>
        <div>
          <img src={logo} alt="logo-farmageo" className="imagen-logo" />
        </div>
      </header>
      <div className="body-text">
        <br></br>
        <h4>1. Qué es FARMAGEO?</h4>
        <p>
          <strong>FARMAGEO es la herramienta digital, gratuita y de libre uso para todas las farmacias del Colegio de Farmacéuticos de la Provincia de Santa Fe 2da Circunscripción.</strong>
        </p>
        <h4>2. Por qué se menciona Pedido en lugar de compra?</h4>
        <p>
        A través de FARMAGEO se realizan pedidos a una farmacia previamente seleccionada, que es el lugar donde se efectiviza la compra, se te emite la factura y donde realizarás el pago.
        </p>
        <h4>3. Cuál es el proceso para realizar un pedido en FARMAGEO?</h4>
        <p>
        Ingresas al sitio <strong>www.farmageo.com</strong>, debes acceder al mostrador virtual de tú farmacia amiga en donde quieres retirar tus productos y ponerte en contacto con ellos.
        </p>
        <h4>4. Cuál es el precio que pagaré por los productos que incluí en mi pedido?</h4>
        <p>
        Contacta y confirma con la farmacia la disponibilidad de stock del producto solicitado y su precio.
        </p>
        <h4>5. Tengo que pagar algún cargo o gasto en el momento que realizo el pedido?</h4>
        <p>
        NO, FARMAGEO es un servicio totalmente gratuito, sólo abonas los productos pedidos en tu farmacia, como lo haces habitualmente.
        </p>
        <h4>6. Qué métodos de envío puedo elegir?</h4>
        <p>
        La farmacia te entregará tu pedido a partir del día y horario que te informe. Acordarás con ella la forma de entrega.
        </p>
        <h4>7. Qué farmacias puedo elegir?</h4>
        <p>
        Cualquiera de las que están en el mapa de cobertura. Dichas farmacias también las encontrarás en el buscador “Busca tu farmacia”, y puedes utilizar filtros por Localidad y/o Servicios que presta.
        </p>
        <h4>8. Cuándo puedo pasar a retirar mi Pedido por la farmacia?</h4>
        <p>
        Recibirás una respuesta de la farmacia que hayas elegido en el Pedido.
        </p>
        <h4>9. Qué hacer si no recibo una respuesta avisando que está disponible mi Pedido en la farmacia?</h4>
        <p>
        Puedes contactarte con la farmacia a través de los medios que ella te haya ofrecido
        </p>
        <h4>10. Está disponible el envío a domicilio?</h4>
        <p>
        El contacto ha sido directo con la Farmacia. Es con ella que tendrás que consultar por los medios que dispone para la entrega.
        </p>
        <h4>11. Qué necesito presentar para retirar mi Pedido?</h4>
        <p>
        El contacto ha sido directo con la Farmacia. Retiras según las condiciones de cada farmacia.
        </p>
        <h4>12. Puede un tercero retirar mi Pedido?</h4>
        <p>
        Sí, siempre y cuando presente los elementos requeridos para efectuar el retiro (ver respuesta a pregunta “Qué necesito presentar para retirar mi pedido”).
        </p>
        <h4>13. Con qué medios de pago puedo abonar en la farmacia?</h4>
        <p>
        Con los medios de pago que posea la farmacia que elijas.
        </p>
        <h4>14. Cómo obtengo mi factura?</h4>
        <p>
        La factura te la confeccionará la farmacia en el momento del retiro y pago de tu pedido.
        </p>
        <h4>15. Cuánto tiempo tengo para retirar mi Pedido?</h4>
        <p>
        Tienes 7 días corridos a partir del momento en que recibís la confirmación de la farmacia, para asegurar el retiro de tus productos en la forma y cantidad en que los solicitaste. Pasado dicho plazo la farmacia no podrá garantizarte la entrega de los mismos, quedando sujeta dicha entrega a la disponibilidad de stock de la farmacia.
        </p>
        <h4>16. Qué sucede si no voy a retirar mi Pedido?</h4>
        <p>El contacto ha sido directo con la Farmacia. Es con ella que tendrás que informar de tu decisión.</p>
        <h4>17. Cómo hago para hacer el seguimiento de mi Pedido?</h4>
        <p>
        El contacto ha sido directo con la Farmacia. Es con ella que tendrás que consultar por tu pedido.
        </p>
       
      </div>
    </>
  );
};

export default PreguntasFrecuentes;
