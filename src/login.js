const LOGIN_URL = 'rws/holandonet/login';

const utils = require('utils');
const main = async () => {
  utils.initData();
  user.set('JWToken' , null);
  user.set('IdSession' , null);


  utils.resetData(); 

  return await utils.login();
};

main()
  .then ( (x) => {} )
  .catch(err => {
    // Code on error
    bmconsole.error(`[ERROR]: ${err.message}`);
  })
  .finally(() => {
    // Code on finish
    result.done();
  });
