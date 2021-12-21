import { React, useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import '../Css/Sys.css';
import SecondaryNav from '../Layouts/SecondaryNav';
import { Link } from "react-router-dom";
import styled from 'styled-components';
// import { API_URL_BASE } from '../../utils/constant';
import { errorToaster, successToaster } from '../../common/common';
import {addUsers } from '../../actions/userAction';
import { ADD_USER_API } from 'components/api';
import { API_URL_BASE } from '../../utils/constant';


export const NavbarWrapper = styled.div`
  font-size: 16px;
  border-bottom: 1px solid red;
  font-weight: bold;

`

export const Logo = styled.div`
 margin-left: 18px;


`

export const CustomButtom = styled.button`
  background: white;
  border : none;
  color : black;
`;

export const But = styled.div`

color: red;
`

// const NavSpace = styled.div`
//   margin-left: 1rem;
// `

function AddUsers() {

  // const currDate = new Date().toLocaleDateString();
  // const today = new Date();
  // const dd = String(today.getDate()).padStart(2, '0');
  // const mm = String(today.getMonth() + 1).padStart(2, '0'); 
  // const yyyy = today.getFullYear();
  // const displayDate = dd + '/' + mm + '/' + yyyy;

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  // const [employeeid, setEmployeeId] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [createdby, setCreatedBy] = useState("");
  const [status, setStatus] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [employees, setEmployees] = useState([])
  // const data = useSelector(state => state);


  // console.log("Users data", data)
  // let empcount = 9
  // const dispatch = useDispatch();

  // const handleSubmit = (e) => {
    
  //   }
  //   fetch(`${API_URL_BASE}user/addUser`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(payload),
  //   })
  // };
  // const history = useHistory()
  const dispatch = useDispatch()
  // const [users, setUsers] = useState({
  //   firstname: "",
  //   lastname: "",
  //   phone: "",
  //   role: "",
  //   emp_id: `FS${Math.random().toString(16).slice(2)}`,
  //   email: "",
  //   created_by: "",
  //   online_status: "",
  //   password: ""
  // })
  // const (e) => setAuditName(e.target.value) = event => {
  //   const { name, value } = event.target;
  //   setUsers({ ...users, [name]: value });
  // }

  useEffect(() => {
    console.log('fetch Employees AddUsers')
    async function fetchEmployees(){
      await fetch(`${API_URL_BASE}/user/allemployees`, {
        // headers: {
        //   'Authorization': `Bearer ${token}`
        // }
      }).then(res => res.json()).then((data, indx) => {
        console.log(data.body)
        setEmployees(data.body)
      })
    }
    fetchEmployees()
  }, [])

  const handleSubmit = async (e) => {
    let EMPLOYEE_ID_NUMERIC_PART = employees.length===0 ? `001` : ((employees.length<9) ? `00${(employees.length+1).toString()}` : ((employees.length<98) ? `0${(employees.length+1).toString()}` : `${(employees.length+1).toString()}`))
    let phoneNumAllowedStructure = new RegExp(/^\d+$/)
    console.log('phone check: ', phone.length !== 10 || phoneNumAllowedStructure.test(phone))
    // if((phone.length !== 10 || phoneNumAllowedStructure.test(phone))){
    // if(phone.length !== 10){
    //   errorToaster(`Contact phone should have 10 numeric digits with no space`)
    // } else {
      e.preventDefault();
      const payload = {
        firstname: firstname,
        lastname: lastname,
        emp_id: `FS${EMPLOYEE_ID_NUMERIC_PART}`,
        role: role.toLowerCase(),
        email: email,
        phone: phone,
        online_status: status.toLowerCase(),
        created_by: createdby,
        password: password,
      }
      console.log('adduser payload: ', payload)
      const result = await fetch(`${API_URL_BASE}/user/addUser`,{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization' : `Bearer ${token}`
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(payload)
      })
      .then(res => res.json())
      .then(result => {
        console.log("DEBUG",result)
        if(result.success){
          // history.push('/viewAudits')
          console.log(result)
          successToaster(result.message)
          dispatch(addUsers(result.body))  
          // console.log(result.body.token)
        } 
        if(result.error){
          errorToaster(result.message)
        }
      })
      console.log(result)
      // const response = await instance.post(requests.fetchAddUsers, users, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization' : `Bearer ${token}`
      //     // 'Content-Type': 'application/x-www-form-urlencoded',
      //   },
      // })
      // console.log(response)
      //   // .catch(
      //   //   (error) => {
      //   //     let errorMessage = ""
      //   //     if (error.response.data && error.response.data.body) {
      //   //       errorMessage = error.response.data.body.message
      //   //     } else {
      //   //       errorMessage = error.response.data.body
      //   //     }
  
      //   //     errorToaster(errorMessage)
      //   //   }
      //   // )
      // if (response && response.data) {
      //   // successToaster("User Successfully added")
      //   swal("User Successfully Added")
      //   dispatch(addUser(response.data.body))
      //   history.push("/viewUsers");
      // }
    // }
   
  }
  return (
    <>


      <SecondaryNav />
        
        <Link to="/viewUsers" className="view_users_back_btn1">
         <p className="fa fa-angle-left"> </p> <span className="small">Add Users</span>
        </Link>
      <section className="site-section mt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mb-5">
              <div className='add_users_form_box'>
                {/* <h2 className="mb-4 text-center" style={{color: '#f54040'}}>Add User</h2> */}
                <form className="p-4 border rounded" 
                onSubmit={(e) => handleSubmit(e)} 
                >

                  <div className="row">
                    <div className="col-sm">
                      <div className="row form-group">
                        <div className="col-md-12 mb-3 mb-md-0">
                          <label className="text-black" htmlFor="firstname">First Name</label>
                          <input type="name" className="form-control"value={firstname} name="firstname" 
                          id="inputEmail4" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                      </div>
                      <div className="row form-group">
                        <div className="col-md-12 mb-3 mb-md-0">
                          <label className="text-black" htmlFor="lastname">Last Name</label>
                          <input type="name" className="form-control" 
                          value={lastname} name="lastname" id="inputEmail4" placeholder="Last Name" 
                          onChange={(e) => setLastName(e.target.value)}/>
                        </div>
                      </div>
                      {/* <div className="row form-group">
                  <div className="col-md-12 mb-3 mb-md-0">
                    <label className="text-black" htmlFor="username">Employee ID</label>
                    <input type="text" className="form-control"  value= {employeeid} onChange={(e) => setEmployeeId(e.target.value)} name="username" id="username" placeholder="Employee Id" />
                  </div>
                </div>      */}
                      <div className="row form-group">
                        <div className="col-md-12 mb-3 mb-md-0">
                          <label className="text-black" htmlFor="role">Role</label>
                          <select required name="role" id="role" value={role} 
                          onChange={(e) => setRole(e.target.value)} className="form-control">
                            <option hidden value>Select Role</option>
                            <option value="Auditor">auditor</option>
                            <option value="Admin">admin</option>
                          </select>
                        </div>
                      </div>
                      <div className="row form-group">
                        <div className="col-md-12 mb-3 mb-md-0">
                          <label className="text-black" htmlFor="email">Email</label>
                          <input type="email" className="form-control" 
                          value={email} name="email" id="inputEmail4" placeholder="Email" 
                          onChange={(e) => setEmail(e.target.value)} />
                        </div>
                      </div>
                      <div className="row form-group">
                        <div className="col-md-12 mb-3 mb-md-0">
                          <label className="text-black" htmlFor="phone">Phone</label>
                          <input type="tel" className="form-control" 
                          value={phone} name="phone" id="inputEmail4" placeholder="Phone Number" 
                          onChange={(e) => setPhone(e.target.value)}/>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm">
                      <div className="row form-group">
                        <div className="col-md-12 mb-3 mb-md-0">
                          <label className="text-black" htmlFor="createdby">Created By</label>
                          <input required type="text" className="form-control" 
                          value={createdby} name="createdby" id="inputEmail4" 
                          placeholder="Created By" onChange={(e) => setCreatedBy(e.target.value)} />
                        </div>
                      </div>
                      <div className="row form-group">
                        <div className="col-md-12 mb-3 mb-md-0">
                          <label className="text-black" htmlFor="status">Status </label>
                          <select required name="status" id="status" value={status} 
                          onChange={(e) => setStatus(e.target.value)} className="form-control">
                            <option hidden value>Select Status</option>
                            <option >Active</option>
                            <option >Inactive</option>
                          </select>
                        </div>
                      </div>
                      <div className="row form-group">
                        <div className="col-md-12 mb-3 mb-md-0">
                          <label className="text-black" htmlFor="password">Password</label>
                          <input type="password" className="form-control"
                          value={password} name="password" id="inputEmail4" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                      </div>
                      <div className="row form-group">
                        <div className="col-md-12 mb-3 mb-md-0">
                          <label className="text-black" htmlFor="confirmpassword">Confirm Password</label>
                          <input type="password" className="form-control" 
                          value={confirmpassword} name="confirmpassword" id="inputEmail4"
                           placeholder="Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                      </div>
                      <div className="row form-group">
                        <div className="col-md-12">
                          <button type="submit" className="btn btn-danger"> Add User </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

      </section>

    </>



  );
}

export default AddUsers;