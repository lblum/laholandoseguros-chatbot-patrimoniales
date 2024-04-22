const IS_TEST = user.get('botmakerEnvironment') === 'DEVELOPMENT';
const BASE_URL = 'https://dhnet.laholando.com/';
const LOGIN_URL = 'rws/listados/LIST_POLIZA_CARTERA';


let url = BASE_URL + LOGIN_URL;

let headers = {
  'Content-Type': 'application/json',
  'X-authorization': 'Bearer ' + user.get('JWTokenListados')
};



// Valores default para las pruebas

let data =

{
  "p_poliza": "3061989",
  "p_endoso": "0",
  "p_cod_sec": "2",
  "p_tipo_emi": "0",
  "p_solicitud": "9061718",
  "p_nro_rie": null,
  "p_o_sesion": user.get('IdSessionListados'),

}

/*
if ( context.params.asegurado != null && context.params.asegurado != undefined )
  data.p_filtro = context.params.asegurado;
*/

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
