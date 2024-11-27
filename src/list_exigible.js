const OBTENER_EXIGIBLE_URL = 'rws/listados/LIST_EXIG';

let utils = require('utils');

const main = async () => {

  user.set('error', null);

  await utils.loginListados();


  let i = 0;
  try {
    let opcionPoliza = JSON.parse(user.get('opcionPoliza'));
    i = opcionPoliza.id;
  } catch (error) {

  }

  let Polizas = JSON.parse(user.get('Polizas'));

  let Poliza = Polizas[i];
  let cuotas = [];
  let maxDate = moment().add(30, 'days').startOf('day').format('DD/MM/YYYY');
  let minDate = '01/01/2000';

  let data =
  {
    "p_cod_asegu": Poliza.cod_asegu,
    "p_cod_sec": Poliza.cod_sec,
    "p_forma_pago": "",
    "p_cod_suc": null,
    "p_cod_prod": user.get('CodProductor'),
    "p_o_sesion": user.get('IdSession'),
    "p_limite": 1000,
    "p_nropag": 0,
    "p_regxpag": 25,
    "p_fecha_desde": minDate,
    "p_fecha_hasta": maxDate,
  };


  await utils.getRESTData({
    uri: OBTENER_EXIGIBLE_URL,
    data: data,
    token: user.get('JWTokenListados'),
    ok: ((resp) => {
      resp.p_list_exig.forEach(c => {
        let importe = c.imp_pend_cuota.replaceAll(',','-').replaceAll('.',',').replaceAll('-','.').replaceAll(' ','');
        cuotas.push({
          fec_vto: c.vto_cuota,
          texto: `Endoso ${c.endoso.replaceAll('.','')}, Cuota nro ${c.nro_cuota} Vto:${c.vto_cuota} $${importe}`,
        });
      });
    }),
    error: ((error) => {
      bmconsole.error(`[ERROR]: ${error}`);
      result.text("Hubo un error al buscar los datos de las cuotas");
      return;
    }),
  });
  for (let index = 0; index < cuotas.length; index++) {
    result.text(cuotas[index].texto);
  }
};
main()
  .then((x) => {
    ;
  })
  .catch(err => {
    bmconsole.error(`[ERROR]: ${err.message}`);
    result.text("Hubo un error al buscar los datos de las cuotas");
  })
  .finally(() => {
    // Code on finish
    result.done();
  });
