import { NavLink } from "react-router-dom";

 function Home() {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
 
  <div className="navbar-brand">
  
      <a className="navbar-item">
        Home
      </a>

      <a className="navbar-item">
        Profile
      </a>
  
  </div>
  <div className="navbar-menu is-active"> 
 
  <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
          <a className="button is-primary">
            <strong>Sign up</strong>
          </a>
          <NavLink className="button is-light"  to='/login'>Log In</NavLink>
         
        </div>
      </div>
    </div>
    </div>
</nav>
  );
}

export default Home;
