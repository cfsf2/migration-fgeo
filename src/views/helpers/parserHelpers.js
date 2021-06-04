export const DescripcionFormat = (descripcion) => {
  switch (descripcion) {
    case "productos":
      return "Productos";
    case "recetaParticular":
      return "Receta particular";
    case "recetaPami":
      return "Receta pami";
    case "recetaObraSocial":
      return "Receta con obra social";
    default:
      return "Otros";
  }
};
export const FechaFormat = (fecha) => {
  return fecha.substring(0, 10);
};
