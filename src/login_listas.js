const main = async () => {
  let utils = require('utils');

  if (utils.isInvalidJWT(user.get('JWTokenListas')))
    await utils.loginAuxiliar('listas');

};


main()
  .catch(err => {
    bmconsole.error(`[ERROR]: ${err.message}`);
  })
  .finally(() => {
    // Code on finish
    result.done();
  });


