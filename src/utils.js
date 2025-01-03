  resetData : () => {
    user.set('error' , null);
    user.set('JWTokenListas' , null);
    user.set('JWTokenPoliza' , null);
    user.set('IdSessionListas' , null);
    user.set('IdSessionPoliza' , null);
    user.set('IdSessionListados' , null);
    user.set('JWTokenListados' , null);
    user.set('IdSessionGeneral' , null);
    user.set('JWTokenGeneral' , null);
    user.set('CodProductor' , null);
    user.set('nombre' , null);
    user.set('Polizas' , null);
    user.set('Asegurados' , null);
    user.set('Asegurado' , null);
    user.set('cantidadDePolizas' , null);
    user.set('cantidadDeAsegurados' , null);
    user.set('listadoPolizas' , null);    
  },
  listSecciones: async() => {
    const DATOS_URL_SECCIONES = 'rws/listas/LIST_TIPOS_SECCIONES';

    user.set('error', null);
  
    await utils.loginListas();
  
    let data =
    {
      "p_o_sesion": user.get('IdSession')
    };
  
  
    await utils.getRESTData({
      uri: DATOS_URL_SECCIONES,
      data: data,
      token: user.get('JWTokenListas'),
  
      ok: ((resp) => {
        let secciones = [];
        let i = 0;
        resp.p_list_tipos_secciones.forEach( (el) => {
          secciones.push({
            id : el.value,
            name: el.label.split(' ').pop(),
          });
        });
        user.set('listaSecciones',JSON.stringify(secciones));

        ;
      }),
      error: ((error) => {
        throw new Error(error);
      }),
    }); 
  },
  getListaSeccionesLocal:  () =>{
    return  [
      { id: 3, name:  'Automotores' },
      { id: 2, name:  'Hogar' },
      { id: 2, name:  'Comercio' },
      { id: 2, name:  'Consorcio' },
      { id: 1, name:  'Incendio' },
      { id: 10, name:  'Acc. Personales' },
      { id: 21, name:  'Plenus' },
      { id: 14, name:  'Aeronaves' },
      { id: 18, name:  'Cascos' },
    ];
    /*
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
       */

  },
  initData : () => {
    let secciones = utils.getListaSeccionesLocal();
    user.set('listaSecciones',JSON.stringify(secciones));
  },
  getBaseURL: () => {

    //return 'https://nthnet.laholando.com/';
    return 'https://hnet.laholando.com/';
  },
  getSeccionByLabel: (label) =>{
    let secciones = utils.getListaSeccionesLocal();
    let found = secciones.find( (l) => l.name == label );
    if (found) 
        return found.id;
    return 0; // TODO OJO!!!
  },
  getUniquePolizas: (polizas,tipoDocumento) => {
    try {
      let i = 0;
      let retVal = [];
      try {
        polizas.forEach(p => {
          // para credencial o certificado mercosur, solo endoso 0
          if ( (tipoDocumento != 'CREDENCIAL' && tipoDocumento != 'CERTIF_MERCOSUR') || p.endoso == '0' ) {
            retVal.push({
              id: i,
              fecha: moment(p.fec_vig,'DD/MM/YYYY'),
              poliza: p.poliza,
              endoso: p.endoso,
              cod_asegu: p.cod_asegu,
            });      
          }
          i++;
        });
          
      } catch (error) {
        result.text(error)        ;
      }

      /*var retVal = polizas.reduce((acc, d, index) => {
        
        const found = false;//acc.find(a => (a.name == d.poliza  && a.endoso == d.endoso) );
        if (!found) {
        }
        return acc;
      }, []);
  */
      retVal = retVal.sort( (a,b) => {
        if ( a.poliza < b.poliza )
          return -1;
        if ( a.poliza > b.poliza )
          return +1;

        if ( a.endoso == '0' )
          return -1;
        if ( b.endoso == '0' )
          return +1;

        if ( a.fecha < b.fecha )
          return +1;
        if ( a.fecha > b.fecha )
          return -1;

        return 0;
      });
      retVal = retVal.map( (v) => {
        return {
          cod_sec: polizas[v.id].cod_sec,
          poliza: polizas[v.id].poliza,
          endoso: polizas[v.id].endoso,
          p_x_idriesgo: polizas[v.id].p_x_idriesgo,
          tipo_emi: polizas[v.id].tipo_emi,
          solicitud: polizas[v.id].solicitud,
          tipo_emision: polizas[v.id].tipo_emision,
          fec_vig: polizas[v.id].fec_vig,
          forma_pago: polizas[v.id].forma_pago,
          cod_asegu: polizas[v.id].cod_asegu,
        };
        //return polizas[v.id];
      });
      return retVal;      
    } catch (error) {
      bmconsole.error(`Error en la getUniquePolizas -> ${error}`);
      result.text(JSON.stringify(error));
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

  // Lo primero, es chequear el login
  await utils.login();

  // OJO! esto debiera ir a la regla de login, pero por ahora no lo estoy logrando

  // TODO: Pasar a constantes
  let data =
  {
    "p_usuario": "PRODUSU",
    "p_enc_pwd": "PRODUSU"
  };

  let uri = `rws/${sistema}/login`;

  sistema = _.startCase(sistema).replaceAll(' ','');

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
loginBotonPago: async () => {
  if (utils.isInvalidJWT(user.get('JWTokenBotonPagoApp')))
    return utils.loginAuxiliar('boton_pago_app');
},

login: async() => {
  const LOGIN_URL = 'rws/holandonet/login';

  let isConnected = false;
  if (utils.isInvalidJWT(user.get('JWToken'))) {
    let pUsuario = user.get("codUsuario");
    let pEncPwd = user.get("userPassword");
    if ( pUsuario && pEncPwd ) {
      // Trato de rehacer el login
      // TODO: Si la sesion no está expirada, hacer el login x ahí
      let data =
      {
        "p_usuario": user.get("codUsuario"),
        "p_enc_pwd": user.get("userPassword"),
        "p_cod_t_usuario": "P"
      };
      await utils.getRESTData({
        uri: LOGIN_URL,
        data: data,
        ok: ((resp) => {
          bmconsole.log(`Login OK ${resp.payload.p_o_sesion}`);
          user.set('IdSession', resp.payload.p_o_sesion);
          user.set('JWToken', resp.token);
          isConnected = true;
        }),
        error: ((error) => {
          bmconsole.log(`Error en el login ${error}`);
          user.set('IdSession', null);
          user.set('JWToken', null);
        }),
      });

      // Si depués de todo esto no está conectado, voy a login
    }
  } else {
    isConnected = true;
  }

  if ( !isConnected ){
    result.text('Hubo un error al hacer la conexión');
  }

},
blobToBase64: async (blob) => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return await new Promise(resolve => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
},
getPolizaCompleta: async (poliza) => {
  let documento = await utils.getURLPolizaCompleta(poliza);

  let error = utils.checkRESTError(documento);
  if (error)
    throw new Error(error);

  let outData = null;

  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  await fetch(documento.p_url,requestOptions)
    .then((response) => 
      response.blob()
     )
    .then( async (blob) => {
      const arrayBuffer = await blob.arrayBuffer()
      outData = Buffer.from(arrayBuffer)

    })
    .catch((error) => console.error(error));

  /*
  var headers = {
    'Accept': '* /*',
    'Accept-Encoding': 'gzip,deflate,br',
    
  };

  await rp({
    uri: documento.p_url,
    method: 'GET',
    //json: true,
    headers: headers
  }).then((resp) => {
    outData = resp;
  }).catch((error) => {
    bmconsole.error(`[ERROR] : ${error.message}`);

    user.set('error', error);
  });

  */
  return outData.toString('base64');//Buffer.from(outData).toString('base64');
},
getURLPolizaCompleta: async(poliza) => {
  await utils.loginListados();

  let data = {
    "p_o_sesion": user.get('IdSession'),
    "p_poliza": poliza.poliza,
    "p_cod_sec": poliza.cod_sec,
    "p_endoso": poliza.endoso,
    "p_tipo_emi": poliza.tipo_emi,
    "p_solicitud":poliza.solicitud,
    //"p_nro_rie": null,
  };

  let urlPC = null;

  const POLIZA_COMPLETA_URL = 'rws/listados/URLPOLCARTERA';

  await utils.getRESTData({
    uri: POLIZA_COMPLETA_URL,
    data: data,
    token: user.get('JWTokenListados'),
    ok: ((resp) => {
      urlPC = resp;
    }),
    error: ((error) => {
      bmconsole.log(`Hubo un error al traer la póliza completa: ${error}`)
      return null;
    }),
  });
  return urlPC;

},
logEvent : async(data) => {
  const ANALYTICS_MEASUREMENT_ID = 'G-SZG7S4T45N';
  const ANALYTICS_API_SECRET = 'Y9jUmvz2Q3GK5zxI0JEOeg';
  const ANALYTICS_HOST = 'www.google-analytics.com'
  const ANALYTICS_PROTOCOL = 'https'
  const ANALYTICS_URI = `/mp/collect?measurement_id=${ANALYTICS_MEASUREMENT_ID}&api_secret=${ANALYTICS_API_SECRET}`;

  data.usuario = user.get('codUsuario');

  const url = `${ANALYTICS_PROTOCOL}://${ANALYTICS_HOST}${ANALYTICS_URI}`
  const TIMESTAMP = moment().valueOf().toString() + '000';

  let evt_data = {
    client_id: 'f3c51ccd-4fb0-48e8-95f6-ffb5bac39d9e',
    timestamp_micros: TIMESTAMP,
    non_personalized_ads: false,
    events: [{
      name: 'chatbot_pas',
      params: data,
    }],
  };

  return await rp({
    uri: url,
    method: 'POST',
    body: evt_data,
    json: true,
    headers: {
      'Content-Type': 'application/json',
    }
  }).then((resp) => {
    bmconsole.log(resp);
  }).catch((error) => {
    bmconsole.log(error);
  });

}