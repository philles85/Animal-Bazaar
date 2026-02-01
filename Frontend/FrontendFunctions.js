let register_popup = document.querySelector("#register_container_popup")


function change_page(page) {
    let all_pages = [start_page, pet_page, check_out_page, account_page, register_popup];

    for (let pages of all_pages) {
        if (page == pages) {
            page.classList.remove("hide");
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
function display_fault_messages(element, message) {
    element.classList.remove("hide");
    element.textContent = message;

    setTimeout(() => {
        element.classList.add("hide");
    }, 3000)


}