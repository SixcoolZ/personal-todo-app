const formEle = document.forms[0];

formEle.addEventListener("submit", function (event) {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // SignUp(formEle.method, formEle.action, data)
  AddTodo(data);

  formEle.reset();
});
const token = localStorage.token;

function AddTodo(data) {
  fetch("https://todo-ts-cs5q.onrender.com/api/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => (window.location.href = "/Get/getTodos.html"));
}