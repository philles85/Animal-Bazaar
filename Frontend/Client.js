let active_user = null;

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

const login_username_input = document.querySelector("#login_username_input");
const login_password_input = document.querySelector("#login_password_input");
const login_button = document.querySelector("#login_button");
const account_fault_message = document.querySelector(".account_fault_message");

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

    display_fault_messages(account_fault_message, resourceBody);



    if (new_account_reponse.status == 201) {
        login_fault_message.textContent = "Registered succesfully!"

        active_user = resourceBody.username;

        setTimeout(() => {
            change_visibility(register_container)
        }, 3000)
    } else {
        login_fault_message.textContent = "Not following registering rules"
    }

})


login_button.addEventListener("click", async function () {
    const user_login_response = await fetch("http://localhost:9999/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: login_username_input.value, password: login_password_input.value })
    });

    const resourceBody = await user_login_response.json();

    if (user_login_response.status == 202) {
        login_fault_message.textContent = "Login succesfull!"
        active_user = resourceBody.username;

        setTimeout(() => {
            change_visibility(login_container)
        }, 3000)
    } else {
        display_fault_messages(account_fault_message, "Wrong username or password!");
    }


});