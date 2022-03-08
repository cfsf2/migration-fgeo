import React, { Component } from "react";
import { connect } from "react-redux";
import { OBTENER_POSICION_ACTUAL } from "../../redux/actions/UsuarioActions";

const UbicacionActual = (props)=> {
  const handleCheckbox = (e)=>{
    
    props.setCurrentLoc(!props.currentLoc)

    if(props.currentLoc){  
    props.OBTENER_POSICION_ACTUAL()
    }else{
    }
    
  }
    return (
      <label className="switch ml-3" >
        <input
          value={props.currentLoc}
          type="checkbox"
          onChange={e=>handleCheckbox(e)}
        />
        <span className="slider round"></span>
      </label>
    );
  }


const mapStateToProps = (state) => {};
const mapDispatchToProps = {
  OBTENER_POSICION_ACTUAL,
};
export default connect(mapStateToProps, mapDispatchToProps)(UbicacionActual);
