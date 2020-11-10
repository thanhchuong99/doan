import React from 'react';
import { Link } from 'react-router-dom';

NotFound.proTypes = {};

function NotFound(props) {
    return (
        <div><div style={{fontSize : "100px"}}>
        404 Not Found........
       
     </div>
      <Link to="/">
      <input type="button" value="Go back HomePage!" />
  </Link></div>
        
    );
}

export default NotFound;