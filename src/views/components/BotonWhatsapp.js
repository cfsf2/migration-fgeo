import React from "react";
import "index.css";
import "font-awesome/css/font-awesome.min.css";

const BotonWhatsapp = ({
  nroContacto,
  sms,
  textTitle,
  imagen,
  className,
  disabled,
}) => {
  const nroValidado =
    nroContacto?.toString().length === 10 ? nroContacto : undefined;

  if (!nroValidado) {
    disabled = true;
  }

  const hayTexto = sms ?? "";

  return (
    <div
      className={
        imagen
          ? "style-background-alt-img"
          : disabled
          ? "whatsappDisabled"
          : className ?? "ca-whatsapp"
      }
    >
      {disabled ? (
        <a className="icon-wp">
          <i class="fa fa-whatsapp"></i>
        </a>
      ) : (
        <a
          href={`https://wa.me/54${nroValidado}?text=${hayTexto}`}
          target="_blank"
          rel="noopener noreferrer"
          className="icon-wp"
          title={textTitle ?? "Consúltanos por Whatsapp"}
        >
          {imagen ? (
            <img alt="img-whatsapp" className="atl-img" src={imagen} />
          ) : (
            <i class="fa fa-whatsapp"></i>
          )}
        </a>
      )}
    </div>
  );
};
export default BotonWhatsapp;
