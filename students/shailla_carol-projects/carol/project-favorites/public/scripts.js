const ul = document.querySelector('ul');
const input = document.querySelector('input');
const form = document.querySelector('form');

// Função que carrega o conteúdo da API.
async function load() {
  const res = await fetch('http://localhost:3000/').then((data) => data.json());
  res.urls.map(({ name, url }) => addElement({ name, url }));
}

load();

function addElement({ name, url }) {
  const li = document.createElement('li');
  li.innerHTML = `
    <a href="${url}" target="_blank">${name}</a>
    <button class="editar">Editar</button>
    <button class="remover">Remover</button>
  `;

  li.querySelector('.remover').addEventListener('click', () => {
    removeElement(li);
  });

  li.querySelector('.editar').addEventListener('click', () => {
    editElement(li);
  });

  ul.appendChild(li);
}

async function addElementAndSendToApi({ name, url }) {
  addElement({ name, url });

  const response = await fetch(`http://localhost:3000/?name=${name}&url=${url}`);

  if (!response.ok) console.error(`Erro ao enviar os dados para a API: ${response.statusText}`);
}


async function editElement(element) {
    const name = element.querySelector('a').innerText;
    const url = element.querySelector('a').getAttribute('href');
  
    const newName = prompt('Digite o novo nome:', name);
    const newUrl = prompt('Digite a nova URL:', url);
  
    if (newName && newUrl) {
      element.querySelector('a').innerText = newName;
      element.querySelector('a').setAttribute('href', newUrl);
  
      removeElementFromApi(name, url); // Remove o elemento antigo da API
      addElementAndSendToApi({ name: newName, url: newUrl }); // Adiciona o elemento atualizado na API
    }
  }

  async function removeElement(element) {
    const confirmar = confirm('Deseja realmente remover esse link?');
    if (confirmar) {
      element.remove();
  
      const name = element.querySelector('a').innerText;
      const url = element.querySelector('a').getAttribute('href');
  
      removeElementFromApi(name, url);
    }
  }
  
  async function removeElementFromApi(name, url) {
    try {
      const params = new URLSearchParams();
      params.append('name', name);
      params.append('url', url);
      params.append('del', '1');
  
      await fetch(`http://localhost:3000/?${params.toString()}`, { method: 'DELETE' });
    } catch (error) {
      console.log('Erro na requisição:', error);
    }
  }
  

async function update({ name, url, newName, newUrl }) {
  const params = new URLSearchParams();
  params.append('name', name);
  params.append('url', url);
  params.append('newName', newName);
  params.append('newUrl', newUrl);

  const response = await fetch(`http://localhost:3000/?${params.toString()}`, {
    method: 'PUT',
  });

  if (!response.ok) console.error(`Erro`);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  let { value } = input;

  if (!value) return alert('Preencha o campo!');

  const [name, url] = value.split(',');

  if (!url) return alert('O texto não está formatado da maneira correta.');

  if (!/^http/.test(url)) return alert('Digite a URL da maneira correta.');

  addElementAndSendToApi({ name, url });

  input.value = '';
});