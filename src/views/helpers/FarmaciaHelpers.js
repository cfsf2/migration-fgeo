import grupo287 from "../../assets/images/Grupo 287.png";
import presion from "../../assets/images/presion.png";
import inyeccion from "../../assets/images/inyeccion.png";
import amarillos from "../../assets/images/amarillos.png";
import whatsapp from "../../assets/images/whatsapp.png";

export const checkServicio = (serv, servicios) => {
  if (serv === "all") {
    return true;
  } else {
    if (servicios) {
      return (
        servicios.filter((s) => {
          return s.tipo === serv;
        }).length > 0
      );
    } else {
      return false;
    }
  }
};

export const checkFranjaHoraria = (franjahoraria, horarios) => {
  if (franjahoraria === "all") {
    return true;
  } else {
    if (horarios) {
      var dia = obtenerDia();
      var horariosDelDia = horarios[dia];
      if (horariosDelDia != undefined) {
        return validarFranjaHoraria(franjahoraria, horariosDelDia);
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
};

const obtenerDia = () => {
  var fecha = new Date();
  var dia = fecha.getDay();
  if (dia === 0) {
    return (dia = 6);
  } else {
    return (dia -= 1);
  }
};

const validarFranjaHoraria = (franjahoraria, horariosDelDia) => {
  if (horariosDelDia.habilitado) {
    var bloque1 = horariosDelDia.bloques[0];
    var bloque2 = { desde: 0, hasta: 0 };
    var isOpen = true;
    if (horariosDelDia.bloques.length > 1) {
      bloque2 = horariosDelDia.bloques[1];
    }
    var hr = getHorarioFranja(franjahoraria);
    if (
      parseInt(bloque1.desde) <= hr.inicio &&
      parseInt(bloque1.hasta) >= hr.fin
    ) {
      return true;
    } else if (
      parseInt(bloque2.desde) <= hr.inicio &&
      parseInt(bloque2.hasta) >= hr.fin
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const checkIsOpen = async (horarios) => {
  var open = { msg: "Cerrado", status: false };

  if (horarios.length > 0) {
    var date = new Date();
    var dia = date.getDay();
    var hora = date.getHours();
    var minutos = date.getMinutes();

    // en adminweb => lunes(0), martes(1), mier(2), juev(3)
    // en js app => domingo(0), lunes(1)
    // Corregir esto pronto:
    var fixIndex = function (dia) {
      if (dia == 0) {
        return 6; //si es domingo usar el indice 6 para corregir
      } else {
        return dia - 1;
      }
    };

    var index = await fixIndex(dia);

    var desde_hora = parseInt(horarios[index].bloques[0].desde.substring(0, 2));
    var desde_min = parseInt(horarios[index].bloques[0].desde.substring(3, 5));
    var hasta_hora = parseInt(horarios[index].bloques[0].hasta.substring(0, 2));
    var hasta_min = parseInt(horarios[index].bloques[0].hasta.substring(3, 5));

    if (!horarios[index].habilitado) {
      open = { msg: "Cerrado por hoy", status: false };
    } else if (hora > desde_hora && hora < hasta_hora) {
      open = { msg: "Abierto", status: true };
    } else if (hora == desde_hora && minutos >= desde_min) {
      open = { msg: "Abierto", status: true };
    } else if (hora == hasta_hora && minutos < hasta_min) {
      open = { msg: "Cierra pronto", status: true };
    } else if (horarios[index].bloques[1] != undefined) {
      var desde_hora2 = parseInt(
        horarios[index].bloques[1].desde.substring(0, 2)
      );
      var desde_min2 = parseInt(
        horarios[index].bloques[1].desde.substring(3, 5)
      );
      var hasta_hora2 = parseInt(
        horarios[index].bloques[1].hasta.substring(0, 2)
      );
      var hasta_min2 = parseInt(
        horarios[index].bloques[1].hasta.substring(3, 5)
      );

      if (hora > desde_hora2 && hora < hasta_hora2) {
        open = { msg: "Abierto", status: true };
      } else if (hora == desde_hora2 && minutos >= desde_min2) {
        open = { msg: "Abierto", status: true };
      } else if (hora == hasta_hora2 && minutos < hasta_min2) {
        open = "Cierra pronto";
      } else {
        open = { msg: "Cerrado", status: false };
      }
    } else {
      open = { msg: "Cerrado", status: false };
    }
  } else {
    open = { msg: "Sin horarios", status: false };
  }
  return open;
};

const getHorarioFranja = (franjahoraria) => {
  switch (franjahoraria) {
    case "manana":
      return { inicio: 7, fin: 10 };
    case "tarde":
      return { inicio: 12, fin: 16 };
    case "noche":
      return { inicio: 20, fin: 22 };
    /*  case "madrugada":
      return { inicio: 0, fin: 5 };*/
  }
};
export const getServicio = (servicio, index) => {
  var x = "";
  switch (servicio.tipo) {
    case "violeta":
      x = (
        <div className="col-sm p-3" key={index}>
          <img src={grupo287} className="icons-lg" alt="" />
        </div>
      );
      break;
    case "presion":
      x = (
        <div className="col-sm pt-3" key={index}>
          <img src={presion} className="icons-md" alt="" />{" "}
          <p>Toma de presión</p>
        </div>
      );
      break;
    case "amarillos":
      x = (
        <div className="col-sm pt-3" key={index}>
          <img src={amarillos} className="icons-md" alt="" />
          <p>Puntos amarillos</p>
        </div>
      );
      break;
    case "inyectables":
      x = (
        <div className="col-sm pt-3" key={index}>
          <img src={inyeccion} className="icons-md" alt="" />
          <p>Inyectables</p>
        </div>
      );
      break;
    case "whatsapp":
      x = (
        <div className="col-sm bg-verde pt-4" key={index}>
          <img src={whatsapp} className="icons-md" alt="" />
        </div>
      );
      break;
    /*default:
        x =  servicio.tipo
        break;*/
  }
  return x;
};

export const localidades = [
  "ACEBAL",
  "ALBARELLOS",
  "ALCORTA",
  "ALVAREZ",
  "ALVEAR",
  "AMENABAR",
  "ANDINO",
  "AREQUITO",
  "ARMSTRONG",
  "ARROYO SECO",
  "ARTEAGA",
  "BERABEVU",
  "BIGAND",
  "BOMBAL",
  "BOUQUET",
  "BUSTINZA",
  "CAFFERATA",
  "CAPITAN BERMUDEZ",
  "CARCARAÑA",
  "CARMEN",
  "CARRERAS",
  "CASILDA",
  "CAÑADA DE GOMEZ",
  "CAÑADA DE UCLE",
  "CAÑADA RICA",
  "CHABAS",
  "CHAPUY",
  "CHAÑAR LADEADO",
  "CHOVET",
  "CHRISTOPHERSEN",
  "CLARKE",
  "CLASON",
  "CORONEL BOGADO",
  "CORONEL DOMINGU",
  "CORREA",
  "DIEGO DE ALVEAR",
  "ELORTONDO",
  "EMP V CONSTITUC",
  "FIGHIERA",
  "FIRMAT",
  "FLB",
  "FRAY LUIS BELTR",
  "FUENTES",
  "FUNES",
  "Firmat",
  "GENERAL GELLY",
  "GENERAL LAGOS",
  "GODEKEN",
  "GODOY",
  "GRANADERO BAIGO",
  "HUGHES",
  "IBARLUCEA",
  "J B MOLINA",
  "JUNCAL",
  "LABORDEBOY",
  "LAS PAREJAS",
  "LAS ROSAS",
  "LOS MOLINOS",
  "LOS QUIRQUINCHO",
  "LUCIO V. LOPEZ",
  "LUIS PALACIOS",
  "MAGGIOLO",
  "MARIA TERESA",
  "MAXIMO PAZ",
  "MELINCUE",
  "MONTES DE OCA",
  "MURPHY",
  "OLIVEROS",
  "PAVON",
  "PAVON ARRIBA",
  "PEREZ",
  "PEYRANO",
  "PUEBLO ESTHER",
  "PUEBLO NUEVO",
  "PUERTO GRL S MA",
  "PUJATO",
  "RICARDONE",
  "ROLDAN",
  "ROSARIO",
  "RUEDA",
  "RUFINO",
  "S JOSE DE LA ES",
  "SALTO GRANDE",
  "SAN GREGORIO",
  "SAN JERONIMO SU",
  "SAN LORENZO",
  "SANCTI SPIRITU",
  "SANFORD",
  "SANTA ISABEL",
  "SANTA TERESA",
  "SARGENTO CABRAL",
  "SERODINO",
  "SOLDINI",
  "TEODELINA",
  "TIMBUES",
  "TORTUGAS",
  "TOTORAS",
  "URANGA",
  "V GOBERNADOR GA",
  "VENADO TUERTO",
  "VILLA AMELIA",
  "VILLA CAÑAS",
  "VILLA CONSTITUCION",
  "VILLA ELOISA",
  "VILLA MUGUETA",
  "VILLADA",
  "WHEELWRIGHT",
  "ZAVALLA",
];

export const FarmaciaVendeElProducto = (farmacia, producto) => {
  console.log(producto);
  if (
    farmacia.excepcionesEntidadesFarmageo.includes(producto.entidad_id) ||
    farmacia.excepcionesProdFarmageo.includes(producto._id) ||
    farmacia.perfil_farmageo !== "vender_online"
  ) {
    return false;
  } else {
    return true;
  }
};
