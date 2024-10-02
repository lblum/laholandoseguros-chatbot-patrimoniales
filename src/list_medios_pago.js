const CONTACTOS_URL = 'rws/listas/LIST_MEDIOS_PAGO';
let utils = require('utils');

getPayData = async () => {

  user.set('error', null);
  
  data = {
    "p_o_sesion": user.get('IdSession'),
    "p_producto": null
  };

  var retVal = [];
  await utils.getRESTData({
    uri: CONTACTOS_URL,
    data: data,
    token: user.get('JWTokenListas'),

    ok: ((resp) => {
      resp.p_list_medios_pago.forEach(element => {
        retVal.push(element.descri);
      });
    }),
    error: ((error) => {
      return [
        'Hubo un error al traer la lista de medios de pago',
        'Por favor, reintalo mas tarde'
      ];
    }),
  });
  return retVal;

}

const main = async () => {

 var finalData =  await getPayData();

  user.set('payDataList',finalData.join('\n'));
};

main()
  .then((x) => {
    ;
  })
  .catch(err => {
    // Code on error
    bmconsole.error(`[ERROR]: ${err.message}`);
    usr.set('error', null);
  })
  .finally(() => {
    // Code on finish
    result.done();
  });
