const mainForm = document.getElementById("mainForm")
let all = []
let completed = []
let active = []
if (localStorage.getItem("all")) {
    all = JSON.parse(localStorage.getItem("all"))
    all.forEach((item) => {
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
    if (all.some(item => item?.value === value)) {
        alert("item already exists")
        mainForm.textInput.value = ""
        return
    }
    addItem(value)
})

function addItem(value) {
    if (value.trim()) {
        const item = {
            id: all.length,
            value,
            isCompleted: false,
        }
        all.push(item)
        localStorage.setItem("all", JSON.stringify(all))
        renderList()
        mainForm.textInput.value = ""
    }
}

function sortList() {
    const filterBtn = document.querySelectorAll('input[type=radio][name=status]')
    for (const filterBtnElement of filterBtn) {
        filterBtnElement.addEventListener("change",(event)=>{
            switch (event.target.value) {
                case "all":
                    renderList(all)
                    break;
                case "completed":
                    completed = all.filter(item => item.isCompleted)
                    renderList(completed)
                    break;
                case "active":
                    active = all.filter(item => !item.isCompleted)
                    renderList(active)
                    break;
            }
        })
    }
}
sortList()


function renderList(items = all) {
    const cloned = document.querySelectorAll(".cloned")
    cloned.forEach(item => item.remove())
    items.forEach((item, index) => {
        if (index === all.length - 1) {
            const clonedForm = document.querySelector(".for-clone").cloneNode(true)
            clonedForm.setAttribute("class","cloned")
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
        all = all.filter(item => item.value !== event.target.parentNode.textInput.value)
        localStorage.setItem("all", JSON.stringify(all))
    }
    if (event.target.name === "checkbox") {
        all = all.map(item => {
            if (item.value === event.target.parentNode.textInput.value) item.isCompleted = !item.isCompleted
            return item
        })
        localStorage.setItem("all", JSON.stringify(all))

    }
})

parent.addEventListener("dblclick", (event) => {
    if (event.target.name === "textInput") {
        const input = document.createElement('input')
        input.value = event.target.value
        event.target.replaceWith(input)
        input.onkeydown = function (event) {
            if (event.key === "Enter") {
                this.blur()
            }
        }
        input.onblur = function () {
            event.target.value = input.value
            input.replaceWith(event.target)
        }
    }
})