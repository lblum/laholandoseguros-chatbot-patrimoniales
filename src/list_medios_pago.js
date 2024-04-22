const IS_TEST = user.get('botmakerEnvironment') === 'DEVELOPMENT';
const BASE_URL = 'https://dhnet.laholando.com/';
const LOGIN_URL = 'rws/listas/LIST_MEDIOS_PAGO';


let url = BASE_URL + LOGIN_URL;

let headers = {
  'Content-Type': 'application/json',
  'X-authorization': 'Bearer ' + user.get('JWTokenListas')
};



// Valores default para las pruebas
let data =
{
  "p_o_sesion": user.get('IdSessionListados'),
  "p_producto": null
}

bmconsole.log(data);

rp({
  uri: url,
  method: 'POST',
  body: data,
  json: true,
  headers: headers
}).then((resp) => {

  try {
    user.set('MediosDePago', resp.p_list_medios_pago);
    bmconsole.log(resp.p_list_medios_pago);

  } catch (error) {
    user.set('MediosDePago', []);

  }

  result.done();

}).catch((err) => {
  user.set('MediosDePago', []);
  result.done();
});
