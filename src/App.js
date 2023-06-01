import './App.css';
import {/*useState,*/ useEffect} from "react";
import {Routes, Route, Navigate, useNavigate} from "react-router-dom";
import _ from 'lodash';
//Underline or Underscore
import {useImmer} from "use-immer";
// import axios from "axios";
import {AddContact,Contact,Contacts, ViewContact, EditContact,Navbar,} from "./components";
import {createContact, getAllContacts, getAllGroups, deleteContact} from "./services/contactService";
import {confirmAlert} from "react-confirm-alert";
import {CURRENTLINE, PURPLE, YELLOW, FOREGROUND, COMMENT} from "./helpers/color";
// import {contactSchema} from "./validations/contactValidation";
import contact from "./components/Contacts/Contact";
import {ContactContext} from "./context/contactContext";

import {ToastContainer, toast} from "react-toastify";
// import toast, {Toaster} from "react-hot-toast";
const App = () => {
    const [loading, setLoading] = useImmer(true);//Edited in 18:11 1401/11/21
    const [contacts,setContacts] = useImmer([]);//Edit 16:33 1401/12/1
    const [filteredContacts, setFilteredContacts] = useImmer([]);
    const [groups, setGroups] = useImmer([]);
    // const [contact, setContact] = useState({});
    // const [errors, setErrors] = useState([]);
    // const [contactQuery, setContactQuery] = useState({text: ""});

    const navigte = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try{
                setLoading(true);
                // object destructuring ===> Rename data
                const {data: contactsData} = await getAllContacts();
                // console.log("salam")
                const {data: groupsData} = await getAllGroups();
                setContacts(contactsData);
                setFilteredContacts(contactsData);
                setGroups(groupsData);

                setLoading(false);
            }catch (err){
                console.log(err.message)
                setLoading(false);//اگر خطایی به وجود آمد نمیخوام اسپینر در حال چرخش باشه
            }
        };

        fetchData();
    }, []);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try{
    //             setLoading(true);
    //             // object destructuring ===> Rename data
    //             const {data: contactsData} = await getAllContacts();
    //             setContacts(contactsData);
    //
    //             setLoading(false);
    //         }catch (err){
    //             console.log(err.message)
    //             setLoading(false);//اگر خطایی به وجود آمد نمیخوام اسپینر در حال چرخش باشه
    //         }
    //     };
    //
    //     fetchData();
    //     // console.log("mahmood----")
    // }, [forceRender]);

    const createContactForm = async (values) => {
        // event.preventDefault();
        try{
            setLoading((draft) => !draft);

            // await contactSchema.validate(contact, {abortEarly: false});

            const {status, data} = await createContact(values)

            /*
            * 1- Render-> forceRender, setForceRender
            * 2- setContact(data)
            * */
            if(status === 201){
                toast.success("مخاطب با موفقیت ساخته شد", {icon: "😉"});
                // const allContacts = [...contacts, data];
                //
                // setContacts(allContacts);
                // setFilteredContacts(allContacts);

                setContacts(draft => {
                    draft.push(data)
                });
                setFilteredContacts(draft => {
                    draft.push(data)
                });

                // setContact({});
                // setErrors([]);
                setLoading((prevLoading) => !prevLoading);
                // setLoading(!loading);
                navigte("/contacts");
            }
        }catch (err){
            console.log(err.message);
            // setErrors(err.inner);
            setLoading((prevLoading) => !prevLoading);
        }
    }
    // const onContactChange = (event) => {
    //     setContact({...contact, [event.target.name]: event.target.value})//مشخص میکنه مخاطب با کدوم اینپوت داره کار میکنه
    // }

    const confirmDelete = (contactId, contactFullName) => {
        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <div dir="rtl" style={{backgroundColor: CURRENTLINE, border: `1px solid ${PURPLE}`, borderRadius: "1em"}} className="p-4">
                        <h1 style={{color: YELLOW}}>پاک کردن مخاطب</h1>
                        <p style={{color: FOREGROUND}}>مطمئنی که میخوای مخاطب {contactFullName} رو پاک کنی؟</p>
                        <button onClick={() => {
                            removeContact(contactId);
                            onClose();
                        }} className="btn mx-2" style={{backgroundColor: PURPLE}}>
                            مطمئن هستم
                        </button>
                        <button onClick={onClose} className="btn" style={{backgroundColor: COMMENT}}>انصراف</button>
                    </div>
                )
            }
        })
    }
    const removeContact = async (contactId) => {
        /*
        * 1- forceRender => setForceRender
        * 2- server request
        * 3- delete local state
        * 4- Delete state before server request
        * */
        //contacts copy
        const contactsBackup = [...contacts];
        try{
            // setLoading(true);

            // const updatedContacts = contacts.filter(c => c.id !== contactId);
            // setContacts(updatedContacts);
            // setFilteredContacts(updatedContacts);

            setContacts(draft => draft.filter(c => c.id !== contactId));
            setFilteredContacts(draft => draft.filter(c => c.id !== contactId));


            //sending delete request to server
            const {status} = await deleteContact(contactId);
            toast.error("مخاطب با موفقیت حذف شد", {icon: "💣"});
            if(status !== 200){

                // const {data: contactsData} = await getAllContacts();
                setContacts(contactsBackup);
                setFilteredContacts(contactsBackup);

                // setLoading(false);
            }
        }catch (err){
            console.log(err.message);
            setContacts(contactsBackup);
            setFilteredContacts(contactsBackup);
            // setLoading(false);
        }
    }

    // let filterTimeOut;
    const contactSearch = _.debounce(/*event*/ query => {
        // setForceRender(!forceRender);
        // clearTimeout(filterTimeOut);
        if(!query) return setFilteredContacts([...contacts])

        // setContactQuery({...contactQuery, text: event.target.value});
        // console.log(query);
        // filterTimeOut = setTimeout(() => {
        //     setFilteredContacts(contacts.filter((contact) => {
        //         return contact.fullname.toLowerCase().includes(query.toLowerCase());
        //     }));

            setFilteredContacts(draft => draft.filter(c => c.fullname.toLowerCase().includes(query.toLowerCase())));
        // }, 1000)

        // setFilteredContacts(allContacts);
    }, 1000);
  return (
      <ContactContext.Provider value={{
          loading,
          setLoading,
          // contact,
          setContacts,//edited setContact
          setFilteredContacts,
          // contactQuery,
          contacts,
          filteredContacts,
          groups,
          // errors,
          // onContactChange,
          deleteContact: confirmDelete,
          createContact: createContactForm,
          contactSearch
      }}>
          <div className="App">
              <ToastContainer rtl={"true"} position={"top-right"} theme={"colored"}/>
              {/*<Toaster/>*/}
              <Navbar />
              <Routes>
                  <Route path="/" element={<Navigate to="/contacts"/>}/>
                  <Route path="/contacts" element={<Contacts />}/>
                  <Route path="/contacts/add" element={<AddContact />}/>
                  <Route path="/contacts/:contactId" element={<ViewContact/>}/>
                  <Route path="/contacts/edit/:contactId" element={<EditContact/>}/>
              </Routes>
              {/*<Contacts contacts={getContact} loading={loading}/>*/}
          </div>
      </ContactContext.Provider>

  );
}

export default App;
