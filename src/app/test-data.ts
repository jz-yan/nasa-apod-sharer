import { DialogData, NASAImage } from "src/app/interfaces";
import { DIALOG_TYPE } from "./constants";

export const TEST_IMG: NASAImage = {
   liked: false,
   copyright: "",
   date: new Date(),
   explanation: "",
   hdurl: "",
   media_type: "image",
   service_version: "",
   title: "",
   url: "",
};

export const TEST_IMG_LIKED: NASAImage = {
   liked: true,
   copyright: "",
   date: new Date(),
   explanation: "",
   hdurl: "",
   media_type: "image",
   service_version: "",
   title: "",
   url: "",
};

export const TEST_VIDEO: NASAImage = {
   liked: false,
   copyright: "",
   date: new Date(),
   explanation: "",
   hdurl: "",
   media_type: "video",
   service_version: "",
   title: "",
   url: "",
};

export const EMPTY_FEED: NASAImage[] = [];

export const SINGLE_FEED: NASAImage[] = [
   TEST_IMG
];

export const DIALOG_IMAGE: DialogData = {
   type: DIALOG_TYPE.IMAGE,
   data: {
      explanation: "",
      title: "",
      url: ""
   }
}

export const DIALOG_VIDEO: DialogData = {
   type: DIALOG_TYPE.VIDEO,
   data: {
      explanation: "",
      title: "",
      url: ""
   }
}

export const DIALOG_ERROR: DialogData = {
   type: DIALOG_TYPE.ERROR,
   data: {
      explanation: "",
      title: "",
      url: ""
   }
}

