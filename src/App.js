// import './App.css';
import React, { useEffect, useState } from "react";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ChangePassword from "./components/Auth/ChangePassword";
import Login from "./components/Auth/Login";
import Navbar from "./components/Layouts/Navbar";
import { Route, Switch } from "react-router-dom";
import AddUsers from './components/Users/AddUsers';
import ViewUsers from './components/Users/ViewUsers';
// import AuditHistory from './components/AuditHistory/AuditHistory';
import UserTimeline from './components/UserTimeline/UserTimeline';
import AuditTemplate from './components/AuditTemplate/AuditTemplate';
import TemplateState from './components/TemplateState/TemplateState';
import ViewAudits from "./components/Audits/ViewAudits";
import AddAudits from "./components/Audits/AddAudits"
import AddAuditCategories from "./components/AuditCategories/AddAuditCategories";
import ViewAuditCategories from "./components/AuditCategories/ViewAuditCategories";
import AuditCategoryDetail from "./components/AuditCategories/AuditCategoryDetail"
import AuditDetails from "./components/Audits/AuditDetails";
import AuditResults from "./components/Audits/AuditResults"
import UserDetails from "./components/Users/UserDetails";
import Questions from "./components/Question/Questions";
import AuditLocation from "./components/Audits/AuditLocation";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from "components/ProtectRoutes";
import AddHelpArticles from "components/HelpArticles/AddHelpArticles";
import ViewHelpArticles from "components/HelpArticles/ViewHelpArticles";
import { useSelector } from "react-redux";
import AuditCategoryLocation from "./components/AuditCategories/AuditCategoryLocation"
import AuditCategorySystem from './components/AuditCategories/AuditCategorySystem'

function App() {
  const token = useSelector(state => state.user.token)
  const [isLoggedin, setisLoggedin] = useState(false);
  console.log(isLoggedin)

  useEffect(() => {
    // console.log("DEBUG",token,token !== '')
    if(token !==''){
      setisLoggedin(true);
    } else {
      setisLoggedin(false);
    }
  }, [token])

  // console.log("DEBUG",isLoggedin,token==='')
  
  return (
    <>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path='/forgotPassword' component={ForgotPassword} />
        <Route exact path='/changePassword' component={ChangePassword} />
        <>
          <Navbar />
          <ProtectedRoute path='/viewAudits' component={ViewAudits} isLoggedin/>
          <ProtectedRoute path='/addAudits' component={AddAudits} isLoggedin/>
          <ProtectedRoute path='/addArticles' component={AddHelpArticles} isLoggedin/>
          <ProtectedRoute path='/viewArticles' component={ViewHelpArticles} isLoggedin/>
          <ProtectedRoute exact path='/addUsers' component={AddUsers} isLoggedin/>
          <ProtectedRoute path='/viewUsers' component={ViewUsers} isLoggedin/>
          <ProtectedRoute path='/addAuditCategories' component={AddAuditCategories} isLoggedin/>
          <ProtectedRoute path='/viewAuditCategories' component={ViewAuditCategories} isLoggedin/>
          <ProtectedRoute path='/AuditCategoryLocation/:id' component={AuditCategoryLocation} isLoggedin/>
          <ProtectedRoute path='/AuditCategorySystem/:id' component={AuditCategorySystem} isLoggedin/>
          {/* <ProtectedRoute path = '/AuditHistory' component ={AuditHistory}/> */}
          <ProtectedRoute path='/auditDetails/:id' component={AuditDetails} isLoggedin/>
          <ProtectedRoute path='/auditResults' component={AuditResults} isLoggedin/>
          {/* <ProtectedRoute path = '/UserTabs/' component ={UserTabs}/> */}
          <ProtectedRoute path='/userDetails/:id' component={UserDetails} isLoggedin/>
          <ProtectedRoute path='/userTimeline' component={UserTimeline} isLoggedin/>

          <ProtectedRoute path='/questions' component={Questions} isLoggedin/>
          {/* <ProtectedRoute path='/auditTemplate/:id' component={AuditTemplate} isLoggedin/> */}
          <ProtectedRoute path='/auditCategoryDetail/:id' component={AuditCategoryDetail} isLoggedin/>
          <ProtectedRoute path='/auditLocation' component={AuditLocation} isLoggedin/>
          <ProtectedRoute path='/templateState' component={TemplateState} isLoggedin/>
        </>
      </Switch>
      <ToastContainer />
    </>
  );
}

export default App;
