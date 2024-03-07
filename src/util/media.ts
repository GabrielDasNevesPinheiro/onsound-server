import * as mm from 'music-metadata';
import path from 'path';


export async function getMusicMetadata(filePath: string) {

    const metadata = await mm.parseFile(filePath);

    return metadata.common;

}

export const mediaFolder = path.join("src", "storage", "music");
export const playlistFolder = path.join("src", "storage", "playlist");