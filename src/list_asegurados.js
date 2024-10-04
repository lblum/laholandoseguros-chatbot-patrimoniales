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
    "p_filtro": user.get('cuitAsegurado')??'27256265864',
    "p_regxpag": 10,
  };

  user.set('Asegurado', null);
 
  return await utils.getRESTData({
    uri: OBTENER_ASEGURADO_URL,
    data: data,
    token: user.get('JWTokenListas'),
    ok: ((resp) => {    
      if (resp.p_list_asegurados.length == 0 ) {
        result.text("No hay asegurados con esos datos");
      } else if ( resp.p_list_asegurados.length > 1 ){
          result.text("Hay mas de un asegurado con esos datos. Por favor, refine su búsqueda");
      } else 
        user.set('Asegurado', JSON.stringify(resp.p_list_asegurados[0]));
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
