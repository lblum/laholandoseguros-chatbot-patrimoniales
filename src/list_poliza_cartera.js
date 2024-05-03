const POLIZAS_CARTERA_URL = 'rws/listados/LIST_POLIZA_CARTERA';
let utils = require('utils');

const main = async () => {

  if (utils.isInvalidJWT(user.get('JWTokenListados')))
    await utils.loginAuxiliar('listados');

  /*
  if ( context.params.asegurado != null && context.params.asegurado != undefined )
    data.p_filtro = context.params.asegurado;
  */

  let data =
  {
    "p_cod_prod": user.get('CodProductor'),
    "p_cod_asegu": null,
    "p_cod_sec": null,
    "p_cod_subramo": null,
    "p_poliza": null,
    "p_estado": null,
    "p_endoso": null,
    "p_medio_pago": null,
    "p_tiene_siniestro": null,
    "p_nropag": null,
    "p_regxpag": 25,
    "p_limite": 1000,
    "p_o_sesion": user.get('IdSessionListados')
  }


  utils.getRESTData({
    uri: POLIZAS_CARTERA_URL,
    data: data,
    token: user.get('JWTokenListados'),

    ok: ((resp) => {
      user.set('PolizaCartera', resp.p_list_poliza_cartera);
    }),
    error: ((error) => {
      user.set('PolizaCartera', null);
    }),
  });

};

main()
  .catch(err => {
    bmconsole.error(`[ERROR]: ${err.message}`);
  })
  .finally(() => {
    // Code on finish
    result.done();
  });
