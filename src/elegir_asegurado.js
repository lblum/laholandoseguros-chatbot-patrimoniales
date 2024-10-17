
const main = async () => {
  let listadoAsegurados = [];
  let Asegurados = user.get("Asegurados");
  if (Asegurados != null) {
    // TODO -> try/catch
    Asegurados = JSON.parse(Asegurados);
    let i = 0;
    Asegurados.forEach((p) => {
      listadoAsegurados.push({
        id: i,
        name: `${p.ape_nom_rsoc} - ${p.cuit}`
      });
      i++;
    });
    user.set('listadoAsegurados', JSON.stringify(listadoAsegurados));
  } else {
    throw new Error('Error en la elegir_Asegurados');
  }

};

main()
  .then((x) => {
    ;
  })
  .catch((err) => {
    // Code on error
    bmconsole.error(`[ERROR]: ${err.message}`);
  })
  .finally(() => {
    // Code on finish
    result.done();
  });