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

export function editNewMedia(img: NASAImage): NASAImage {
    return {
        liked: false,
        copyright: img.copyright ? img.copyright : 'NASA Public Domain',
        date: img.date,
        explanation: img.explanation,
        hdurl: img.hdurl,
        media_type: img.media_type,
        service_version: img.service_version,
        title: img.title,
        url: img.url
    }
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