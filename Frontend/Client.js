
const log_in = document.querySelector("#log_in_button");
const register = document.querySelector("#register_button");

const register_container = document.querySelector("#register_container_popup")
const close_register_button = document.querySelector("#close_register_popup_button");

register.addEventListener("click", () => {
    change_visibility(register_container)
})

close_register_button.addEventListener("click", () => {
    change_visibility(register_container)
})

