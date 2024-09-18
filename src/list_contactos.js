const CONTACTOS_URL = 'rws/general/DATOS_CONTACTO';
let utils = require('utils');

getContactData = async (contactType) => {
  data = {
    "p_o_sesion": user.get('IdSession'),
    "p_tipo": contactType,
  };
  var retVal = [];
  await utils.getRESTData({
    uri: CONTACTOS_URL,
    data: data,
    token: user.get('JWTokenGeneral'),

    ok: ((resp) => {
      resp.p_list_contactos.forEach(element => {
        retVal.push(element.contacto);
      });
    }),
    error: ((error) => {
      return [];
    }),
  });
  return retVal;

}

const main = async () => {

  await utils.loginGeneral();


  var finalData =  await getContactData(1);
  //var y = await getContactData(2);

  user.set('contactList',finalData.join('\n'));
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
