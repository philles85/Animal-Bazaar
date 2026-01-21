import {serveFile, serveDir} from "jsr:@std/http/file-server"

function handler(request) {

    const url = new URL(request.url)

    const headersCORS = new Headers()
    headersCORS.set("Access-Control-Allow-Origin", "*");
    headersCORS.set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    headersCORS.set("Access-Control-Allow-Headers", "Content-Type");
    if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: headersCORS })
    }

    if(url.pathname == "/") {
        return serveFile(request, "../Frontend/Webapplication.html")
    } else if(url.pathname.startsWith("/static")) {
        return serveDir(request, { fsRoot: "../Frontend", urlRoot: "static" })
    }
    return new Response(JSON.stringify({error: "Internal server issue"}), { status: 500, headers: headersCORS})

}


Deno.serve(handler);