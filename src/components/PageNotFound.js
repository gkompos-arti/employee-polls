import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
      <div className="not-found">
        <h1>404 - Page not found</h1>
        <p>The page you requested could not be found.</p>
        <Link to="/">
                Back To Home Page
        </Link>
      </div>
    );
  };
  
export default PageNotFound;