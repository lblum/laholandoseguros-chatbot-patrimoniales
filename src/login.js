const IS_TEST = user.get('botmakerEnvironment') === 'DEVELOPMENT';
const BASE_URL = 'https://dhnet.laholando.com/';
const LOGIN_URL = 'rws/holandonet/login';


let url = BASE_URL + LOGIN_URL;

let headers = {
  'Content-Type': 'application/json'
};


// Valores default para las pruebas
let data =
{
  "p_usuario": "SISTEMAS",
  "p_enc_pwd": "SISTEMAS"
};

if ( context.params.user != null && context.params.user != undefined )
  data.p_usuario = context.params.user;
if ( context.params.password != null && context.params.password != undefined )
  data.p_enc_pwd = context.params.password;

bmconsole.log(data)  ;

rp({
  uri: url,
  method: 'POST',
  body: data,
  json: true,
  headers: headers
}).then((resp) => {
  user.set('IdSession', resp.payload.p_o_sesion);
  user.set('JWToken', resp.token);
  if (IS_TEST) {
    bmconsole.log(user.get('IdSession'));
    bmconsole.log(user.get('JWToken'));
  }
  result.done();

}).catch((err) => {
  user.set('IdSession', null);
  user.set('JWToken', null);
  result.done();      
});
