var lists = {}
var localLists
var localData
var listName
var listEntry

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
    var listLength = lists[listName].length
    var random = Math.floor(Math.random() * listLength)
    document.getElementById("showRandom").innerHTML = lists[listName][random]
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

