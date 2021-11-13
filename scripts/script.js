// pega elementos do html
const campo = document.querySelector('input[name=campo]')
const botaoCadastrar = document.getElementById('btnCadastrar')
const botaoLimpar = document.getElementById('btnLimpar')
const ulAtividades = document.getElementById('ulAtividades')

window.onload = function () {
  //ir no localStorage ver se tem pela chave que você está usando no código
  //vaso tenha, criar os respectivos itens no <ul>
}

// inicia um vetor vazio
let listaTarefas = []

// pega conteúdo do localStorage
let listaStorage = localStorage.getItem('listaAtividades')

// verifica se existe conteúdo
if (listaStorage) {
  // mostra no console se tiver
  console.log(listaStorage)
}

// apaga conteudo do campo
function limparCampo() {
  campo.value = ''
}

// remove uma das atividades
function removeItem(index) {

  let confirmar = confirm("Realmente deseja apagar esta tarefa?");

  if (confirmar == true) {
    // cria lista vazia
    const novaLista = []

    // preenche a lista nova com todos itens menos o removido
    for (let i = 0; i < listaTarefas.length; i++) {
      // se o item não for o removido, vai pra nova lista
      if (i !== index) {
        novaLista.push(listaTarefas[i])
      }
    }

    // pega item a ser removido do html
    const itemParaRemocao = document.getElementById(`item-${index}`)
    // remove ele do pai
    ulAtividades.removeChild(itemParaRemocao)

    // atualiza a lista com a lista nova
    listaTarefas = novaLista
  }
}
// marca ou desmarca atividade
function marcarFeito(index) {
  // verifica se existe esse índice na lista
  if (listaTarefas[index]) {
    // pega item da lista
    const item = listaTarefas[index]

    // inverte o valor de feito
    item.feito = !(item.feito)

    // pega o elemento do html
    const elemento = document.getElementById(`item-${index}`)

    // atualiza a classe para riscar ou não
    elemento.className = item.feito ? 'feito' : ''
  }

}
// adiciona itens a lista
function adicionarTarefa() {
  // verifica se o campo não está vazio
  if (campo.value.length > 0) {
    // define o objeto do item a ser adicionado
    const item = {
      id: listaTarefas.length,
      titulo: campo.value,
      feito: false
    }

    // cria um novo item de lista html
    const novoElemento = document.createElement('li')

    // adiciona atributo id ao item html
    novoElemento.id = `item-${item.id}`

    // preenche o conteúdo do item html
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

    // manda o item novo para o documento html
    ulAtividades.appendChild(novoElemento)

    // adiciona também no vetor da lista
    listaTarefas.push(item)

    console.log("LISTA->", { listaTarefas })

    // converte para string JSON
    const listaJSON = JSON.stringify(listaTarefas)

    // armazena do localStorage
    localStorage.setItem('listaAtividades', listaJSON)

    limparCampo()
  } else {
    // avisa que o campo está vazio
    alert('Não é possível cadastrar uma tarefa vazia!')
  }
}
/*
function criarItem() {
  var input = document.getElementById('item');
  console.log(input.value);
  var item = document.createElement('li');

  var checkbox =;


  item.appendChild(checkbox);
  item.appendChild(label);
  item.appendChild(botao);

  var list = document.getElementById('listas';
  list.appendChild()
}
*/

function carregarLista() {
  var storage = JSON.parse(localStorage.getItem('lista'));
  arrayLista = storage;
  for (var i = 0; i < arrayLista.length; i++) {
    criarItem();

  }
}

// vincula funções aos elementos html
botaoCadastrar.addEventListener('click', adicionarTarefa)
botaoLimpar.addEventListener('click', limparCampo)


//fazer no HTML "body = onload e chamar a funcao de carregar lista"
