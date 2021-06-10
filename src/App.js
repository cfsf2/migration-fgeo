import React, {useState} from "react";
//import { HashRouter, Route, Switch } from 'react-router-dom';
import "./css/farmacias.css";
import "./css/switch.css";

// import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import FooterHome from "./views/components/footers/FooterHome";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Cargando...</div>
);

// Pages
const Home = React.lazy(() => import("./views/components/home/Home"));
const Mutual = React.lazy(() => import("./views/components/mutual/Mutual"));
const FarmaciaPerfil = React.lazy(() =>
  import("./views/components/farmaciaPerfil/FarmaciaPerfil")
);
const FarmaciaProductosCat = React.lazy(() =>
  import("./views/components/farmaciaPerfil/FarmaciaProductosCat")
);
const NavHome = React.lazy(() => import("./views/components/navs/NavHome"));
const NavPerfil = React.lazy(() => import("./views/components/navs/NavPerfil"));
const FarmaciasCercanas = React.lazy(() =>
  import("./views/components/home/FarmaciasCercanas/FarmaciasCercanas")
);
const RevisarPedido = React.lazy(() =>
  import("./views/components/compras/RevisarPedido")
);
const DetalleProducto = React.lazy(() =>
  import("./views/components/compras/DetalleProducto")
);
const DetallesDePago = React.lazy(() =>
  import("./views/components/compras/DetallesDePago")
);
const RecetaConObraSocial = React.lazy(() =>
  import("./views/components/compras/RecetaConObraSocial")
);
const RecetaParticular = React.lazy(() =>
  import("./views/components/compras/RecetaParticular")
);
const RecetaPami = React.lazy(() =>
  import("./views/components/compras/RecetaPami")
);
const ConfirmacionPedido = React.lazy(() =>
  import("./views/components/compras/ConfirmacionPedido")
);
const UsuarioConfig = React.lazy(() =>
  import("./views/components/cuenta/UsuarioConfig")
);
const BuscarProductos = React.lazy(() =>
  import("./views/components/buscarProductos/BuscarProductos")
);
/*const NavBuscarProductos = React.lazy(() =>
  import("./views/components/navs/NavBuscarProductos")
);*/

const RegistrarFarmacia = React.lazy(() =>
  import("./views/components/RegistrarFarmacia")
);

function App() {
  const [modalState, setmodalState] = useState(true);
  return (
    <HashRouter>
      <React.Suspense fallback={loading()}>
        <Switch>
          <Route
            exact
            path="/mutual"
            name="Mutual"
            render={(props) => (
              <>
                <NavPerfil modalState={modalState} setmodalState={setmodalState} />
                <Mutual {...props} />
              </>
            )}
          />
          <Route
            path="/farmaciaperfil"
            name="farmacia"
            render={(props) => (
              <>
                <NavPerfil modalState={modalState} setmodalState={setmodalState} />
                <FarmaciaPerfil {...props} />
              </>
            )}
          />

          <Route
            path="/farmprodcat"
            name="farmprodcat"
            render={(props) => (
              <>
                <NavPerfil modalState={modalState} setmodalState={setmodalState} />
                <FarmaciaProductosCat {...props} />
              </>
            )}
          />

          <Route
            path="/revisarpedido"
            name="revisarpedido"
            render={(props) => (
              <>
                <NavHome modalState={modalState} setmodalState={setmodalState} />
                <RevisarPedido {...props} />
              </>
            )}
          />

          <Route
            path="/detallespago"
            name="detallespago"
            render={(props) => (
              <>
                <NavHome modalState={modalState} setmodalState={setmodalState} />
                <DetallesDePago {...props} />
              </>
            )}
          />

          <Route
            path="/recetaObraSocial"
            name="recetaObraSocial"
            render={(props) => (
              <>
                <NavHome modalState={modalState} setmodalState={setmodalState} />
                <RecetaConObraSocial {...props} />
              </>
            )}
          />

          <Route
            path="/recetaParticular"
            name="recetaParticular"
            render={(props) => (
              <>
                <NavHome modalState={modalState} setmodalState={setmodalState} />
                <RecetaParticular {...props} />
              </>
            )}
          />

          <Route
            path="/recetaPami"
            name="recetaPami"
            render={(props) => (
              <>
                <NavHome modalState={modalState} setmodalState={setmodalState} />
                <RecetaPami {...props} />
              </>
            )}
          />

          <Route
            path="/confirmacionPedido"
            name="confirmacionPedido"
            render={(props) => (
              <>
                <NavHome modalState={modalState} setmodalState={setmodalState} />
                <ConfirmacionPedido {...props} />
              </>
            )}
          />
          <Route
            path="/detalleprod"
            name="detalleprod"
            render={(props) => (
              <>
                <NavPerfil modalState={modalState} setmodalState={setmodalState} />
                <DetalleProducto {...props} />
              </>
            )}
          />
          <Route
            path="/seleccionarfarmacia"
            name="seleccionarfarmacia"
            render={(props) => (
              <>
                <NavHome modalState={modalState} setmodalState={setmodalState} hideCategorias={true} />
                <FarmaciasCercanas
                  {...props}
                  nextPage="farmprodcat?u="
                  filtroPerfilFarmageo={"vender_online"}
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
                <NavHome modalState={modalState} setmodalState={setmodalState} hideCategorias={true} />
                
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
                <NavHome modalState={modalState} setmodalState={setmodalState} />
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
                <BuscarProductos  modalState={modalState} setmodalState={setmodalState}  {...props} />
              </>
            )}
          />

          <Route
            path="/registrarfarmacia"
            name="registrarfarmacia"
            render={(props) => (
              <>
                <NavHome modalState={modalState} setmodalState={setmodalState} />
                <RegistrarFarmacia {...props} />
              </>
            )}
          />

          <Route
            path="/"
            name="Home"
            render={(props) => (
              <>
                <NavHome modalState={modalState} setmodalState={setmodalState} />
                <Home {...props} />
              </>
            )}
          />
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
}

export default App;