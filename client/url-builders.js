const host = 'http://localhost';
const port = 3000;

function getApiURL(route, params) {
  let query = '';
  for (const param of Object.keys(params)) {
    query += query ? '&' : '?';
    query += param + '=' + params[param]; 
  }
  return host + ':' + port + route + query;
}

function getIndexCreationURL(params) {
  return getApiURL('/create-index', params);
}

function getQueryURL(params) {
  return getApiURL('/query', params);
}
