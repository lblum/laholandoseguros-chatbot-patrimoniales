let utils = require('utils');

const main = async () => {
  user.set('error', null);

  return await utils.loginAuxiliar('listados');
};

main()
  .then ( (x) => {} )
  .catch(err => {
    result.text(`[ERROR]: ${err.message}`);
  })
  .finally(() => {
    result.done();
  });