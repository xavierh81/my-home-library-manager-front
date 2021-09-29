/* eslint-disable @typescript-eslint/no-useless-constructor */

import moment from "moment";

// Define media search result class
export class MediaSearchResult {
    id: number;
    title: string;
    originalTitle: string;
    imageUrl?: string | null;
    releaseDate: moment.Moment;
    duration?: number | null;
    summary?: string | null;

    constructor(apiResult: any) {
        this.id = apiResult.id
        this.title = apiResult.title
        this.originalTitle = apiResult.originalTitle
        this.imageUrl = apiResult.imageUrl
        this.releaseDate = moment(apiResult.releaseDate, "YYYY-MM-DD")
        this.duration = apiResult.duration
        this.summary = apiResult.summary
    }
}