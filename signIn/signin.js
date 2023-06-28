const formEle = document.forms[0];

formEle.addEventListener("submit", function(event){
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries())
    
    // SignUp(formEle.method, formEle.action, data)
    SignIn(data);

    formEle.reset();
})


function SignIn(data){
    fetch("https://todo-ts-cs5q.onrender.com/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(data)
    }).then((res) => res.json())
    .then(data => {
        localStorage.setItem("token", data.token)
        window.location.href = "/Reference/getTodos.html";
    })
}