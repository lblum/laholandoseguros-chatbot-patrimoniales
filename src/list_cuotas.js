const OBTENER_ASEGURADO_URL = 'rws/boton_pago_app/LIST_CUOTAS';

let utils = require('utils');

const main = async () => {

  user.set('error', null);

  await utils.loginBotonPago();


  let i = 0;
  try {
    let opcionPoliza = JSON.parse(user.get('opcionPoliza'));
    i = opcionPoliza.id;
  } catch (error) {

  }

  let Polizas = JSON.parse(user.get('Polizas'));

  let Poliza = Polizas[i];
  let cuotas = [];
  for (i = 0; i < Polizas.length; i++) {
    if (Polizas[i].poliza == Poliza.poliza) {
      let data = {
        "p_o_sesion": user.get('IdSession'),
        "p_cod_sec": Polizas[i].cod_sec,
        "p_poliza": Polizas[i].poliza,
        "p_endoso": Polizas[i].endoso,
      };
      await utils.getRESTData({
        uri: OBTENER_ASEGURADO_URL,
        data: data,
        token: user.get('JWTokenBotonPagoApp'),
        ok: ((resp) => {
          let maxDate = moment().add(30, 'days').startOf('day');
          resp.p_list_cuotas.forEach(c => {
            let fec = moment(c.fec_vto);
            f = fec.format('DD/MM/YYYY');
            if (fec <= maxDate && c.estado.toUpperCase() == 'PENDIENTE') {
              importe = Intl.NumberFormat('es-ar', { style: 'currency', currency: 'EUR' }).format(c.importe);
              importe = importe.replace('EUR', c.signo_moneda);
              //i = c.importe.toLocaleString();
              cuotas.push({
                fec_vto: fec,
                texto: `Endoso ${Polizas[i].endoso}, Cuota nro ${c.nro_cuota} Vto:${f} ${importe}`,
              });
            }
          });
        }),
        error: ((error) => {
          bmconsole.error(`[ERROR]: ${err.message}`);
          result.text("Hubo un error al buscar los datos de las cuotas");
          return;
        }),
      });
    }
  }

  // TODO: Ordenar las cuotas por fecha
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
