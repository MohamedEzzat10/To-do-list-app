// variables

let btnAdd = document.querySelector(".content span");
let tasksContainer = document.querySelector(".task-container");
let totalTask = document.querySelector(".total-task .number");
let input = document.querySelector(".content input");
let deletAll = document.querySelector(".all-task")
let deletallFininshed = document.querySelector(".all-finished")
let msgNoTask = document.querySelector(".task-container p")
let popup = document.querySelector(".pop-up-edit");
let popupClose = document.querySelector(".pop-up-edit span");
let totalTaskFinished = document.querySelector(".total-task-finash .number");
let btnAll = document.querySelector(".btn-control-all");




let counter = 0;
let counterFinished = 0;

let allTasks = [];
let allTasksFinished = [];
window.onload = input.focus();

//shecked local storge item 
if(localStorage.getItem("tasks") &&localStorage.getItem("tasks") !=" "){
    allTasks = JSON.parse(localStorage.getItem("tasks"))
        let arryLocal= JSON.parse(localStorage.getItem("tasks"))
        console.log(arryLocal);
        
        msgNoTask.style.display = "none"
           arryLocal.forEach((ele,index)=>{
            addTasksTocontainer (ele,index+1)
    
           })
    
} else if(localStorage.getItem("tasks") &&localStorage.getItem("tasks") ==" "){
    msgNoTask.style.display = "block"
    console.log("ghsiyi");
}
if(localStorage.getItem("tasksFinshed")&&localStorage.getItem("tasksFinshed")!=""){
    let tasks = document.querySelectorAll(".task .text");
    let tasksFinshedLocal = JSON.parse(localStorage.getItem("tasksFinshed"))
    allTasksFinished = tasksFinshedLocal
    tasksFinshedLocal.forEach(taskEl=>{
        console.log();
        tasks.forEach(e=>{
            if(e.innerHTML === taskEl){
                e.classList.add("active")
            }
        })
    })
    countTask();
    

}
// shecked finshed task in local 
// add new task 
btnAdd.addEventListener("click", addTask);

function addTask() {
    if (input.value == "") {
        alert("enter your task first")
    } else {
        allTasks.push(`${input.value}`);
        msgNoTask.style.display = "none"
             localStorage.setItem("tasks", JSON.stringify( allTasks));
addTasksTocontainer(allTasks[allTasks.length-1],allTasks.length)
        }
}

// add tasks to dom container
function addTasksTocontainer (ele,index){
    tasksContainer.innerHTML += `
    <div class="task">
    <p class ="text">${ele}</p>
    <div class="btn-control">
    <span class="edit"> Edit</span>
    <span class="delet">Delet</span>
    </div>
    </div>`;
input.value = "";


countTask();
input.focus()
btnAll.style.display = "flex";
}
// events in page 
document.addEventListener("click",
    function(e) {
        let pragraphElement = e.target.parentElement.parentElement.firstElementChild;
        let taskTarget = e.target.parentElement.parentElement.firstElementChild.textContent
        if (e.target.className === "text") {
            e.target.classList.toggle("active");
            e.target.parentElement.classList.add("active")
            allTasksFinished.push(e.target.textContent)
            localStorage.setItem("tasksFinshed",JSON.stringify(allTasksFinished));
            console.log(allTasksFinished);
            countTask();
        }
      
        if (e.target.className === "delet") {
            allTasks.forEach((task) => {
                
                            if (task === taskTarget ) {
                                deletEle(allTasks,taskTarget);
                                deletEle(allTasksFinished,taskTarget);


                        localStorage.setItem("tasks", JSON.stringify(allTasks));
                        localStorage.setItem("tasksFinshed",JSON.stringify(allTasksFinished));

                    }
                })
            
            e.target.parentElement.parentElement.remove();
            countTask()
        }
        if (e.target.className === "edit") {
            popup.style.display = "block"
            let inptPop = document.querySelector(".pop-up-edit input");
            inptPop.value = taskTarget;
            inptPop.focus();
                        let btnEdit = document.querySelector(".pop-up-edit button");
            btnEdit.addEventListener("click", () => {
                allTasks[allTasks.indexOf(taskTarget)] = inptPop.value;
                localStorage.setItem("tasks", JSON.stringify(allTasks));
                pragraphElement.innerHTML = inptPop.value
                popup.style.display = "none"
            })
        }
    })


// delet all tasks
deletAll.addEventListener("click", () => {
        tasksContainer.innerHTML = "No Tasks Now";
        allTasks = [];
        allTasksFinished = []
        countTask();
        localStorage.setItem("tasks", JSON.stringify(allTasks));
        localStorage.setItem("tasksFinshed", JSON.stringify(allTasksFinished));
        btnAll.style.display = "none";
    })
    // delet all finished
deletallFininshed.addEventListener("click", () => {
        let taskAll = document.querySelectorAll(".task");
        taskAll.forEach((task) => {
            if (task.classList.contains("active") === true) {
                task.remove()
                let taskFinshTarget = task.firstElementChild.textContent
               
                const index2 = allTasks.indexOf(taskFinshTarget)
                if (index2 > -1) {
                    allTasks.splice(index2, 1)
                }
            }
        })
        allTasksFinished = []
        countTask()
        localStorage.setItem("tasks", JSON.stringify(allTasks));
        localStorage.setItem("tasksFinshed", JSON.stringify(allTasksFinished));

    })
    // close popup
popupClose.addEventListener("click", () => {
    popup.style.display = "none"
})

// counter function
function countTask() {
    counter = allTasks.length;
    totalTask.innerHTML = counter;
    counterFinished = allTasksFinished.length;
    console.log(counterFinished);
    totalTaskFinished.innerHTML = counterFinished;
}
// function delet element 
    function deletEle(tasks,ele){
        console.log(ele);
        const index = tasks.indexOf(ele)
        console.log(index);
        if (index > -1) {
            tasks.splice(index, 1)
            }}