const utils = require('utils');

const main = async () => {
  user.set('error', null);
  user.set('JWTokenListas',null)
  user.set('IdSessionListas',null)
  await utils.loginAuxiliar('listas');
  bmconsole.log(user.get('IdSession'));
  bmconsole.log(user.get('JWTokenListas'));
};

main()
  .catch(err => {
    result.text(`[ERROR]: ${err.message}`);
  })
  .finally(() => {
    result.done();
  });