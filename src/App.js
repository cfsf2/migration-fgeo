import React, { useState } from 'react';
import ReactGA from 'react-ga';
//import { HashRouter, Route, Switch } from 'react-router-dom';
import './css/farmacias.css';
import './css/switch.css';
import { base } from './config';

// import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Route, Switch, useLocation } from 'react-router-dom';
import FooterHome from './views/components/footers/FooterHome';
import axios from 'axios';

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Cargando...</div>
);

// Pages
const Home = React.lazy(() => import('./views/components/home/Home'));
const Mutual = React.lazy(() => import('./views/components/mutual/Mutual'));
const FarmaciaPerfil = React.lazy(() =>
  import('./views/components/farmaciaPerfil/FarmaciaPerfil')
);
const FarmaciaProductosCat = React.lazy(() =>
  import('./views/components/farmaciaPerfil/FarmaciaProductosCat')
);
const NavHome = React.lazy(() => import('./views/components/navs/NavHome'));
const NavPerfil = React.lazy(() => import('./views/components/navs/NavPerfil'));
const FarmaciasCercanas = React.lazy(() =>
  import('./views/components/home/FarmaciasCercanas/FarmaciasCercanas')
);
const RevisarPedido = React.lazy(() =>
  import('./views/components/compras/RevisarPedido')
);
const DetalleProducto = React.lazy(() =>
  import('./views/components/compras/DetalleProducto')
);
const DetallesDePago = React.lazy(() =>
  import('./views/components/compras/DetallesDePago')
);
const RecetaConObraSocial = React.lazy(() =>
  import('./views/components/compras/RecetaConObraSocial')
);
const RecetaParticular = React.lazy(() =>
  import('./views/components/compras/RecetaParticular')
);
const RecetaPami = React.lazy(() =>
  import('./views/components/compras/RecetaPami')
);
const ConfirmacionPedido = React.lazy(() =>
  import('./views/components/compras/ConfirmacionPedido')
);
const UsuarioConfig = React.lazy(() =>
  import('./views/components/cuenta/UsuarioConfig')
);
const BuscarProductos = React.lazy(() =>
  import('./views/components/buscarProductos/BuscarProductos')
);
/*const NavBuscarProductos = React.lazy(() =>
  import("./views/components/navs/NavBuscarProductos")
);*/

const RegistrarFarmacia = React.lazy(() =>
  import('./views/components/RegistrarFarmacia')
);

const GestorCampanas = React.lazy(() =>
  import('./views/components/gestorCampanas/GestorCampanas')
);

const TerminosCondiciones = React.lazy(() =>
  import('./views/helpers/TerminosCondiciones')
);

function usePageViews() {
  let location = useLocation();
  React.useEffect(() => {
    if (!window.GA_INITIALIZED) {
      ReactGA.initialize(process.env.REACT_APP_GA);
      window.GA_INITIALIZED = true;
    }
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname + location.search);
  });
}

axios.interceptors.request.use((request) => {
  request.headers.authorization = `Bearer ${window.localStorage.getItem(
    'token'
  )}`;
  return request;
});
//axios.defaults.withCredentials = true;

