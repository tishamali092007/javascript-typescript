const STORAGE_KEY = 'tasky_tasks_v1';

let tasks = [];
let editingId = null;
let activeFilter = 'all';
let searchTerm = '';

const taskForm = document.getElementById('taskForm');
const taskIdInput = document.getElementById('taskId');
const titleInput = document.getElementById('title');
const descInput = document.getElementById('description');
const dueDateInput = document.getElementById('dueDate');
const priorityInput = document.getElementById('priority');
const errorTitle = document.getElementById('errorTitle');
const errorDate = document.getElementById('errorDate');
const formHeading = document.getElementById('formHeading');
const submitBtn = document.getElementById('submitBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const priorityPills = document.getElementById('priorityPills');

const taskListEl = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const emptyStateMsg = document.getElementById('emptyStateMsg');
const taskCountText = document.getElementById('taskCountText');
const searchInput = document.getElementById('searchInput');
const searchToggleBtn = document.getElementById('searchToggleBtn');
const searchRow = document.getElementById('searchRow');
const filterPills = document.getElementById('filterPills');
const fabAdd = document.getElementById('fabAdd');
const toastEl = document.getElementById('toast');

function generateId() {
    return 't_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
}

function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function formatDateDisplay(isoDate) {
    if (!isoDate) return '';
    const parts = isoDate.split('-').map(Number);
    const dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
    return dateObj.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' });
}

function isOverdue(isoDate) {
    if (!isoDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const parts = isoDate.split('-').map(Number);
    const due = new Date(parts[0], parts[1] - 1, parts[2]);
    return due < today;
}

function showToast(message, icon) {
    icon = icon || 'bi-check-circle-fill';
    toastEl.innerHTML = '<i class="bi ' + icon + '"></i> ' + escapeHTML(message);
    toastEl.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () {
        toastEl.classList.remove('show');
    }, 2200);
}

function loadTasks() {
    const raw = localStorage.getItem(STORAGE_KEY);
    tasks = raw ? JSON.parse(raw) : [];
}

function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function validateForm() {
    let valid = true;

    if (titleInput.value.trim() === '') {
        titleInput.classList.add('invalid');
        errorTitle.classList.add('show');
        valid = false;
    } else {
        titleInput.classList.remove('invalid');
        errorTitle.classList.remove('show');
    }

    if (dueDateInput.value.trim() === '') {
        dueDateInput.parentElement.classList.add('invalid');
        errorDate.classList.add('show');
        valid = false;
    } else {
        dueDateInput.parentElement.classList.remove('invalid');
        errorDate.classList.remove('show');
    }

    return valid;
}

function addTask(e) {
    e.preventDefault();
    if (!validateForm()) return;

    const taskData = {
        title: titleInput.value.trim(),
        description: descInput.value.trim(),
        dueDate: dueDateInput.value,
        priority: priorityInput.value
    };

    if (editingId) {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id === editingId) {
                tasks[i] = Object.assign({}, tasks[i], taskData);
                break;
            }
        }
        showToast('Task updated');
        exitEditMode();
    } else {
        taskData.id = generateId();
        taskData.createdAt = Date.now();
        tasks.push(taskData);
        showToast('Task added');
    }

    saveTasks();
    clearForm();
    displayTasks();
}

function editTask(id) {
    let task = null;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) task = tasks[i];
    }
    if (!task) return;

    editingId = id;
    taskIdInput.value = id;
    titleInput.value = task.title;
    descInput.value = task.description || '';
    dueDateInput.value = task.dueDate;
    setPriorityPill(task.priority);

    formHeading.textContent = 'Edit Task';
    submitBtn.innerHTML = '<i class="bi bi-check-lg"></i> Update Task';
    cancelEditBtn.hidden = false;

    titleInput.classList.remove('invalid');
    dueDateInput.parentElement.classList.remove('invalid');
    errorTitle.classList.remove('show');
    errorDate.classList.remove('show');

    document.getElementById('formCard').scrollIntoView({ behavior: 'smooth', block: 'start' });
    titleInput.focus();
}

function exitEditMode() {
    editingId = null;
    taskIdInput.value = '';
    formHeading.textContent = 'Create New Task';
    submitBtn.innerHTML = '<i class="bi bi-plus-lg"></i> Create Task';
    cancelEditBtn.hidden = true;
}

function deleteTask(id) {
    let task = null;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) task = tasks[i];
    }
    if (!task) return;

    if (!confirm('Delete "' + task.title + '"? This can\'t be undone.')) return;

    tasks = tasks.filter(function (t) {
        return t.id !== id;
    });

    if (editingId === id) {
        exitEditMode();
        clearForm();
    }

    saveTasks();
    displayTasks();
    showToast('Task deleted', 'bi-trash3-fill');
}

