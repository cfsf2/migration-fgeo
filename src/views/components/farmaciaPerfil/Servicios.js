import grupo287 from '../../../assets/images/Grupo 287.png';
import presion from '../../../assets/images/presion.png';
import inyeccion from '../../../assets/images/inyeccion.png';
import amarillos from '../../../assets/images/amarillos.png';
import whatsapp from '../../../assets/images/whatsapp.png';
import magistrales from '../../../assets/images/recetas-magistrales.png';
import testcovid from '../../../assets/images/covidtest.png';
import panales_pami from '../../../assets/images/panales_pami.png';

import _ from 'lodash';
import { checkServicio } from '../../helpers/FarmaciaHelpers';

function Servicios(props) {
  const { servicios, wapp } = props;
  return (
    <div className="row" align="center">
      <div className="col-md-3"></div>
      <div className="col-md-6 nuestros-servicios">
        <h4>Nuestros servicios</h4>
        <div className="container-fluid mt-2" id="servicios-nav">
          <div className="row nuestros-servicios-icons " align="center">
            {/*servicios ?
            _.sortBy(servicios, 'tipo')
              .map((s,i)=>{
                return getServicio(s, i);
              })
            :null*/}
            <div
              className="col-sm col-6 pt-4"
              style={
                checkServicio('recetas-magistrales', servicios)
                  ? { filter: 'none', opacity: 1 }
                  : { filter: 'grayscale(100%)', opacity: 0.3 }
              }
            >
              <img src={magistrales} className="icons-md" alt="" />{' '}
              <p>Recetas magistrales</p>
            </div>
            <div
              className="col-sm col-6 pt-4"
              style={
                checkServicio('violeta', servicios)
                  ? { filter: 'none', opacity: 1 }
                  : { filter: 'grayscale(100%)', opacity: 0.3 }
              }
            >
              <img src={grupo287} className="icons-lg" alt="" />
            </div>
            <div
              className="col-sm col-6 pt-4"
              style={
                checkServicio('presion', servicios)
                  ? { filter: 'none', opacity: 1 }
                  : { filter: 'grayscale(100%)', opacity: 0.3 }
              }
            >
              <img src={presion} className="icons-md" alt="" />{' '}
              <p>Toma de presión</p>
            </div>
            <div
              className="col-sm col-6 pt-4"
              style={
                checkServicio('amarillos', servicios)
                  ? { filter: 'none', opacity: 1 }
                  : { filter: 'grayscale(100%)', opacity: 0.3 }
              }
            >
              <img src={amarillos} className="icons-md" alt="" />
              <p>Puntos amarillos</p>
            </div>
            <div
              className="col-sm col-6 pt-4"
              style={
                checkServicio('inyectables', servicios)
                  ? { filter: 'none', opacity: 1 }
                  : { filter: 'grayscale(100%)', opacity: 0.3 }
              }
            >
              <img src={inyeccion} className="icons-md" alt="" />
              <p>Inyectables</p>
            </div>
            <div
              className="col-sm col-6 pt-4"
              style={
                checkServicio('testcovid', servicios)
                  ? { filter: 'none', opacity: 1 }
                  : { filter: 'grayscale(100%)', opacity: 0.3 }
              }
            >
              <img src={testcovid} className="icons-md" alt="" />
              <p>Test de Covid</p>
            </div>
            <div
              className="col-sm col-6 pt-4"
              style={
                checkServicio('pañalespami', servicios)
                  ? { filter: 'none', opacity: 1 }
                  : { filter: 'grayscale(100%)', opacity: 0.3 }
              }
            >
              <img
                src={panales_pami}
                className="icons-md"
                alt=""
                style={{ width: '60px', height: '30px' }}
              />
              <p>Pañales PAMI</p>
            </div>
            <div
              className="col-sm col-6 bg-verde p-3 pt-4"
              style={
                checkServicio('whatsapp', servicios)
                  ? { filter: 'none', opacity: 1 }
                  : { filter: 'grayscale(100%)', opacity: 0.3 }
              }
            >
              <a
                href={
                  checkServicio('whatsapp', servicios)
                    ? `https://api.whatsapp.com/send?phone=+549${wapp}`
                    : null
                }
                target="_blank"
                rel="noopener"
              >
                <img src={whatsapp} className="icons-md" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-3"></div>
    </div>
  );
}

export default Servicios;
