let utils = require('utils');

const main = async () => {
  user.set('JWTokenPoliza',null)
  user.set('IdSessionPoliza',null)
  await utils.loginAuxiliar('poliza');
  bmconsole.log(user.get('IdSessionPoliza'));
  bmconsole.log(user.get('JWTokenPoliza'));};

main()
  .catch(err => {
    result.text(`[ERROR]: ${err.message}`);
  })
  .finally(() => {
    result.done();
  });