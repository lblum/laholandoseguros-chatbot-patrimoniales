
const main = async () => {

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
  });
  user.set('listadoPolizas',JSON.stringify(listadoPolizas));
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