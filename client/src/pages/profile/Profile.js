import classes from "./Profile.module.css";
import Navbar from "../../components/navbar/Navbar";

const Profile = () => {
  return (
    <>
      <Navbar />
      <div className={classes.profileContainer}></div>
    </>
  );
};

export default Profile;
