let utils = require('utils');

const main = async () => {
  user.set('JWTokenPoliza',null)
  user.set('IdSessionPoliza',null)
  await utils.loginAuxiliar('poliza');
};


main()
  .catch(err => {
    result.text(`[ERROR]: ${err.message}`);
  })
  .finally(() => {
    result.done();
  });