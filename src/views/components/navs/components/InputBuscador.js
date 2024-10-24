import React from "react";
import "./inputbuscador.css";

export const InputBuscador = (props) => {
  const { iconFarmacia, forma1, lupa, handleSearch, farmacia } = props;

  const [search, setSearch] = React.useState();
  const [txtbusqueda, setTexto] = React.useState("");

  React.useEffect(() => {
    if (farmacia) {
      setSearch("farmacia");
      return;
    }
    setSearch("producto");
    return;
  });

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch(search, txtbusqueda);
    }
    return;
  };
  return (
    <div className="home_input_container">
      <div className=" input_container_left">
        <img
          alt=""
          src={farmacia ? iconFarmacia : forma1}
          className="input_container_left_icon"
        />
      </div>
      <div className=" input_container_center">
        <form className="input_container_center_input">
          <input
            type="text"
            placeholder={`Busca tu ${farmacia ? "farmacia" : "producto"} aquí`}
            className="input_container_center_input"
            onChange={(e) => setTexto(e.target.value)}
            //name="txtbusqueda"
            value={txtbusqueda}
            autocomplete="off"
            onKeyPress={(e) => {
              return handleKeyDown(e);
            }}
          />
        </form>
      </div>
      <div
        className="input_container_right"
        style={{ cursor: "pointer" }}
        onClick={() => handleSearch(search, txtbusqueda)}
      >
        <img src={lupa} alt="lupa" className="input_container_right_lupa" />
      </div>
    </div>
  );
};
