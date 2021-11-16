//Variáveis globais
const campo = document.querySelector('input[name=campo]')
const botaoCadastrar = document.getElementById('btnCadastrar')
const botaoLimpar = document.getElementById('btnLimpar')
const ulAtividades = document.getElementById('ulAtividades')

let listaAtividades = []

let listaStorage = localStorage.getItem('listaAtividades')


function limparCampo() {

  if (campo.value == '') {
    alert("Não há texto a ser limpo!")
  }

  campo.value = ''
}

function removeItem(id) {



  let confirmar = confirm("Realmente deseja apagar esta tarefa?");

  if (confirmar == true) {


    const novaLista = []

    for (let i = 0; i < listaAtividades.length; i++) {

      if (listaAtividades[i].id !== id) {
        novaLista.push(listaAtividades[i])
      }
    }

    const itemParaRemocao = document.getElementById(`item-${id}`)

    ulAtividades.removeChild(itemParaRemocao)


    listaAtividades = novaLista;

    console.log("LISTA->", { listaAtividades })


    const listaJSON = JSON.stringify(listaAtividades)


    localStorage.setItem('listaAtividades', listaJSON)
    if (listaAtividades.length == 0) {
      listaAtividades = [];
    }
  }
}




function marcarChecked(id) {


  for (let i = 0; i < listaAtividades.length; i++) {


    if (listaAtividades[i].id == id) {
      const item = listaAtividades[i]
      item.checked = !(item.checked)
      const elemento = document.getElementById(`item-${id}`)
      elemento.className = item.checked ? 'checked' : ''
    }

  }
}
function adicionarAtividade() {

  if (campo.value.length > 0) {

    const item = {
      id: Math.floor(Math.random() * 1001),
      titulo: campo.value,
      checked: false
    }


    const novoElemento = document.createElement('li')


    novoElemento.id = `item-${item.id}`


    novoElemento.innerHTML = `
      <input
        type="checkbox"
        name="chk-${item.id}"
        onclick="marcarChecked(${item.id})"
      >
      <label for="chk-${item.id}">
        ${item.titulo}
      </label>
      <button onclick="removeItem(${item.id})">
        Deletar
      </button>
    `

    ulAtividades.appendChild(novoElemento)


    listaAtividades.push(item)

    console.log("LISTA->", { listaAtividades })

    const listaJSON = JSON.stringify(listaAtividades)
    localStorage.setItem('listaAtividades', listaJSON)

    limparCampo()

  } else {

    alert('Não é possível cadastrar uma atividade vazia!')
  }
}


if (listaStorage) {
  console.log(listaStorage)
}

function carregarAtividades() {


  var storage = JSON.parse(localStorage.getItem('listaAtividades'));
  listaAtividades = storage;

  localStorage.clear();


  for (var i = 0; i < listaAtividades.length; i++) {

    const novoElemento = document.createElement('li')


    novoElemento.id = `item-${listaAtividades[i].id}`

    novoElemento.innerHTML = `
      <input
        type="checkbox"
        name="chk-${listaAtividades[i].id}"
        onclick="marcarChecked(${listaAtividades[i].id})"
      >
      <label for="chk-${listaAtividades[i].id}">
        ${listaAtividades[i].titulo}
      </label>
      <button onclick="removeItem(${listaAtividades[i].id})">
        Deletar
      </button>
    `
    ulAtividades.appendChild(novoElemento)

    const listaJSON = JSON.stringify(listaAtividades)
    localStorage.setItem('listaAtividades', listaJSON)

  }
}

//Eventos botões
botaoCadastrar.addEventListener('click', adicionarAtividade)
botaoLimpar.addEventListener('click', limparCampo)
