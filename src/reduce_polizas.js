const polizas = JSON.parse(user.get('Polizas'));

const main = async () => {
  let result = polizas.reduce((acc, d) => {
    const found = acc.find(a => a === d.poliza);
    if (!found) {
      acc.push(d.poliza);
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
    return polizas[v.index];
  });
  return result;
};

main()
  .then((x) => {
    ;
  })
  .catch(err => {
    bmconsole.error(err);
  })
  .finally(() => {
    result.done();
  });




  