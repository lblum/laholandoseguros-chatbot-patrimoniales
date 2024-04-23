const IS_TEST = user.get('botmakerEnvironment') === 'DEVELOPMENT';
const BASE_URL = 'https://dhnet.laholando.com/';
const LOGIN_URL = 'rws/listas/LIST_ASEGURADOS';


let url = BASE_URL + LOGIN_URL;

let headers = {
  'Content-Type': 'application/json',
  'X-authorization': 'Bearer ' + user.get('JWTokenListas')
};



// Valores default para las pruebas
let data =
  {
    "p_filtro": null,//"20203840781",
    "p_o_sesion": user.get('IdSessionListas'),
    "p_limite": 1000,
    "p_nropag": 0,
    "p_regxpag": 10
};

if ( context.params.asegurado != null && context.params.asegurado != undefined )
  data.p_filtro = context.params.asegurado;

bmconsole.log(data)  ;

rp({
  uri: url,
  method: 'POST',
  body: data,
  json: true,
  headers: headers
}).then((resp) => {

  try {
    user.set('Asegurado',resp.p_list_asegurados[0]);
    bmconsole.log(resp.p_list_asegurados[0]);
    
  } catch (error) {
    user.set('Asegurado',null);
    
  }

  result.done();

}).catch((err) => {
  user.set('Asegurado',null);
  result.done();      
});
