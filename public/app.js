const addCategoryBtn = document.getElementById('btncategory')
const displayArea = document.getElementById('displayarea')
const myListArea = document.getElementById('mylist')
let firstClick = false


clickingCategory()






function clickingCategory() {

    if (firstClick === false) {
        firstClick = true
        addCategoryBtn.addEventListener('click', creatingDisplayMyList)

    } else if (firstClick === true) {
        console.log('tesing true')
    }

}




function creatingDisplayMyList(e) {

    const categoryDisplay = document.createElement('div')
    categoryDisplay.id = "newCategory"

    const createBtn = document.createElement('button')
    createBtn.id = 'createBtnMyList'
    createBtn.innerText = "Create"

    const inputName = document.createElement('input')
    inputName.innerText = 'Name'
    inputName.value = ""
    inputName.id = "inputName"

    categoryDisplay.append(inputName)
    categoryDisplay.append(createBtn)
    displayArea.append(categoryDisplay)

    clickingCreateCategory()
}







function clickingCreateCategory() {
    const createBtn = document.getElementById('createBtnMyList')
    createBtn.addEventListener('click', postingCategory)

}


function postingCategory() {
    const inputValue = document.getElementById('inputName')
    const nameValue = inputValue.value
    makingNameObj(nameValue)
}


function makingNameObj(nameValue) {
    let name = nameValue
    let nameData = { name }
    console.log(nameData)

    postFetch(nameData)
}




async function postFetch(nameData) {

    let data = await fetch('/api/mylist/post', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(nameData)
    })

    let result = await data.json()
    console.log(result)

    createList(result)
}



function createList(result) {
    console.log(result.name)
    console.log(result[0].name)
    const newList = document.createElement('li')



}




























function fetchingData() {

}












