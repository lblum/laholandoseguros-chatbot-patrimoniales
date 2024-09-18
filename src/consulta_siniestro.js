<<<<<<<
const OBTENER_SINIESTROS = 'rws/listados/LISTADO_SINIESTROS';
=======
const OBTENER_SINIESTROS = 'rws/listados/LISTADO_SINIESTROS';
>>>>>>>

<<<<<<<
let utils = require('utils');

=======
let utils = require('utils');

>>>>>>>
const main = async () => {
<<<<<<<

  let data = {
    "p_o_sesion": user.get('IdSession'),
    "p_limite": 1000,
    "p_nropag": 0,
    "p_regxpag": 1000,
    "p_cod_prod": user.get('CodProductor'),
    "p_cod_poliza": null,
    "p_cod_sec": null,
    "p_t_carga_web": null,
    "p_o_siniestro": null,
    "p_cod_suc": null,
    "p_o_aviso": null,
    "p_x_asegurado": "",
    "p_x_tramitador": null,
    "p_fec_siniestro": '', // Hoy menos 90 días
    "p_fec_hasta": null,
    "p_estado": null
  };

  /*if (context.params.p_dominio != null && (context.params.p_dominio ?? '') != '')
    data.p_dominio = context.params.p_dominio;*/

  return await utils.getRESTData({
    uri: OBTENER_SINIESTROS,
    data: data,
    token: user.get('JWTokenListados'),
    ok: ((resp) => {
      user.set('Siniestros', JSON.stringify(resp.p_list_siniestros));
    }),
    error: ((error) => {
      user.set('Siniestros', null);
    }),
  });
=======

  let data = {
    "p_o_sesion": user.get('IdSession'),
    "p_limite": 1000,
    "p_nropag": 0,
    "p_regxpag": 1000,
    "p_cod_prod": user.get('CodProductor'),
    "p_cod_poliza": null,
    "p_cod_sec": null,
    "p_t_carga_web": null,
    "p_o_siniestro": null,
    "p_cod_suc": null,
    "p_o_aviso": null,
    "p_x_asegurado": "",
    "p_x_tramitador": null,
    "p_fec_siniestro": '', // Hoy menos 90 días
    "p_fec_hasta": null,
    "p_estado": null
  };

  /*if (context.params.p_dominio != null && (context.params.p_dominio ?? '') != '')
    data.p_dominio = context.params.p_dominio;*/

  return await utils.getRESTData({
    uri: OBTENER_SINIESTROS,
    data: data,
    token: user.get('JWTokenListados'),
    ok: ((resp) => {
      user.set('Siniestros', JSON.stringify(resp.p_list_siniestros));
    }),
    error: ((error) => {
      user.set('Siniestros', null);
    }),
  });
>>>>>>>
};

main()
<<<<<<<
  .then((x) => {
    ;
  })
=======
  .then((x) => {
    ;
  })
>>>>>>>
  .catch(err => {
    // Code on error
<<<<<<<
=======
>>>>>>>
    bmconsole.error(`[ERROR]: ${err.message}`);
  })
<<<<<<<
  .finally(() => {
=======
  .finally(() => {
>>>>>>>
    // Code on finish
    result.done();
  });
