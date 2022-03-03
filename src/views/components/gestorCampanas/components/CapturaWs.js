import React from 'react';
import { connect } from 'react-redux';
import Modal from '../../modales/Modal';

const CapturaWs = (props) => {
  const [mostrar, setMostrar] = React.useState(false);
  const campana = props.campana;

  React.useEffect(() => {
    props.UsuarioReducer.auth && setMostrar(true);
  }, [props.UsuarioReducer.auth]);

  return (
    <Modal
      open={mostrar}
      handleClose={setMostrar}
      style={{ left: '50%', width: '' }}
    >
      <div className="modal-dialog modal-md">
        <div className="modal-content">
          <div style={{ float: 'right' }}></div>
          <div className="modal-body" align="left">
            <div className="alerta">
              <h2>
                <b>Obtené un descuento para tu próxima compra!</b>
              </h2>

              <div className="form-row mt-3">
                <div className="col-md-12 mb-3 pr-3">
                  <p>
                    Registra tu número para obtener un descuento del 40% en tu
                    próxima compra en tu farmacia
                  </p>
                </div>
                <div className="form-row col-md-12 mb-3 pr-3">
                  <input className="col" />
                  <input className="col" />
                </div>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-info"
              data-dismiss="modal"
              aria-label="Close"
              // onClick={e=>handleConfirmar(e)}
            >
              Confirmar
            </button>
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

export default connect(mapStateToProps, null)(CapturaWs);
