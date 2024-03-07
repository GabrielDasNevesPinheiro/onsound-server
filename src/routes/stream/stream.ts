import path from "path";
import fs from "fs"
import { Request, Response } from "express";
import { mediaFolder } from '../../util/media';


const streamRoute = async (req: Request<{ id: string }>, res: Response) => {

    const filePath = path.join(mediaFolder, `${req.params.id}.mp3`);

    fs.stat(filePath, (err, stats) => {
        if (err) {

            res.status(404).json({ message: "File not found." });
            return;
        }

        const range = req.headers.range;
        const fileSize = stats.size;

        let start = 0;
        let end = fileSize - 1;

        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            start = parseInt(parts[0], 10);
            end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        }

        const chunkSize = (end - start) + 1;

        const headers = {
            "Content-Type": "video/mp4",
            "Content-Length": chunkSize,
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
        };

        res.writeHead(range ? 206 : 200, headers);

        const fileStream = fs.createReadStream(filePath, { start, end });
        fileStream.pipe(res);
    });
}

export default streamRoute;