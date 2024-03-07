import multer from "multer";
import { mediaFolder, playlistFolder } from "./media";
import fs from 'fs';



const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, mediaFolder);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}.mp3`);
    }

});

const upload = multer({
    storage,

    fileFilter: (req, file, cb) => {
        if (file.mimetype === "audio/mpeg") return cb(null, true);
        cb(null, false)
    }

});

const setupFolders = () => {

    const media = fs.existsSync(mediaFolder);
    const playlist = fs.existsSync(playlistFolder);

    if (!media) fs.mkdirSync(mediaFolder);
    if (!playlist) fs.mkdirSync(playlistFolder);

}

export {
    upload,
    setupFolders
}