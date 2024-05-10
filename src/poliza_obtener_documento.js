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

  let Poliza = JSON.parse("{\"dominio\":\"AB130KH\",\"nro_rie\":1,\"poliza\":13056706,\"cod_sec\":3,\"desc_sec\":\"Automotores\",\"poliza_sec\":\"13056706 Automotores\",\"icono_seccion\":\"https://hnet.laholando.com/img/seccion03.png\"}");
  //,user.get('Poliza'));
  data.p_cod_sec = Poliza.cod_sec;
  data.p_poliza = Poliza.poliza;

  return await utils.getRESTData({
    uri: DOCUMENTO_POLIZA_URL,
    data: data,
    token: user.get('JWTokenPoliza'),
    ok: ((resp) => {
      result.file(`data:application/pdf;base64,${resp.p_documento}`,'📄 Te comparto *la copia de tu póliza*:');
      //debugger;
      //user.set('copiaPoliza', resp.p_documento);
      ;
    }),
    error: ((error) => {
      user.set('copiaPoliza', null);
      result.text( `Hubo un error al traer el documento de la póliza: ${error}`)
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
