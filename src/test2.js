const ANALYTICS_NAME = 'CHATBOT_PRODUCTORES';
const ANALYTICS_MEASUREMENT_ID = 'G-SZG7S4T45N';
const ANALYTICS_API_SECRET = 'Y9jUmvz2Q3GK5zxI0JEOeg';
const ANALYTICS_HOST = 'www.google-analytics.com';
const ANALYTICS_PROTOCOL = 'https'
const ANALYTICS_URI = `/mp/collect?measurement_id=${ANALYTICS_MEASUREMENT_ID}&api_secret=${ANALYTICS_API_SECRET}`;
const TIMESTAMP = moment().valueOf().toString() + '000';
const main = async () => {
  let data = {
    client_id: 'f3c51ccd-4fb0-48e8-95f6-ffb5bac39d9e',
    //timestamp_micros: TIMESTAMP,
    non_personalized_ads: false,
    events: [{
      name: 'chatbot_pas',
      params: {
        usuario: user.get('codUsuario'),
      },
    }],
  };

  const url = `${ANALYTICS_PROTOCOL}://${ANALYTICS_HOST}${ANALYTICS_URI}`

  return await rp({
    uri: url,
    method: 'POST',
    body: data,
    json: true,
    headers: {
      'Content-Type': 'application/json',
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
