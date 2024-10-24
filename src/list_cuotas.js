const OBTENER_ASEGURADO_URL = 'rws/boton_pago_app/LIST_CUOTAS';

let utils = require('utils');

const main = async () => {

  user.set('error',null);

  await utils.loginBotonPago();

  let Poliza = JSON.parse(user.get('Polizas'))[0];

  let data = {
    "p_o_sesion": user.get('IdSession'),
    "p_cod_sec": Poliza.cod_sec,
    "p_poliza": Poliza.poliza,
    "p_endoso": Poliza.endoso,
  };

  return await utils.getRESTData({
    uri: OBTENER_ASEGURADO_URL,
    data: data,
    token: user.get('JWTokenBotonPagoApp'),
    ok: ((resp) => {    
      if ( resp.p_list_cuotas.length == 0 ) {
        result.text('No hay cuotas para mostrar');
      } else {
        resp.p_list_cuotas.forEach(c => {
          f = moment(c.fec_vto).format('DD/MM/YYYY');
          i = Intl.NumberFormat('es-ar', { style: 'currency', currency: 'EUR' }).format(c.importe);
          i = i.replace('EUR', c.signo_moneda);
          //i = c.importe.toLocaleString();
          result.text(`Vto:${f} ${i} (${c.estado})`);
        });
      }
    }),
    error: ((error) => {
      ;
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
    result.text("Hubo un error al buscar los datos de las cuotas");
  })
  .finally(() => {
    // Code on finish
    result.done();
  });
