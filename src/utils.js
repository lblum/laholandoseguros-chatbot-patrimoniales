function getBaseURL() {

  //return 'https://nthnet.laholando.com/';
  return 'https://hnet.laholando.com/';
}

function checkRESTError(resp) {

  try {
    if (resp.hasOwn('payload') && resp.payload.hasOwn('p_error'))
      return resp.payload.p_error;
    if (resp.payload.hasOwn('p_error'))
      return resp.payload.p_error;

  } catch (error) {
  }
  return null;

}

function getRESTData(cfg) {
  let url = this.getBaseURL() + cfg.uri;

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
      let error = this.checkRESTError(resp);
      if (error)
        throw new Error(error);
      if (cfg.ok)
        cfg.ok(resp);
    })
    .catch((error) => {
      result.text(`[ERROR] : ${error.message}`);

      user.set('error', error);
      if (cfg.error)
        cfg.error(error);
    })
    .finally(() => {
      result.done();
    });
}

function isInvalidJWT(token) {
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
}

function loginAuxiliar(sistema) {

  // TODO: Pasar a constantes
  let data =
  {
    "p_usuario": "PRODUSU",
    "p_enc_pwd": "PRODUSU"
  };

  let uri = `rws/${sistema}/login`;

  sistema = _.startCase(sistema);

  return this.getRESTData({
    uri: uri,
    data: data,
    token: user.get('JWToken'),
    ok: ((resp) => {
      user.set(`IdSession${sistema}`, resp.payload.p_o_sesion);
      user.set(`JWToken${sistema}`, resp.token);
    }),
    error: ((error) => {
      user.set(`IdSession${sistema}`, null);
      user.set(`JWToken${sistema}`, null);
    }),
  });
}

function loginListas() {
  // TODO: chequear errores
  if (this.isInvalidJWT(user.get('JWTokenListas')))
    return this.loginAuxiliar('listas');
}

function loginListados() {
  // TODO: chequear errores
  if (this.isInvalidJWT(user.get('JWTokenListados')))
    return this.loginAuxiliar('listados');
}

function loginPoliza() {
  // TODO: chequear errores
  if (this.isInvalidJWT(user.get('JWTokenPoliza')))
    return this.loginAuxiliar('poliza');
}

