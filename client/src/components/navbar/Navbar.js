import classes from "./Navbar.module.css";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useDispatch } from "react-redux";
import { removeTokenFromDB } from "../../store/auth-actions";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
const imageAdd =
  "https://images.pexels.com/photos/4668527/pexels-photo-4668527.jpeg?auto=compress&cs=tinysrgb&w=600";
const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(removeTokenFromDB());
    navigate("/");
  };

  const deleteAccountHandler = () => {
    console.log("delete account");
  };
  return (
    <div className={classes.navbar}>
      <div className={classes.wrapper}>
        <div className={classes.title}>
          <h2 title="DotChat">DotChat</h2>
          <div className={classes.cerator}>
            <a
              title="Developer's Profile"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/devesh-kumar-089134219/"
              target="_blank"
            >
              By <u>Devesh</u>
            </a>
          </div>
        </div>
        <div className={classes.items}>
          <div className={classes.item}>
            <Link to="/contacts" className={classes.navlink} title="Contacts">
              <PermContactCalendarOutlinedIcon className={classes.icon} />
            </Link>
            <div className={classes.counter}>3</div>
          </div>
          <div className={classes.item}>
            <Link to="/" className={classes.navlink} title="Chat">
              <ChatBubbleOutlineOutlinedIcon className={classes.icon} />
            </Link>
            <div className={classes.counter}>5</div>
          </div>

          <div className={classes.item}>
            <Link
              to="/add-contact"
              className={classes.navlink}
              title="Add Contact"
            >
              <PersonAddAltOutlinedIcon className={classes.icon} />
            </Link>
          </div>

          <div className={classes.item}>
            <div className={classes.dropdown}>
              <button className={classes.dropbtn}>
                <img
                  alt="avatar"
                  src={imageAdd}
                  className={classes.avatar}
                  title="Options"
                />
              </button>
              <div id="myDropdown" className={classes.dropdownContent}>
                <Link
                  className={classes.dropItem}
                  key={"2"}
                  to="/profile"
                  title="My Profile"
                >
                  My Profile
                  <PersonOutlineOutlinedIcon className={classes.dropdnIcon} />
                </Link>
                <Link
                  className={classes.dropItem}
                  key={"3"}
                  to="/edit-profile"
                  title="Edit Profile"
                >
                  Edit Profile
                  <EditOutlinedIcon className={classes.dropdnIcon} />
                </Link>
                <button
                  className={classes.dropItem}
                  key={"1"}
                  onClick={logoutHandler}
                  title="Logout"
                >
                  Logout <LogoutOutlinedIcon className={classes.dropdnIcon} />
                </button>

                <button
                  className={classes.dropItem}
                  key={"9"}
                  onClick={deleteAccountHandler}
                  title="Delete Account"
                >
                  Delete Account{" "}
                  <DeleteOutlineOutlinedIcon className={classes.dropdnIcon} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
