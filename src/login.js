const LOGIN_URL = 'rws/holandonet/login';

let utils = require('utils');

let data =
{
  "p_usuario": "prodlhbas",
  "p_enc_pwd": "prodlhbas"
};

if (context.params.user != null && context.params.user != undefined)
  data.p_usuario = context.params.user;
if (context.params.password != null && context.params.password != undefined)
  data.p_enc_pwd = context.params.password;

utils.getRESTData({
  uri: LOGIN_URL,
  data: data,
  ok: ((resp) => {
    user.set('IdSession', resp.payload.p_o_sesion);
    user.set('JWToken', resp.token);
  }),
  error: ((error) => {
    user.set('IdSession', null);
    user.set('JWToken', null);
  }),
});
