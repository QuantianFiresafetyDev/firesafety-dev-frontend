import {React, useState} from 'react';
import {useDispatch,useSelector} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import Cap1 from '../../assets/images/Cap1.PNG';
import firelogo from '../../assets/images/firelogo.PNG';
import '../Css/Sys.css';
import '../Css/Input.css';
import { ADMIN_LOGIN_API } from 'components/api';
import { errorToaster, successToaster } from 'common/common';
import { setLoginData } from '../../actions/userAction';

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [setisLoggedin] = useState(false);
  const token = useSelector(state => state.user.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      emp_id : name,
      password : password,
    }

    try {
      await fetch(ADMIN_LOGIN_API,{
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }).then(res => res.json()).then(result => {
        console.log("DEBUG",result)
        if(result.success){
            successToaster(result.message)
            dispatch(setLoginData(result.body))
            setisLoggedin(true);
            console.log(result.body.token)
        } 
        if(result.error){
          errorToaster(result.message)
        }
      }) 
      
    } catch (error) {
      console.log("DEBUG",error)
    }

       
  };

  if(token!=='') return <Redirect to="/viewAudits"/>

  return (
    <div className="rock">
      <div className="container">
        <div className="row">
          <div
            className="col-sm-6 form-group"
            style={{ marginTop: '1.5rem', paddingRight: '10.2rem' }}>
            <div className="Fire">
              <img src={firelogo} alt="firelogo" />
            </div>
            <h1 className="fire_logo">JEEVAN RAKSHA</h1>
            <div className="continer">
              <form className="form">
                <p className="login_txt"> Login </p>
                <div className="txt_field">
                  <input
                    type="name"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                  <span></span>
                  <label>Employee ID</label>
                </div>
                <div className="txt_field">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <span></span>
                  <label>Password</label>
                </div>
                <Link to="/ForgotPassword" className="forgot_pass">
                  Forgot Password?
                </Link>
                <div className="button_login">
                  <button className="btn btn-danger mt-4" type="submit" onClick={e => handleSubmit(e)}>
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div
            className="col-sm-6 form-group"
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}>
            <img src={Cap1} alt="try again" className="image_size_login" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;