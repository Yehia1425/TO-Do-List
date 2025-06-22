// document.addEventListener('DOMContentLoaded',()=>{
//     const taskInput = document.getElementById('task-input');
//     const addTaskBtn= document.getElementById('add-task-btn');
//     const taskList = document.getElementById('task_list');
//     const emptyImage = document.querySelector('.empty-images');
//     const toogleEmpty = () => {
//         emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none'
//     }

//     const AddTask = (event)=>{
//         event.preventDefault()
//         const taskText=taskInput.value.trim()
//         if (!taskText) {
//             return;
            
//         }
//         const li = document.createElement('li');
//         li.innerHTML = `
//         <input type="checkbox" class="checkbox">
//         <span>${taskText}</span>
//         <div class="task-buttons">
//         <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
//         <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
        
//         </div>
//         `

        

//         taskList.appendChild(li);
//         taskInput.value = ''
//         toogleEmpty()
//     }

//             const checkbox = li.querySelector('.checkbox');
//         const editbtn = li.querySelector('.edit-btn');
//         if (completed) {
//             li.classList.add('completed');
//             editbtn.disabled = true;
//             editbtn.style.opacity = '0.5';
//             editbtn.style.pointerEvents = 'none';
            
//         }
//         checkbox.addEventListener('change',()=>{
//             const ischecked = checkbox.checked;
//             li.classList.toggle('completed', ischecked);
//             editbtn.disabled = ischecked;
//             editbtn.style.opacity = ischecked ? '0.5' : '1';
//             editbtn.style.pointerEvents = ischecked ? 'none' : 'auto';
//             updateProgress()
//             SaveTasks()
//         })

//         editbtn.addEventListener('click',()=>{
//             if (!checkbox.checked) {
//                 taskInput.value=li.querySelector('span').textContent ;
//                 li.remove();
//                 toogleEmpty()
//                 updateProgress(false)
//                 SaveTasks()
                
//             }
//         })

//         li.querySelector('.delete-btn').addEventListener('click',()=>{
//             li.remove();
//             toogleEmpty()
//             updateProgress()
//             SaveTasks()
//         })
//     addTaskBtn.addEventListener('click',AddTask);
//     taskInput.addEventListener('keypress', (e)=>{
//         if (e.key==='enter') {
//             AddTask(e)
//         }
//     })
// })


document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task_list');
    const emptyImage = document.querySelector('.empty-images');
    const todoscontainer = document.querySelector('.todos-container');
    const progressbar = document.getElementById('progress');
    const progressNumber = document.getElementById('numbers');

const toggleEmpty = () => {
    if (emptyImage) {
        emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none';
    }
    if (todoscontainer) {
        todoscontainer.style.display = taskList.children.length > 0 ? 'block' : 'none';
    }
};

    const updateProgress = (checkCompletion = true) => {
        const totalTasks = taskList.children.length;
        const completedTasks = taskList.querySelectorAll('.checkbox:checked').length;
        progressbar.style.width = totalTasks > 0 ? `${(completedTasks / totalTasks) * 100}%` : '0%';
        progressNumber.textContent = `${completedTasks} / ${totalTasks}`;
        if (checkCompletion &&  totalTasks > 0 && completedTasks === totalTasks) {
            confetti(); 
            
        }
    };

    const saveTasks = () => {
        const tasks = Array.from(taskList.querySelectorAll('li')).map(li => ({
            text: li.querySelector('span').textContent,
            completed: li.querySelector('.checkbox').checked
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const loadTasks = () => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(({ text, completed }) => addTask(text, completed, false));
        toggleEmpty();
        updateProgress();
    };

    const addTask = (text, completed = false, checkCompletion = true) => {
        const taskText = text || taskInput.value.trim();
        if (!taskText) return;

        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''}>
            <span>${taskText}</span>
            <div class="task-buttons">
                <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
                <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;

        const checkbox = li.querySelector('.checkbox');
        const editBtn = li.querySelector('.edit-btn');

        if (completed) {
            li.classList.add('completed');
            editBtn.disabled = true;
            editBtn.style.opacity = '0.5';
            editBtn.style.pointerEvents = 'none';
        }

        checkbox.addEventListener('change', () => {
            const isChecked = checkbox.checked;
            li.classList.toggle('completed', isChecked);
            editBtn.disabled = isChecked;
            editBtn.style.opacity = isChecked ? '0.5' : '1';
            editBtn.style.pointerEvents = isChecked ? 'none' : 'auto';
            updateProgress();
            saveTasks();
        });

        editBtn.addEventListener('click', () => {
            if (!checkbox.checked) {
                taskInput.value = li.querySelector('span').textContent;
                li.remove();
                toggleEmpty();
                updateProgress(false);
                saveTasks();
            }
        });

        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove();
            toggleEmpty();
            updateProgress();
            saveTasks();
        });

        taskList.appendChild(li);
        taskInput.value = '';
        toggleEmpty();
        updateProgress(checkCompletion);
        saveTasks();
    };

    addTaskBtn.addEventListener('click', () => addTask());

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTask();
        }
    });

    loadTasks(); // Load saved tasks only once when page loads
});


const confetti = ()=>{
function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

confetti({
  angle: randomInRange(55, 125),
  spread: randomInRange(50, 70),
  particleCount: randomInRange(50, 100),
  origin: { y: 0.6 },
});
}