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



const userSignUp = new URLPattern({ patname: "/signin/:username/" });


async function handler(request) {
    const url = new URL(request.url);

    const match_signin = userSignUp.exec(url);


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




    if (match_signin) {
        if (request.method == "POST") {

        }
    }




    return new Response(JSON.stringify({ error: "Internal server issue" }), { status: 500, headers: headersCORS })

}


Deno.serve(handler);