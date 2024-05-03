const DOCUMENTO_POLIZA_URL = 'rws/poliza/OBTENER_DOCUMENTO';

let utils = require('utils');

const main = async () => {
  await utils.loginPoliza();

  let data =
  {
    "p_o_sesion": user.get('IdSession'),
    "p_cod_documento": "CREDENCIAL",
    "p_cod_sec": 0,
    "p_poliza": 0,
    "p_endoso": 0
  };

  let Poliza = JSON.parse(user.get('Poliza'));
  data.p_cod_sec = Poliza.cod_sec;
  data.p_poliza = Poliza.poliza;

  return await utils.getRESTData({
    uri: DOCUMENTO_POLIZA_URL,
    data: data,
    token: user.get('JWTokenPoliza'),
    ok: ((resp) => {
      user.set('Documento', resp.p_documento);
      ;
    }),
    error: ((error) => {
      user.set('Documento', null);
      ;
    }),
  });


};

main()
  .then((x) => {
    ;
  })

  .catch(err => {
    bmconsole.error(`[ERROR]: ${err.message}`);
  })
  .finally(() => {
    // Code on finish
    result.done();
  });
