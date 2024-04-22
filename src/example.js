rp({ uri: 'https://cat-fact.herokuapp.com/facts/', json: true })
  .then((response) => {
    //You can get/set user variables
    bmconsole.log('===response start===');
    bmconsole.log(JSON.stringify(response[0].text));
  //user.set('data',
    bmconsole.log('===response end===');

  //result.text = x;

    //result.text(x.text);
    result.done();
  })
  .catch((err) => {
    result.text('Problems!: ' + err.message);
    result.done();
  });