//Variáveis globais
const campo = document.querySelector('input[name=campo]')
const botaoCadastrar = document.getElementById('btnCadastrar')
const botaoLimpar = document.getElementById('btnLimpar')
const ulAtividades = document.getElementById('ulAtividades')

//Variável para "setar" id das tarefas
var idUnico = 0;

let listaAtividades = []

let listaStorage = localStorage.getItem('listaAtividades')


function limparCampo() {

  if (campo.value == '') {
    alert("Não há texto a ser limpo!")
  }

  campo.value = ''
}

function removeItem(index) {

  let confirmar = confirm("Realmente deseja apagar esta tarefa?");

  if (confirmar == true) {


    const novaLista = []

    for (let i = 0; i < listaAtividades.length; i++) {

      if (i !== index) {
        novaLista.push(listaAtividades[i])
      }
    }

    const itemParaRemocao = document.getElementById(`item-${index}`)
    ulAtividades.removeChild(itemParaRemocao)


    listaAtividades = novaLista;
  }
}

function marcarFeito(index) {


  for (let i = 0; i < listaAtividades.length; i++) {


    if (listaAtividades[i].id == index) {
      const item = listaAtividades[i]
      item.feito = !(item.feito)
      const elemento = document.getElementById(`item-${index}`)
      elemento.className = item.feito ? 'feito' : ''
    }

  }
}
function adicionarAtividade() {

  if (campo.value.length > 0) {

    const item = {
      id: idUnico++,
      titulo: campo.value,
      feito: false
    }


    const novoElemento = document.createElement('li')


    novoElemento.id = `item-${item.id}`


    novoElemento.innerHTML = `
      <input
        type="checkbox"
        name="chk-${item.id}"
        onclick="marcarFeito(${item.id})"
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

//Exibe conteúdo da lista no localStorage no console
if (listaStorage) {
  console.log(listaStorage)
}

function carregarAtividades() {
  var storage = JSON.parse(localStorage.getItem('listaAtividades'));
  arrayLista = storage;

  for (var i = 0; i < arrayLista.length; i++) {

    const novoElemento = document.createElement('li')


    novoElemento.id = `item-${arrayLista[i].id}`

    novoElemento.innerHTML = `
      <input
        type="checkbox"
        name="chk-${arrayLista[i].id}"
        onclick="marcarFeito(${arrayLista[i].id})"
      >
      <label for="chk-${arrayLista[i].id}">
        ${arrayLista[i].titulo}
      </label>
      <button onclick="removeItem(${arrayLista[i].id})">
        Deletar
      </button>
    `
    ulAtividades.appendChild(novoElemento)

  }
}

//Eventos botões
botaoCadastrar.addEventListener('click', adicionarAtividade)
botaoLimpar.addEventListener('click', limparCampo)
