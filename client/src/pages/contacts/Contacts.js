import classes from "./Contacts.module.css";
import NavBar from "../../components/navbar/Navbar";
const Contacts = () => {
  return (
    <>
      <NavBar />
      <div className={classes.contactsContainer}>
        <h1>This is contacts page</h1>
      </div>
    </>
  );
};

export default Contacts;
