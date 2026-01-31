class Persons {

    constructor(username, email, password, confirm_password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.confirm_password = confirm_password;
    }

    check_user_name() {
        if (this.username.length <= 5) {
            return "Username is to short!"
        } else {
            return true;
        }
    }

    check_email() {
        if (!this.email.includes("@")) {
            return "Email is not correct!"
        } else {
            return true;
        }
    }

    check_password() {
        for (let sign of ["%", "&", "?", "#", "!", "€"]) {
            // GÖR toUpperCase() kontroll också sen!!
            if (!this.password.includes(sign)) {
                return "Password doesent include special sign!"
            } else {
                return true;
            }
        }
    }

    check_confirm_password() {
        if (this.confirm_password != this.password) {
            return "Passwords doesent match!"
        } else {
            return true;
        }
    }



}

class Details extends Persons {
    constructor(username, orders) {
        super(username);
        this.orders = orders;
    }
}