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

  // OJO!!!
  // Esto no debiera ser necesario (y es un problema para la seguridad)
  //process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

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
      result.done();
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
      bmconsole.log('-=[Error en la isJWTExpired]=-')
      bmconsole.log(error);
    }
  }
  return true;
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
    }),
  });
},

 loginListas: async () => {
  if (utils.isInvalidJWT(user.get('JWTokenListas')))
    return utils.loginAuxiliar('listas');
},

loginListados: async () => {
  if (utils.isInvalidJWT(user.get('JWTokenListados')))
    return await utils.loginAuxiliar('listados');
},

loginPoliza: async () => {
  if (utils.isInvalidJWT(user.get('JWTokenPoliza')))
    return utils.loginAuxiliar('poliza');
},

loginDenunciaAsegurado: async () => {
  if (utils.isInvalidJWT(user.get('JWTokenDenunciaAsegurado')))
    return utils.loginAuxiliar('denuncia_asegurado');
}

