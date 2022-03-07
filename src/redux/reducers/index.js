import { combineReducers } from 'redux';
import FarmaciasReducer from './FarmaciasReducer';
import ProductosReducer from './ProductosReducer';
import UsuarioReducer from './UsuarioReducer';
import PedidosReducer from './PedidosReducer';
import PublicidadesReducer from './PublicidadesReducer';
import CampanaReducer from './CampanaReducer';

export default combineReducers({
  FarmaciasReducer: FarmaciasReducer,
  ProductosReducer: ProductosReducer,
  UsuarioReducer: UsuarioReducer,
  PedidosReducer: PedidosReducer,
  PublicidadesReducer: PublicidadesReducer,
  CampanaReducer: CampanaReducer,
});
