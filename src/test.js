// Inicializo las variables para test local
user.set("codUsuario", "PRODEGUTIERREZ");
user.set("userPassword", "20RBVIDEO22");
user.set("tipoPoliza", 'Automotores');
user.set("tipoPoliza", 'Automotores');
user.set("JWToken", null);

let utils = require('utils');
let sendFile = require('send_document');

let Polizas = JSON.parse(user.get("Polizas"));
let Poliza = Polizas[0];




const main = async () => {
  let pdf = await utils.getPolizaCompleta(Poliza);
  sendFile.sendFile('xyzzy',pdf);
};

main()
  .catch(err => {
  })
  .finally(() => {
    result.done();
  });
