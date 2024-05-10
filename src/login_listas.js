let utils = require('utils');

const main = async () => {
  user.set('error', null);

  await utils.loginAuxiliar('listas');
};

main()
  .catch(err => {
    result.text(`[ERROR]: ${err.message}`);
  })
  .finally(() => {
    result.done();
  });