// variables

let btnAdd = document.querySelector(".content span");
let tasksContainer = document.querySelector(".task-container");
let totalTask = document.querySelector(".total-task .number");
let input = document.querySelector(".content input");
let deletAll = document.querySelector(".all-task")
let deletallFininshed = document.querySelector(".all-finished")
let msgNoTask = document.querySelector(".tasks p")
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
        
        msgNoTask.style.display = "none"
           arryLocal.forEach((ele,index)=>{
            addTasksTocontainer (ele,index+1)
    
           })
    
} else if(localStorage.getItem("tasks") &&localStorage.getItem("tasks") ==" "){
    msgNoTask.style.display = "block"
}
if(localStorage.getItem("tasksFinshed")&&localStorage.getItem("tasksFinshed")!=""){
    let tasks = document.querySelectorAll(".task .text");
    let tasksFinshedLocal = JSON.parse(localStorage.getItem("tasksFinshed"))
    allTasksFinished = tasksFinshedLocal
    tasksFinshedLocal.forEach(taskEl=>{
        tasks.forEach(e=>{
            if(e.innerHTML === taskEl){
                e.classList.add("active")
            }
        })
    })
    countTask();
    

}

           // show or hidden message notasks and btn delet
 
showMessage ()

// shecked finshed task in local 
// add new task 
input.addEventListener("keyup",(e)=>{
    if(e.keyCode == 13){
        msgNoTask.style.display = "none"
        addTask()
    }
});

btnAdd.addEventListener("click",addTask,showMessage)
// function add task
function addTask() {
    if (input.value == "") {
        alert("enter your task first")
    } else {


        msgNoTask.style.display = "none"
        
        allTasks.push(`${input.value}`);
         localStorage.setItem("tasks", JSON.stringify( allTasks));
        addTasksTocontainer(allTasks[allTasks.length-1])
        }
}

// add tasks to dom container
function addTasksTocontainer (ele){
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
showMessage ()
}
// events in page 
document.addEventListener("click",
    function(e) {
      
        let taskTarget = e.target.parentElement.parentElement.firstElementChild.textContent
        if (e.target.className === "text") {
            if(!e.target.classList.contains("active"))
            {
                e.target.classList.add("active")
            }else{
                e.target.classList.remove("active")
            }
            allTasksFinished.push(e.target.textContent)
            localStorage.setItem("tasksFinshed",JSON.stringify(allTasksFinished));
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
            showMessage ()
            input.focus()
        }
        if (e.target.className === "edit") {
            popup.style.display = "block"
            let inptPop = document.querySelector(".pop-up-edit input");
            inptPop.value = taskTarget;
            inptPop.focus();
                        let btnEdit = document.querySelector(".pop-up-edit button");
                        let inputEdit = document.querySelector(".pop-up-edit input");
                        let pragraphElement = e.target.parentElement.parentElement.firstElementChild;
            btnEdit.addEventListener("click",edit )
            inputEdit.addEventListener("keyup",(e)=>{
                if(e.keyCode == 13){
                    edit ()
                }
            });

            // function edit button
             function edit (){
                allTasks.forEach((e)=>{
                 
                    if(e === taskTarget ){
                allTasks[allTasks.indexOf(taskTarget)] = inptPop.value;
                allTasksFinished[allTasksFinished.indexOf(taskTarget)] = inptPop.value
                    }
                })
                localStorage.setItem("tasks", JSON.stringify(allTasks));
                localStorage.setItem("tasksFinshed", JSON.stringify(allTasksFinished));
                let elementTask =document.querySelectorAll(".task .text")
for(let i= 0 ; i < elementTask.length ;i++){
    elementTask[i].innerHTML = allTasks[i]

    }
                
                popup.style.display = "none";
                input.focus()
            }
        }
    })


// delet all tasks
deletAll.addEventListener("click", () => {
    msgNoTask.style.display = "block"
        tasksContainer.innerHTML = "";
        allTasks = [];
        allTasksFinished = []
        countTask();
        localStorage.setItem("tasks", JSON.stringify(allTasks));
        localStorage.setItem("tasksFinshed", JSON.stringify(allTasksFinished));
        btnAll.style.display = "none";
    })
    // delet all finished
deletallFininshed.addEventListener("click", () => {
        let taskAll = document.querySelectorAll(".task .text");
        taskAll.forEach((task) => {
            if (task.classList.contains("active") === true) {
                let taskFinshTarget = task.textContent
                var element = task.parentElement
               
                const index2 = allTasks.indexOf(taskFinshTarget)
                if (index2 > -1) {
                    allTasks.splice(index2, 1)
                    element.remove()
                  

                }
            }
            
        })
        allTasksFinished = []
        countTask()
        localStorage.setItem("tasks", JSON.stringify(allTasks));
        localStorage.setItem("tasksFinshed", JSON.stringify(allTasksFinished));
        showMessage ()
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
    totalTaskFinished.innerHTML = counterFinished;
}
// function delet element 
    function deletEle(tasks,ele){
        const index = tasks.indexOf(ele)
        if (index > -1) {
            tasks.splice(index, 1)
            }
        }

        // show or hidden message notasks and btn delet
function showMessage (){
    if(allTasks.length == 0){
        msgNoTask.style.display = "block"
        btnAll.style.display = "none";
        
    }else{
        msgNoTask.style.display = "none"
        btnAll.style.display = "flex";

    }
}