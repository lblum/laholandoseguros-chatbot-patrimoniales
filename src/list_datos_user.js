const DATOS_URL = 'rws/listas/LIST_DATOS_USER';

let utils = require('utils');

const main = async () => {
  user.set('error', null);


  let x = await utils.loginListas();

  let data =
  {
    "p_o_sesion": user.get('IdSession'),
  };


  return await utils.getRESTData({
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
      result.text(error);
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
    // Code on finish
    result.done();
  });