import React from 'react';
import { connect } from 'react-redux';
import Modal from '../../modales/Modal';
import './capturaws.css';

import { NUEVO_REQUERIMIENTO } from '../../../../redux/actions/CampanaActions';
import {
  UPDATE_USER,
  UPDATE_LOCAL_USER,
} from '../../../../redux/actions/UsuarioActions';

const CapturaWs = (props) => {
  const [mostrar, setMostrar] = React.useState(false);
  const [state, setState] = React.useState({
    caracteristica: '',
    telefono: '',
  });

  const [error, setError] = React.useState(false);
  const campana = props.campana;
  const usuario = props.UsuarioReducer.user_farmageo;
  const farmacia = props.farmacia;

  const [capturaExitosa, setCapturaExitosa] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

     if (
       name !== 'caracteristica'
     ) {
       console.log(state.caracteristica.length + value.length);
       return;
     }
     if (state.telefono.length + value.length > 10 && name !== 'telefono') {
       console.log(state.telefono.length + value.length);
       return;
     }

    setState({
      ...state,
      [name]: value,
    });
  };

  const validacion = () => {
    if (
      state.caracteristica.trim() === '' ||
      state.telefono.trim() === '' ||
      state.caracteristica.length + state.telefono.length !== 10
    ) {
      setError(true);
      return false;
    } else {
      setError(false);
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validacion()) {
      props
        .NUEVO_REQUERIMIENTO({
          id_campana: campana._id,
          id_usuario: usuario ? usuario._id : null,
          id_farmacia: farmacia ? farmacia._id : null,
          celular: unirTelefono(),
        })
        .then((res) => {
          setCapturaExitosa(true);

          setTimeout(() => {
            setMostrar(false);
          }, 2000);

          props.UPDATE_LOCAL_USER({
            telephone: unirTelefono(),
          });

          if (campana.funcion_callback) {
            props[campana.funcion_callback]();
          }
        })
        .catch((err) => {
          alert('Ha ocurrido un error viejo, proba de nuevo cuando te pinte');
        });
    }
  };

  const unirTelefono = () => {
    const inputSeparado = [state.caracteristica, state.telefono];
    const inputUnico = inputSeparado.join('');

    return inputUnico;
  };


  React.useEffect(() => 
    props.UsuarioReducer.auth && setMostrar(true);
  }, [props.UsuarioReducer.auth]);

  React.useEffect(() => {
    if (
      props.UsuarioReducer.user_farmageo &&
      props.UsuarioReducer.user_farmageo.telephone
    ) {
      setState({
        caracteristica: props.UsuarioReducer.user_farmageo.telephone
          ?.toString()
          .slice(0, 3),
        telefono: props.UsuarioReducer.user_farmageo.telephone
          ?.toString()
          .slice(3, 10),
      });
    }
  }, [props.UsuarioReducer, props.UsuarioReducer.user_farmageo]);

  return (
    <Modal
      open={mostrar}
      handleClose={setMostrar}
      style={{ left: '50%', width: '34vw' }}
    >
      <div className="modal-dialog modal-md">
        <div className="modal-content">
          <div style={{ float: 'right' }}></div>
          <div className="modal-body" align="left">
            {capturaExitosa ? (
              <div> En Breve nos comunicaremos con usted</div>
            ) : (
              <div className="alerta">
                <h2 style={{ textAlign: 'center' }}>
                  <b>Obtené un descuento para tu próxima compra!</b>
                </h2>
                <div className="div-imagen">
                  <img
                    className="style-imagen"
                    src="https://clasebcn.com/wp-content/uploads/2020/04/harold-03.jpg"
                  />
                </div>
                <div className="form-row mt-1 pr-3 pl-3">
                  <div className="col-md-12 mb-1 pr-3">
                    <p style={{ textAlign: 'center' }}>
                      Registra tu número para obtener un descuento del 40% en tu
                      próxima compra en tu farmacia
                    </p>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="form-row col-md-12 mb-1 pr-3 justify-content-center">
                      <input
                        className="col-4 h-100 registro"
                        type="number"
                        name="caracteristica"
                        placeholder="Sin 0"
                        value={state.caracteristica}
                        onChange={handleChange}
                        pattern={/[0-9]/g}
                      />
                      <input
                        className="col-7 h-100 registro"
                        type="number"
                        name="telefono"
                        placeholder="Celular (sin 15)"
                        value={state.telefono}
                        onChange={handleChange}
                        pattern={/[0-9]/g}
                      />
                    </div>
                    {error && (
                      <p className="registro">
                        Revise los datos ingresados &#128070;
                      </p>
                    )}
                    <div className="form-row justify-content-center pt-3">
                      <button
                        type="submit"
                        className="btn btn-info"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        Confirmar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    CampanaReducer: state.CampanaReducer,
    UsuarioReducer: state.UsuarioReducer,
  };
};

const mapDispatchToProps = {
  NUEVO_REQUERIMIENTO,
  UPDATE_USER,
  UPDATE_LOCAL_USER,
};

export default connect(mapStateToProps, mapDispatchToProps)(CapturaWs);
