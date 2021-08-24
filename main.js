const inputBox = document.querySelector(".input-field input");
const addBtn = document.querySelector(".input-field button");
const todoList = document.querySelector(".todo-list");
const todoDone = document.querySelector(".todo-list-done");

inputBox.onkeyup = () => {
    let userData = inputBox.value;
    if (userData.trim() != 0) {
        addBtn.classList.add("active");
    } else {
        addBtn.classList.remove("active");
    }
}

showTask();
showTaskDone();


addBtn.onclick = () => {
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    if (getLocalStorage == null) { //if local storage is null
        listArr = []; //createing blank array
    } else {
        listArr = JSON.parse(getLocalStorage); //transforming a json string into js object
    }
    listArr.push(userData); //pushing or adding user data
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
    showTask(); //calling showTask function
    addBtn.classList.remove("active"); //unactive the add button
}

function showTask() {
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    if (getLocalStorage == null) { //if local storage is null
        listArr = []; //createing blank array
    } else {
        listArr = JSON.parse(getLocalStorage); //transforming a json string into jd object
    }
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li>${element}<i onclick="deleteTask(${index})"; class="fa fa-trash"></i><i onclick="done(${index})"; class="fa fa-check-circle""></i></li>`;
    });
    todoList.innerHTML = newLiTag;
    inputBox.value = '';
}

function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); //delete or remove the particular indexed li
    //after removed the li again update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
    showTask(); //calling showTask function
}

function done(index) {
    let itemDone = listArr[index];

    //add to listArrDone
    let getLocalStorageDone = localStorage.getItem("Todo Done"); //getting localstorage
    if (getLocalStorageDone == null) { //if local storage is null
        listArrDone = []; //createing blank array
    } else {
        listArrDone = JSON.parse(getLocalStorageDone); //transforming a json string into js object
    }
    listArrDone.push(itemDone);
    localStorage.setItem("Todo Done", JSON.stringify(listArrDone)); //transforming js object into a json string

    //remove from listArr
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); //delete or remove the particular indexed li
    //after removed the li again update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string

    showTask(); //calling showTask function
    showTaskDone();
}

function showTaskDone() {
    let getLocalStorageDone = localStorage.getItem("Todo Done"); //getting localstorage
    if (getLocalStorageDone == null) { //if local storage is null
        listArrDone = []; //createing blank array
    } else {
        listArrDone = JSON.parse(getLocalStorageDone); //transforming a json string into js object
    }
    let newLiTag = '';
    listArrDone.forEach((element, index) => {
        newLiTag += `<li>${element}<i onclick="deleteTaskDone(${index})"; class="fa fa-trash"></i><i onclick="undoDone(${index})"; class="fa fa-undo""></i></li>`;
    });
    todoDone.innerHTML = newLiTag;
    inputBox.value = '';
}

function deleteTaskDone(index) {
    let getLocalStorageDone = localStorage.getItem("Todo Done"); //getting localstorage
    listArrDone = JSON.parse(getLocalStorageDone);
    listArrDone.splice(index, 1); //delete or remove the particular indexed li
    //after removed the li again update the local storage
    localStorage.setItem("Todo Done", JSON.stringify(listArrDone)); //transforming js object into a json string
    showTaskDone(); //calling showTaskDone function
}

function undoDone(index) {
    let itemDone = listArrDone[index];

    //add to listArr
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    if (getLocalStorage == null) { //if local storage is null
        listArr = []; //createing blank array
    } else {
        listArr = JSON.parse(getLocalStorage); //transforming a json string into js object
    }
    listArr.push(itemDone);
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string

    //remove from listArrDone
    let getLocalStorageDone = localStorage.getItem("Todo Done"); //getting localstorage
    listArrDone = JSON.parse(getLocalStorageDone);
    listArrDone.splice(index, 1); //delete or remove the particular indexed li
    //after removed the li again update the local storage
    localStorage.setItem("Todo Done", JSON.stringify(listArrDone)); //transforming js object into a json string

    showTask();
    showTaskDone();
}


/* Jadi sekarang, todo list ini bisa:
-menginput list baru
-mendapatkan nilai list baru
-memasukkannya ke dalam array di localstorage
-menampilkan list baru ke browser
-menghapus list
-menghapust item array yg di hapus berdasarkan index nya di array localstorage
*/
/* Selanjutnya saya mau:
-dapat menekan tombol done
-menghapus todo yang sudah selesai dari listArrDone
-menambah todo yang sudah selesai ke array baru listArrDone
-menampilkan todo yang sudah selesai ke list sudah selesai

*/

// fungsi "done" belum selesai! saya bingung