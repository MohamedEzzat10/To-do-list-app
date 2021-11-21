// // add task

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
console.log(allTasks);
let allTasksFinished = [];
window.onload = input.focus();


// localStorage.setItem("tasks", "")
//     // let local = JSON.parse(localStorage.getItem("tasks"));
//     // console.log(local);

// if (allTasks.length === 0) {
//     msgNoTask.style.display = "block";

//     console.log(allTasks.length);
// }
// btnAdd.addEventListener("click", addTask);

// function addTask() {
//     if (input.value === "") {
//         alert("enter your task first")
//     } else {
//         msgNoTask.style.display = "none"

//         allTasks.push(`${input.value}`);
//         localStorage.setItem("tasks", JSON.stringify(allTasks));
//         tasksContainer.innerHTML += `
//             <div class="task">
//             <p class ="text">${allTasks[allTasks.length - 1]}</p>
//             <div class="btn-control">
//             <span class="edit"> Edit</span>
//             <span class="delet">Delet</span>
//             </div>
//             </div>`;
//         localStorage.setItem("tasks", JSON.stringify(allTasks));
//         input.value = "";


//         countTask();
//         input.focus()
//         btnAll.style.display = "flex";

//     }
// }



// // let taskStoge = JSON.parse(localStorage.getItem("tasks"));


//schecked local storge item 
if(localStorage.getItem("tasks")&&localStorage.getItem("tasks") !=""){
    allTasks = JSON.parse(localStorage.getItem("tasks"))
        let arryLocal= JSON.parse(localStorage.getItem("tasks"))
        console.log(arryLocal);
        
            tasksContainer.innerHTML = ""
           arryLocal.forEach((ele,index)=>{
            addTasksTocontainer (ele,index+1)
    
           })
    
}




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
    <p class ="text"> ${ele}</p>
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

document.addEventListener("click",
    function(e) {
        let pragraphElement = e.target.parentElement.parentElement.firstElementChild;
        let tastTarget = e.target.parentElement.parentElement.firstElementChild.textContent;
        if (e.target.className === "text") {
            e.target.classList.toggle("active");
            e.target.parentElement.classList.add("active")

            allTasksFinished.push(e.target.parentElement)
            console.log(allTasksFinished);
            countTask()


        }
        if (e.target.className === "delet") {


            allTasks.forEach((task) => {
                if (task === tastTarget) {
                    const index = allTasks.indexOf(tastTarget)

                    if (index > -1) {
                        allTasks.splice(index, 1)

                        localStorage.setItem("tasks", JSON.stringify(allTasks));
                        // if(allTasks.length)


                    }

                };



            })

            e.target.parentElement.parentElement.remove();
            countTask()

        }
        if (e.target.className === "edit") {
            popup.style.display = "block"
            let inptPop = document.querySelector(".pop-up-edit input");
            inptPop.value = tastTarget;
            inptPop.focus();
            let btnEdit = document.querySelector(".pop-up-edit button");
            btnEdit.addEventListener("click", () => {
                allTasks[allTasks.indexOf(tastTarget)] = inptPop.value;
                pragraphElement.innerHTML = inptPop.value


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
        btnAll.style.display = "none";

    })
    // delet all finished
deletallFininshed.addEventListener("click", () => {
        let taskAll = document.querySelectorAll(".task");
        taskAll.forEach((task) => {
            if (task.classList.contains("active") === true) {
                task.remove()
                const index = allTasksFinished.indexOf(task)
                if (index > -1) {
                    allTasksFinished.splice(index, 1)
                }
                const index2 = allTasks.indexOf(task.firstElementChild.textContent)
                if (index2 > -1) {
                    allTasks.splice(index, 1)
                }
            }
        })
        allTasksFinished = []
        countTask()
    })
    // close popup
popupClose.addEventListener("click", () => {
    popup.style.display = "none"
})





// counter
function countTask() {
    counter = allTasks.length;
    totalTask.innerHTML = counter;
    counterFinished = allTasksFinished.length;
    totalTaskFinished.innerHTML = counterFinished;
}