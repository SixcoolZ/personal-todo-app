const body = document.body;
const token = localStorage.token;
const div_get = document.createElement("div");
div_get.setAttribute("class", "get-todo-container");

fetch("https://todo-ts-cs5q.onrender.com/api/todo", {
  method: "GET",
  headers: { Authorization: `Bearer ${token}` },
})
  .then((res) => res.json())
  .then((data) => {
    data.forEach((item) => {
      const div = document.createElement("div");
      const checkBox = document.createElement("input");
      const delete_button = document.createElement("button");

      
      checkBox.setAttribute("type", "checkbox");

      div.setAttribute("class","eachTodos")
      const p = document.createElement("p");
      p.setAttribute("class", "p_todos");
      p.textContent = item.title;

      delete_button.textContent = "DELETE";
      delete_button.setAttribute('class', "del_btn");
      delete_button.setAttribute("id", item._id);

      checkBox.setAttribute("id", item._id);

      if (item.completed) {
        checkBox.setAttribute("checked", "true");
        p.classList.add("done");
      } else {
        p.classList.remove("done");
      }

      div.append(checkBox, p, delete_button);
      div_get.appendChild(div);

      body.append(div_get);
    });
    checkInput();
    checkDelete();
  });

function checkInput() {
  const input = document.getElementsByTagName("input");

  const checkbox = [...input];

  checkbox.forEach((item) => {
    item.addEventListener("click", function (event) {
      // const id = event.target.id;
      // const status = event.target.checked;
      const { id, checked } = event.target;
      UpdateTodo(id, checked);
    });
  });
}

function checkDelete(){
    const buttons = document.getElementsByClassName('del_btn')
    del_btns = [...buttons]

    del_btns.forEach((item) => {
        item.addEventListener("click", function (event) {
          const { id } = event.target;
          DeleteTodo(id);
        });
      });
}

function UpdateTodo(id, checked) {
  const obj = { completed: checked };
  console.log(obj)
  fetch(`https://todo-ts-cs5q.onrender.com/api/todo/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}`,
    "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(obj),
  })
    .then(() => window.location.reload())
    .catch((error) => console.log(error));
}


function DeleteTodo(id){
    const options =  {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    fetch(`https://todo-ts-cs5q.onrender.com/api/todo/${id}`, options)
        .then((res) => res.json())
        .then((data) => window.location.reload());
} 