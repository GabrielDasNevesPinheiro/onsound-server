import fs from 'fs';
import path from 'path';
import { playlistFolder } from '../util/media';


export function getPlaylist(id: string): Playlist | null {

    try {

        let playlist = fs.readFileSync(path.join(playlistFolder, `${id}.playlist`), { encoding: "utf-8", flag: "r" });
        let content = playlist.split("\r\n");
        let songs = content[2].split(" ");

        let response: Playlist = { id, name: content[0] };

        if (content[1] !== "not-set") response.description = content[1];
        if (songs[0] !== "not-set") response.songs = songs;

        return response;



    } catch (error) {
        console.log(error);
        return null
    }

}

export function getPlaylists(): Playlist[] {

    try {

        const files = fs.readdirSync(playlistFolder);

        const playlists = files.map((name) => getPlaylist(name.replace(".playlist", "")));

        return playlists as Playlist[];

    } catch (error) {
        console.log(error);
        return [];
    }

}

export function createPlaylist(playlist: Playlist): boolean {

    try {

        let data = `${playlist.name}`;
        let songs = playlist.songs?.reduce((prev, actual) => `${prev} ${actual}`);

        data += playlist.description ? `\r\n${playlist.description}` : "\r\nnot-set";
        data += playlist.songs ? `\r\n${songs}` : "\r\nnot-set";

        fs.writeFileSync(path.join(playlistFolder, `${Date.now()}.playlist`), data);

        return true;

    } catch (error) {

        console.log(error);
        return false;

    }

}

export function editPlaylist(id: string, updated: Playlist): boolean {

    try {

        let data = `${updated.name}\r\n`;
        let songs = updated.songs?.reduce((prev, actual) => `${prev} ${actual}`);

        data += updated.description ? `${updated.description}\r\n` : "not-set\r\n";
        data += updated.songs ? `${songs}\r\n` : "not-set\r\n";

        fs.writeFileSync(path.join(playlistFolder, `${id}.playlist`), data);

        return true;

    } catch (error) {
        console.log(error);
        return false;
    }

}

export function deletePlaylist(id: string): boolean {

    try {

        fs.rmSync(path.join(playlistFolder, `${id}.playlist`));

        return true;

    } catch (error) {
        console.log(error);
        return false;
    }

}