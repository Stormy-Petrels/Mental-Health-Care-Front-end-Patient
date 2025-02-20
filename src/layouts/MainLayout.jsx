import React from "react";
// import { Route, Switch } from "react-router-dom";
import About from "../pages/About";
import Doctors from "../pages/Doctors";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
// import Search from "../users/Search";
// import User from "../users/User";
import DoctorDetail from "./../pages/DoctorDetail";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Payment from "../pages/Payment";
import Profile from "../pages/Profile";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from "./Navbar";

const MainLayout = () => {
  return (
    <Router >
        <Navbar />
    <div className="container">
      <Switch>
        {/* <Route exact path="/" component={Search} /> */}
        <Route exact path="/" component={Home} />
        <Route exact path="/profile/:id" component={Profile} />
        <Route exact path="/doctors" component={Doctors}/>
        <Route exact path="/doctor/:doctorId" component={DoctorDetail} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/patient/:id/payment" component={Payment}/>
        <Route path="/*" component={NotFound}></Route>
      </Switch>
    </div>
    </Router>
  );
};
export default MainLayout;
