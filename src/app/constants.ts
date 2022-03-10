export enum FEED_TYPE {
    REGULAR = 'REGULAR',
    LIKED = 'LIKED',
}

export enum DIALOG_TYPE {
    ERROR,
    IMAGE,
    VIDEO
}

export const APOD_URL: string = 'https://api.nasa.gov/planetary/apod';
export const APOD_KEY: string = 'fqHuCTIVc03J3sidHAr5QsxiB8P9FAS9ffY5v7y9';

export const REGULAR_EMPTY: string = "There doesn't seem to be any posts at the moment. Please check back later!";
export const LIKED_EMPTY: string = "You haven't liked any posts yet. Posts you've liked will appear here!";
export const INIT_INTERVAL: number = 7;
export const SCROLL_INTERVAL: number = 3; 

export const APP_NAME: string = "NASA Views";
export const REG_FEED: string = "For You";
export const LIKE_FEED: string = "Liked Posts";

export const SCROLL_TOP_MSG: string = "Scroll to top of feed";
export const REFRESH_MSG: string = "Refresh feed contents";

export const MAGNIFY_MSG: string = "View this post";
export const EXPLANATION_MSG: string = "View explanation for this post";
export const SHARE_MSG: string = "Open this post in a new tab";