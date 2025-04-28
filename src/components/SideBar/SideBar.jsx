import "./SideBar.css";
import Avatar from "../../assets/avatar.svg";
import { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function SideBar() {
  const userContext = useContext(CurrentUserContext);

  if (!userContext || !userContext.currentUser) {
    return null; // or return a loading state
  }

  return (
    <div className="sidebar">
      <div className="sidebar__profile-container">
        <img
          src={userContext.currentUser.avatar}
          alt={userContext.currentUser.name}
          className="sidebar__avatar"
        />
        <p className="sidebar__username">{userContext.currentUser.name}</p>
      </div>
      <button className="sidebar__logout" onClick={userContext.handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default SideBar;
