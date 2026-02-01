import { serveFile, serveDir } from "jsr:@std/http/file-server"
import { DatabaseSync } from "node:sqlite";
import { Persons } from "./BackendClass.js";

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

// FÖR ATT RENSA TABELLEN
// userDB.exec("DELETE FROM users");
// userDB.exec("DELETE FROM sqlite_sequence WHERE name='users'")


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
            try {
                let data = await request.json();
                let object_data = new Persons(data.username, data.email, data.password, data.confirm_password);
                let check_faults = [object_data.check_repeated_username(), object_data.check_user_name(), object_data.check_email(), object_data.check_password(), object_data.check_confirm_password()];
                if (check_faults.every(fault => fault == true)) {
                    userDB.prepare(`INSERT INTO users(username, email, password) VALUES(?, ?, ?)`).run(object_data.username, object_data.email, object_data.password);
                    console.log(userDB.prepare("SELECT id, username, email, password FROM users").all());
                    return new Response(JSON.stringify("Registerd succesfully!"), { status: 201, headers: headersCORS })
                } else {
                    let fault_messages = check_faults.filter(fault => fault != true);
                    console.log(userDB.prepare("SELECT id, username, email, password FROM users").all());
                    return new Response(JSON.stringify({ fault_messages }), { status: 406, headers: headersCORS })
                }
            } catch (error) {
                console.error("REGISTER ERROR:", error);
            }

        }
    }

    if (url.pathname == "/login") {
        if (request.method == "POST") {
            try {
                let data = await request.json()
                let userData =  userDB.prepare("SELECT id, username, email, password FROM users").all();
                let correctUser = userData.find(user => user.username === data.username && user.password === data.password)
                if (correctUser) {
                    return new Response(JSON.stringify({username: data.username}), {status: 202, headers: headersCORS })
                } else {
                    return new Response(JSON.stringify("Error: Wrong username or password"), { status: 404, headers: headersCORS })
                }
            } catch (error) {
                console.error("LOGIN ERROR:", error)
            }
        }
       
    }

    return new Response(JSON.stringify({ error: "Internal server issue" }), { status: 500, headers: headersCORS })

}


Deno.serve({ port: 9999 }, handler);