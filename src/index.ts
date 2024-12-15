//let http = require('http');
//let fs = require('fs');

import * as http from "http";
import * as fs from "fs";

const PORT: number=8080; 

http.createServer(handleRequest).listen(PORT);

function handleRequest(request: http.IncomingMessage, response: http.ServerResponse):void{
  if(request.url === undefined){return;}
  const url :string = request.url;
  fs.readFile(parseFileDirectory(url), function(error, contentBody):void{
    const end: string = handleContentType(url);
    if(error){
      response.writeHead(404, {"Content-Type": end});
      response.end();
      return;
    }
    response.writeHead(200, {"Content-Type": end});  
    response.write(contentBody);
    response.end();
  });
}

function parseFileDirectory(url: string): string{
  switch(url){
    case "/": return "./index.html";
    default: return ".".concat(url);
  }
}

function handleContentType(url:string):string{
  const end = url.substring(url.lastIndexOf(".") + 1);
  switch(end){
    case "html": return "text/html";
    case "css": return "text/css";
    case "js": return "text/javascript";
    default: return "unsupported";
  }
}