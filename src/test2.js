/*const ANALYTICS_NAME = 'CHATBOT_ PRODUCTORES';
const ANALYTICS_MEASUREMENT_ID = 'G-DYGZ97JCTK'
const ANALYTICS_API_SECRET = 'm9ytEK1MRUG2udzm2r6ilg'
const ANALYTICS_HOST = 'www.google-analytics.com'
const ANALYTICS_PROTOCOL = 'https'
const ANALYTICS_URI = `/mp/collect?measurement_id=${ANALYTICS_MEASUREMENT_ID}&api_secret=${ANALYTICS_API_SECRET}`;
*/
const main = async () => {
/*
  const data = JSON.stringify({
    client_id: 'CLIENT_ID', // A unique client identifier
    events: [{
      name: 'botmaker_event2',
      params: {
        param1: 'value1',
        param2: 'value2',
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
  */
 const fb = google.firebase;
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAlu4CDL3aXV3AK7asNv-kPtTNlh4peKcU",
    authDomain: "chatbot-pas.firebaseapp.com",
    projectId: "chatbot-pas",
    storageBucket: "chatbot-pas.appspot.com",
    messagingSenderId: "152382687481",
    appId: "1:152382687481:web:19c8a3c1fe4fc0558e7a28",
    measurementId: "G-TTSZWGGTY0"
  };
  const app = fb.initializeApp(firebaseConfig);
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
