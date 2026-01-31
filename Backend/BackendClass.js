import { DatabaseSync } from "node:sqlite";
const userDB = new DatabaseSync("user_data.db");

export class Persons {

    // Testa utan metod sen och ha bara static
    static all_users() {
        return userDB.prepare("SELECT id, username, email, password FROM users").all();
    }

    constructor(username, email, password, confirm_password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.confirm_password = confirm_password;
    }

    check_repeated_username() {
        for (let user of Persons.all_users()) {
            if (user.username == this.username) {
                return "User already exists!";
            }
        }
        return true;
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
            if (this.password.includes(sign)) {
                return true;
            }
        }
        return "Password doesent include special sign!"
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