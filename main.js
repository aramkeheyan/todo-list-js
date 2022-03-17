const mainForm = document.getElementById("mainForm")
let allItems = []
if (localStorage.getItem("allItems")) {
    allItems = JSON.parse(localStorage.getItem("allItems"))
    allItems.forEach((item) => {
        const clonedForm = document.querySelector(".for-clone").cloneNode(true)
        clonedForm.textInput.value = item.value
        clonedForm.checkbox.checked = item.isCompleted
        clonedForm.classList.remove("for-clone", "hide")
        mainForm.after(clonedForm)
    })
}

mainForm.addEventListener("submit", (event) => {
    event.preventDefault()

    const value = mainForm.textInput.value
    if (allItems.some(item => item?.value === value)) {
        alert("item already exists")
        mainForm.textInput.value = ""
        return
    }
    addItem(value)
})

function addItem(value) {
    if (value.trim()) {
        const item = {
            id: allItems.length,
            value,
            isCompleted: false,
        }
        allItems.push(item)
        localStorage.setItem("allItems", JSON.stringify(allItems))
        renderList()
        mainForm.textInput.value = ""
    }
}

function renderList() {
    allItems.forEach((item, index) => {
        if (index === allItems.length - 1) {
            const clonedForm = document.querySelector(".for-clone").cloneNode(true)
            clonedForm.textInput.value = item.value
            clonedForm.checkbox.checked = item.isCompleted
            clonedForm.classList.remove("for-clone", "hide")
            mainForm.after(clonedForm)
        }
    })

}


const parent = document.querySelector("#main")
parent.addEventListener("click", (event) => {
    if (event.target.id === "delBtn") {
        event.target.parentNode.remove()
        allItems = allItems.filter(item => item.value !== event.target.parentNode.textInput.value)
        localStorage.setItem("allItems", JSON.stringify(allItems))
    }
    if (event.target.name === "checkbox") {
        allItems = allItems.map(item => {
            if (item.value === event.target.parentNode.textInput.value) item.isCompleted = !item.isCompleted
            return item
        })
        localStorage.setItem("allItems", JSON.stringify(allItems))

    }
})

parent.addEventListener("dblclick", (event) =>{
   if (event.target.name=== "textInput"){
       const input = document.createElement('input')
       input.value = event.target.value
       event.target.replaceWith(input)
       input.onkeydown = function (event) {
           if(event.key === "Enter"){
               this.blur()
           }
       }
       input.onblur = function(){
           event.target.value = input.value
           input.replaceWith(event.target)
       }
   }
})