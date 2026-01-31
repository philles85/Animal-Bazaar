const log_in = document.querySelector("#log_in_button");
const register = document.querySelector("#register_button");

const register_container = document.querySelector("#register_container_popup")
const close_register_button = document.querySelector("#close_register_popup_button");

const close_login_button = document.querySelector("#close_login_popup_button")

const login_container = document.querySelector("#login_container_popup")

const create_account_button = document.querySelector("#create_account_button")
const register_username_input = document.querySelector("#register_username_input")
const register_email_input = document.querySelector("#register_email_input")
const register_password_input = document.querySelector("#register_password_input")
const register_confirm_password_input = document.querySelector("#register_confirm_password_input")

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

create_account_button.addEventListener("click", async function () {
    const new_account_reponse = await fetch("http://localhost:9999/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: register_username_input.value, email: register_email_input.value, password: register_password_input.value, confirm_password: register_confirm_password_input.value })
    });

    const resourceBody = await new_account_reponse.json();

    console.log(resourceBody);

})
