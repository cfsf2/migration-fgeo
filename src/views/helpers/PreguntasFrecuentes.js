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
        Ingresas al sitio <strong>www.farmageo.com</strong>, debes acceder al mostrador virtual de tú farmacia amiga en donde quieres retirar tus productos, seleccionas el producto deseado usando el buscador o navegando por las categorías, puedes agregar más productos, chequear tu Pedido y finalizas. Al confirmar el Pedido te enviaremos un e-mail con el número de tu pedido, junto a los elementos que debes presentar para retirarlo por la farmacia elegida.
        </p>
        <h4>4. Necesito registrarme para hacer un pedido?</h4>
        <p>
        Sí, la primera vez que hagas un pedido, el sitio te pedirá solamente que ingreses tu nombre, apellido, dirección de e-mail y contraseña. En los siguientes pedidos iniciarás sesión con la dirección de email y contraseña registrada, accediendo al botón “ingresar” arriba a la derecha de la página.
        </p>
        <h4>5. Qué productos o categorías puedo incluir en mi pedido a través de FARMAGEO?</h4>
        <p>
        Podrás escoger los productos de perfumería que normalmente encuentras en una farmacia, como las principales categoría de <strong>no medicinales</strong>, entre ellas: dermocosmética, cuidado del bebé, nutrición, cuidado personal, etc.
        </p>
        <h4>7. Puedo cambiar o agregar más productos una vez que confirmé mi Pedido?</h4>
        <p>
        Los productos de un Pedido si pueden ser cambiados una vez confirmado el mismo. Puedes efectuar tantos Pedidos como quieras, seleccionando los productos de tu interés y manteniendo la gratuidad del servicio. Cada Pedido tendrá su propia fecha y horario de entrega para mejor identificación. Contacta con tu Farmacia Amiga y confirmas cual llevarás.
        </p>
        <h4>8. Cuál es el precio que pagaré por los productos que incluí en mi pedido?</h4>
        <p>
        Pagarás el precio de los productos vigentes en el sitio web a la hora de la reserva de tu pedido. La farmacia deberá respetar los precios y descuentos publicados en la página de FARMAGEO. Contacta y confirma con la farmacia la disponibilidad de stock del producto solicitado.
        </p>
        <h4>9. Tengo que pagar algún cargo o gasto en el momento que realizo el pedido?</h4>
        <p>
        NO, FARMAGEO es un servicio totalmente gratuito, sólo abonas los productos pedidos en tu farmacia, como lo haces habitualmente.
        </p>
        <h4>10. Qué métodos de envío puedo elegir?</h4>
        <p>
        La farmacia te entregará tu pedido a partir del día y horario que te informe. Acordarás con ella la forma de entrega.
        </p>
        <h4>11. Qué farmacias puedo elegir?</h4>
        <p>
        Cualquiera de las que están en el mapa de cobertura. Pudiendo encontrar algunas que publican productos en su <strong>e-commerce</strong>, como atrás que no lo hacen. Dichas farmacias también las encontrarás en el buscador  “Busca tu farmacia”, y puedes utilizar filtros por Localidad y/o Servicios que presta.
        </p>
        <h4>12. Cuándo puedo pasar a retirar mi Pedido por la farmacia?</h4>
        <p>
        Recibirás una respuesta de la farmacia que hayas elegido en el Pedido.
        </p>
        <h4>13. Qué hacer si no recibo una respuesta avisando que está disponible mi Pedido en la farmacia?</h4>
        <p>
        Puedes contactarte con la farmacia a través de los medios que ella te haya ofrecido
        </p>
        <h4>14. Está disponible el envío a domicilio?</h4>
        <p>
        El contacto ha sido directo con la Farmacia. Es con ella que tendrás que consultar por los medios que dispone para la entrega.
        </p>
        <h4>15. Qué necesito presentar para retirar mi Pedido?</h4>
        <p>
        El contacto ha sido directo con la Farmacia. Retiras con el número de pedido que te informamos al finalizar tu Pedido o mencionando tu nombre y apellido en la farmacia. Para tu comodidad el número de pedido también lo recibirás por email junto al detalle de los productos del pedido.
        </p>
        <h4>16. Puede un tercero retirar mi Pedido?</h4>
        <p>
        Sí, siempre y cuando presente los elementos requeridos para efectuar el retiro (ver respuesta a pregunta “Qué necesito presentar para retirar mi pedido”).
        </p>
        <h4>17. Con qué medios de pago puedo abonar en la farmacia?</h4>
        <p>
        Con los medios de pago que posea la farmacia que elijas. Para facilitarte estas opciones cuando finalizas tu Pedido, al momento de seleccionar la farmacia de tu preferencia, te informaremos los medios de pago de los que dispone.
        </p>
        <h4>18. Cómo obtengo mi factura?</h4>
        <p>
        La factura te la confeccionará la farmacia en el momento del retiro y pago de tu pedido.
        </p>
        <h4>19. Cuánto tiempo tengo para retirar mi Pedido?</h4>
        <p>
        Tienes 7 días corridos a partir del momento en que recibís el email de confirmación de que tu pedido está disponible en la farmacia, para asegurar el retiro de tus productos en la forma y cantidad en que los solicitaste. Pasado dicho plazo la farmacia no podrá garantizarte la entrega de los mismos, quedando sujeta dicha entrega a la disponibilidad de stock de la farmacia.
        </p>
        <h4>20. Qué sucede si no voy a retirar mi Pedido?</h4>
        <p>El contacto ha sido directo con la Farmacia. Es con ella que tendrás que informar de tu decisión.</p>
        <h4>21. Cómo hago para hacer el seguimiento de mi Pedido?</h4>
        <p>
        El contacto ha sido directo con la Farmacia. Es con ella que tendrás que consultar por tu pedido.
        </p>
        <h4>22. Cómo hago para ingresar al sitio si olvidé mi contraseña?</h4>
        <p>
        En ese caso podes obtener una nueva contraseña de la siguiente forma: Cliquea en el botón ingresar arriba a la derecha. Cliquea en el link "olvidé mi contraseña". Te llegará por email una nueva contraseña que podrás cambiar. Otras opciones en contactarnos a través de nuestro email de soporte o Whatsapp.
        </p>
       
      </div>
    </>
  );
};

export default PreguntasFrecuentes;
