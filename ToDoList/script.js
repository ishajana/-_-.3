window.addEventListener('load', () => {
    const form = document.querySelector(".new-task-form");
    const input = document.querySelector(".new-task-input");
    const pendingList = document.querySelector("#tasks");
    const completedList = document.querySelector("#tasks-com");

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = input.value.trim();
        if (!taskText) {
            alert("Please add your task!");
            return;
        }

        const taskElement = createTaskElement(taskText);
        pendingList.appendChild(taskElement);

        input.value = "";
    });

    function createTaskElement(taskText) {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");

        const contentElement = document.createElement("div");
        contentElement.classList.add("content");

        const textElement = document.createElement("input");
        textElement.classList.add("text");
        textElement.type = "text";
        textElement.value = taskText;
        textElement.setAttribute("readonly", "readonly");

        contentElement.appendChild(textElement);

        const actionElement = document.createElement("div");
        actionElement.classList.add("action");

        const editButton = document.createElement("button");
        editButton.classList.add("edit");
        editButton.innerHTML = "Edit";

        const doneButton = document.createElement("button");
        doneButton.classList.add("done");
        doneButton.innerHTML = "Done";

        actionElement.appendChild(editButton);
        actionElement.appendChild(doneButton);

        taskElement.appendChild(contentElement);
        taskElement.appendChild(actionElement);

        editButton.addEventListener('click', () => {
            if (editButton.innerText.toLowerCase() === "edit") {
                textElement.removeAttribute("readonly");
                textElement.focus();
                editButton.innerText = "Save";
            } else {
                textElement.setAttribute("readonly", "readonly");
                editButton.innerText = "Edit";
            }
        });

        doneButton.addEventListener('click', () => {
            if (doneButton.innerHTML.toLowerCase() === "done") {
                moveTaskToCompleted(taskElement);
            }
        });

        return taskElement;
    }

    function moveTaskToCompleted(taskElement) {
        const textElement = taskElement.querySelector(".text");
        const completedTaskElement = createCompletedTaskElement(textElement.value);
        completedList.appendChild(completedTaskElement);
        taskElement.remove();
    }

    function createCompletedTaskElement(taskText) {
        const taskElement = document.createElement("div");
        taskElement.classList.add("tasks");

        const contentElement = document.createElement("div");
        contentElement.classList.add("contents");

        const textElement = document.createElement("input");
        textElement.classList.add("text");
        textElement.type = "text";
        textElement.value = taskText;
        textElement.setAttribute("readonly", "readonly");

        contentElement.appendChild(textElement);

        const actionElement = document.createElement("div");
        actionElement.classList.add("actions");

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete");
        deleteButton.innerHTML = "Delete";

        actionElement.appendChild(deleteButton);

        taskElement.appendChild(contentElement);
        taskElement.appendChild(actionElement);

        deleteButton.addEventListener('click', () => {
            taskElement.remove();
        });

        return taskElement;
    }
});
