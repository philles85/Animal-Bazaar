let register_popup = document.querySelector("#register_container_popup")


function change_page(page) {
    let all_pages = [start_page, pet_page, check_out_page, account_page, register_popup];

    for (let pages of all_pages) {
        if (page == pages) {
            page.classlist.remove("hide");
        }
    }
}

function change_visiblity(element) {
    if(element.classlist.contains("hide")) {
        element.classlist.remove("hide")
    }
}