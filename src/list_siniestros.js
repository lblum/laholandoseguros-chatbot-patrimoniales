const POLIZAS_CARTERA_URL = 'rws/listados/LISTADO_SINIESTROS';
let utils = require('utils');

const main = async () => {

  await utils.loginListados();

  let data = {
    "p_o_sesion": user.get('IdSession'),
    "p_limite": 1000,
    "p_nropag": 0,
    "p_regxpag": 1000,
    "p_cod_poliza": null,
    "p_cod_sec": null,//", //3 -> automotores
    "p_cod_prod": user.get('CodProductor'),
    "p_t_carga_web": null,
    "p_o_siniestro": null,
    "p_cod_suc": null,
    "p_o_aviso": null,
    "p_x_asegurado": "",
    "p_x_tramitador": null,
    "p_fec_siniestro": '17/09/2024'/* startDate ??
        DateFormat('dd/MM/yyyy')
            .format(DateTime.now().subtract(Duration(days: 90))),
    "p_fec_hasta": endDate ?? DateFormat('dd/MM/yyyy').format(DateTime.now())*/,
    "p_estado": null
  };

  user.set('Siniestros', null);

  return await utils.getRESTData({
    uri: POLIZAS_CARTERA_URL,
    data: data,
    token: user.get('JWTokenListados'),

    ok: ((resp) => {
      user.set('Siniestros', JSON.stringify(resp.p_list_siniestros));
      bmconsole.log('ok');
    }),
    error: ((error) => {
      bmconsole.log('error');
      user.set('Siniestros', null);
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
