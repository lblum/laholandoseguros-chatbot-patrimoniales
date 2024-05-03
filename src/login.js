const LOGIN_URL = 'rws/holandonet/login';

let utils = require('utils');

const main = async () => {
  user.set('error', null);
  user.set('JWToken', null);
  user.set('JWTokenListas', null);

  let data =
  {
    "p_usuario": "PRODEGUTIERREZ",
    "p_enc_pwd": "20RBVIDEO22"
  };

  if (context.params.user != null && context.params.user != undefined)
    data.p_usuario = context.params.user;
  if (context.params.password != null && context.params.password != undefined)
    data.p_enc_pwd = context.params.password;

  return await utils.getRESTData({
    uri: LOGIN_URL,
    data: data,
    ok: ((resp) => {
      user.set('IdSession', resp.payload.p_o_sesion);
      user.set('JWToken', resp.token);
    }),
    error: ((error) => {
      bmconsole.log(error);
      user.set('IdSession', null);
      user.set('JWToken', null);
    }),
  });
};

main()
  .then((x) => {
    ;
  })
  .catch(err => {
    // Code on error
    bmconsole.error(`[ERROR]: ${err.message}`);
  })
  .finally(() => {
    // Code on finish
    result.done();
  });
