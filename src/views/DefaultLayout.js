import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import routes from '../routes';
import '../css/farmacias.css'

import Nav from './components/navs/Nav'

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
  }  

  loading = () => <div className="animated fadeIn pt-1 text-center">Cargando...</div>

  getComponent(route, idx) {    
    return route.component ? (
      <Route
        key={idx}
        path={route.path}
        exact={route.exact}
        name={route.name}
        render={props => <route.component {...props} />}
      />
    ) : (null); 
  }


  render() {
    
    return (
        <div className="container-fluid">
            <Nav />
            <Suspense fallback={this.loading()}>
                <Switch>
                    {routes.map((route, idx) => {
                    return this.getComponent(route, idx)
                    })}
                </Switch>
            </Suspense>
    </div>
    );
  }
}

export default DefaultLayout
