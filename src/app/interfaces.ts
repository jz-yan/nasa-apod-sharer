import { DIALOG_TYPE } from "./constants"

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

export interface DialogData {
    type: DIALOG_TYPE,
    data: {
        explanation: string,
        title: string,
        url: string
    }
}