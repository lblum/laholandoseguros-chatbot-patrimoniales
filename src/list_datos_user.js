const { forEach } = require("lodash");

const IS_TEST = user.get('botmakerEnvironment') === 'DEVELOPMENT';
const BASE_URL = 'https://dhnet.laholando.com/';
const LOGIN_URL = 'rws/listas/LIST_DATOS_USER';


let url = BASE_URL + LOGIN_URL;

let headers = {
  'Content-Type': 'application/json',
  'X-authorization': 'Bearer ' + user.get('JWTokenListas')
};



// Valores default para las pruebas
let data =
  {
    "p_o_sesion": user.get('IdSession'),
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
    // Busco el primero que sea titular
    let usr = resp.p_list_user[0];
    user.set('CodProductor',usr.cod_prod);
    bmconsole.log(usr);
    
  } catch (error) {
    user.set('CodProductor',null);    
  }

  result.done();

}).catch((err) => {
  user.set('CodProductor',null);
  result.done();      
});
