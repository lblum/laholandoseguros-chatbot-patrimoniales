const OBTENER_POLIZA_URL = 'rws/listas/LIST_DOMINIOS_POLIZAS';

let utils = require('utils');

const main = async () => {

  user.set('error',null);

  let data = {
    "p_o_sesion": user.get('IdSession'),
    "p_limite": 1000,
    "p_nropag": 0,
    "p_cod_prod": user.get('CodProductor'),
    "p_filtro": '',
    "p_poliza": '',
    "p_dominio": user.get('dominioAsegurado')??'AB130KH'
  };
 
  return await utils.getRESTData({
    uri: OBTENER_POLIZA_URL,
    data: data,
    token: user.get('JWTokenListas'),
    ok: ((resp) => {    
      if (resp.p_list_dominios_polizas.length == 0 ) {
        throw "No hay pólizas con ese dominio";
      }
      user.set('Polizas', JSON.stringify(resp.p_list_dominios_polizas));
    }),
    error: ((error) => {
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
  })
  .finally(() => {
    // Code on finish
    result.done();
  });
