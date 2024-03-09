import { Request, Response } from "express";
import { createPlaylist, deletePlaylist, editPlaylist, getPlaylists } from "../../controllers/playlist.controller";


const get = (req: Request, res: Response) => {

    const playlists = getPlaylists();

    res.status(200).json(playlists);

};

const post = (req: Request<{}, {}, Playlist>, res: Response) => {

    try {
        const data = req.body;
        data.id = `${Date.now()}`;

        console.log(data);

        if (!data.name) return res.status(400).json({ message: "Playlist name required." });

        const success = createPlaylist(data);
        if (!success) throw Error("Playlist not created");

        res.status(201).json({ message: "Playlist Created." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal error." });
    }

};

const patch = (req: Request<{}, {}, Playlist>, res: Response) => {
    try {
        const data = req.body;

        if (!data.name || !data.description || !data.songs) return res.status(400).json({ message: "Data required." });

        const success = editPlaylist(data.id, data);
        if (!success) throw Error("Playlist not updated");

        res.status(201).json({ message: "Playlist updated." });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal error." });
    }

};

const del = (req: Request<{}, {}, { id: string }>, res: Response) => {

    try {

        const { id } = req.body;

        if (!id) return res.status(400).json({ message: "id required." });

        const success = deletePlaylist(id);
        if (!success) throw Error("Playlist not deleted");

        res.status(202).json({ message: "Playlist deleted" });

    } catch (error) {

        console.log(error);
        return res.status(500).json({ message: "Internal error." });

    }
}


const actions = {
    "GET": get,
    "POST": post,
    "PATCH": patch,
    "DELETE": del,
}

const playlistRoute = (req: Request, res: Response) => {

    if (!actions[req.method]) return res.status(405).json({ message: "Method not allowed." });
    return actions[req.method](req, res);

};

export {
    playlistRoute
}