const main = async () => {
  /*await result.buttonsBuilder()
  .text('select an option')
  .addButton('1', 'Flujo normal')
  .addButton('2', 'Sin credenciales almacenadas?')
  .send();*/
  result.gotoRule('Flujo normal');
};

main()
  .then((x) => {
    ;
  })

  .catch(err => {
    bmconsole.error(`[ERROR]: ${err.message}`);
    result.text(JSON.parse(user.get('Polizas')));//`[ERROR]: ${err.message}`);
  })
  .finally(() => {
    // Code on finish
    result.done();
  });
