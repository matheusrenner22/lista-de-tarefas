const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

const criaElementoLi = () => {
    const li = document.createElement('li');

    return li;
};

const limpaInput = () => {
    inputTarefa.value = '';
    inputTarefa.focus();
};

const criaBotaoApagar = (li) => {
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class', 'btn-li');
    botaoApagar.setAttribute('title', 'Apagar esta tarefa');
    li.appendChild(botaoApagar);
};

const salvarTarefa = () => {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefasTexto = tarefa.innerText;
        tarefasTexto = tarefasTexto.replace('APAGAR', '').trim();
        listaDeTarefas.push(tarefasTexto);
    }

    const jsonTarefas = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', jsonTarefas);
};

const criaTarefa = (tarefa) => {
    const li = criaElementoLi();
    li.innerText = tarefa;
    tarefas.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefa();
};

const carregaTarefasSalvas = () => {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);

    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
};

inputTarefa.addEventListener('keypress', function (event) {
    if (event.keyCode === 13) {
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
});

btnTarefa.addEventListener('click', function () {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
});

document.addEventListener('click', function (event) {
    const element = event.target;

    if (element.classList.contains('btn-li')) {
        element.parentElement.remove();
        salvarTarefa();
    }
});

carregaTarefasSalvas();