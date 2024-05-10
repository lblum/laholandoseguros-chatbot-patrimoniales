const DATOS_URL = 'rws/listas/LIST_DATOS_USER';

let utils = require('utils');

const main = async () => {
  user.set('error', null);

  let data =
  {
    "p_o_sesion": user.get('IdSession'),
  };

  bmconsole.log('list_datos_user');

  return utils.getRESTData({
    uri: DATOS_URL,
    data: data,
    token: user.get('JWTokenListas'),

    ok: ((resp) => {
      bmconsole.log('Ok -> list_datos_user');
      bmconsole.log(JSON.stringify(resp));
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
    bmconsole.log(`List datos usuario OK`);
  })
  .catch(err => {
    result.text(`[ERROR]: ${err.message}`);
  })
  .finally(() => {
    result.done();
  });