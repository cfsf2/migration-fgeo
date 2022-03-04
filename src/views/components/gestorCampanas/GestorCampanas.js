import React from 'react';
import { connect } from 'react-redux';
import { GET_CAMPANAS } from '../../../redux/actions/CampanaActions';
import { CampanasPage } from './CampanasPage';

const GestorCampanas = (props) => {
  React.useEffect(() => {
    if (props.UsuarioReducer) {
      if (props.UsuarioReducer.user_farmageo) {
        props.GET_CAMPANAS(props.UsuarioReducer.user_farmageo._id);
      }
    }
  }, [props.UsuarioReducer.user_farmageo._id]);

  return (
    <>
      {props.CampanaReducer.campanas_activas ? (
        <CampanasPage {...props} />
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    CampanaReducer: state.CampanaReducer,
    UsuarioReducer: state.UsuarioReducer,
  };
};

const mapDispatchToProps = {
  GET_CAMPANAS,
};

export default connect(mapStateToProps, mapDispatchToProps)(GestorCampanas);
