let utils = require('utils');

const main = async () => {
  user.set('JWTokenPoliza',null)
  user.set('IdSessionPoliza',null)
  return await utils.loginAuxiliar('poliza');
};


main()
  .then((x) => {
    ;
  })
.catch(err => {
    result.text(`[ERROR]: ${err.message}`);
  })
  .finally(() => {
    result.done();
  });