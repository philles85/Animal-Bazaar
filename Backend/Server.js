import { serveFile, serveDir } from "jsr:@std/http/file-server"
import { DatabaseSync } from "node:sqlite";

const userDB = new DatabaseSync("user_data.db");

userDB.exec(
    `
         CREATE TABLE IF NOT EXISTS users(
             id INTEGER PRIMARY KEY AUTOINCREMENT,
             username TEXT,
             email TEXT,
             password TEXT
         ) 
     `
);


// userDB.prepare(
//     `
//         INSERT INTO users(username, email, password) VALUES (?, ?, ?);

//     `,
// ).run("Rubba", "Rubba@alhasi", "Rubbabög");



const people = userDB.prepare("SELECT id, username, email, password FROM users").all();

console.log(people);




async function handler(request) {
    const url = new URL(request.url);


    const headersCORS = new Headers()
    headersCORS.set("Access-Control-Allow-Origin", "*");
    headersCORS.set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    headersCORS.set("Access-Control-Allow-Headers", "Content-Type");
    if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: headersCORS })
    }

    if (url.pathname == "/") {
        return serveFile(request, "../Frontend/Webapplication.html")
    } else if (url.pathname.startsWith("/assets")) {
        return serveDir(request, { fsRoot: "../Frontend", urlRoot: "assets" })
    }




    if (url.pathname == "/register") {
        if (request.method == "POST") {
            let data = await request.json();
            let object_data = new Persons(data.username, data.email, data.password, data.confirm_password);
            let check_faults = [object_data.check_user_name(), object_data.check_email(), object_data.check_password(), object_data.check_confirm_password()];
            if (check_faults.every(true)) {
                //userDB.prepare(`INSERT INTO(username, email, password) VALUES(?, ?, ?);`).run(object_data.username, object_data.email, object_data.password);
                return new Response(JSON.stringify("Registerd succesfully!"), { status: 201, headers: headersCORS })
            } else {
                let fault_messages = check_faults.filter(fault => fault != true);
                return new Response(JSON.stringify({ fault_messages }), { status: 406, headers: headersCORS })
            }
        }
    }




    return new Response(JSON.stringify({ error: "Internal server issue" }), { status: 500, headers: headersCORS })

}


Deno.serve(handler);