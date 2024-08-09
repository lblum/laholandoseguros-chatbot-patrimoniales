const utils = require('utils');

const main = async () => {
  user.set('error', null);
  user.set('JWTokenListas',null);
  user.set('IdSessionListas',null);
  await utils.loginListas();
};

main()
  .catch(err => {
    result.text(`[ERROR]: ${err.message}`);
  })
  .finally(() => {
    result.done();
  });