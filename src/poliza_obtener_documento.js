const DOCUMENTO_POLIZA_URL = 'rws/poliza/OBTENER_DOCUMENTO';

let utils = require('utils');

const main = async () => {
  user.set('error',null);

  await utils.loginPolizas();

  let data =
  {
    "p_o_sesion": user.get('IdSession'),
    "p_cod_documento": "CUPONERA",
    "p_cod_sec": 0,
    "p_poliza": 0,
    "p_endoso": 0
  };

  if (context.params.codDocumento != null && (context.params.codDocumento ?? '') != '')
    data.p_cod_documento = context.params.codDocumento;

  if (context.params.opcionPoliza != null && (context.params.opcionPoliza ?? '') != '')
    opcionPoliza = context.params.opcionPoliza;

  let Polizas = JSON.parse(user.get('Polizas'));
  bmconsole.log(`opcionPoliza -> ${user.get('opcionPoliza')}`);
  let opcionPoliza = user.get('opcionPoliza')??0;
  let Poliza = Polizas[opcionPoliza];
  data.p_cod_sec = Poliza.cod_sec;
  data.p_poliza = Poliza.poliza;
  //data.p_endoso = Poliza.endoso;
  bmconsole.log(`data -> ${JSON.stringify(data)}`)
  let fileName = `${data.p_cod_documento}-${data.p_poliza}.pdf`;

  return await utils.getRESTData({
    uri: DOCUMENTO_POLIZA_URL,
    data: data,
    token: user.get('JWTokenPoliza'),
    ok: ((resp) => {
      result.file(`data:application/pdf;base64,${resp.p_documento}`, fileName);
    }),
    error: ((error) => {
      user.set('copiaPoliza', null);
      result.text(`Hubo un error al traer el documento de la póliza: ${error}`)
        
    }),
  });


};

main()
  .then((x) => {
    ;
  })

  .catch(err => {
    bmconsole.error(`[ERROR]: ${err.message}`);
    result.text(JSON.parse(user.get('Polizas')));//`[ERROR]: ${err.message}`);
    result.done();
  })
  .finally(() => {
    // Code on finish
    result.done();
  });
