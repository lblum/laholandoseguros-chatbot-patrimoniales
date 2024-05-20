const DOCUMENTO_POLIZA_URL = 'rws/poliza/OBTENER_DOCUMENTO';

let utils = require('utils');

const main = async () => {
  let data =
  {
    "p_o_sesion": user.get('IdSession'),
    "p_cod_documento": "CREDENCIAL",
    "p_cod_sec": 0,
    "p_poliza": 0,
    "p_endoso": 0
  };

  let ordenPoliza = 0;

  if (context.params.codDocumento != null && (context.params.codDocumento ?? '') != '')
    data.p_cod_documento = context.params.p_cod_documento;

  if (context.params.ordenPoliza != null && (context.params.ordenPoliza ?? '') != '')
    ordenPoliza = context.params.ordenPoliza;

  let Polizas = JSON.parse(user.get('Polizas'));
  let Poliza = Polizas[ordenPoliza];
  data.p_cod_sec = Poliza.cod_sec;
  data.p_poliza = Poliza.poliza;
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
        ;
    }),
  });


};

main()
  .then((x) => {
    ;
  })

  .catch(err => {
    bmconsole.error(`[ERROR]: ${err.message}`);
    result.text(`[ERROR]: ${err.message}`);
  })
  .finally(() => {
    // Code on finish
    result.done();
  });
