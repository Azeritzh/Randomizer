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
    console.log(getFromLocalStorage())
}

function ChooseRandomFromList() {
    var listName = document.getElementById("generatelist").value
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

function generateListEntries(){
    let currentList = getFromLocalStorage()
    let listSelecter = document.getElementById("listHolder")
    let option = document.createElement("option")
    if(currentList){
        for(var key in currentList){
            option.text = key
            listSelecter.appendChild(option)
            option = document.createElement("option")
        }
    }
}

