import { Request, Response } from "express";
import { getMusicMetadata, mediaFolder } from "../../util/media";
import path from 'path';
import { IPicture } from "music-metadata";

const getCover = async (req: Request<{ id: string }>, res: Response) => {

    try {

        const songId = req.params.id;
        const info = await getMusicMetadata(path.join(mediaFolder, `${songId}.mp3`));
        const covers = info.picture as IPicture[];

        res.contentType("jpeg");
        res.status(200).send(covers[0].data);

    } catch (error) {
        res.status(404).json({ message: "Not found." });
    }

}


export default getCover;