import {React, useState} from 'react';
import {useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import Cap1 from '../../assets/images/Cap1.PNG';
import firelogo from '../../assets/images/firelogo.PNG';
import '../Css/Sys.css'
import '../Css/Input.css'

  function ForgotPassword() {
    const [employeeid, setEmployeeId] = useState("");
    const data=useSelector(state=>state);
    
    const history = useHistory();
  
    console.log("forgot password",data)
  
    // const dispatch = useDispatch();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      history.push("/ChangePassword")
   
  
      // dispatch(forgotPassword({
      //   employeeid: employeeid,
   
      // })
      // );
      
    };
  return (
    <div className = "rock">
         <div className="container">
        <div className="row">
          <div className="col-sm-6 form-group" style ={{marginTop: "3.2rem", paddingRight: "10.2rem"}}>
          <div className ="Fire"><img src={firelogo} alt="try again"/></div>        
          <h1 className= "fire_logo">JEEVAN RAKSHA</h1>       
            <div className="continer">
              <form className="form" id="form"  onSubmit ={(e) => handleSubmit(e)}>
              <h5 className="forgot_pass_txt"><Link to = "/" className= "back_button"><p className="fa fa-angle-left"> </p></Link> Forgot Password </h5>
               <div className="txt_field">
                <input type="text" required value = {employeeid} onChange={(e) => setEmployeeId(e.target.value)} name="employeeid" id="employeeid" />
                  <span></span>
                  <label>Employee ID</label>
                </div>
                <div className = "send_email">
                <button className="btn" type="submit">Send Email</button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-sm-6 form-group" style={{width: '100%', height: 'auto', objectFit: 'contain'}}>
            <img src={Cap1}  alt="try again" className= "image_forgot_pass" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;