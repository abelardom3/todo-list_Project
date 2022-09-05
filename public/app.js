

const taskForm = document.getElementById('newTask-box')
const taskInput = document.getElementById('inputTask')
const createTaskBtn = document.getElementById('create-task-btn')
const listDisplay = document.getElementById('list-display')
const inputtask = document.getElementById('inputTask')
const listContainer = document.getElementById('list-container')
// const editDisplay = document.getElementById('edit-display')
// const updateInput = document.getElementById('update-input')
// const updateForm = document.getElementById('update-box-form')


clickingCreateTask()

// clickingEditBtn()









function clickingCreateTask() {

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const taskValue = taskInput.value
        if (!taskValue) {
            showErrorInput()
            console.log('need info for task')
        } else {

            hideErrorInput()
            clearInputValue()
            makingObj(taskValue)
        }
    })
}


// Turn any data into obj
function makingObj(anyValue) {
    let task = anyValue
    let taskData = { task }

    sendingTaskToDatabase(taskData)
}




async function sendingTaskToDatabase(taskData) {

    let result = await fetch('/api/mylist/post', {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(taskData)
    })
    let data = await result.json()
    console.log(data)
    creatingListTaskRow(data)
}



function creatingListTaskRow(data) {
    const dataValue = data[0].task
    const dataId = data[0].list_id

    const taskRow = document.createElement('div')
    taskRow.id = "task-row"
    const divTask = document.createElement('div')
    divTask.innerText = dataValue
    divTask.id = dataId
    divTask.className = "listings"

    taskRow.append(divTask)

    creatingEditBtn(taskRow, dataId)
    creatingDeleteBtn(taskRow, dataId)

    listDisplay.append(taskRow)

}


function creatingEditBtn(taskRow, dataId) {

    const editBox = document.createElement('div')
    editBox.id = "edit-box"
    const editBtn = document.createElement('button')
    editBtn.innerText = "EDIT"
    editBtn.className = 'edit-btn'
    editBtn.id = dataId

    editBox.append(editBtn)
    taskRow.append(editBox)
    console.log('1 testing')
    clickingEditBtn(editBtn, dataId)

}




function creatingDeleteBtn(taskRow, dataId) {

    const deleteBox = document.createElement('div')
    deleteBox.id = "delete-box"
    const deleteBtn = document.createElement('button')
    deleteBtn.innerText = "DELETE"
    deleteBtn.className = "delete-btn"
    deleteBtn.id = dataId

    deleteBox.append(deleteBtn)
    taskRow.append(deleteBox)
    clickingDeleteBtn(deleteBtn)
}






//edit  functionality






function clickingEditBtn(editBtn, dataId) {
    editBtn.addEventListener('click', (e) => {

        createUpdateDisplay(dataId)
        console.log('2 testing')
    })

}


function createUpdateDisplay(dataId) {
    const editDisplay = document.createElement('div')
    editDisplay.id = "edit-display"
    const updateForm = document.createElement('form')
    updateForm.id = 'update-box-form'

    const inputUpdate = document.createElement('input')
    inputUpdate.id = 'update-input'
    inputUpdate.type = 'text'
    inputUpdate.placeholder = 'Update task'

    const updateBtn = document.createElement('input')
    updateBtn.id = 'update-btn'
    updateBtn.type = 'submit'
    updateBtn.value = 'Update'


    updateForm.append(inputUpdate)
    updateForm.append(updateBtn)
    editDisplay.append(updateForm)
    console.log('3 testing')
    listContainer.append(editDisplay)
    clickingUpdateBtn(updateForm, inputUpdate, dataId)
}













function clickingUpdateBtn(updateForm, inputUpdate, dataId) {

    updateForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const inputUpvalue = inputUpdate.value
        if (!inputUpvalue) {
            console.log('need something bro')
        } else {
            console.log('4 testing')

            changingToNewUpdate(inputUpvalue, dataId)
        }


    })

}



function changingToNewUpdate(inputUpvalue, dataId) {
    const listings = document.getElementById(`${dataId}`)
    console.log('5 testing')
    listings.innerText = inputUpvalue
    $('#edit-display').hide()
    // $('#edit-display').empty()
}









// create it beforehand then just show it 











// function testingChangeTask(testingupdatevalue, testingUpdateID) {

//     const testing = document.getElementById(`${testingUpdateID}`)
//     testing.innerText = testingupdatevalue
//     testHidingupdate()
// }



// function testHidingupdate() {
//     $(editDisplay).hide()
//     $(updateInput).val('')

// }












///make edit into form 












//delete functionality

