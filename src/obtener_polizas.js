const POLIZAS_CARTERA_URL = 'rws/listados/LIST_POLIZA_CARTERA';
let utils = require('utils');

const main = async () => {

  user.set('Polizas', JSON.stringify([]));
  user.set("cantidadDePolizas", 0);
  user.set("listadoPolizas", JSON.stringify([]));



  await utils.loginListados();

  let tipoPoliza = user.get("tipoPoliza");

  let tipoFiltroPoliza = user.get('tipoFiltroPoliza') ?? 'P';

  let filtroPoliza = null;
  user.set('error', null);

  // Valores default para las pruebas
  if (tipoFiltroPoliza == 'C') {
    let asegurados = JSON.parse(user.get('Asegurados'));
    let opcionAsegurado = null;
    try {
      opcionAsegurado = JSON.parse(user.get('opcionAsegurado'));
      let i = opcionAsegurado.id;
      filtroPoliza = `${asegurados[i].cod_asegurado}`;
    } catch {
      filtroPoliza = `${asegurados[0].cod_asegurado}`
    }

    // TODO -> try/catch
  } else if (tipoFiltroPoliza == 'D') {
    filtroPoliza = user.get('dominioAsegurado') ?? 'AB130KH';
    // Para el caso de que la póliza tenga exactamente 6 dígitos, le agrego el -
    if (filtroPoliza.length == 6) {
      filtroPoliza = filtroPoliza.substring(0, 3) + '-' + filtroPoliza.substring(3, 6);
    }
  } else if (tipoFiltroPoliza == 'P') {
    filtroPoliza = user.get('numeroPoliza') ?? '4121284';
  }
  filtroPoliza = filtroPoliza.toUpperCase()



  let data =
  {
    "p_cod_asegu": tipoFiltroPoliza == 'C' ? filtroPoliza : null,
    "p_cod_prod": user.get('CodProductor'),
    "p_cod_sec": utils.getSeccionByLabel(tipoPoliza),
    "p_cod_subramo": null,
    "p_endoso": null,
    "p_estado": "VIG",
    "p_limite": 1000,
    "p_medio_pago": null,
    "p_nropag": 0,
    "p_regxpag": 25,
    "p_o_sesion": user.get('IdSession'),
    "p_patente": tipoFiltroPoliza == 'D' ? filtroPoliza : null,
    "p_poliza": tipoFiltroPoliza == 'P' ? filtroPoliza : null,
    "p_tiene_siniestro": null,
    "p_regxpag": 25,
    "p_tiene_siniestro": null
  };

  return await utils.getRESTData({
    uri: POLIZAS_CARTERA_URL,
    data: data,
    token: user.get('JWTokenListados'),

    ok: ((resp) => {
      bmconsole.log('1');
      if (resp.p_list_poliza_cartera.length == 0) {
        user.set('Polizas', JSON.stringify([]));
        user.set("cantidadDePolizas", 0);
        user.set("listadoPolizas", JSON.stringify([]));
        return;
      } else {
        let polizas_all = utils.getUniquePolizas(resp.p_list_poliza_cartera);
        // En el caso de que hayan pedido cuponera, elimino las que tienen otras formas de pago
        let polizas = [];
        let codDocumento = user.get("consultaPoliza") ?? '';
        for (let i = 0; i < polizas_all.length; i++) {
          if (codDocumento.toUpperCase() != 'CUPONERA' || (polizas_all[i].forma_pago != null && polizas_all[i].forma_pago.toUpperCase() == 'CUPONERA'))
            polizas.push(polizas_all[i]);
        }
        if (polizas.length >= 10) {
          bmconsole.error(`[ERROR]: demasiadas pólizas con ese asegurado. Mostrando solo las primeras 10`);
          polizas = polizas.slice(0, 10);
        }
        user.set('Polizas', JSON.stringify(polizas));
        user.set("cantidadDePolizas", polizas.length);
        bmconsole.log(polizas.length);
      }
    }),
    error: ((error) => {
      bmconsole.log('error');
      user.set('Polizas', JSON.stringify([]));
      user.set("cantidadDePolizas", 0);
      user.set("listadoPolizas", JSON.stringify([]));
      throw "No hay pólizas con esos datos";
    }),
  });

};

main()
  .then((x) => {
    bmconsole.log('listo la obtener_polizas');
  })
  .catch((err) => {
    bmconsole.error(`[ERROR]: ${err.message}`);
  })
  .finally(() => {
    result.done();
  });
