const POLIZAS_CARTERA_URL = 'rws/listados/LIST_POLIZA_CARTERA';
let utils = require('utils');

const main = async () => {

  if (utils.isInvalidJWT(user.get('JWTokenListados')))
    await utils.loginAuxiliar('listados');

  let strTipoPoliza = user.get('tipoPoliza');

  let tipoPoliza = "3"; // TODO -> convertir

  let tipoFiltro = user.get('tipoFiltro')?? 'D';

  let filtroPoliza = null;

  // Valores default para las pruebas
  if ( tipoFiltro == 'C' ) {

      filtroPoliza = JSON.parse(user.get('Asegurado')).cod_asegurado;
      // TODO -> try/catch
  } else {
    filtroPoliza = user.get('dominioAsegurado')??'AB130KH';
  }

  let data =
  {
    "p_cod_asegu": tipoFiltro == 'C' ? filtroPoliza : null,
    "p_cod_prod": user.get('CodProductor'),
    "p_cod_sec": tipoPoliza, //3 -> automotores
    "p_cod_subramo": null,
    "p_endoso": null,
    "p_estado": "VIG",
    "p_limite": 1000,
    "p_medio_pago": null,
    "p_nropag": 0,
    "p_regxpag": 25,
    "p_o_sesion": user.get('IdSession'),
    "p_patente": tipoFiltro == 'D' ? filtroPoliza : null,
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
      if (resp.p_list_poliza_cartera.length == 0 ) {
        throw "No hay pólizas con esos datos";
      } else {
        if (resp.p_list_poliza_cartera.length >= 4 ) {
          bmconsole.error(`[ERROR]: demasiadas pólizas con ese asegurado. Mostrando solo las primeras 4`);
          resp.p_list_poliza_cartera = resp.p_list_poliza_cartera.slice(0,4);
        }
        user.set('Polizas', JSON.stringify(resp.p_list_poliza_cartera));
      }
      user.set("cantidadDePolizas" , resp.p_list_poliza_cartera.length);
    }),
    error: ((error) => {
      bmconsole.log('error');
      user.set('Polizas', null);
      user.set("cantidadDePolizas" , 0);
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
