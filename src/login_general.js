const IS_TEST = user.get('botmakerEnvironment') === 'DEVELOPMENT';
const BASE_URL = 'https://dhnet.laholando.com/';
const LOGIN_URL = 'rws/general/login';


let url = BASE_URL + LOGIN_URL;

let headers = {
  'Content-Type': 'application/json'
};


// TODO: Pasar a constantes
let data =
{
  "p_usuario": "PRODVIS",
  "p_enc_pwd": "PRODVIS"
};

rp({
  uri: url,
  method: 'POST',
  body: data,
  json: true,
  headers: headers
}).then((resp) => {
  user.set('IdSessionGeneral', resp.payload.p_o_sesion);
  user.set('JWTokenGeneral', resp.token);
  result.done();

}).catch((err) => {
  user.set('IdSessionGeneral', null);
  user.set('JWTokenGeneral', null);
  result.done();      
});
