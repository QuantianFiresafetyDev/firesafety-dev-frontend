import {React, useState}  from 'react';
import {useSelector} from "react-redux";
import {Link,  useHistory} from "react-router-dom";
import '../Css/Sys.css';
import '../Css/Input.css';
import Cap1 from '../../assets/images/Cap1.PNG';
import firelogo from '../../assets/images/firelogo.PNG';

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const data=useSelector(state=>state);
  
  const history = useHistory();

  console.log("change password",data)

  // const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push("/")
 

    // dispatch(changePassword({
    //   password: password,
    //   confirmpassword: confirmpassword
 
    // })
    // );
    
  };
  return (
    <div className = "rock">
        <div className="container">
        <div className="row">
        <div className="col-sm-6 form-group" style ={{marginTop: "2.2rem", paddingRight: "10.2rem"}}>  
        <div className ="Fire"><img src={firelogo} alt="try again" /></div> 
        <h1  className= "fire_logo">JEEVAN RAKSHA</h1> 
        <div className="continer">
           
          <form className="form" id="form" onSubmit ={(e) => handleSubmit(e)}>
           <h5 className="set_pass_txt"><Link to = "/ForgotPassword" className= "back_button"><p className="fa fa-angle-left" > </p></Link> Set Password </h5>
           <div className="txt_field">
            <input type="password" required  value = {password} onChange={(e) => setPassword(e.target.value)} name="newpassword" id="newpassword"/>
                <span></span>
                <label>Password</label>
                </div>
                <div className="txt_field">
               <input type="password" required  value = {confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} name="confirmpassword" id="confirmpassword"/>
                <span></span>
                <label>Confirm Password</label>
                </div>
                <div className ="set_pass_button">
                <button className="btn" type="submit">Set Password</button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-sm-6 form-group" style={{width: '100%', height: 'auto', objectFit: 'contain'}}>
            <img src={Cap1}  alt="try again" className= "image_size_changepass"/>
          </div>
        </div>
      </div>   
    </div>

  );
}

export default ChangePassword;