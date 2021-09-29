// Imports
import React, { Component } from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

import { MediaSearchResult } from 'ts/interfaces/MediaSearchResult';

// Define props type
type MediaSearchResultElementProps = {
    media: MediaSearchResult
    onClick: Function
}

// Define component
export class MediaSearchResultElement extends Component<MediaSearchResultElementProps, {}> {
    static defaultProps = {
        media: null,
    }

    // render will know everything!
    render() {
        const {media, onClick} = this.props;

        return (
            <div key={`media_result_result_${media.id}`} className={`mediaSearchResult`} onClick={() => onClick()}>
                {media.imageUrl != null && 
                    <div className="left">
                        <img src={media.imageUrl} alt={media.title} />
                    </div>
                }
                <div className="right">
                    <span className="title">{media.title}</span>
                    {media.title !== media.originalTitle &&
                        <span className="originalTitle">{media.originalTitle}</span>
                    }
                    <span className="releaseDate"><FontAwesomeIcon icon={faCalendarAlt} />{media.releaseDate.format("D MMMM YYYY")}</span>
                    <span className="summary">{media.summary}</span>
                </div>
            </div>
        )
    }
}