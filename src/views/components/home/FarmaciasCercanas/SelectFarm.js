import React, {useEffect, useState} from 'react'
import { getAllCitys, getLatLong } from '../../../../DataFetcher/DFUbicationMap'


const SelectFarm = ({state, handleSelect}) => {
    const [valueSlect, setValueSelect] = useState()
    const [citys, setCitys] = useState([])
    useEffect(() => {
        getAllCitys().then(data => {
            setCitys(data.localidades)
        })
    }, [])
    const handleChange = async (e)=>{
        const geo = await getLatLong(e.target[e.target.selectedIndex].id).then(data=> data.localidades[0].centroide)
        handleSelect(e, geo)
    }
    return (
        <select
        id="localidad"
        className="form-control"
        onChange={e=>handleChange(e)}
        name="localidad"
    >
        <option id={82084270000} selected={state.statusActualUbication} value="">Cualquier localidad...</option>
        {citys.map(({id, nombre}) => {
            return (
                <option value={nombre} selected={nombre===state.localidad } id={id} key={id}>
                    {nombre}
                </option>
            );
        })}
    </select>
    )
}

export default SelectFarm