function clickingDeleteBtn(deleteBtn) {

    deleteBtn.addEventListener('click', (e) => {

        console.log(e.target.id)
    })

}

































// Functions that show and hide
function showErrorInput() {
    $('#error-text').show()
}

function hideErrorInput() {
    $('#error-text').hide()

}

function clearInputValue() {
    $('#inputTask').val('')
}



































































































































































// const addCategoryBtn = document.getElementById('btncategory')
// const displayArea = document.getElementById('displayarea')
// const myListArea = document.getElementById('mylist')
// let firstClick = false







// creatingDisplayMyList()

// creatingDisplayMyTodoList()

// creatingAddingTaskDisplay()




// clickingAddCategory()

// clickingCreateCategory()

// clickingMyListCategory()

// clickingExitMyTodo()

// // clickingNewTask()

// // clickingCreateNewTask()
// // fixing the add caetgory button //////////////////////






// function creatingDisplayMyList() {

//     const categoryDisplay = document.createElement('div')
//     categoryDisplay.id = "newCategory"

//     const createBtn = document.createElement('button')
//     createBtn.id = 'createBtnMyList'
//     createBtn.innerText = "Create"

//     const textName = document.createElement('h3')
//     textName.innerText = "Name for Category"

//     const inputName = document.createElement('input')
//     inputName.value = ""
//     inputName.id = "inputName"

//     categoryDisplay.append(textName)
//     categoryDisplay.append(inputName)
//     categoryDisplay.append(createBtn)
//     displayArea.append(categoryDisplay)

//     $('#newCategory').hide()


// }





// function clickingAddCategory() {

//     if (firstClick === false) {
//         firstClick = true
//         addCategoryBtn.addEventListener('click', showingNewCategory)

//     } else if (firstClick === true) {
//         console.log('tesing true')
//     }

// }


// function showingNewCategory() {
//     $('#newCategory').show()

// }



// function creatingDisplayMyTodoList() {
//     const myTodoList = document.createElement('div')
//     myTodoList.id = 'myTodoListDisplay'

//     const todoList = document.createElement('div')
//     todoList.id = "nameOfCat"
//     todoList.innerText = ''


//     const newTaskBtn = document.createElement('button')
//     newTaskBtn.id = 'newCategoryBtn'
//     newTaskBtn.innerText = 'Create'

//     const exitMyListBtn = document.createElement('button')
//     exitMyListBtn.id = "exitMyListBtn"
//     exitMyListBtn.innerText = "exit"

//     myTodoList.append(todoList)
//     myTodoList.append(newTaskBtn)
//     myTodoList.append(exitMyListBtn)
//     displayArea.append(myTodoList)

//     $('#myTodoListDisplay').hide()
// }






// function clickingMyListCategory() {
//     $("#mylist").on('click', showingMyTodoDisplay)

// }


// function clickingExitMyTodo() {
//     $('#exitMyListBtn').on('click', () => {
//         $('#myTodoListDisplay').hide()
//     })
// }














// function creatingAddingTaskDisplay() {
//     const newTaskDisplay = document.createElement('div')
//     newTaskDisplay.id = "newTaskDisplay"

//     const newTask = document.createElement('div')
//     newTask.innerText = 'New Task'

//     const taskInput = document.createElement('input')
//     taskInput.id = 'taskInput'
//     taskInput.value = ""
//     taskInput.innertext = "Task"

//     const newTaskBtn = document.createElement('button')
//     newTaskBtn.id = 'newTaskBtn'
//     newTaskBtn.innerText = 'Create'


//     newTaskDisplay.append(newTask)
//     newTaskDisplay.append(taskInput)
//     newTaskDisplay.append(newTaskBtn)
//     displayArea.append(newTaskDisplay)
//     $('#newTaskDisplay').hide()

// }


// function clickingNewTask(categoryId) {
//     $('#newCategoryBtn').on('click', showNewtaskDisplay)
//     clickingCreateNewTask(categoryId)
// }


// function showNewtaskDisplay() {
//     $('#newTaskDisplay').show()

// }


// function showingMyTodoDisplay(e) {
//     let categoryId = e.target.id
//     const nameOfCat = e.target.innerText
//     addingNameToTodoDisplay(nameOfCat)
//     console.log(e.target.id)
//     $('#myTodoListDisplay').show()
//     clickingNewTask(categoryId)
// }


// function clickingCreateNewTask(categoryId) {
//     $('#newTaskBtn').on('click', () => {
//         makingTaskObj(categoryId)
//         hidingCreateNewtask()
//     })

// }


