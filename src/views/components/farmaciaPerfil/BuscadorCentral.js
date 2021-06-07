import { Component } from "react";
import forma1 from "../../../assets/images/Forma 1.png";
import lupa from "../../../assets/images/Lupa.png";
import { connect } from "react-redux";
import { SET_CATEGORIA } from "../../../redux/actions/ProductosActions";

class BuscadorCentral extends Component {
  handleCategoria = (event) => {
    const target = event.nativeEvent.target;
    const value = target.value;
    this.setState({
      categoria: value,
    });
    this.handleSeccionCategorias(value);
  };

  handleSeccionCategorias = async (categoria) => {
    await this.props.SET_CATEGORIA(categoria);
  };

  render() {
    const { categorias, categoriaFiltro } = this.props.ProductosReducer;
    return (
      <div className="row centrado-2 centrado-3 mt-5" align="left">
        <div className="col-sm-5 p-4 buscador-central rounded-left">
          <select
            value={categoriaFiltro}
            className="categoria-select"
            style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
            onChange={this.handleCategoria}
          >
            <option className="categoria-icons-select" value="all">
              Todas las categorías
            </option>
            {categorias.map((c, i) => {
              return (
                <option
                  className="categoria-icons-select"
                  value={c._id}
                  key={i}
                >
                  {c.nombre}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-sm-7 ml-0 py-4 buscador-central d-flex align-items-center justify-content-center rounded-right">
          <div className="buscador-background">
            <div className="d-inline search-input ml-3">
              <input
                type="text"
                placeholder="¿Qué producto estás buscando?"
                className="input-search rounded"
                value={this.props.textbuscador}
                onChange={(event) =>{
                  this.props.handleTextBuscador(event.nativeEvent.target.value)}
                }
                name="textbuscador"
              />
            </div>
            <div className="d-inline">
              <img src={forma1} className="search-select-icons ml-3" />
            </div>
            <div className="d-inline search-lupa">
              <img src={lupa} alt="" id="icono-lupa" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ProductosReducer: state.ProductosReducer,
  };
};

const mapDispatchToProps = {
  SET_CATEGORIA,
};

export default connect(mapStateToProps, mapDispatchToProps)(BuscadorCentral);
