const IS_TEST = true;

utils= require('utils');
const main = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "multipart/form-data");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("access-token", "eyJhbGciOiJIUzUxMiJ9.eyJidXNpbmVzc0lkIjoiaG9sYW5kb3NlZ3Vyb3MiLCJuYW1lIjoiTGlsaWFuYSBTaWx2YSIsImFwaSI6dHJ1ZSwiaWQiOiJCc1AxcVZBdjZTVGVpM2VvSk9VdWRYN3IyRzAyIiwiZXhwIjoxODcxNTc4Nzg1LCJqdGkiOiJCc1AxcVZBdjZTVGVpM2VvSk9VdWRYN3IyRzAyIn0.BCNWvf9uqejdRxjBI9-AlqLDUYGIXBGDx8kutmFsDLKHfayox1V2B3noK02j0OSCK3cij1_51e35MNU8kJSisA");
  
  const formdata = new FormData();
  formdata.append("chatPlatform", "whatsapp");
  formdata.append("chatChannelNumber", "5491138460183");
  formdata.append("platformContactId", "5491150143462");
  formdata.append("mediaType", "application/pdf");

  let x = atob(demoImg);
  let q = await (await fetch(`data:application/pdf;base64,${demoImg}`)).blob();;
  const blob = new Buffer.from(demoImg, 'base64');

  formdata.append("file", q , "test-1.pdf");
  
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow"
  };
  
  fetch("https://go.botmaker.com/api/v1.0/message/binary/v3", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));};

main()
  .catch(err => {
    // Code on error
    if (IS_TEST) {
      result.text(`[ERROR] : ${err.message}`);
    }
    bmconsole.error(`[ERROR]: ${err.message}`);
  })
  .finally( () => {
    // Code on finish
    result.done();
  });
