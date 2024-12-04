const DOCUMENTO_POLIZA_URL = 'rws/poliza/OBTENER_DOCUMENTO';

let utils = require('utils');
let sendFile = require('send_document');

const main = async () => {
  user.set('error', null);

  let codDocumento = 'CUPONERA';

  if (context.params.codDocumento != null && (context.params.codDocumento ?? '') != '')
    codDocumento = context.params.codDocumento;

  let strPolizas = user.get('Polizas');
  let Polizas = JSON.parse(strPolizas);
  let i = 0;
  try {
    let opcionPoliza = JSON.parse(user.get('opcionPoliza'));
    i = opcionPoliza.id;
  } catch (error) {

  }

  let Poliza = Polizas[i];
  let fileName = `${codDocumento}-${Poliza.poliza}.pdf`;

  await utils.logEvent({
    "function": "poliza_obtener_documento",
    "tipoFiltro": user.get('tipoFiltroPoliza'),
    "tipoDocumento": codDocumento,
    "seccion": Poliza.cod_sec,
    "poliza": Poliza.poliza
  });


  if (codDocumento == 'EMISION_CATALOGADO_FIRMA') {
    // Póliza completa es un caso especial
    let doc = await utils.getPolizaCompleta(Poliza);
    await sendFile.sendFile(`POLIZA-COMPLETA-${Poliza.poliza}.pdf`, doc);
  } else {
    await utils.loginPolizas();

    let data =
    {
      "p_o_sesion": user.get('IdSessionListados'),
      "p_cod_documento": codDocumento,
      "p_cod_sec": 0,
      "p_poliza": 0,
      "p_endoso": 0
    };


    data.p_cod_sec = Poliza.cod_sec;
    data.p_poliza = Poliza.poliza;
    data.p_endoso = Poliza.endoso;
    bmconsole.log(JSON.stringify(data));

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
        // Agregado el caso de que sea CUPONERA pero con otra forma de pago
        if (codDocumento.toUpperCase() == 'CUPONERA' && Poliza.forma_pago != null && Poliza.forma_pago.toUpperCase() != 'CUPONERA') {
          result.text(`La póliza ${Poliza.poliza} se encuentra adherida a débito automático vía  ${Poliza.forma_pago}`);
        } else
          result.text(`No existe ese tipo de documento para esa póliza`);
        user.set('copiaPoliza', null);
        user.set('error', null);
        return null;
      }),
    });

    if (pDocumento != null) {
      await sendFile.sendFile(fileName, pDocumento);
    }
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
