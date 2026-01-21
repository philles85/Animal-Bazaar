class Persons {

    constructor(firstname, lastname, username, email, password) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.email = email;
        this.password = password;
    }

}

class Details extends Persons {
    constructor(username, orders) {
        super(username);
        this.orders = orders;
    }
}