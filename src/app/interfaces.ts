export interface NASAImage {
    liked: boolean,
    copyright: string,
    date: Date,
    explanation: string,
    hdurl: string, 
    media_type: string,
    service_version: string, 
    title: string,
    url: string,
}

export interface DialogMedia {
    title: string,
    url: string, 
    explanation: string,
    media_type: string,
}

export interface DialogImage {
    title: string,
    hdurl: string,
}

export interface DialogVideo {
    title: string,
    url: string,
    explanation: string,
}

export interface FeedImage {
    index: number,
    liked: boolean,
    img: NASAImage,
}