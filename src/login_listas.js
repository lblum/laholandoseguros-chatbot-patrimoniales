const utils = require('utils');

const main = async () => {
  user.set('error', null);
  user.set('JWTokenListas',null);
  user.set('IdSessionListas',null);
  return await utils.loginListas();
};

main()
.then ( (x) => {} )
.catch(err => {
    result.text(`[ERROR]: ${err.message}`);
  })
  .finally(() => {
    result.done();
  });