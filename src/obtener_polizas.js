const POLIZAS_CARTERA_URL = 'rws/listados/LIST_POLIZA_CARTERA';
let utils = require('utils');

const main = async () => {

  await utils.loginListados();

  let strTipoPoliza = user.get('tipoPoliza');

  let tipoPoliza = user.get("tipoPoliza")??"Automotores";

  let tipoFiltroPoliza = user.get('tipoFiltroPoliza')?? 'D';

  let filtroPoliza = null;

  // Valores default para las pruebas
  if ( tipoFiltroPoliza == 'C' ) {

      filtroPoliza = `${JSON.parse(user.get('Asegurado')).cod_asegurado}`;
      // TODO -> try/catch
  } else {
    filtroPoliza = user.get('dominioAsegurado')??'NEM-830';
    
  }
  filtroPoliza = filtroPoliza.toUpperCase()

  
  let data =
  {
    "p_cod_asegu": tipoFiltroPoliza == 'C' ? filtroPoliza : null,
    "p_cod_prod": user.get('CodProductor'),
    "p_cod_sec": utils.getSeccionByLabel(tipoPoliza), //3 -> automotores
    "p_cod_subramo": null,
    "p_endoso": null,
    "p_estado": "VIG",
    "p_limite": 1000,
    "p_medio_pago": null,
    "p_nropag": 0,
    "p_regxpag": 25,
    "p_o_sesion": user.get('IdSession'),
    "p_patente": tipoFiltroPoliza == 'D' ? filtroPoliza : null,
    "p_poliza": null,
    "p_tiene_siniestro": null,
    "p_regxpag": 25,
    "p_tiene_siniestro": null
  };

  user.set('Polizas', JSON.stringify([]));
  user.set("cantidadDePolizas" , 0);
  user.set("listadoPolizas" , JSON.stringify([]));
  

  return utils.getRESTData({
    uri: POLIZAS_CARTERA_URL,
    data: data,
    token: user.get('JWTokenListados'),

    ok: ((resp) => {
      if (resp.p_list_poliza_cartera.length == 0 ) {
        throw "No hay pólizas con esos datos";
      } else {
        let polizas = utils.getUniquePolizas(resp.p_list_poliza_cartera);
        if (polizas.length >= 10 ) {
          bmconsole.error(`[ERROR]: demasiadas pólizas con ese asegurado. Mostrando solo las primeras 10`);
          polizas = polizas.slice(0,10);
        }
        user.set('Polizas', JSON.stringify(polizas));
        user.set("cantidadDePolizas" , polizas.length);
      }
    }),
    error: ((error) => {
      bmconsole.log('error');
      user.set('Polizas', JSON.stringify([]));
      user.set("cantidadDePolizas" , 0);
      user.set("listadoPolizas" , JSON.stringify([]));
      throw "No hay pólizas con esos datos";
    }),
  });

};

main()
  .then((x) => {
    bmconsole.log('listo la obtener_polizas');
  })
  .catch(err => {
    // Code on error
    bmconsole.error(`[ERROR]: ${err.message}`);
  })
  .finally(() => {
    result.done();
  });
