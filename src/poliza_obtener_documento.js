const DOCUMENTO_POLIZA_URL = 'rws/poliza/OBTENER_DOCUMENTO';

let utils = require('utils');
let sendFile = require('send_document');

const main = async () => {
  user.set('error', null);

  await utils.loginPolizas();

  let data =
  {
    "p_o_sesion": user.get('IdSession'),
    "p_cod_documento": "CERTIFICADO_MERCOSUR_AUTOMOTORES",
    "p_cod_sec": 0,
    "p_poliza": 0,
    "p_endoso": 0
  };

  if (context.params.codDocumento != null && (context.params.codDocumento ?? '') != '')
    data.p_cod_documento = context.params.codDocumento;

  let strPolizas = user.get('Polizas');
  let Polizas = JSON.parse(strPolizas);
  let opcionPoliza = JSON.parse(user.get('opcionPoliza'));
  let i = opcionPoliza.id;
  let Poliza = Polizas[i];
  data.p_cod_sec = Poliza.cod_sec;
  data.p_poliza = Poliza.poliza;
  data.p_endoso = Poliza.endoso;
  bmconsole.log(JSON.stringify(data));
  let fileName = `${data.p_cod_documento}-${data.p_poliza}.pdf`;

  let pDocumento = null;

  await utils.getRESTData({
    uri: DOCUMENTO_POLIZA_URL,
    data: data,
    token: user.get('JWTokenPoliza'),
    ok: ((resp) => {
      pDocumento = resp.p_documento;
    }),
    error: ((error) => {
      bmconsole.log(`Hubo un error al traer el documento de la póliza: ${error}`)
      result.text(`No existe ese tipo de documento para esa póliza`);
      user.set('copiaPoliza', null);
      user.set('error', null);
      return null;
    }),
  });

  if (pDocumento != null) {
    await sendFile.sendFile(fileName, pDocumento);
  }


};

main()
  .then((x) => {
    ;
  })

  .catch(err => {
    bmconsole.error(`[ERROR]: ${err}`);
    //result.text(JSON.parse(user.get('Polizas')));//`[ERROR]: ${err.message}`);
  })
  .finally(() => {
    // Code on finish
    result.done();
  });
