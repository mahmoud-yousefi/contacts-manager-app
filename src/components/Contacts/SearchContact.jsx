import {useContext} from "react";

import {PURPLE/*, COMMENT*/} from "../../helpers/color";
import {ContactContext} from "../../context/contactContext";

const SearchContact = () => {
    const {/*contactQuery,*/ contactSearch} = useContext(ContactContext);

    return(
        <div className="input-group mx-2 w-75" dir="ltr">
                            <span className="input-group-text" id="basic-addon1" style={{backgroundColor: PURPLE}}>
                                <i className="fas fa-search"/>
                            </span>
            <input dir="rtl" /*value={contactQuery.text}*/ onChange={event => contactSearch(event.target.value)} type="text" /*style={{backgroundColor: COMMENT, borderColor: PURPLE}}*/ className="form-control" placeholder="جستجوی مخاطب" aria-label="search" aria-describedby="basic-addon1"/>
        </div>
    )
}

export default SearchContact;