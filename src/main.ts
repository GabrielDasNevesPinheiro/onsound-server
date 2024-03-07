import express from "express";
import router from "./routes/router";
import { setupFolders } from "./util/storage";

const server = express();

server.use(express.json());
server.use(router);

server.listen(3000, () => {
    setupFolders();
    console.log("Server is open.");
});

export default server;