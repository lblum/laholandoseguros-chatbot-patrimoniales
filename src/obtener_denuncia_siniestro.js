const OBTENER_DENUNCIA_SINIESTRO = 'rws/denuncia_asegurado/DENUNCIA_SINIESTRO';

let utils = require('utils');

const main = async () => {

  let data = {
    "p_o_sesion": user.get('IdSession'),
    "p_cod_sec": 3,
    "p_siniestro": 3946965
  };

  /*if (context.params.p_dominio != null && (context.params.p_dominio ?? '') != '')
    data.p_dominio = context.params.p_dominio;*/

  return await utils.getRESTData({
    uri: OBTENER_DENUNCIA_SINIESTRO,
    data: data,
    token: user.get('JWTokenDenunciaAsegurado'),
    ok: ((resp) => {
      user.set('URLDenuncia', resp.p_url_denuncia);
    }),
    error: ((error) => {
      user.set('URLDenuncia', null);
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
