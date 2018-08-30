var lists = {}
var localLists
var localData
var listName
var listEntry



$(window).on("load", generateListEntries)

function AddNewEntry() {
    lists = getFromLocalStorage()
    listName = document.getElementById("mainInputField").value
    listEntry = document.getElementById("newEntry").value
    if(lists != undefined){
        if(lists[listName] != undefined) {
            lists[listName].push(listEntry)
        }
        else if(listEntry != "") {
            lists[listName] = [listEntry]
        }
        else{
            lists[listName] = []
        }
    }
    AddToLocalStorage()
    generateListEntries()
    showListEntries(listName)
    document.getElementById("newEntry").value = ""
    document.getElementById("dropdownOptions").style.display = "none"
}

function ChooseRandomFromList() {
    let listName = document.getElementById("mainInputField").value
    lists = getFromLocalStorage()
    if(listName == "") {
        document.getElementById("listEditContent").innerHTML = 
        "<div class='generatedItem'>No list selected </div>"
    }
    else {
        let listLength = lists[listName].length
        let random = Math.floor(Math.random() * listLength)
        document.getElementById("listEditContent").innerHTML = 
        "<div class='generatedItem'>" + lists[listName][random] + "</div>"
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
    lists = getFromLocalStorage()
    document.getElementById("listEditContent").innerHTML = ""
    for(let i=0; i<lists[key].length; i++){
        let div = document.createElement("div")
        div.className = "editItemHolder"
        div.onclick = () => deleteEntryFromList(lists[key][i])
        div.innerHTML = 
        "<img class='deleteImage' src='images/DeleteRound_icon.svg'/>" + 
        "<input class='editItem' type='text' placeholder='" + lists[key][i] + "'/>"
        editList.appendChild(div)
    }
    showDropdown()
}

function showDropdown() {
    let dropdownElement = document.getElementById("dropdownOptions")
    if(dropdownElement.style.display == "none" || dropdownElement.style.display == ""){
        dropdownElement.style.display = "block"
    } 
    else {
        dropdownElement.style.display = "none"
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
    document.getElementById("dropdownOptions").style.display = "none"
}

function deleteList() {
    lists = getFromLocalStorage()
    let listName = document.getElementById("mainInputField").value
    delete lists[listName]
    AddToLocalStorage()
    showDropdown()
    generateListEntries()
    document.getElementById("mainInputField").value = ""
    document.getElementById("newEntry").value = ""
    document.getElementById("listEditContent").innerHTML = ""
    document.getElementById("dropdownOptions").style.display = "none"
}