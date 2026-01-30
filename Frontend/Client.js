
const log_in = document.querySelector("#log_in_button");
const register = document.querySelector("#register_button");

const register_container = document.querySelector("#register_container_popup")
const close_register_button = document.querySelector("#close_register_popup_button");

const close_login_button = document.querySelector("#close_login_popup_button")

const login_container = document.querySelector("#login_container_popup")

register.addEventListener("click", () => {
    if (!login_container.classList.contains('hide')) {
        change_visibility(login_container)
    }
    change_visibility(register_container)
})

close_register_button.addEventListener("click", () => {
    change_visibility(register_container)
})

log_in.addEventListener("click", () => {
    if (!register_container.classList.contains('hide')) {
        change_visibility(register_container)
    }
    change_visibility(login_container)
})

close_login_button.addEventListener("click", () => {
    change_visibility(login_container)
})


let username = "input.value";
let password = "input.value";

let fetched = fetch(`localhost:8000/signin/${username}/${password}`)