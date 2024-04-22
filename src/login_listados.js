const IS_TEST = user.get('botmakerEnvironment') === 'DEVELOPMENT';
const BASE_URL = 'https://dhnet.laholando.com/';
const LOGIN_URL = 'rws/listados/login';


let url = BASE_URL + LOGIN_URL;

let headers = {
  'Content-Type': 'application/json'
};


// TODO: Pasar a constantes
let data =
{
  "p_usuario": "PRODUSU",
  "p_enc_pwd": "PRODUSU"
};

rp({
  uri: url,
  method: 'POST',
  body: data,
  json: true,
  headers: headers
}).then((resp) => {
  user.set('IdSessionListados', resp.payload.p_o_sesion);
  user.set('JWTokenListados', resp.token);
  result.done();

}).catch((err) => {
  user.set('IdSessionListados', null);
  user.set('JWTokenListados', null);
  result.done();      
});
