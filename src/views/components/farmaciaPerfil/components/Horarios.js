function DetalleBloques(props) {
  const { bloques } = props;
  return bloques ? (
    <div className="col-7">
      {bloques.map((b, i) => {
        return (
          <p className="my-0 pt-0">
            <small key={i}>
              {b.desde}-{b.hasta}
            </small>
          </p>
        );
      })}
    </div>
  ) : null;
}

function Horarios(props) {
  const { horarios } = props;
  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: "#ffffff",
        zIndex: 10,
        padding: 15,
        borderRadius: 13,
        boxShadow:
          "0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)",
        marginTop: 5,
      }}
    >
      {horarios.length > 0 ? (
        horarios.map((h, i) => {
          return (
            <div className="row my-1" key={i}>
              <div className="col-5">
                <b>{h.dia}</b>
              </div>
              <DetalleBloques bloques={h.bloques} />
            </div>
          );
        })
      ) : (
        <p>No hay horarios cargados</p>
      )}
    </div>
  );
}

export default Horarios;
