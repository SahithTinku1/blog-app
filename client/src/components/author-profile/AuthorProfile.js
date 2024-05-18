import "./AuthorProfile.css";
import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

function AuthorProfile() {
  const { currentUser } = useSelector(state => state.userAuthoruserAuthorLoginReducer);

  return (
    <div className="author-profile p-3">
      <nav className="nav-container">
        <ul className="nav justify-content-around fs-3">
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to={`articles-by-author/${currentUser.username}`}
            >
              Articles
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="new-article"
            >
              Add New
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="outlet-container">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthorProfile;
