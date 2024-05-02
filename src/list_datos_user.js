const DATOS_URL = 'rws/listas/LIST_DATOS_USER';

let utils = require('utils');

let data =
{
  "p_o_sesion": user.get('IdSession'),
};

utils.loginListas();

utils.getRESTData({
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
  }),
});
