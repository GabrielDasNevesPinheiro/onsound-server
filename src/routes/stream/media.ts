import { Request, Response } from "express";
import fs from 'fs';
import { getMusicMetadata, mediaFolder } from "../../util/media";
import path from 'path';
import { getPlaylist } from '../../controllers/playlist.controller';

type SongInfo = {
    title?: string | undefined
    artist?: string | undefined
    artists?: string[] | undefined
    id?: string | undefined
    date?: string | undefined
    album?: string | undefined
}


const getAllSongs = () => fs.readdirSync(mediaFolder);




const getSongs = async (req: Request<{}, {}, {}, { search?: Search, value?: string }>, res: Response) => {


    //by album
    //by artist

    const { search, value } = req.query;

    if (search && !value) return res.status(400).json({ message: "Value required." });

    try {

        let songs: string[] = search === "playlist" ? getPlaylist(String(value))?.songs as string[] : getAllSongs();

        if (!songs[0]) return res.status(200).json([]);

        let parsed: SongInfo[] = [];

        for (let song of songs) {

            let fullPath = path.join(mediaFolder, song.includes(".mp3") ? song : `${song}.mp3`);
            let meta = await getMusicMetadata(fullPath);

            parsed.push({
                id: song.replace(".mp3", ""),
                title: String(meta.title),
                artist: String(meta.artist),
                artists: meta.artists as string[],
                date: String(meta.year),
                album: meta.album
            })
        }



        if (search === "album") parsed = parsed.filter((song) => song.album === value);
        if (search === "artist") parsed = parsed.filter((song) => song.artist === value);


        return res.status(200).json(parsed);



    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal error" });

    }


}

const getSong = async (req: Request<{ id: string }>, res: Response) => {

    try {

        const soingPath = path.join(mediaFolder, `${req.params.id}.mp3`);
        const info = await getMusicMetadata(soingPath);

        res.status(200).json({
            id: req.params.id,
            title: String(info.title),
            artist: String(info.artist),
            artists: String(info.artists),
            date: String(info.year),
            album: String(info.album)

        });

    } catch (error) {
        return res.status(500).json({ message: "Internal error" });
    }

}


export {
    getSongs,
    getSong

};