function setPriorityPill(priority) {
    priorityInput.value = priority;
    const pills = priorityPills.querySelectorAll('.ppill');
    for (let i = 0; i < pills.length; i++) {
        if (pills[i].dataset.priority === priority) {
            pills[i].classList.add('active');
        } else {
            pills[i].classList.remove('active');
        }
    }
}

priorityPills.addEventListener('click', function (e) {
    const pill = e.target.closest('.ppill');
    if (!pill) return;
    setPriorityPill(pill.dataset.priority);
});

function clearForm() {
    taskForm.reset();
    setPriorityPill('medium');
    titleInput.classList.remove('invalid');
    dueDateInput.parentElement.classList.remove('invalid');
    errorTitle.classList.remove('show');
    errorDate.classList.remove('show');
}

function getVisibleTasks() {
    let list = tasks.slice();

    if (activeFilter !== 'all') {
        list = list.filter(function (t) {
            return t.priority === activeFilter;
        });
    }

    const q = searchTerm.trim().toLowerCase();
    if (q !== '') {
        list = list.filter(function (t) {
            return t.title.toLowerCase().indexOf(q) !== -1 || (t.description || '').toLowerCase().indexOf(q) !== -1;
        });
    }

    list.sort(function (a, b) {
        return a.dueDate.localeCompare(b.dueDate);
    });

    return list;
}

function displayTasks() {
    const list = getVisibleTasks();
    taskListEl.innerHTML = '';

    taskCountText.textContent = tasks.length + (tasks.length === 1 ? ' task' : ' tasks');

    if (tasks.length === 0) {
        emptyStateMsg.textContent = 'Add your first task using the form.';
        emptyState.hidden = false;
        taskListEl.hidden = true;
        return;
    }

    if (list.length === 0) {
        emptyStateMsg.textContent = 'No tasks match your filter or search.';
        emptyState.hidden = false;
        taskListEl.hidden = true;
        return;
    }

    emptyState.hidden = true;
    taskListEl.hidden = false;

    for (let i = 0; i < list.length; i++) {
        const task = list[i];
        const overdue = isOverdue(task.dueDate);

        const card = document.createElement('div');
        card.className = 'task-card priority-' + task.priority;
        card.innerHTML =
            '<div class="task-top">' +
            '<h3 class="task-title">' + escapeHTML(task.title) + '</h3>' +
            '<div class="task-actions">' +
            '<button class="edit-btn" title="Edit task" aria-label="Edit task"><i class="bi bi-pencil"></i></button>' +
            '<button class="delete-btn" title="Delete task" aria-label="Delete task"><i class="bi bi-trash3"></i></button>' +
            '</div>' +
            '</div>' +
            (task.description ? '<p class="task-desc">' + escapeHTML(task.description) + '</p>' : '') +
            '<div class="task-meta">' +
            '<span class="badge badge-date ' + (overdue ? 'overdue' : '') + '">' +
            '<i class="bi bi-calendar-event"></i> ' + formatDateDisplay(task.dueDate) + (overdue ? ' · overdue' : '') +
            '</span>' +
            '<span class="badge badge-priority priority-' + task.priority + '">' +
            task.priority.charAt(0).toUpperCase() + task.priority.slice(1) +
            '</span>' +
            '</div>';

        card.querySelector('.edit-btn').addEventListener('click', function () {
            editTask(task.id);
        });
        card.querySelector('.delete-btn').addEventListener('click', function () {
            deleteTask(task.id);
        });

        taskListEl.appendChild(card);
    }
}

taskForm.addEventListener('submit', addTask);

cancelEditBtn.addEventListener('click', function () {
    exitEditMode();
    clearForm();
});

titleInput.addEventListener('input', function () {
    if (titleInput.value.trim() !== '') {
        titleInput.classList.remove('invalid');
        errorTitle.classList.remove('show');
    }
});

dueDateInput.addEventListener('input', function () {
    if (dueDateInput.value.trim() !== '') {
        dueDateInput.parentElement.classList.remove('invalid');
        errorDate.classList.remove('show');
    }
});

searchInput.addEventListener('input', function (e) {
    searchTerm = e.target.value;
    displayTasks();
});

searchToggleBtn.addEventListener('click', function () {
    searchRow.classList.toggle('open');
    searchInput.focus();
});

filterPills.addEventListener('click', function (e) {
    const chip = e.target.closest('.pill');
    if (!chip) return;
    const allPills = filterPills.querySelectorAll('.pill');
    for (let i = 0; i < allPills.length; i++) {
        allPills[i].classList.remove('active');
    }
    chip.classList.add('active');
    activeFilter = chip.dataset.filter;
    displayTasks();
});

fabAdd.addEventListener('click', function () {
    document.getElementById('formCard').scrollIntoView({ behavior: 'smooth', block: 'start' });
    titleInput.focus();
});

loadTasks();
displayTasks();