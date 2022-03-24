const addTaskInput = document.querySelector(".to-do-list__add-task");
const searchTaskInput = document.querySelector(".to-do-list__search-task");
const addTaskButton = document.querySelector(".to-do-list__add-task-button");
const searchTaskButton = document.querySelector(".to-do-list__search-task-button");
const taskList = document.querySelector(".to-do-list__tasks-list");
const tasksNumber = document.querySelector(".to-do-list__tasks-number");
const tasksCompleted = document.querySelector(".to-do-list__tasks-completed");
const taskArray = [];
const addTask = (e) => {
	e.preventDefault();
	if (addTaskInput.value === "") return;
	const taskText = addTaskInput.value;
	const newTask = document.createElement("li");
	newTask.className = "to-do-list__task";
	newTask.innerHTML = `<input type="checkbox" name="" id="" /><p>${taskText}</p><button>x</button>`;
	taskArray.push(newTask);
	updateTaskArray();
	taskList.appendChild(newTask);
	newTask.querySelector(".to-do-list__task button").addEventListener("click", removeTask);
	newTask.querySelector(".to-do-list__task input").addEventListener("change", taskComplete);
	addTaskInput.value = "";
};
const taskComplete = (e) => {
	if (e.target.checked) {
		e.target.parentNode.classList.add("to-do-list__task--checked");
	} else {
		e.target.parentNode.classList.remove("to-do-list__task--checked");
	}
	taskCompletedUpdate();
};
const removeTask = (e) => {
	const taskIndex = e.target.parentNode.dataset.key;
	taskArray.splice(taskIndex, 1);
	updateTaskArray();
	taskCompletedUpdate();
};
const updateTaskArray = () => {
	taskList.textContent = "";
	taskArray.forEach((task, key) => {
		task.dataset.key = key;
		taskList.appendChild(task);
	});
	tasksNumber.textContent = taskArray.length;
};
const taskCompletedUpdate = () => {
	const taskCompletedArray = [...document.querySelectorAll(".to-do-list__task--checked")];
	tasksCompleted.textContent = taskCompletedArray.length;
};
const searchTask = (e) => {
	const searchInput = searchTaskInput.value.toLowerCase();
	const searchingTask = taskArray.filter((task) => task.textContent.toLowerCase().includes(searchInput));
	taskList.textContent = "";
	searchingTask.forEach((task) => taskList.appendChild(task));
};
addTaskButton.addEventListener("click", addTask);
searchTaskButton.addEventListener("click", (e) => {
	e.preventDefault();
	searchTaskInput.value = "";
});
searchTaskInput.addEventListener("input", searchTask);
