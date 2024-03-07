import { Request, Response } from "express";




const uploadRoute = (req: Request, res: Response) => {

    if (!(req.file?.mimetype === "audio/mpeg")) return res.status(400).json({ message: "Invalid file." });
    if (!req.file) return res.status(400).json({ message: "File Required." });

    return res.status(200).json({ message: "OK" });

};

export {
    uploadRoute
}