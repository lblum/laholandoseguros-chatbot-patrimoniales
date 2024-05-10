let utils = require('utils');

const main = async () => {
  user.set('error', null);

  await utils.loginAuxiliar('poliza');
};

main()
  .catch(err => {
    result.text(`[ERROR]: ${err.message}`);
  })
  .finally(() => {
    result.done();
  });