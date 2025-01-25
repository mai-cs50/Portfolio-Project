document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskIdInput = document.getElementById('task-id');
    const taskList = document.getElementById('task-list');
    const searchInput = document.getElementById('search-input');

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (taskIdInput.value) {
            updateTask(taskIdInput.value, taskInput.value);
        } else {
            addTask(taskInput.value);
        }
        taskInput.value = '';
        taskIdInput.value = '';
    });

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const tasks = taskList.getElementsByTagName('li');
        Array.from(tasks).forEach(task => {
            const taskName = task.firstChild.textContent.toLowerCase();
            if (taskName.includes(searchTerm)) {
                task.style.display = '';
            } else {
                task.style.display = 'none';
            }
        });
    });

    function addTask(task) {
        const li = document.createElement('li');
        li.textContent = task;
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => {
            taskInput.value = task;
            taskIdInput.value = li.dataset.id;
        });
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(li);
        });
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }

    function updateTask(id, newTask) {
        const li = document.querySelector(`li[data-id="${id}"]`);
        li.firstChild.textContent = newTask;
    }
});
