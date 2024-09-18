const POLIZAS_CARTERA_URL = 'rws/listados/LIST_POLIZA_CARTERA';
let utils = require('utils');

const main = async () => {

  await utils.loginListados();

  let data =
  {
    "p_cod_asegu": null,
    "p_cod_prod": user.get('CodProductor'),
    "p_cod_sec": "3", //3 -> automotores
    "p_cod_subramo": null,
    "p_endoso": null,
    "p_estado": null,
    "p_limite": 1000,
    "p_medio_pago": null,
    "p_nropag": 0,
    "p_regxpag": 25,
    "p_o_sesion": user.get('IdSession'),
    "p_patente" : "AB130KH",
    "p_poliza": null,
    "p_tiene_siniestro": null,
    "p_regxpag": 25,
    "p_tiene_siniestro": null
  }


  return await utils.getRESTData({
    uri: POLIZAS_CARTERA_URL,
    data: data,
    token: user.get('JWTokenListados'),

    ok: ((resp) => {
      user.set('Polizas', JSON.stringify(resp.p_list_poliza_cartera));
      bmconsole.log('ok');
    }),
    error: ((error) => {
      bmconsole.log('error');
      user.set('Polizas', null);
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
    usr.set('error',null);
  })
  .finally(() => {
    // Code on finish
    result.done();
  });
