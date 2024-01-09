const cr_dirname = document.getElementById('create-dirname');
const cr_index = document.getElementById('create-index');
const cr_filenames = document.getElementById('create-filenames');
const cr_output = document.getElementById('create-output');
const q_word = document.getElementById('query-word');
const q_index = document.getElementById('query-index');
const q_filenames = document.getElementById('query-filenames');
const q_output = document.getElementById('query-output');

function addParam(param, name, params) {
  if (param) {
    params[name] = param;
  }
}

function clearCreationForm() {
  cr_dirname.value = '';
  cr_index.value = '';
  cr_filenames.value = '';
  cr_output.innerText = '';
}

function clearQueryForm() {
  q_word.value = '';
  q_index.value = '';
  q_filenames.value = '';
  q_output.innerText = '';
}

function createIndex() {
  const params = {};
  addParam(cr_dirname.value, 'dirname', params);
  addParam(cr_index.value, 'index', params);
  addParam(cr_filenames.value, 'filenames', params);
  clearCreationForm();
  fetch(getIndexCreationURL(params))
    .then(res => {
      if(!res.ok) {
        throw new Error(`with ${res.status} code: '${res.statusText}'`);
      }
      
      return res.json();
    })
    .then(data => {
      cr_output.innerText = data.message;
    })
    .catch(err => {
      cr_output.innerText = 'Error: ' + err.message;
    });
}

function query() {
  const params = {};
  const word = q_word.value.toLowerCase();
  addParam(word, 'word', params);
  addParam(q_index.value, 'index', params);
  addParam(q_filenames.value, 'filenames', params);
  clearQueryForm();
  fetch(getQueryURL(params))
    .then(res => {
      if(!res.ok) {
        throw new Error(`with ${res.status} code: '${res.statusText}'`);
      }
      
      return res.json();
    })
    .then(data => {
      if (data.length) {
        for (const obj of data) {
          q_output.innerText += `[${obj.file}]: ${obj.counts}; `;
        }
      }
      else {
        q_output.innerText = `Word '${word}' isn't presented in any of files.`
      }
    })
    .catch(err => {
      q_output.innerText = 'Error: ' + err.message;
    });
}