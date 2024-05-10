let utils = require('utils');

const main = async () => {
  user.set('error', null);

  await utils.loginAuxiliar('general');
};

main()
  .catch(err => {
    result.text(`[ERROR]: ${err.message}`);
  })
  .finally(() => {
    result.done();
  });