function AddNewEntry() {
    var listName = document.getElementById("newList").value
    var listEntry = document.getElementById("newEntry").value
    
        if(lists[listName] == true){
            lists[listName].push(listEntry)
        }
        else {
            lists[listName] = [listEntry]
        }
}

function ChooseRandomFromList() {
    var listName = document.getElementById("generatelist").value
    var listLength = lists[listName].length
    var random = Math.floor(Math.random() * listLength)
    document.getElementById("showRandom").innerHTML = lists[listName][random]
}

var lists = {
    Mythical: [
        "Unicorn",
        "Dragon",
        "Fairy",
        "Griffin"
    ]
}