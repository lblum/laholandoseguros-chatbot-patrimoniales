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
  
  /*
  let data =
  {
    "p_usuario": "PRODEGUTIERREZ",
    "p_enc_pwd": "20RBVIDEO22"
  }
  */

  let data =
  {
    "p_usuario": user.get("codUsuario")??"PRODEGUTIERREZ",
    "p_enc_pwd": user.get("userPassword")??"20RBVIDEO22",
    "p_cod_t_usuario": "P"
  };

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
