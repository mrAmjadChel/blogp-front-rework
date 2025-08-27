import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { Outlet, Navigate } from "react-router-dom";

const AdminRoute = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;



// import { Route, Redirect } from "react-router-dom";
// import { getUser } from "../service/authorize";

// const AdminRoute = ({ component: Component, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         getUser() ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
//         )
//       }
//     />
//   );
// };

// export default AdminRoute;
