const taskInput = document.getElementById('task-input')
const taskList = document.getElementById('task-list')

window.onload = function () {
	loadTasks()
}

function addTask() {
	const taskText = taskInput.value.trim()
	if (!taskText) return

	const taskItem = document.createElement('li')
	taskItem.classList.add('task-item')

	const taskSpan = document.createElement('span')
	taskSpan.textContent = taskText
	taskItem.appendChild(taskSpan)

	const deleteButton = document.createElement('button')
	deleteButton.textContent = 'Удалить'
	deleteButton.onclick = () => removeTask(taskItem)
	taskItem.appendChild(deleteButton)

	taskItem.addEventListener('dblclick', () => editTask(taskItem))

	const checkbox = document.createElement('input')
	checkbox.type = 'checkbox'
	checkbox.onclick = () => toggleTaskStatus(taskItem)
	taskItem.prepend(checkbox)

	taskList.appendChild(taskItem)
	taskInput.value = ''

	saveTasks()
}

function removeTask(taskItem) {
	taskItem.remove()
	saveTasks()
}

function toggleTaskStatus(taskItem) {
	taskItem.classList.toggle('completed')
	saveTasks()
}

function editTask(taskItem) {
	const taskSpan = taskItem.querySelector('span')
	const currentText = taskSpan.textContent.trim()

	const updatedText = prompt('Отредактируйте задачу:', currentText)

	if (updatedText !== null && updatedText.trim() !== '') {
		taskSpan.textContent = updatedText.trim()
		saveTasks()
	}
}

function saveTasks() {
	const tasks = []
	const taskItems = taskList.getElementsByTagName('li')
	Array.from(taskItems).forEach(taskItem => {
		const taskText = taskItem.querySelector('span').textContent.trim()
		const isCompleted = taskItem.classList.contains('completed')
		tasks.push({ taskText, isCompleted })
	})
	localStorage.setItem('tasks', JSON.stringify(tasks))
}

function loadTasks() {
	const tasks = JSON.parse(localStorage.getItem('tasks')) || []
	tasks.forEach(task => {
		const taskItem = document.createElement('li')
		taskItem.classList.add('task-item')

		const taskSpan = document.createElement('span')
		taskSpan.textContent = task.taskText
		taskItem.appendChild(taskSpan)

		const deleteButton = document.createElement('button')
		deleteButton.textContent = 'Удалить'
		deleteButton.onclick = () => removeTask(taskItem)
		taskItem.appendChild(deleteButton)

		taskItem.addEventListener('dblclick', () => editTask(taskItem))

		const checkbox = document.createElement('input')
		checkbox.type = 'checkbox'
		checkbox.checked = task.isCompleted
		checkbox.onclick = () => toggleTaskStatus(taskItem)
		taskItem.prepend(checkbox)

		if (task.isCompleted) {
			taskItem.classList.add('completed')
		}

		taskList.appendChild(taskItem)
	})
}

function showAllTasks() {
	const tasks = taskList.getElementsByTagName('li')
	Array.from(tasks).forEach(task => (task.style.display = 'block'))
}

function showCompletedTasks() {
	const tasks = taskList.getElementsByTagName('li')
	Array.from(tasks).forEach(task => {
		task.style.display = task.classList.contains('completed') ? 'block' : 'none'
	})
}

function showPendingTasks() {
	const tasks = taskList.getElementsByTagName('li')
	Array.from(tasks).forEach(task => {
		task.style.display = !task.classList.contains('completed')
			? 'block'
			: 'none'
	})
}
