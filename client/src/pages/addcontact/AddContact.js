import classes from "./AddContact.module.css";
import NavBar from "../../components/navbar/Navbar";
const AddContact = () => {
  return (
    <>
      <NavBar />
      <div className={classes.addContactContainer}>
        <h1>This is add contact page</h1>
      </div>
    </>
  );
};

export default AddContact;
