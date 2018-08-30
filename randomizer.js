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
    console.log(getFromLocalStorage())
}

function ChooseRandomFromList() {
    let listName = document.getElementById("randomList").value
    lists = getFromLocalStorage()
    if(lists == undefined || lists[listName] == undefined){
        document.getElementById("showRandom").innerHTML = "No list found"
    } else{
        var listLength = lists[listName].length
        var random = Math.floor(Math.random() * listLength)
        document.getElementById("showRandom").innerHTML = lists[listName][random]
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
    for(var i=0; i<lists[key].length; i++){
        let div = document.createElement("div")
        div.className = "editItemHolder"
        div.innerHTML = 
        "<img class='deleteImage' src='images/DeleteRound_icon.svg'/> <input class='editItem' type='text' placeholder='"
        + lists[key][i] + "'/>"
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

