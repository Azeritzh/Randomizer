var lists = {}
var localLists
var localData
var listName
var listEntry



$(window).on("load", generateListEntries)

function AddNewEntry() {
    if(getFromLocalStorage() != undefined){
        lists = getFromLocalStorage()
    }
    listName = document.getElementById("newList").value
    listEntry = document.getElementById("newEntry").value
    
        if(lists[listName] != undefined){
            lists[listName].push(listEntry)
        }
        else {
            lists[listName] = [listEntry]
        }
    document.getElementById("newEntry").value = ""

    AddToLocalStorage()
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
    if(item){
        localData = JSON.parse(item)
        return localData
    }
}

/*function generateListEntries(){
    let currentList = getFromLocalStorage()
    let listSelecter = document.getElementsByClassName("listHolder")
    let option = document.createElement("option")
    if(currentList){
        for(var key in currentList){
            for(var j=0; j<listSelecter.length; j++){
                option.text = key
                listSelecter[j].appendChild(option)
                option = document.createElement("option")
            }
        }
    }
}*/


function generateListEntries(){
    let currentList = getFromLocalStorage()
    let listSelecter = document.getElementById("dropdownOptions")
    let option = document.createElement("div")
    if(currentList){
        for(var key in currentList){
            option.className = "listOption"
            option.innerHTML = key
            listSelecter.appendChild(option)
            option = document.createElement("div")
        }
    }
}

function showListEntries() {
    let list = document.getElementById("editList").value
    let editList = document.getElementById("listEditContent")
    lists = getFromLocalStorage()
    document.getElementById("listEditContent").innerHTML = ""
    for(var i=0; i<lists[list].length; i++){
        let div = document.createElement("div")
        div.className = "editItemHolder"
        div.innerHTML = 
        "<img class='deleteImage' src='images/DeleteRound_icon.svg'/> <input class='editItem' type='text' placeholder='"
        + lists[list][i] + "'/>"
        editList.appendChild(div)
    }
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

