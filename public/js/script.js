const createButton = document.getElementById('createbutton')
const selectFile = document.getElementById('input4')
const retField = document.getElementById('retField')
var fieldNotFilled = false


function createPressed() {
    console.log("createButton pressed")
    for (let i = 1; i < 5; i++) {
        if (document.getElementById('input'+i).value == "") {
            fieldNotFilled = true
            retField.textContent = "All Fields must be filled"
            return;
        }}
        console.log(typeof(selectFile.value))
    

}


createButton.addEventListener('click', createPressed)