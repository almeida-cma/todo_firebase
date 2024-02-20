// app.js
import firestore from './firebase-config.js';
import { collection, addDoc, onSnapshot, updateDoc, doc, deleteDoc } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// Referência para a coleção de tarefas no Firestore
const taskCollection = collection(firestore, 'tasks');

// Função para adicionar uma nova tarefa
export async function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskName = taskInput.value.trim();

    if (taskName !== '') {
        await addDoc(taskCollection, {
            name: taskName,
            completed: false
        });
        taskInput.value = '';
    }
}

// Função para excluir uma tarefa
export async function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        await deleteDoc(doc(taskCollection, taskId));
    }
}

// Função para exibir as tarefas na lista
function displayTasks() {
    onSnapshot(taskCollection, (snapshot) => {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';

        snapshot.forEach((doc) => {
            const task = doc.data();
            const taskId = doc.id;

            const li = document.createElement('li');
            li.textContent = task.name;
            li.setAttribute('data-id', taskId);
            li.classList.add('task-item'); // Adiciona a classe 'task-item'

            // Adiciona um evento de clique para marcar a tarefa como concluída
            li.addEventListener('click', async () => {
                await updateTaskCompletion(taskId, !task.completed);
            });

            // Adiciona um evento de clique para excluir a tarefa
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-button'); // Adiciona a classe 'delete-button'
            deleteButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Impede a propagação do evento de clique para o elemento pai (li)
                deleteTask(taskId);
            });

            li.appendChild(deleteButton);

            if (task.completed) {
                li.classList.add('completed');
            }

            taskList.appendChild(li);
        });
    });
}

// Função para atualizar o estado de conclusão da tarefa
async function updateTaskCompletion(taskId, completed) {
    const taskDocRef = doc(taskCollection, taskId);
    await updateDoc(taskDocRef, {
        completed: completed
    });
}

// Chama a função displayTasks para exibir as tarefas ao carregar a página
document.addEventListener('DOMContentLoaded', displayTasks);

// Exporta a função addTask para ser acessível no escopo global
window.addTask = addTask;
