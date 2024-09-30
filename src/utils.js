  resetData : () => {
    user.set('error' , null);
    user.set('JWToken' , null);
    user.set('JWTokenListas' , null);
    user.set('JWTokenPoliza' , null);
    user.set('IdSession' , null);
    user.set('IdSessionListas' , null);
    user.set('IdSessionPoliza' , null);
    user.set('IdSessionListados' , null);
    user.set('JWTokenListados' , null);
    user.set('IdSessionGeneral' , null);
    user.set('JWTokenGeneral' , null);
    user.set('CodProductor' , null);
    user.set('nombre' , null);
    user.set('Polizas' , null);
    user.set('listadoPolizas' , null);    
  },
  initData : () => {
    let secciones = [
      { id: 1, name:  'Incendios' },
      { id: 2, name:  'Combinados' },
      { id: 3, name:  'Autos y motos' },
      { id: 4, name:  'Acc. del Trabajo' },
      { id: 5, name:  'Cristales' },
      { id: 6, name:  'Riesgos del Trabajo' },
      { id: 7, name:  'Granizo' },
      { id: 8, name:  'Responsab. Civil' },
      { id: 9, name:  'Robo' },
      { id: 10, name:  'Acc. Personales' },
      { id: 11, name:  'Caución' },
      { id: 12, name:  'Ganado' },
      { id: 13, name:  'Motovehiculos' },
      { id: 14, name:  'Aeronaves' },
      { id: 15, name:  'Riesgos Varios' },
      { id: 16, name:  'Seguro Tecnico' },
      { id: 17, name:  'Inter. de la Explot.' },
      { id: 18, name:  'Cascos' },
      { id: 19, name:  'Transportes' },
      { id: 20, name:  'P. & I.' },
      { id: 21, name:  'Acc. Pers. PLENUS' },
      { id: 22, name:  'Saldo Deudor' },
      { id: 23, name:  'Vida Colectivos' },
      { id: 24, name:  'Vida Individual' },
      { id: 25, name:  'Vida Obligatorio' },
      { id: 26, name:  'Vida Col. Abierto' },
      { id: 27, name:  'Sepelio' }      
    ];
    user.set('listaSecciones',JSON.stringify(secciones));
  },
  getBaseURL: () => {

    //return 'https://nthnet.laholando.com/';
    return 'https://hnet.laholando.com/';
  },
  getSeccionByLabel: (label) =>{
    let secciones = JSON.parse(user.get("listaSecciones"));
    let found = secciones.find( (l) => l.name == label );
    if (found) 
        return found.value;
    return 3; // TODO OJO!!!
  },
  getUniquePolizas: (polizas) => {
    try {
      let result = polizas.reduce((acc, d, index) => {
        const found = acc.find(a => a.name === d.poliza);
        if (!found) {
          acc.push({
            id: index,
            name: d.poliza
          });
        }
        return acc;
      }, []);
      result = result.sort( (a,b) => {
        if ( a.name < b.name )
          return -1;
        if ( a.name > b.name )
          return 1;
        return 0;
      });
      result = result.map( (v) => {
        return polizas[v.id];
      });
      return result;      
    } catch (error) {
      bmconsole.error(`Error en la getUniquePolizas -> ${err}`);
      return [];
    }

  },
  checkRESTError : (resp) => {

    try {
      if (_.has(resp, 'payload') && _.has(resp.payload, 'p_error'))
        return resp.payload.p_error;
      if (_.has(resp, 'p_error') && resp.p_error != 0)
        return resp.p_error;

    } catch (error) {
      bmconsole.log(error);
    }
    return null;
  },

getRESTData : async (cfg) => {

  let url = utils.getBaseURL() + cfg.uri;

  var headers = {
    'Content-Type': 'application/json'
  };


  if (cfg.token) {
    headers['X-authorization'] = 'Bearer ' + cfg.token;
  }

  return rp({
    uri: url,
    method: 'POST',
    body: cfg.data,
    json: true,
    headers: headers
  })
    .then((resp) => {
      let error = utils.checkRESTError(resp);
      if (error)
        throw new Error(error);
      if (cfg.ok)
        cfg.ok(resp);
    })
    .catch((error) => {
      bmconsole.error(`[ERROR] : ${error.message}`);

      user.set('error', error);
      if (cfg.error)
        cfg.error(error);
    })
    .finally(() => {
      //result.done();
    });
},

