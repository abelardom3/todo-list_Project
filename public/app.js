console.log('Hello world ')

const taskForm = document.getElementById('newTask-box')
const taskInput = document.getElementById('inputTask')
const createTaskBtn = document.getElementById('create-task-btn')
const listDisplay = document.getElementById('list-display')
const inputtask = document.getElementById('inputTask')
const listContainer = document.getElementById('list-container')
const showHistory = document.getElementById('show-history')



clickingCreateTask()

// clickingEditBtn()
clickingShowComplete()


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

//posting functionality

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
    taskRow.className = 'task-row'
    taskRow.id = dataId
    const divTask = document.createElement('div')
    divTask.innerText = dataValue
    divTask.id = dataId
    divTask.className = "listings"

    taskRow.append(divTask)


    creatingEditBtn(taskRow, dataId)
    creatingDeleteBtn(taskRow, dataId)
    creatingCompleteBtn(taskRow, dataId)
    listDisplay.append(taskRow)

}

function creatingEditBtn(taskRow, dataId) {

    const editBox = document.createElement('div')
    editBox.className = "edit-box"
    editBox.id = dataId
    const editBtn = document.createElement('button')
    editBtn.innerText = "Edit"
    editBtn.className = 'edit-btn'
    editBtn.id = dataId

    editBox.append(editBtn)
    taskRow.append(editBox)
    console.log('1 testing')

    clickingEditBtn(editBtn, dataId)
}

function creatingDeleteBtn(taskRow, dataId) {

    const deleteBox = document.createElement('div')
    deleteBox.className = "delete-box"
    deleteBox.id = dataId
    const deleteBtn = document.createElement('button')
    deleteBtn.innerText = "Delete"
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
        hideTaskRow()
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
    $(listDisplay).prepend(editDisplay)

    clickingUpdateBtn(updateForm, inputUpdate, dataId)
}


function clickingUpdateBtn(updateForm, inputUpdate, dataId) {

    updateForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const inputUpvalue = inputUpdate.value
        if (!inputUpvalue) {
            showErrorUpdate()
        } else {
            changingToNewUpdate(inputUpvalue, dataId)
            hideErrorUpdate()
            showTaskRow()
        }


    })

}


function changingToNewUpdate(inputUpvalue, dataId) {
    const parentRow = document.getElementById(`${dataId}`)

    const listings = parentRow.children[0]

    listings.innerText = inputUpvalue
    patchingToDatabase(inputUpvalue, dataId)
    $('#edit-display').remove()

}


async function patchingToDatabase(inputUpvalue, dataId) {
    let task = inputUpvalue
    let list_id = dataId
    let updateData = { task }

    let updateResult = await fetch(`/api/mylist/edit/${list_id}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(updateData)
    })



}






//delete functionality

function clickingDeleteBtn(deleteBtn) {

    deleteBtn.addEventListener('click', (e) => {
        const idToDelete = e.target.id
        console.log(idToDelete)
        const listToRemove = document.getElementById(idToDelete)
        listToRemove.remove()
        deleteFromDatabase(idToDelete)

    })

}

async function deleteFromDatabase(idToDelete) {

    let result = await fetch(`/api/mylist/delete/${idToDelete}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    })



}







// complete functionality

function creatingCompleteBtn(taskRow, dataId) {
    const completeBox = document.createElement('div')
    completeBox.className = "complete-box"
    completeBox.id = dataId
    const completeBtn = document.createElement('button')
    completeBtn.innerText = "Complete"
    completeBtn.className = "complete-btn"
    completeBtn.id = dataId

    completeBox.append(completeBtn)
    taskRow.append(completeBox)


    clickingCompleteBtn(completeBtn)
}

function clickingCompleteBtn(completeBtn) {

    completeBtn.addEventListener('click', (e) => {
        const idToComplete = e.target.id
        const listToComplete = document.getElementById(idToComplete)
        listToComplete.remove()

    })
}










//show functionality 

function clickingShowComplete() {
    showHistory.addEventListener('click', () => {
        if (showHistory.innerText === 'Close') {
            hideAllHistory()
        } else if (showHistory.innerText === "Show History") {
            getAllfetch()
        }

    })
}

async function getAllfetch() {

    let result = await fetch('/api/mylist', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    })

    let getAllList = await result.json();

    loopThruData(getAllList)

}

function loopThruData(getAllList) {
    const allListDisplay = document.createElement('div')
    allListDisplay.id = 'showAll-display'

    for (let i = 0; i < getAllList.length; i++) {
        const currentTask = getAllList[i].task

        makingAllTaskList(currentTask, allListDisplay)
    }

}

function makingAllTaskList(currentTask, allListDisplay) {
    const allTaskList = document.createElement('p')
    allTaskList.className = "allTaskList"
    allTaskList.innerText = currentTask

    allListDisplay.append(allTaskList)
    listDisplay.append(allListDisplay)
    // change innertext
    showHistory.innerText = "Close"
    hideTaskRow()

}

function hideAllHistory() {

    const showAllId = document.getElementById('showAll-display')
    $(showAllId).remove()
    showHistory.innerText = "Show History"
    showTaskRow()
    console.log('hit close route')
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


function showTaskRow() {
    $('.task-row').show()
}




function hideTaskRow() {
    $('.task-row').hide()
}



function showErrorUpdate() {
    $('#error-text-update').show()
}


function hideErrorUpdate() {
    $('#error-text-update').hide()
}














