const OBTENER_ASEGURADO_URL = 'rws/listas/LIST_ASEGURADOS';

let utils = require('utils');

const main = async () => {

  user.set('error',null);

  await utils.loginListas();

  let data = {
    "p_o_sesion": user.get('IdSession'),
    "p_limite": 1000,
    "p_nropag": 0,
    "p_cod_prod": user.get('CodProductor'),
    "p_filtro": user.get('cuitAsegurado'),
    "p_regxpag": 11,
  };

  user.set('Asegurado', null);
 
  return await utils.getRESTData({
    uri: OBTENER_ASEGURADO_URL,
    data: data,
    token: user.get('JWTokenListas'),
    ok: ((resp) => {    
      if (resp.p_list_asegurados.length == 0 ) {
        result.text("No hay asegurados con esos datos");
      } else {
        let asegurados = [];

        resp.p_list_asegurados.forEach( r => {
          asegurados.push({
            ape_nom_rsoc : r.ape_nom_rsoc,
            cod_asegurado: r.cod_asegurado,
          });
        });

        if (asegurados.length >= 10 ) {
          bmconsole.error(`[ERROR]: demasiados asegurados con esos datos. Mostrando solo las primeros 10`);
          asegurados = asegurados.slice(0,10);
        }
        user.set('Asegurado', JSON.stringify(asegurados[0]));
        user.set('Asegurados', JSON.stringify(asegurados));
        user.set("cantidadDeAsegurados" , asegurados.length);

      }
    }),
    error: ((error) => {
      user.set('Asegurado', null);
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
    result.text("Hubo un error al buscar los datos del asegurado");
  })
  .finally(() => {
    // Code on finish
    result.done();
  });
