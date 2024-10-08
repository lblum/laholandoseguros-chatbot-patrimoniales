const DATOS_URL = 'rws/listas/LIST_DATOS_USER';

const utils = require('utils');

const main = async () => {
  user.set('error', null);
  
  await utils.loginListas();

  // Por el momento, la lista de secciones es la misma para todo
  // el mundo, pero en un futuro cercano, eso pueded cambiar x productor

  // await utils.listSecciones();

  let data =
  {
    "p_o_sesion": user.get('IdSession')
  };


  await utils.getRESTData({
    uri: DATOS_URL,
    data: data,
    token: user.get('JWTokenListas'),

    ok: ((resp) => {
      let usr = resp.p_list_user[0];
      user.set('CodProductor', usr.cod_prod);
      user.set('nombre', usr.nombre_user);
    }),
    error: ((error) => {
      user.set('CodProductor', null);
      user.set('nombre', null);
      throw new Error(error);
    }),
  });
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