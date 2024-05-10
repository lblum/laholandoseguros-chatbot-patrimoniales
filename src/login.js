const LOGIN_URL = 'rws/holandonet/login';

const utils = require('utils');

const main = async () => {

  user.set('error' , null);
  user.set('JWToken' , null);
  user.set('JWTokenListas' , null);
  user.set('JWTokenPoliza' , null);
  user.set('IdSession' , null);
  user.set('IdSessionListas' , null);
  user.set('IdSessionPoliza' , null);
  user.set('IdSessionListados' , null);
  user.set('JWTokenListados' , null);
  user.set('IdSessionGeneral' , null);
  user.set('JWTokenGeneral' , null);
  user.set('CodProductor' , null);
  user.set('nombre' , null);
  
  let data =
  {
    "p_usuario": "PRODEGUTIERREZ",
    "p_enc_pwd": "20RBVIDEO22"
  }

  if (context.params.user != null && (context.params.user?? '') != '')
    data.p_usuario = context.params.user;
  if (context.params.password != null && (context.params.password??'') != '')
    data.p_enc_pwd = context.params.password;


bmconsole.log('Dentro de la login 2');

  return await utils.getRESTData({
    uri: LOGIN_URL,
    data: data,
    ok: ((resp) => {
      bmconsole.log(`Login OK ${resp.payload.p_o_sesion}`);
      user.set('IdSession', resp.payload.p_o_sesion);
      user.set('JWToken', resp.token);
    }),
    error: ((error) => {
      bmconsole.log(`Error en el login ${error}`);
      user.set('IdSession', null);
      user.set('JWToken', null);
    }),
  });

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
