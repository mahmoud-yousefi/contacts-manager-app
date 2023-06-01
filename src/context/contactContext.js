import {createContext} from "react";

export const ContactContext = createContext({
    loading: false,
    setLoading: () => {},
    // contact: {},
    setContacts: () => {}, //AddContact, ViewContact, EditContact
    setFilteredContacts: () => {},
    contacts: [],
    // errors: [],
    filteredContacts: [],
    // contactQuery: {},
    groups: [],
    // onContactChange: () => {},
    deleteContact: () => {},
    // updateContact: () => {},
    createContact: () => {},
    contactSearch: () => {}
});