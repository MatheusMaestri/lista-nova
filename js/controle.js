let contador = 0;
let adicionar = document.getElementById('btn-add');
let input = document.getElementById('inputTarefa');
let main = document.getElementById('areaLista');

document.addEventListener('DOMContentLoaded', loadTasks);

function addTarefa() {
    let valorInput = input.value;

    if ((valorInput !== "") && (valorInput !== null) && (valorInput !== undefined)) {
        ++contador;

        let novoItem = `
            <div class="item" id="${contador}">
                <div onclick="marcarTarefa(${contador})" class="item-icone">
                    <ion-icon id="icone_${contador}" name="ellipse-outline" class="ellipse-outline"></ion-icon>
                </div>

                <div onclick="marcarTarefa(${contador})" class="item-nome">
                    ${valorInput}
                </div>

                <div class="item-botao">
                    <button class="delete" onclick="deletar(${contador})">
                        <ion-icon name="trash-outline"></ion-icon>
                        Deletar
                    </button>
                </div>
            </div>
        `;

        main.innerHTML += novoItem;
        saveTask(contador, valorInput);
        input.value = "";
        input.focus();
    }
}

function deletar(id) {
    let tarefa = document.getElementById(id);
    tarefa.remove();
    removeTask(id);
}

function marcarTarefa(id) {
    var item = document.getElementById(id);
    var icone = document.getElementById('icone_' + id);

    item.classList.toggle('clicado');

    if (icone.getAttribute('name') === 'ellipse-outline') {
        icone.setAttribute('name', 'checkmark-circle');
    } else {
        icone.setAttribute('name', 'ellipse-outline');
    }

    updateTaskStatus(id, item.classList.contains('clicado'));
}

input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTarefa();
    }
});

function saveTask(id, task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ id, task, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(t => t.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskStatus(id, completed) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(t => t.id === id ? { ...t, completed } : t);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        ++contador;
        let novoItem = `
            <div class="item ${task.completed ? 'clicado' : ''}" id="${task.id}">
                <div onclick="marcarTarefa(${task.id})" class="item-icone">
                    <ion-icon id="icone_${task.id}" name="${task.completed ? 'checkmark-circle' : 'ellipse-outline'}" class="${task.completed ? 'checkmark-circle' : 'ellipse-outline'}"></ion-icon>
                </div>

                <div onclick="marcarTarefa(${task.id})" class="item-nome">
                    ${task.task}
                </div>

                <div class="item-botao">
                    <button class="delete" onclick="deletar(${task.id})">
                        <ion-icon name="trash-outline"></ion-icon>
                        Deletar
                    </button>
                </div>
            </div>
        `;

        main.innerHTML += novoItem;
    });
}
