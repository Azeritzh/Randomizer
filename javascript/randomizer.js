var lists = {}

var editContainer
var listInputName
var listInputEntry
var dropdownInputField
var listContainer
var dropdownArrow
var randomNumberContainer

window.onload = initializeApplication

function initializeApplication() {
    editContainer = document.getElementById("mainContainer")
    listInputName = document.getElementById("mainInputField")
    listInputEntry = document.getElementById("newEntry")
    dropdownInputField = document.getElementById("dropdownOptions")
    listContainer = document.getElementById("listEditContent")
    dropdownArrow = document.getElementById("ArrowImg")
    randomNumberContainer = document.getElementById("generateCount")
    generateListEntries()
}

/*Gets items from local storage*/
function getFromLocalStorage(){
    let item = localStorage.getItem("RandomizerLists")
    if(item && item != "undefined"){
        let localData = JSON.parse(item)
        return localData
    }
    return {}
}

/*Adds to local storage*/
function AddToLocalStorage(){
    let item = JSON.stringify(lists)
    localStorage.setItem("RandomizerLists", item)
}

/*Generate elements for lists in local storage (if any) for dropdown*/
function generateListEntries(){
    dropdownInputField.innerHTML = ""
    for(let key in getFromLocalStorage()){
        let option = document.createElement("div")
        option.className = "listOption"
        option.innerHTML = key
        option.onclick = ()=>{
            listInputName.value = key
            showListEntries(key)
        }
        dropdownInputField.appendChild(option)
    }
}

/*When dropdown element is clicked, all elements from the selected list is generated and shown*/
function showListEntries(key) {
    editContainer.classList.add("mainContainerExpanded")
    if(listContainer.classList.contains("listShown")){
        listContainer.classList.remove("listShown")
        setTimeout(function() {
            listContainer.classList.add("listShown")
        }, 500)
    }
    else {
        setTimeout(function() {
            listContainer.classList.add("listShown")
        }, 500)
    }
    lists = getFromLocalStorage()
    
    setTimeout(()=>createHtmlList(key), 500)
    
    showDropdown()
}


function createHtmlList(key){
    listContainer.innerHTML = ""
    for(let i=0; i<lists[key].length; i++){
        let div = document.createElement("div")
        let editEntry = "editEntry" + i
        div.className = "editItemHolder"
        div.onclick = () => deleteEntryFromList(lists[key][i])
        div.innerHTML = 
        "<div class='editItem' id='" + editEntry +
        "' type='text' onmouseover='showDelete(\"" + lists[key][i] + "\",\"" + editEntry + "\")'" + 
        "onmouseout='showDelete(\"" + lists[key][i] + "\",\"" + editEntry + "\")'>"
        + lists[key][i] + "</div>"
        listContainer.appendChild(div)
    }
}

/*Adds new entry to new or existing list*/
function AddNewEntry() {
    lists = getFromLocalStorage()
    pushToExistingOrMakeNewList()
    addIfEntriesAreNotUndefined()  
}

/*If listname exists in lists push new entry to list, otherwise make a new list element with that name*/
function pushToExistingOrMakeNewList() {
    if(lists != undefined && listInputName.value != "" && listInputEntry.value != ""){
        if(lists[listInputName.value] != undefined) {
            lists[listInputName.value].push(listInputEntry.value)
        }
        else{
            lists[listInputName.value] = [listInputEntry.value]
        }
    }
}

/*If listname and listentry both are true add entry to local storage, otherwise tell the user no list is selected*/
function addIfEntriesAreNotUndefined() {
    if(listInputName.value != "" && listInputEntry.value != ""){
        AddToLocalStorage()
        generateListEntries()
        showListEntries(listInputName.value)
        listInputEntry.value = ""
        dropdownInputField.classList.remove("shown")
    } 
    else if(listInputEntry.value != "") {
        listInputEntry.placeholder = "No list selected to add to"
        listInputEntry.value = ""
    }
}

/*Delete pressed entry from existing list*/
function deleteEntryFromList(item) {
    lists = getFromLocalStorage()
    let newItem = []
    for(var i=0; i<lists[listInputName.value].length; i++){
        if(lists[listInputName.value][i] != item){
            newItem.push(lists[listInputName.value][i])
        }
    }
    lists[listInputName.value] = newItem
    AddToLocalStorage()
    showListEntries(listInputName.value)
    dropdownInputField.classList.remove("shown")
}

/*Delete whole list if any is selected*/
function deleteList() {
    lists = getFromLocalStorage()
    delete lists[listInputName.value]
    AddToLocalStorage()
    generateListEntries()
    listInputName.value = ""
    listInputEntry.value = ""
    listContainer.classList.remove("listShown")
    dropdownInputField.classList.remove("shown")
    editContainer.classList.remove("mainContainerExpanded")
}

/*Generates x number og random elements from selected list*/
function ChooseRandomFromList() {
    listContainer.innerHTML = ""
    lists = getFromLocalStorage()
    if(listInputName.value == "") {
        listContainer.innerHTML = "<div class='generatedItem'>No list selected</div>"
        listContainer.classList.add("listShown")
        return
    }
    let numberToGenerate = parseInt(randomNumberContainer.value)
    let listLength = lists[listInputName.value].length
    for(var i=0; i<numberToGenerate; i++){
        let random = Math.floor(Math.random() * listLength)
        let div = document.createElement("div")
        div.className = "generatedItem"
        div.innerHTML = "<div>" + lists[listInputName.value][random] + "</div>"
        listContainer.appendChild(div)          
    }
}

/*Shows dropdown list when arrow is clicked and changes arrow*/
function showDropdown() {
    let dropdownElement = dropdownInputField
    if(dropdownElement.classList.contains("shown")){
        dropdownElement.classList.remove("shown")
        dropdownArrow.src = "images/ArrowUp_icon.svg"
    } 
    else {
        dropdownElement.classList.add("shown")
        dropdownArrow.src = "images/ArrowDown_icon.svg"
    }
}

/*Shows delete option when hovering over list element*/
function showDelete(element, entry) {
    let entryElement = document.getElementById(entry)
    if(entryElement.innerHTML == element){
        entryElement.innerHTML = "Delete"
    }
    else {
        entryElement.innerHTML = element
    }
}