isInvalidJWT: (token) => {
  try {
    let parsedJWT = _.split(token, '.');
    // En el 2do está la expiración
    let data = Buffer.from(parsedJWT[1], 'base64').toString();
    let jwtData = JSON.parse(data);
    return _.now() > jwtData['exp'] * 1000;

  } catch (error) {
    if (token) {
      bmconsole.log('-=[Error en la isInvalidJWT]=-')
      bmconsole.log(error);
    }
  }
  return true;
},
login: async () => {
  // El login principal
  if ( user.get('codUsuario') == "" ) {
    // No hay usuario y password -> voy a la acciónde código que los pide
    result.gotoRule('Inicio de sesión');
  }
  utils.resetData();
  utils.initData();

},

loginAuxiliar: async (sistema) => {

  // TODO: Pasar a constantes
  let data =
  {
    "p_usuario": "PRODUSU",
    "p_enc_pwd": "PRODUSU"
  };

  let uri = `rws/${sistema}/login`;

  sistema = _.startCase(sistema).replace(' ','');

  return await utils.getRESTData({
    uri: uri,
    data: data,
    token: user.get('JWToken'),
    ok: ((resp) => {
      user.set(`IdSession${sistema}`, resp.payload.p_o_sesion);
      user.set(`JWToken${sistema}`, resp.token);
    }),
    error: ((error) => {
      bmconsole.error(`Login ${sistema} ${error}`)
      user.set(`IdSession${sistema}`, null);
      user.set(`JWToken${sistema}`, null);
      throw error;
    }),
  });
},

 loginListas: async () => {
  if (utils.isInvalidJWT(user.get('JWTokenListas'))) {
    return utils.loginAuxiliar('listas');
  }
},

loginListados: async () => {
  if (utils.isInvalidJWT(user.get('JWTokenListados')))
    return await utils.loginAuxiliar('listados');
},

loginGeneral: async () => {
  if (utils.isInvalidJWT(user.get('JWTokenGeneral')))
    return await utils.loginAuxiliar('general');
},

loginPolizas: async () => {
  if (utils.isInvalidJWT(user.get('JWTokenPoliza')))
    return utils.loginAuxiliar('poliza');
},

loginDenunciaAsegurado: async () => {
  if (utils.isInvalidJWT(user.get('JWTokenDenunciaAsegurado')))
    return utils.loginAuxiliar('denuncia_asegurado');
},

/*cb64toBlob = (b64Data, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
    
  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
},*/
uploadFile: async (fileName, fileContent) => {
  const platform = context.message.CHAT_PLATFORM_ID;
  const appNumber = '5491138460183'; // TODO: sacarlo desde el contexto
  const peerNumber = '5491150143462'; // TODO: sacarlo desde el contexto
  const demoImg = 'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';
  const blob =  Buffer.from(demoImg ,'base64') 
  if ( platform !== 'whatsapp' ) {
    // Armo el mensaje binario
    let body = `chatPlatform:whatsapp\nchatChannelNumber:5491138460183\nplatformContactId:5491150143462\nmediaType:image/png\nfile:${demoImg}
    `;
    const url = 'https://go.botmaker.com/api/v1.0/message/binary/v3';
  
    const accessTokenV1 = 'eyJhbGciOiJIUzUxMiJ9.eyJidXNpbmVzc0lkIjoiaG9sYW5kb3NlZ3Vyb3MiLCJuYW1lIjoiTGlsaWFuYSBTaWx2YSIsImFwaSI6dHJ1ZSwiaWQiOiJCc1AxcVZBdjZTVGVpM2VvSk9VdWRYN3IyRzAyIiwiZXhwIjoxODcxNTc4Nzg1LCJqdGkiOiJCc1AxcVZBdjZTVGVpM2VvSk9VdWRYN3IyRzAyIn0.BCNWvf9uqejdRxjBI9-AlqLDUYGIXBGDx8kutmFsDLKHfayox1V2B3noK02j0OSCK3cij1_51e35MNU8kJSisA'
  
    const headers = {
      'Content-Type': 'multipart/form-data',
    'Accept' : 'application/json',
    'access-token':accessTokenV1,
    };
  
 
    return rp({
      uri: url,
      method: 'POST',
      body: body,
      json: true,
      headers: headers
    })
      .then((resp) => {
    bmconsole.log('ok');
      })
      .catch((error) => {
        bmconsole.error(`[ERROR] : ${error.message}`);
  
        user.set('error', error);
      })
      .finally(() => {
      });
    } else {
    // Esto es solo para test
    result.file(`data:application/pdf;base64,${fileContent}`,fileName);
  }
}