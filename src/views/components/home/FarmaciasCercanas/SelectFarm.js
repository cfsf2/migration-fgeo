import React, { useEffect, useState } from "react";
import {
  getAllCitys,
  getLatLong,
} from "../../../../DataFetcher/DFUbicationMap";

const SelectFarm = ({ state, handleSelect }) => {
  const [valueSlect, setValueSelect] = useState();
  const [citys, setCitys] = useState([]);
  useEffect(() => {
    getAllCitys().then((data) => {
      setCitys(data);
    });
  }, []);
  const handleChange = async (e) => {
    const loc = citys.find((d) => d.id === Number(e.target.value));
    const geo = { lon: loc.centroide_lon, lat: loc.centroide_lat, nombre: loc.nombre };
    handleSelect(e, geo);
  };
  return (
    <select
      id="localidad"
      className="form-control"
      onChange={(e) => handleChange(e)}
      name="localidad"
    >
      <option id={82084270000} selected={state.statusActualUbication} value="">
        Cualquier localidad...
      </option>
      {citys.map(({ id, nombre }) => {
        return (
          <option selected={nombre === state.localidad} value={id} key={id}>
            {nombre}
          </option>
        );
      })}
    </select>
  );
};

export default SelectFarm;
