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
  "p_cod_prod": user.get('CodProductor'),
  "p_cod_asegu": null,
  "p_cod_sec": null,
  "p_cod_subramo": null,
  "p_poliza": null,
  "p_estado": null,
  "p_endoso": null,
  "p_medio_pago": null,
  "p_tiene_siniestro": null,
  "p_nropag": null,
  "p_regxpag": 25,
  "p_limite": 1000,
  "p_o_sesion": user.get('IdSession')
}


/*
if ( context.params.asegurado != null && context.params.asegurado != undefined )
  data.p_filtro = context.params.asegurado;
*/

bmconsole.log(data);

rp({
  uri: url,
  method: 'POST',
  body: data,
  json: true,
  headers: headers
}).then((resp) => {

  try {
    user.set('PolizaCartera', resp.p_list_poliza_cartera);

  } catch (error) {
    user.set('PolizaCartera', null);

  }

  result.done();

}).catch((err) => {
  user.set('PolizaCartera', null);
  result.done();
});
