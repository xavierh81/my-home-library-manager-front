// Imports
import React, { Component } from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faPlusCircle, faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import { Rate, Tooltip } from 'antd';
import { t } from "@lingui/macro"

// Types
import { MediaSearchResult } from 'ts/interfaces/MediaSearchResult';

// Define props type
type MediaSearchResultElementProps = {
    media: MediaSearchResult
    onAdd: Function,
    alreadyInLibrary: Boolean
}

// Define component
export class MediaSearchResultElement extends Component<MediaSearchResultElementProps, {}> {
    static defaultProps = {
        media: null,
    }

    // render will know everything!
    render() {
        const {media,alreadyInLibrary, onAdd} = this.props;

        return (
            <div className={`mediaSearchResult`}>
                {!alreadyInLibrary && 
                    <Tooltip title={t`search_media_result_add_tooltip`} placement="left">
                        <button className="addButton" onClick={() => onAdd()}>
                            <FontAwesomeIcon icon={faPlusCircle} />
                        </button>
                    </Tooltip>
                }
                {alreadyInLibrary && 
                    <Tooltip title={t`search_media_result_already_added_tooltip`} placement="left">
                        <button className="alreadyAdded">
                            <FontAwesomeIcon icon={faCheckCircle} />
                        </button>
                    </Tooltip>
                }
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
                    <span className="releaseDate"><FontAwesomeIcon icon={faCalendarAlt} />{media.releaseDate?.format("D MMMM YYYY")}</span>
                    <span className="summary">{media.summary}</span>

                    {media.rating != null && 
                        <div className="rating">
                            <Rate value={media.rating} allowHalf disabled />
                            <span className="ratingLabel">{media.rating}</span>
                        </div>
                    }
                </div>
            </div>
        )
    }
}