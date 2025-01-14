let utils = require('utils');

const main = async () => {

  if (context.params.codEvent != null && (context.params.codEvent ?? '') != '')
    codEvent = context.params.codEvent;

  await utils.logEvent(codEvent??'test',
    {
    });
};

main()
  .then((x) => {
    ;
  })

  .catch(err => {
  })
  .finally(() => {
    result.done();
  });
