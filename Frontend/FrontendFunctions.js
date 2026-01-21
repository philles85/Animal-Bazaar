function change_page(page) {
    let all_pages = [start_page, pet_page, check_out_page, account_page];

    for (let pages of all_pages) {
        if (page == pages) {
            page.classlist.remove("hide");
        }
    }
}