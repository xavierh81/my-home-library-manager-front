// Imports
import { t } from "@lingui/macro";
import {useHistory} from 'react-router-dom';

// Components
import { RoundedButton } from "components/RoundedButton";

//
// Core
//

function PageNotFound() {

    // Load needed hooks
    const history = useHistory();

    // Function to redirect user to homePage
    const GoBackToHome = () => {
        history.push('/')
    }

    //
    // Rendering
    //
    return (
        <div className="notConnectedContainer">
            <div className="bg"></div>
            <div className="formContainer">
                <div className="formContent">
                    <span className="formTitle">{t`page_not_found_title`}</span>
                    <span className="formDesc">{t`page_not_found_desc`}</span>
                    <RoundedButton className={`submitButton`} text={t`page_not_found_main_cta`} onClick={GoBackToHome} />
                </div>
            </div>
        </div>
    )
 }

export default PageNotFound;
