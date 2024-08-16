const utils = require('utils');

const main = async () => {
  user.set('error', null);
  user.set('JWTokenListas',null);
  user.set('IdSessionListas',null);
  return await utils.loginListas();
};

main()
  .then ((x) => {
    bmconsole.log(`JWTokenListas -> ${user.get('JWTokenListas')}`);
  })
  .catch(err => {
    result.text(`[ERROR]: ${err.message}`);
  })
  .finally(() => {
    result.done();
  });