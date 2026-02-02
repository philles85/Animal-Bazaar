let register_popup = document.querySelector("#register_container_popup")

// Fixa en change_page funktion som funkar
function change_page(page) {
    page.classList.remove("hide");
    let all_pages = [start_page, register_popup, dogs_page];
    // pet_page, check_out_page, account_page, dessa måste defineras först och sedan lägga in dom i arrayen
    for (let pages of all_pages) {
        if (page != pages) {
            pages.classList.add("hide");
        }
    }
}

function change_visibility(element) {
    if (element.classList.contains("hide")) {
        element.classList.remove("hide")
    } else {
        element.classList.add("hide")
    }
}


// Fixa en popup som display istället
function display_action_messages(message, color) {
    action_message.classList.remove("hide");
    action_message.querySelector("p").textContent = message;
    action_message.style.backgroundColor = color;

    setTimeout(() => {
        action_message.classList.add("hide");
    }, 3000)

}