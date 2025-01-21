const nameInput = document.getElementById('name-input')
const savedNameSpan = document.getElementById('saved-name')

function saveName() {
	const name = nameInput.value.trim()
	if (name) {
		localStorage.setItem('userName', name)
		displaySavedName()
	}
}

function displaySavedName() {
	const savedName = localStorage.getItem('userName')
	if (savedName) {
		savedNameSpan.textContent = savedName
	}
}

window.onload = displaySavedName
