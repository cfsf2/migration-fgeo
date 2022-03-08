import React, { Component } from "react";
import "../../../css/farmacias.css";
import { connect } from "react-redux";
import { Col, Row, Container } from "reactstrap";
import { GET_PEDIDOS } from "../../../redux/actions/PedidosActions";
import { DescripcionFormat, FechaFormat } from "../../helpers/parserHelpers";
import Pagination from "react-js-pagination";

class MisPedidos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      min: 0,
      max: 5,
      activePage: 1,
    };
  }
  componentDidMount() {
    const { user_farmageo } = this.props.UsuarioReducer;
    this.props.GET_PEDIDOS(user_farmageo.usuario);
  }

  componentDidUpdate(prevProps) {
    const { user_farmageo } = this.props.UsuarioReducer;
    if (prevProps.UsuarioReducer.user_farmageo != user_farmageo) {
      this.props.GET_PEDIDOS(user_farmageo.usuario);
    }
  }

  handlePageChange(pageNumber) {
    this.setState({
      activePage: pageNumber,
      max: pageNumber * 5,
      min: pageNumber * 5 - 5,
    });
  }

  render() {
    const { auth, user_farmageo } = this.props.UsuarioReducer;
    const { mis_pedidos } = this.props.PedidosReducer;
    const { min, max, activePage } = this.state;

    return !user_farmageo || !auth ? null : (
      <Container style={{ backgroundColor: "#F4F4F4" }} className="p-4">
        <Row>
          <Col md="4" align="center">
            MIS PEDIDOS ({mis_pedidos.length})
          </Col>
          <Col md="8" style={{ borderLeft: "solid 1px black" }}>
            <div
              style={{
                width: "100%",
                paddingRight: 20,
              }}
            >
              <ul>
                {mis_pedidos
                  .reverse()
                  .slice(min, max)
                  .map((pedido, i) => {
                    return (
                      <li key={i} style={{ lineHeight: 0.4, marginTop: 30 }}>
                        <p>
                          <b>Farmacia {pedido.nombrefarmacia}</b>
                          <span className="float-right">
                            {FechaFormat(pedido.fechamodificacion)}{" "}
                          </span>
                        </p>
                        <p>{DescripcionFormat(pedido.descripcion)}</p>
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className="row centrado-2">
              <div className="col">
                <Pagination
                  activePage={activePage}
                  itemsCountPerPage={5}
                  totalItemsCount={mis_pedidos.length}
                  pageRangeDisplayed={5}
                  onChange={this.handlePageChange.bind(this)}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    UsuarioReducer: state.UsuarioReducer,
    PedidosReducer: state.PedidosReducer,
  };
};

const mapDispatchToProps = {
  GET_PEDIDOS,
};

export default connect(mapStateToProps, mapDispatchToProps)(MisPedidos);