function App() {
  const [modalState, setmodalState] = useState(true);
  const testing = window.location.origin;
  usePageViews();
  return (
    <>
      {testing !== base ? (
        <div
          className="leyendatesting"
          style={{
            display: 'flex',
            left: '20%',
            justifyContent: 'center',
            position: 'fixed',
            zIndex: 900000,
          }}
        >
          <h1
            style={{
              fontSize: '2rem',
              textAlign: 'center',
              color: 'yellow',
              backgroundColor: 'blue',
              fontWeight: 'bold',
              letterSpacing: '10px',
            }}
          >
            ENTORNO DE TESTING SQL
          </h1>
        </div>
      ) : null}
      <React.Suspense fallback={loading()}>
        <GestorCampanas />
        <Switch>
          <Route
            exact
            path="/mutual"
            name="Mutual"
            render={(props) => (
              <>
                <NavPerfil
                  modalState={modalState}
                  setmodalState={setmodalState}
                />
                <Mutual {...props} />
              </>
            )}
          />
          <Route
            exact
            path="/novedades/terminos-y-condiciones/"
            name="Términos y condiciones"
            render={(props) => <TerminosCondiciones {...props} />}
          />
          <Route
            path="/farmaciaperfil"
            name="farmacia"
            render={(props) => (
              <>
                <NavPerfil
                  modalState={modalState}
                  setmodalState={setmodalState}
                />
                <FarmaciaPerfil {...props} />
              </>
            )}
          />

          <Route
            path="/farmprodcat"
            name="farmprodcat"
            render={(props) => (
              <>
                <NavPerfil
                  modalState={modalState}
                  setmodalState={setmodalState}
                />
                <FarmaciaProductosCat {...props} />
              </>
            )}
          />

          <Route
            path="/revisarpedido"
            name="revisarpedido"
            render={(props) => (
              <>
                <NavHome
                  modalState={modalState}
                  setmodalState={setmodalState}
                />
                <RevisarPedido {...props} />
              </>
            )}
          />

          <Route
            path="/detallespago"
            name="detallespago"
            render={(props) => (
              <>
                <NavHome
                  modalState={modalState}
                  setmodalState={setmodalState}
                />
                <DetallesDePago {...props} />
              </>
            )}
          />

          <Route
            path="/recetaObraSocial"
            name="recetaObraSocial"
            render={(props) => (
              <>
                <NavHome
                  modalState={modalState}
                  setmodalState={setmodalState}
                />
                <RecetaConObraSocial {...props} />
              </>
            )}
          />

          <Route
            path="/recetaParticular"
            name="recetaParticular"
            render={(props) => (
              <>
                <NavHome
                  modalState={modalState}
                  setmodalState={setmodalState}
                />
                <RecetaParticular {...props} />
              </>
            )}
          />

          <Route
            path="/recetaPami"
            name="recetaPami"
            render={(props) => (
              <>
                <NavHome
                  modalState={modalState}
                  setmodalState={setmodalState}
                />
                <RecetaPami {...props} />
              </>
            )}
          />

          <Route
            path="/confirmacionPedido"
            name="confirmacionPedido"
            render={(props) => (
              <>
                <NavHome
                  modalState={modalState}
                  setmodalState={setmodalState}
                />
                <ConfirmacionPedido {...props} />
              </>
            )}
          />
          <Route
            path="/detalleprod"
            name="detalleprod"
            render={(props) => (
              <>
                <NavPerfil
                  modalState={modalState}
                  setmodalState={setmodalState}
                />
                <DetalleProducto {...props} />
              </>
            )}
          />
          <Route
            path="/seleccionarfarmacia"
            name="seleccionarfarmacia"
            render={(props) => (
              <>
                <NavHome
                  modalState={modalState}
                  setmodalState={setmodalState}
                  hideCategorias={true}
                />
                <FarmaciasCercanas
                  {...props}
                  nextPage="farmprodcat?u="
                  filtroPerfilFarmageo={'vender_online'}
                />
                <FooterHome />
              </>
            )}
          />

          <Route
            path="/buscarfarmacia"
            name="buscarfarmacia"
            render={(props) => (
              <>
                <NavHome
                  modalState={modalState}
                  setmodalState={setmodalState}
                  hideCategorias={true}
                />

                <FarmaciasCercanas {...props} nextPage="farmaciaperfil?u=" />
                <br />
                <FooterHome />
              </>
            )}
          />

          <Route
            path="/usuarioconfig"
            name="usuarioconfig"
            render={(props) => (
              <>
                <NavHome
                  modalState={modalState}
                  setmodalState={setmodalState}
                />
                <UsuarioConfig {...props} />
              </>
            )}
          />

          <Route
            path="/buscarproductos"
            name="buscarproductos"
            render={(props) => (
              <>
                {/*<NavBuscarProductos />*/}
                <BuscarProductos
                  modalState={modalState}
                  setmodalState={setmodalState}
                  {...props}
                />
              </>
            )}
          />

          <Route
            path="/registrarfarmacia"
            name="registrarfarmacia"
            render={(props) => (
              <>
                <NavHome
                  modalState={modalState}
                  setmodalState={setmodalState}
                />
                <RegistrarFarmacia {...props} />
              </>
            )}
          />

          <Route
            path="/"
            name="Home"
            render={(props) => (
              <>
                <NavHome
                  modalState={modalState}
                  setmodalState={setmodalState}
                />
                <Home {...props} />
              </>
            )}
          />
        </Switch>
      </React.Suspense>
    </>
  );
}

export default App;
