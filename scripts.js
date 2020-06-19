

let tasks = []; // {title:"ddddd",done:false}

function renderEditor() {
    let inputEl = document.querySelector("#default-todo-panel .todo-editor > input");

    //inputEl.onchange = (e) => {
    //  console.log("text:", e.target.value);
    //    console.log("input change:", e);
    // };

    let addTask = () => {
        if (inputEl.value.length === 0) {
            return;
        }

        let newTask = {
            title: inputEl.value,
            done: false,
        };

        inputEl.value = "";

        tasks.push(newTask);

        console.log("task: ", tasks);

        renderTaskItems();
    };

    inputEl.onkeypress = (e) => {

        if (e.key === "Enter") {
            addTask();
        }
    };

    let addEl = document.querySelector("#default-todo-panel .todo-editor > button");
    addEl.onclick = (e) => {
        addTask();
    };

}

function renderTaskItems() {
    console.log("render items");
    let itemsEl = document.querySelector("#default-todo-panel .todo-items");

    itemsEl.querySelectorAll("div").forEach((node) => node.remove());
    console.log(itemsEl);

    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        let itemEl = document.createElement("div");
        itemEl.className = "task";

        let doneEl = document.createElement("input");
        doneEl.type = "checkbox";
        doneEl.checked = task.done;
        if (task.done) {
            itemEl.classList.add("done");
        }
        else {
            itemEl.classList.remove("done");
        }

        doneEl.onchange = (e) => {
            task.done = e.target.checked;
            if (task.done) {
                itemEl.classList.add("done");
            }
            else {
                itemEl.classList.remove("done");
            }
        }
        itemEl.append(doneEl);

        let titleEl = document.createElement("label");
        titleEl.innerText = task.title;
        itemEl.append(titleEl);

        let ctrlbarEl = renderTaskCtrlBar(tasks, i);

        itemEl.append(ctrlbarEl);

        itemsEl.append(itemEl);
    }
}


function renderTaskCtrlBar(tasks, taskIdx) {
    let ctrlbarEl = document.createElement("div");
    ctrlbarEl.className = "ctrlbar";

    let viptagEl = document.createElement("button");
    var div = document.getElementsByTagName('viptagEl')[0];
    viptagEl.innerText = "✰";
    var count = 0;
    viptagEl.onclick = function (a) {
        count++
        if (count % 2 === 1) {
            viptagEl.innerText = "⭐";
        } else {
            viptagEl.innerText = "✰";
        }
    }

    ctrlbarEl.append(viptagEl);

    let upEl = document.createElement("button");
    if (taskIdx === 0) {
        upEl.disabled = true;
    }
    upEl.innerText = "↿";
    upEl.onclick = () => {
        var order = tasks[taskIdx];
        tasks[taskIdx] = tasks[taskIdx - 1]
        tasks[taskIdx - 1] = order;
        console.log();
        renderEditor();
        renderTaskItems();
    };
    ctrlbarEl.append(upEl);

    let downEl = document.createElement("button");
    downEl.innerText = "⇂";
    downEl.onclick = () => {
        var order = tasks[taskIdx];
        tasks[taskIdx] = tasks[taskIdx + 1]
        tasks[taskIdx + 1] = order;
        console.log();
        renderEditor();
        renderTaskItems();
    };
    ctrlbarEl.append(downEl);

    let cancelEl = document.createElement("button");
    cancelEl.innerText = "×";
    cancelEl.onclick = () => {
        tasks.splice(taskIdx, 1);
        renderTaskItems();
    };

    ctrlbarEl.append(cancelEl);

    return ctrlbarEl;
}

renderEditor();
renderTaskItems();