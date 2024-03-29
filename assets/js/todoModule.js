//assets/todoModule.js
var TodoListApp = (function () {
    let tasks = [];
    const tasksList = document.getElementById('list');
    const addTaskInput = document.getElementById('add');
    const tasksCounter = document.getElementById('tasks-counter');
    const addTaskButton = document.getElementById('addTaskButton'); 
    const deleteTaskButton = document.getElementById('deleteTaskButton');
    var a = 10;
    
    async function fetchTodos () {
        // GET request
        // fetch('https://jsonplaceholder.typicode.com/todos')
        // .then(function (response){
        //     console.log(response);
        //     return response.json();
        // }).then(function (data){
        //     console.log(data);
        //     tasks = data.slice(0,10);
        //     renderList();
        // })
        // .catch(function (error){
        //     console.log('error',error);
        // })
        // try{
        //     const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        //     const data = await response.json();
        //     tasks = data.slice(0, 10);
        //     renderList();
        // }
        // catch(error){
        //     console.log(error);
        // }
        try {
            // Fetch tasks from the server
            const response = await fetch('/tasks');
            const data = await response.json();
            tasks = data;
            renderList();
        } catch (error) {
            console.error(error);
            showNotification('Failed to fetch tasks');
        }
    }
    
    function addTaskToDom(task) {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''}  class="custom-checkbox">
            <label for="${task.id}">${task.title}</label>
            <span class="task-details">  -  Category: ${task.category}  -  Date: ${task.date}</span>
              <img src="/images/delete_FILL0_wght400_GRAD0_opsz24.png" class="delete" data-id="${task.id}" />
        `;
        tasksList.append(li);
    }
    function renderList() {
        tasksList.innerHTML = '';

        for (let i = 0; i < tasks.length; i++) {
            addTaskToDom(tasks[i]);
        }

        tasksCounter.innerHTML = tasks.length;
    }

    
    function toggleTask (taskId) {
        console.log(taskId);
        const task = tasks.filter(function (task){
            return task.id === Number(taskId)
        });
        if (task.length > 0){
            const currentTask = task[0];
            currentTask.completed = !currentTask.completed;
            renderList();
            showNotification('Task toggled successfully');
            return;
        }
        showNotification('could not toggle the task');
    }
    
    function deleteTask (taskId) {
        const newTasks = tasks.filter(function(task){
            return task.id !== Number(taskId)
        })
        tasks = newTasks;
        renderList();
        showNotification('Task deleted successfully');
    }

    function deleteCheckedTasks() {
        const checkedTasks = Array.from(document.querySelectorAll('.custom-checkbox:checked'));
        checkedTasks.forEach(function (checkbox) {
            const taskId = checkbox.id;
            deleteTask(taskId);
        });
    }


    function addTask(task) {
        if (task) {

            task.date = new Date().toLocaleString(); // Add the current date
            task.category = document.getElementById('category').value; // Get the selected category
            tasks.push(task);
            renderList();
            showNotification('Task added successfully');
            return;
        }
        showNotification('Task can not be added');
    }
    // function addTask (task) {
    //     if(task){
    // //     fetch('https://jsonplaceholder.typicode.com/todos' , {
    // //     method: 'POST',
    // //     headers: {
    // //         "Content-Type": "application/json",
    // //     },
    // //     body: JSON.stringify(task),
    // // })
    // //     .then(function (response){
    // //         console.log(response);
    // //         return response.json();
    // //     }).then(function (data){
    // //         console.log(data);
    // //         tasks = data.slice(0,10);
    // //         renderList();
    // //     })
    // //     .catch(function (error){
    // //         console.log('error',error);
    // //     })
    //         tasks.push(task);
    //         renderList();
    //         showNotification('Task added successfully');
    //         return;
    //     }
    //     showNotification('Task can not be added');
    // }
    
    function showNotification(text) {
        alert(text);
    }
    
    function handleInputkeypress (e){
        if(e.key == 'Enter'){
            const text = e.target.value;
            console.log('text' , text);
        if(!text){
            showNotification('Task cannot be empty');
            return;
        }
        const task = {
            title: text,
            id: Date.now(),
            completed: false
        }
        e.target.value = '';
        addTask(task);
        }
    }
    
    function handleClickListener(e) {
        const target = e.target;

        if (target.className == 'delete') {
            const taskId = target.dataset.id;
            deleteTask(taskId);
            return;
        } else if (target.className == 'custom-checkbox') {
            const taskId = target.id;
            toggleTask(taskId);
            return;
        } else if (target.id === 'deleteTaskButton') {
            deleteCheckedTasks();
            return;
        }
    }
    function initializeApp() {
        fetchTodos();
        addTaskInput.addEventListener('keyup', handleInputkeypress);
        document.addEventListener('click', handleClickListener);

        // Add event listener for the "Add Task" button
        addTaskButton.addEventListener('click', handleAddTaskButtonClick);
        // Add event listener for the "Delete Task" button
        const deleteTaskButton = document.getElementById('deleteTaskButton');
        deleteTaskButton.addEventListener('click', handleClickListener);

    }
    async function handleAddTaskButtonClick() {
        const text = addTaskInput.value;

        if (!text) {
            showNotification('Task cannot be empty');
            return;
        }

        const task = {
            title: text,
            id: Date.now(),
            completed: false,
        };

        addTaskInput.value = '';
        tasks.push(task);
        renderList();

        // Save the task to the server
        await saveTaskToServer(task);
    }
        async function saveTaskToServer(task) {
            try {
                // Send a POST request to save the task on the server
                await fetch('/tasks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(task),
                });
            } catch (error) {
                console.error(error);
                showNotification('Failed to save task');
            }
        }
    
    initializeApp();
    return {
        initialize: function () {
            fetchTodos();
            addTaskInput.addEventListener('keyup', handleInputkeypress);
            document.addEventListener('click', handleClickListener);
        
            // Add event listener for the "Add Task" button
            addTaskButton.addEventListener('click', handleAddTaskButtonClick);
        
            // Add event listener for the "Delete Task" button
            deleteTaskButton.addEventListener('click', handleClickListener);
        },
        a: 10,
    };
})();

    // var TodoListApp = (function () {
    //     return {}
    // })();
    