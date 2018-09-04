var lists = {}
var localLists
var localData
var listName
var listEntry

window.onload = generateListEntries

function AddNewEntry() {
    lists = getFromLocalStorage()
    listName = document.getElementById("mainInputField").value
    listEntry = document.getElementById("newEntry")
    if(lists != undefined && listName != "" && listEntry.value != ""){
        if(lists[listName] != undefined) {
            lists[listName].push(listEntry.value)
        }
        else{
            lists[listName] = [listEntry.value]
        }
    }
    if(listName != "" && listEntry.value != ""){
        AddToLocalStorage()
        generateListEntries()
        showListEntries(listName)
        document.getElementById("newEntry").value = ""
        document.getElementById("dropdownOptions").className = ""
    } 
    else if(listEntry.value != "") {
        listEntry.placeholder = "No list selected to add to"
        listEntry.value = ""
    }
}

function ChooseRandomFromList() {
    let listName = document.getElementById("mainInputField").value
    let listBox = document.getElementById("listEditContent")
    lists = getFromLocalStorage()
    if(listName == "") {
        listBox.innerHTML = 
        "<div class='generatedItem'>No list selected</div>"
        listBox.className = "listShown"
    }
    else {
        let numberToGenerate = parseInt(document.getElementById("generateCount").value)
        let listLength = lists[listName].length
        let generated = listBox.innerHTML = ""
        for(var i=0; i<numberToGenerate; i++){
            let random = Math.floor(Math.random() * listLength)
            let div = document.createElement("div")
            div.className = "generatedItem"
            div.innerHTML = "<div>" + lists[listName][random] + "</div>"
            listBox.appendChild(div)          
        }        
    }
}

function AddToLocalStorage(){
    let item = JSON.stringify(lists)
    localStorage.setItem("RandomizerLists", item)
}

function getFromLocalStorage(){
    let item = localStorage.getItem("RandomizerLists")
    if(item && item != "undefined"){
        localData = JSON.parse(item)
        return localData
    }
    return {}
}

function generateListEntries(){
    let currentList = getFromLocalStorage()
    let listSelecter = document.getElementById("dropdownOptions")
    listSelecter.innerHTML = ""
    if(currentList){
        for(let key in currentList){
            let option = document.createElement("div")
            option.className = "listOption"
            option.innerHTML = key
            option.onclick = ()=>{
                document.getElementById("mainInputField").value = key
                showListEntries(key)
            }
            listSelecter.appendChild(option)
        }
    }
}

function showListEntries(key) {
    let editList = document.getElementById("listEditContent")
    document.getElementById("mainContainer").className = "listShown"
    editList.className = "listShown"
    lists = getFromLocalStorage()
    document.getElementById("listEditContent").innerHTML = ""
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
        editList.appendChild(div)
    }
    showDropdown()
}

function showDropdown() {
    let dropdownElement = document.getElementById("dropdownOptions")
    if(dropdownElement.className == "shown"){
        dropdownElement.className = ""
        document.getElementById("mainArrow").src = "images/ArrowUp_icon.svg"
    } 
    else {
        dropdownElement.className = "shown"
        document.getElementById("mainArrow").src = "images/ArrowDown_icon.svg"
    }
}

function deleteEntryFromList(item) {
    lists = getFromLocalStorage()
    let listName = document.getElementById("mainInputField").value
    let newItem = []
    for(var i=0; i<lists[listName].length; i++){
        if(lists[listName][i] != item){
            newItem.push(lists[listName][i])
        }
    }
    lists[listName] = newItem
    AddToLocalStorage()
    showListEntries(listName)
    document.getElementById("dropdownOptions").className = ""
}

function deleteList() {
    lists = getFromLocalStorage()
    let listName = document.getElementById("mainInputField").value
    delete lists[listName]
    AddToLocalStorage()
    generateListEntries()
    document.getElementById("mainInputField").value = ""
    document.getElementById("newEntry").value = ""
    document.getElementById("listEditContent").className = ""
    document.getElementById("dropdownOptions").className = ""
    document.getElementById("mainContainer").className = ""
}

function showDelete(element, entry) {
    let entryElement = document.getElementById(entry)
    if(entryElement.innerHTML == element){
        entryElement.innerHTML = "Delete"
    }
    else {
        entryElement.innerHTML = element
    }
}