// function addingNameToTodoDisplay(nameOfCat) {
//     $('#nameOfCat').text(nameOfCat)
// }




// function hidingCreateNewtask() {
//     $("#newTaskDisplay").hide()
//     $('#taskInput').val('')

// }



// function makingTaskObj(categoryId) {
//     const inputValue = document.getElementById('taskInput')
//     const taskValue = inputValue.value
//     let task = taskValue
//     let complete = false
//     category_id = categoryId
//     let taskData = { task, complete, category_id }
//     console.log(task, category_id)
//     postFetchTodo(taskData)
// }




// async function postFetchTodo(taskData) {


//     let data = await fetch('/api/mylist/todo', {
//         method: 'POST',
//         headers: {
//             'Content-type': 'application/json'
//         },
//         body: JSON.stringify(taskData)
//     })

//     let resultTodo = await data.json()

//     console.log(resultTodo)
//     createTodoList(resultTodo)



// }









// function createTodoList(resultTodo) {
//     const task = resultTodo[0].task
//     const idOfTask = resultTodo[0].category_id
//     const taskList = document.createElement('li')
//     taskList.innerText = task
//     taskList.className = 'todo-listings'

//     $('#myTodoListDisplay').append(taskList)

// }






















// function clickingCreateCategory() {
//     const createBtn = document.getElementById('createBtnMyList')
//     createBtn.addEventListener('click', postingCategory)


// }


// function postingCategory() {
//     const inputValue = document.getElementById('inputName')
//     const nameValue = inputValue.value
//     hideCreateNewCategory()
//     makingNameObj(nameValue)
// }




// function hideCreateNewCategory() {

//     $('#newCategory').hide()
//     $('#inputName').val('')
// }




// function makingNameObj(nameValue) {
//     let name = nameValue
//     let nameData = { name }
//     postFetch(nameData)
// }




// async function postFetch(nameData) {

//     let data = await fetch('/api/mylist/post', {
//         method: 'POST',
//         headers: {
//             'Content-type': 'application/json'
//         },
//         body: JSON.stringify(nameData)
//     })

//     let result = await data.json()

//     createList(result)
// }



// function createList(result) {
//     const name = result[0].name
//     const idOfCat = result[0].category_id
//     const newList = document.createElement('li')
//     newList.id = idOfCat
//     newList.className = "listings"
//     newList.innerText = name
//     myListArea.append(newList)
// }



























// function fetchingData() {

// }













































































































































































// const addCategoryBtn = document.getElementById('btncategory')
// const displayArea = document.getElementById('displayarea')
// const myListArea = document.getElementById('mylist')
// let firstClick = false


// clickingCategory()






// function clickingCategory() {

//     if (firstClick === false) {
//         firstClick = true
//         addCategoryBtn.addEventListener('click', creatingDisplayMyList)

//     } else if (firstClick === true) {
//         console.log('tesing true')
//     }

// }




// function creatingDisplayMyList(e) {

//     const categoryDisplay = document.createElement('div')
//     categoryDisplay.id = "newCategory"

//     const createBtn = document.createElement('button')
//     createBtn.id = 'createBtnMyList'
//     createBtn.innerText = "Create"

//     const inputName = document.createElement('input')
//     inputName.innerText = 'Name'
//     inputName.value = ""
//     inputName.id = "inputName"

//     categoryDisplay.append(inputName)
//     categoryDisplay.append(createBtn)
//     displayArea.append(categoryDisplay)

//     clickingCreateCategory()
// }







// function clickingCreateCategory() {
//     const createBtn = document.getElementById('createBtnMyList')
//     createBtn.addEventListener('click', postingCategory)


// }


// function postingCategory() {
//     const inputValue = document.getElementById('inputName')
//     const nameValue = inputValue.value
//     hidingCreateCategory()
//     makingNameObj(nameValue)
// }


// function makingNameObj(nameValue) {
//     let name = nameValue
//     let nameData = { name }


//     postFetch(nameData)
// }




// async function postFetch(nameData) {

//     let data = await fetch('/api/mylist/post', {
//         method: 'POST',
//         headers: {
//             'Content-type': 'application/json'
//         },
//         body: JSON.stringify(nameData)
//     })

//     let result = await data.json()

//     createList(result)
// }



// function createList(result) {
//     const name = result[0].name
//     const idOfCat = result[0].category_id
//     const newList = document.createElement('li')
//     newList.id = idOfCat
//     newList.className = "listings"
//     newList.innerText = name
//     myListArea.append(newList)
// }






// function hidingCreateCategory() {
//     document.getElementById('newCategory').style.display = "none"

// }




















// function fetchingData() {

// }












