// import React from "react"
import {Fragment} from "react"; /*Destructuring*/
import {useContext} from "react";
import {ContactContext} from "../../context/contactContext";

import {PINK, CURRENTLINE, ORANGE} from "../../helpers/color";
import Contact from "./Contact";
import Spinner from "../Spinner";
import {Link, Outlet} from "react-router-dom";
// import NotFound from  "../../assets/no-found.gif"

const Contacts = () => {
    const { filteredContacts, loading, deleteContact} = useContext(ContactContext);
    return(
        <>
            <section className="container">
                <div className="grid">
                    <div className="row">
                        <div className="col">
                            <p className="h3 float-end">
                                <Link to="/contacts/add" className="btn mx-2" style={{backgroundColor: PINK}}>
                                    ساخت مخاطب جدید
                                    <i className="fa fa-plus-circle m-2"/>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {loading? <Spinner/> : (
                <section className="container">
                    <div className="row">
                        {
                            filteredContacts.length>0? filteredContacts.map(c => (//edit in 3:03 in 1401/11/12 -----Contacts-----
                                    <Contact key={c.id} deleteContact={() => deleteContact(c.id, c.fullname)} contact={c}/>
                                )):
                                (
                                    <div className="text-center py-5" style={{backgroundColor: CURRENTLINE}}>
                                        <p className="h3" style={{color: ORANGE}}>
                                            مخاطب یافت نشد ...
                                        </p>
                                        <img src={require("../../assets/no-found.gif")} alt="پیدا نشد" className="w-25"/>
                                    </div>
                                )
                        }

                    </div>
                </section>
            )}

        </>
    )
}

export default Contacts;