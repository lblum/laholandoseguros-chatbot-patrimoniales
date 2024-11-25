const ANALYTICS_NAME = 'CHATBOT_PRODUCTORES';
const ANALYTICS_MEASUREMENT_ID = 'G-DYGZ97JCTK'
const ANALYTICS_API_SECRET = 'm9ytEK1MRUG2udzm2r6ilg'
const ANALYTICS_HOST = 'www.google-analytics.com'
const ANALYTICS_PROTOCOL = 'https'
const ANALYTICS_URI = `/mp/collect?measurement_id=${ANALYTICS_MEASUREMENT_ID}&api_secret=${ANALYTICS_API_SECRET}`;
const main = async () => {
  const data = JSON.stringify({
    client_id: 'f3c51ccd-4fb0-48e8-95f6-ffb5bac39d9e', // A unique client identifier
    events: [{
      name: 'botmaker_event',
      params: {
        usuario: user.get('codUsuario'),
      },
    }],
  });

  const url = `${ANALYTICS_PROTOCOL}://${ANALYTICS_HOST}${ANALYTICS_URI}`

  bmconsole.log(url);
  await rp({
    uri: url,
    method: 'POST',
    body: data,
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
    }
  }).then((resp) => {
    bmconsole.log(resp);
  }).catch((error) => {
    bmconsole.log(error);
  });
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
