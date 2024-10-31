// es igual que la elegir póliza, pero sin considerar endosos
const main = async () => {
  let listadoPolizas = [];
  let polizas = user.get("Polizas");
  if (polizas != null) {
    // TODO -> try/catch
    polizas = JSON.parse(polizas);
    let i = 0;
    polizas.forEach((p) => {
      let already = listadoPolizas.some(e => e.poliza == p.poliza);
      if (!already) {
        listadoPolizas.push({
          id: i,
          poliza: p.poliza,
          name: `${p.p_x_idriesgo} ${p.poliza}`
        });
      }
      i++;
    });
    user.set('listadoPolizas', JSON.stringify(listadoPolizas));
  } else {
    throw new Error('Error en la elegir_polizas_u');
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