import React from "react";

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
  return (
    <div className="buscador-background">
      <div className="d-inline">
        <div className="d-inline">
          <img
            alt=""
            src={farmacia ? iconFarmacia : forma1}
            className="search-select-icons mr-2"
          />
        </div>
      </div>
      <div className="d-inline search-input">
        <input
          type="text"
          placeholder={`Busca tu ${farmacia ? "farmacia" : "producto"} aqui`}
          className="input-search"
          onChange={(e) => setTexto(e.target.value)}
          name="txtbusqueda"
          value={txtbusqueda}
        />
      </div>
      <div
        className="d-inline search-lupa"
        onClick={() => handleSearch(search, txtbusqueda)}
      >
        <img src={lupa} alt="lupa" id="icono-lupa" />
      </div>
    </div>
  );
};
