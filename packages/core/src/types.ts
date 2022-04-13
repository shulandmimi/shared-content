export interface Platform {
    os: string;
    end: string;
}

export enum DataType {
    Text,
    Image,
    File,
}

export interface Data {
    type: DataType;
}

export interface TextData extends Data {
    type: DataType.Text;
    content: string;
}

export interface ImageData extends Data {
    type: DataType.Image;
    url: string;
}

export interface FileData extends Data {
    type: DataType.File;
    url: string;
}

export type DataContent = TextData | ImageData | FileData;

export interface DataItem {
    platform: Platform;
    content: DataContent;
}
