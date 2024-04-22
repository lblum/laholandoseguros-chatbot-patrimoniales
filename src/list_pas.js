const IS_TEST = user.get('botmakerEnvironment') === 'DEVELOPMENT';
const BASE_URL = 'https://dhnet.laholando.com/';
const LOGIN_URL = 'rws/listas/LIST_PAS';


let url = BASE_URL + LOGIN_URL;

let headers = {
  'Content-Type': 'application/json',
  'X-authorization': 'Bearer ' + user.get('JWTokenListas')
};



// Valores default para las pruebas
let data =
  {
    "p_o_sesion": user.get('IdSessionListas'),
};

bmconsole.log(data)  ;

rp({
  uri: url,
  method: 'POST',
  body: data,
  json: true,
  headers: headers
}).then((resp) => {

  try {
    user.set('Productor',resp.p_list_pas);
    bmconsole.log(resp.p_list_asegurados[0]);
    
  } catch (error) {
    user.set('Productor',null);    
  }

  result.done();

}).catch((err) => {
  user.set('Asegurado',null);
  result.done();      
});
