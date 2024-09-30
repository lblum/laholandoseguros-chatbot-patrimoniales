
sendFile: async (fileName, fileContent, mediaType = 'application/pdf') => {
  result.text(JSON.stringify(context.message));
  let chatPlatform = context.message.CHAT_PLATFORM_ID;

  // TODO: ver si hay alguna manera de no tenerlo harcoded
  const accessTokenV1 = 'eyJhbGciOiJIUzUxMiJ9.eyJidXNpbmVzc0lkIjoiaG9sYW5kb3NlZ3Vyb3MiLCJuYW1lIjoiTGlsaWFuYSBTaWx2YSIsImFwaSI6dHJ1ZSwiaWQiOiJCc1AxcVZBdjZTVGVpM2VvSk9VdWRYN3IyRzAyIiwiZXhwIjoxODcxNTc4Nzg1LCJqdGkiOiJCc1AxcVZBdjZTVGVpM2VvSk9VdWRYN3IyRzAyIn0.BCNWvf9uqejdRxjBI9-AlqLDUYGIXBGDx8kutmFsDLKHfayox1V2B3noK02j0OSCK3cij1_51e35MNU8kJSisA';
  const bmApiUrl = 'https://go.botmaker.com/api/v1.0';


  if (chatPlatform == 'whatsapp') {
    // TODO: ver de donde sale esto
    let chatChannelNumber = '5491138460183';
    let platformContactId = context.message.PLATFORM_CONTACT_ID;
    result.text(user.con)
    const blob = Buffer.from(fileContent, 'base64');


    const formData = {
      // Pass a simple key-value pair
      chatPlatform: chatPlatform,
      chatChannelNumber: chatChannelNumber,
      platformContactId: platformContactId,
      mediaType: mediaType,
      file: {
        value: blob,
        options: {
          filename: fileName,
          contentType: mediaType
        }
      }
    };

    const url = `${bmApiUrl}/message/binary/v3`;

    await rp({
      uri: url,
      method: 'POST',
      formData: formData,
      json: true,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
        'access-token': accessTokenV1,
      }
    })
      .then((resp) => {
        bmconsole.log('ok');
      })
      .catch((error) => {
        bmconsole.error(`[ERROR] : ${error.message}`);
        user.set('error', error);
      });
  }
  else {
    result.file(`data:${mediaType};base64,${fileContent}`, fileName);
  } 
}