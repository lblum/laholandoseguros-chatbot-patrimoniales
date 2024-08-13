  getBaseURL: () => {

    //return 'https://nthnet.laholando.com/';
    return 'https://hnet.laholando.com/';
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
      bmconsole.log(`Login ${sistema} OK`)
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

