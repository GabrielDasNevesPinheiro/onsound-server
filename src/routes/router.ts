import { Router } from "express";
import mediaStreaming from "./stream/stream";
import { getSongs, getSong } from './stream/media';
import getCover from "./stream/cover";
import { playlistRoute } from "./playlist/route";
import { uploadRoute } from "./upload/route"
import { upload } from "../util/storage";



const router = Router();

router.use("/stream/:id", mediaStreaming); // stream song
router.use("/songs", getSongs); // get all songs
router.use("/song/:id", getSong); // get song info
router.use("/cover/:id", getCover); // get song cover art

router.use("/playlist", playlistRoute); // playlist crud

router.use("/upload/song", upload.single("audio"), uploadRoute);

export default router;