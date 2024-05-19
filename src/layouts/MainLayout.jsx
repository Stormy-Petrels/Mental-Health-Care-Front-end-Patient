import React from "react";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import About from "../pages/About";
import Doctors from "../pages/Doctors";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
// import Search from "../users/Search";
// import User from "../users/User";
import DoctorDetail from "./../pages/DoctorDetail";
const MainLayout = () => {
  return (
    <div className="container">
      <Switch>
        {/* <Route exact path="/" component={Search} /> */}
        <Route exact path="/" component={Home} />
        <Route exact path="/doctors" component={Doctors}>
          <Route exact path="/doctor:doctorId" component={DoctorDetail} />
        </Route>
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route path="/*" component={NotFound}></Route>
      </Switch>
    </div>
  );
};
export default MainLayout;
