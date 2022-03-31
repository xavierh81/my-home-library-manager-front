/* eslint-disable @typescript-eslint/no-useless-constructor */

import moment from "moment";

// Define media search result class
export class MediaSearchResult {
    title: string;
    originalTitle?: string;
    imageUrl?: string;
    releaseDate?: moment.Moment;
    duration?: number;
    summary?: string;
    rating?: number;

    searchSource: string;
    searchSourceMediaId: string;

    constructor(apiResult: any) {
        this.title = apiResult.title
        this.originalTitle = apiResult.originalTitle
        this.imageUrl = apiResult.imageUrl
        this.releaseDate = moment(apiResult.releaseDate, "YYYY-MM-DD")
        this.duration = apiResult.duration
        this.summary = apiResult.summary
        this.rating = apiResult.rating
        this.searchSource = apiResult.searchSource
        this.searchSourceMediaId = apiResult.searchSourceMediaId
    }
}