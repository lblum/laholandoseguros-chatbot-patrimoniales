
const main = async () => {
bmconsole.log('entrando en la elegir_poliza');
bmconsole.log(user.get("Polizas"));
let listadoPolizas = [];
let polizas = user.get("Polizas");
if ( polizas != null ) { 
  // TODO -> try/catch
  polizas = JSON.parse(polizas);
  let i=0;
  polizas.forEach ( (p) => {
    listadoPolizas.push({
      id : i,
      name : `${p.poliza}`
    });
    i++;
  });
  user.set('listadoPolizas',JSON.stringify(listadoPolizas));
  bmconsole.log(JSON.stringify(listadoPolizas));
} else {
  throw new Error('Error en la elegir_polizas');
}

};

main()
  .then((x) => {
    ;
  })
  .catch(err => {
    // Code on error
    bmconsole.error(`[ERROR]: ${err.message}`);
  })
  .finally(() => {
    // Code on finish
    result.done();
  });