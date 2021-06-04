import React from "react";
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
                <NavPerfil />
                <Mutual {...props} />
              </>
            )}
          />
          <Route
            path="/farmaciaperfil"
            name="farmacia"
            render={(props) => (
              <>
                <NavPerfil />
                <FarmaciaPerfil {...props} />
              </>
            )}
          />

          <Route
            path="/farmprodcat"
            name="farmprodcat"
            render={(props) => (
              <>
                <NavPerfil />
                <FarmaciaProductosCat {...props} />
              </>
            )}
          />

          <Route
            path="/revisarpedido"
            name="revisarpedido"
            render={(props) => (
              <>
                <NavHome />
                <RevisarPedido {...props} />
              </>
            )}
          />

          <Route
            path="/detallespago"
            name="detallespago"
            render={(props) => (
              <>
                <NavHome />
                <DetallesDePago {...props} />
              </>
            )}
          />

          <Route
            path="/recetaObraSocial"
            name="recetaObraSocial"
            render={(props) => (
              <>
                <NavHome />
                <RecetaConObraSocial {...props} />
              </>
            )}
          />

          <Route
            path="/recetaParticular"
            name="recetaParticular"
            render={(props) => (
              <>
                <NavHome />
                <RecetaParticular {...props} />
              </>
            )}
          />

          <Route
            path="/recetaPami"
            name="recetaPami"
            render={(props) => (
              <>
                <NavHome />
                <RecetaPami {...props} />
              </>
            )}
          />

          <Route
            path="/confirmacionPedido"
            name="confirmacionPedido"
            render={(props) => (
              <>
                <NavHome />
                <ConfirmacionPedido {...props} />
              </>
            )}
          />
          <Route
            path="/detalleprod"
            name="detalleprod"
            render={(props) => (
              <>
                <NavPerfil />
                <DetalleProducto {...props} />
              </>
            )}
          />
          <Route
            path="/seleccionarfarmacia"
            name="seleccionarfarmacia"
            render={(props) => (
              <>
                <NavHome hideCategorias={true} />
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
                <NavHome hideCategorias={true} />
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
                <NavHome />
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
                <BuscarProductos {...props} />
              </>
            )}
          />

          <Route
            path="/registrarfarmacia"
            name="registrarfarmacia"
            render={(props) => (
              <>
                <NavHome />
                <RegistrarFarmacia {...props} />
              </>
            )}
          />

          <Route
            path="/"
            name="Home"
            render={(props) => (
              <>
                <NavHome />
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
