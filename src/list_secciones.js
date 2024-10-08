const DATOS_URL = 'rws/listas/LIST_TIPOS_SECCIONES';

const utils = require('utils');

const main = async () => {
  user.set('error', null);
  
/*  await utils.loginListas();

  let data =
  {
    "p_o_sesion": user.get('IdSession')
  };


  await utils.getRESTData({
    uri: DATOS_URL,
    data: data,
    token: user.get('JWTokenListas'),

    ok: ((resp) => {
      ;
    }),
    error: ((error) => {
      throw new Error(error);
    }),
  });
  */
 await utils.listSecciones();
};

main()
  .then((x) => {
    ;
  })
  .catch(err => {
    result.text(`[ERROR]: ${err.message}`);
  })
  .finally(() => {
    result.done();
  });