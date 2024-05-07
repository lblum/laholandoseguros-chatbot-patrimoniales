const OBTENER_POLIZA_URL = 'rws/listas/LIST_DOMINIOS_POLIZAS';

let utils = require('utils');

const main = async () => {

  await utils.loginListas();

  let data = {
    "p_o_sesion": user.get('IdSession'),
    "p_limite": 1000,
    "p_nropag": 0,
    "p_cod_prod": user.get('CodProductor'),
    "p_filtro": '',//searchType == SearchType.ASEGURADOS ? query : '',
    "p_poliza": '',//searchType == SearchType.POLIZAS ? query : '',
    "p_dominio": 'AB130KH'
  };

  if (context.params.dominio != null && context.params.dominio != undefined)
    data.p_dominio = context.params.dominio;

  return await utils.getRESTData({
    uri: OBTENER_POLIZA_URL,
    data: data,
    token: user.get('JWTokenListas'),
    ok: ((resp) => {
      user.set('Poliza', JSON.stringify(resp.p_list_dominios_polizas[0]));
    }),
    error: ((error) => {
      user.set('Poliza', null);
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