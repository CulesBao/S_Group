let list = [
    [
        {
            category: "Todo",
            title: "title",
            content: "This is content area. You can write your task in here",
            dateTime: "dd//mm/yyyy"
        }
    ],
    [
        {
            category: "Doing",
            title: "title",
            content: "This is content area. You can write your task in here",
            dateTime: "dd//mm/yyyy"
        }
    ],
    [
        {
            category: "Completed",
            title: "title",
            content: "This is content area. You can write your task in here",
            dateTime: "dd//mm/yyyy"
        }
    ],
    [
        {
            category: "Blocked",
            title: "title",
            content: "This is content area. You can write your task in here",
            dateTime: "dd//mm/yyyy"
        }
    ]
]

let newTaskBtn = document.querySelector(".new-task")
let popUpContainer = document.querySelector(".popup-container")
let newContainer = document.querySelector(".new")
let updateContainer = document.querySelector(".update")
let cancelBtn = document.getElementById("cancel")
let saveBtn = document.getElementById("save")
let cancelBtnUpdate = document.querySelector(".cancelUpdate")
let cancelBtnDelete = document.querySelector(".cancelDelete")
let warningContainer = document.querySelector(".warning")
let updateBtn = document.querySelector(".update-button")


//Create
{
    //Open Create
    newTaskBtn.addEventListener('click', function(){
        popUpContainer.style.display = "flex";
        newContainer.style.display = "flex"
        updateContainer.style.display = "none"
        warningContainer.style.display = "none"


        let category = document.getElementById("category")
        let title = document.getElementById("title")
        let content = document.getElementById("content")

        category.style.border = "1px solid black"
        title.style.border = "1px solid black"
        content.style.border = "1px solid black"

        document.getElementById("category").value = ""
        document.getElementById("title").value = ""
        document.getElementById("content").value = ""
    })
    //Close Create
    popUpContainer.addEventListener('click', function(){
        popUpContainer.style.display = "none";
        newContainer.style.display = "none"
    })
    cancelBtn.addEventListener('click', function(){
        popUpContainer.style.display = "none";
        newContainer.style.display = "none"
    })
    //Prevent Close Create
    newContainer.addEventListener('click', function(){
        event.stopPropagation()
    })
    //Logic
    saveBtn.addEventListener("click", function(){
        const date = new Date()
        let categoryValue = document.getElementById("category").value
        let titleValue = document.getElementById("title").value
        let contentValue = document.getElementById("content").value;
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${day}/${month}/${year}`;
        let myPromise = new Promise(function(resolve, reject){
            if (categoryValue !== "" && titleValue !== "" && contentValue !== "")
                resolve();
            else
                reject();
        })
        myPromise.then(() => {
            list[0].push(
                {
                    category: categoryValue,
                    title: titleValue,
                    content: contentValue,
                    dateTime: currentDate
                }
            )
            render()
            popUpContainer.style.display = "none";
            newContainer.style.display = "none"

        })
        .catch(() => {
            let category = document.getElementById("category")
            let title = document.getElementById("title")
            let content = document.getElementById("content")

            if (categoryValue === "")
                category.style.border = "1px solid #e74c3c"
            else
                category.style.border = "1px solid #69ce7e"
            if (titleValue === "")
                title.style.border = "1px solid #e74c3c"
            else
                title.style.border = "1px solid #69ce7e"
            if (contentValue === "")
                content.style.border = "1px solid #e74c3c"
            else
                content.style.border = "1px solid #69ce7e"
        })
    })
}

//Update
{
    // Định nghĩa mảng allCheckbox chứa tất cả các checkbox
    let allCheckbox = document.querySelectorAll('.checkbox');

    //Update
    function onUpdate(indexParent, indexChild){
        popUpContainer.style.display = "flex";
        updateContainer.style.display = "flex";
        newContainer.style.display = "none";
        warningContainer.style.display = "none";

        let category = document.querySelector(".category1");
        let title = document.querySelector(".title1");
        let content = document.querySelector(".content1");

        category.style.border = "1px solid black";
        title.style.border = "1px solid black";
        content.style.border = "1px solid black";

        document.querySelector(".category1").value = list[indexParent][indexChild].category;
        document.querySelector(".title1").value = list[indexParent][indexChild].title;
        document.querySelector(".content1").value = list[indexParent][indexChild].content;
        // document.querySelector(".box" + indexParent).setAttribute("check", "true");

        // Set checked state of checkboxes based on indexParent
        allCheckbox.forEach(function (item, index) {
            if (index === indexParent) {
                item.checked = true;
            } else {
                item.checked = false;
            }
        });

        updateBtn.addEventListener("click", function(){
            updateLogic(indexParent, indexChild)
        })
    }

    //Close Create
    popUpContainer.addEventListener('click', function(){
        popUpContainer.style.display = "none";
        updateContainer.style.display = "none";
    });
    cancelBtnUpdate.addEventListener('click', function(){
        popUpContainer.style.display = "none";
        updateContainer.style.display = "none";
    });

    //Prevent Close Create
    updateContainer.addEventListener('click', function(event){
        event.stopPropagation();
    });

    // Update checkboxes when clicked
    allCheckbox.forEach(function (item) {
        item.addEventListener('change', function () {
            var temp = this;
            if (this.checked) {
                allCheckbox.forEach(function (itemm) {
                    if (itemm !== temp) {
                        itemm.checked = false;
                    }
                    // else itemm.checked = true;
                });
            }
        });
    });

    //Logic
    function updateLogic(indexParent, indexChild){
        const date = new Date()
        let categoryValue = document.querySelector(".category1").value;
        let titleValue = document.querySelector(".title1").value;
        let contentValue = document.querySelector(".content1").value;
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${day}/${month}/${year}`;
        let myPromise = new Promise(function(resolve, reject){
            if (categoryValue !== "" && titleValue !== "" && contentValue !== "")
                resolve();
            else
                reject();
        })
        myPromise.then(() => {
            let newIndexParent;

            list[indexParent][indexChild].category = categoryValue
            list[indexParent][indexChild].title = titleValue
            list[indexParent][indexChild].content = contentValue
            list[indexParent][indexChild].dateTime = currentDate

            //Tim vi tri checkbox
            allCheckbox.forEach(function(item, index){
                if (item.checked){
                    newIndexParent = index
                }
            })

            if (newIndexParent !== indexParent){
                let tmp = list[indexParent][indexChild]
                list[indexParent].splice(indexChild, 1);
                list[newIndexParent].push(tmp)
            }

            render()
            popUpContainer.style.display = "none";
            newContainer.style.display = "none"

        })
        .catch(() => {
            let category = document.getElementById("category")
            let title = document.getElementById("title")
            let content = document.getElementById("content")

            if (categoryValue === "")
                category.style.border = "1px solid #e74c3c"
            else
                category.style.border = "1px solid #69ce7e"
            if (titleValue === "")
                title.style.border = "1px solid #e74c3c"
            else
                title.style.border = "1px solid #69ce7e"
            if (contentValue === "")
                content.style.border = "1px solid #e74c3c"
            else
                content.style.border = "1px solid #69ce7e"
        })
    }

}

//Delete
{
    function onDelete(indexParent, indexChild)
    {   
        let deleteBtn = document.getElementById("delete")

        popUpContainer.style.display = "flex";
        warningContainer.style.display = "flex"
        newContainer.style.display = "none"
        updateContainer.style.display = "none"

        deleteBtn.addEventListener("click", () =>{
            deleteList(indexParent, indexChild)
        })
    }

    //Close
    cancelBtnDelete.addEventListener("click", function(){
        popUpContainer.style.display = "none";
        warningContainer.style.display = "none"
    })
    //Prevent close delete
    warningContainer.addEventListener("click", function(){
        event.stopPropagation();
    })

    //delete with id
    function deleteList(indexParent, indexChild){
        list[indexParent].splice(indexChild, 1);

        render()

        popUpContainer.style.display = "none";
        warningContainer.style.display = "none"
    }
    
}

function render(){
    //count
    let countContainer = document.querySelectorAll(".todo")
    for (let i = 0; i < 4; i++)
        countContainer[i].querySelector("#count" + i).innerText = list[i].length

    //todo

    for (let i = 0; i < 4; i++)
    {
        let todoContainer = document.getElementById("todo" + i)
        let todoList = list[i].map(function(item){
        return `<div class="task-content">
            <div class="icons">
                <i class="fas fa-pen" onclick="onUpdate(${i}, ${list[i].indexOf(item)}, )"></i>
                <i class="fas fa-trash" onclick="onDelete(${i}, ${list[i].indexOf(item)})"></i>
            </div>
            <div class="category">
                <p>${item.category}</p>
            </div>
            <div class="title">
                <p>${item.title}</p>
            </div>
            <div class="border-child">

            </div>
            <div class="content">
                <p>${item.content}</p>
            </div>
            <div class="date-and-time">
                <i class="far fa-clock"></i>
                <p>${item.dateTime}</p>
            </div>
        </div>`
        })
        todoContainer.innerHTML = todoList.join("")
    }
}

render()