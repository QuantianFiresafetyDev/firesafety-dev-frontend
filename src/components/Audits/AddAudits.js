import { React, useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import '../Css/Sys.css';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import SecondaryNav from '../Layouts/SecondaryNav';
import { API_URL_BASE } from '../../utils/constant';
// import requests from '../../requests';
// import instance from '../../axios';
import { useHistory } from 'react-router-dom';

import { ADD_AUDIT_API } from 'components/api';
import { errorToaster, successToaster } from '../../common/common';
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


function AddAudits() {

  // const currDate = new Date().toLocaleDateString();

  // const showDate = new Date();
  // const displaytodaysdate = showDate.getDate()+'/' + (showDate.getMonth() + 1)+'/'+showDate.getFullYear();

  // const today = new Date();
  // const dd = String(today.getDate()).padStart(2, '0');
  // const mm = String(today.getMonth() + 1).padStart(2, '0'); 
  // const yyyy = today.getFullYear();
  // const displayDate = dd + '/' + mm + '/' + yyyy;

  const [auditname, setAuditName] = useState("");
  const [address_line1, setAddressLine1] = useState("");
  const [address_line2, setAddressLine2] = useState("");
  const [address_place_name, setPlaceLocation] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [assignee, setAssignee] = useState("");
  const [assigneeList, setAssigneeList] = useState([])
  const [locations, setLocations] = useState([])
  const [systemsNsubsystems, setSystemsNsubsystems] = useState([])
  const [startdate, setStartDate] = useState("");
  const [createddate, setCreatedDate] = useState("");
  const [createdby, setCreatedBy] = useState("");
  const [contactperson, setContactPerson] = useState("");
  const [floors, setFloors] = useState();
  const [phone, setPhone] = useState("");

  const data = useSelector(state => state);
  console.log("audit data", data)
  // const dispatch = useDispatch();
  const history= useHistory()
  const token = useSelector((state)=> state.user.token)

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    // let phoneNumAllowedStructure = new RegExp(/^\d+$/)
    // let pinAllowedStructure = new RegExp(/^\d+$/)
    // || (pinAllowedStructure.test(zipcode))
    // || (phoneNumAllowedStructure.test(phone))
    if((zipcode.length !== 6)){
      errorToaster(`PIN Code should have 6 numeric digits with no space`)
    } else if((phone.length !== 10)) {
      errorToaster(`Contact Phone should have 10 numeric digits with no space`)
    } else {
      const payload = {
        name: auditname,
        assignee: 'NA',
        address_line1: address_line1,
        address_line2: address_line2,
        address_place_name: address_place_name,
        address_zipcode : zipcode,
        locations : locations,
        systemsNsubsystems : systemsNsubsystems,
        created_by: createdby,
        start_date: startdate,
        created_date: createddate,
        audit_category: 'NA',
        floors: floors,
        contact_person: {
          name: contactperson,
          phone: phone,
        }
      }
  
      const result = await fetch(ADD_AUDIT_API,{
        method : "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${token}`
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(payload)
      })
      .then(res => res.json())
      .then(result => {
        console.log("DEBUG",result)
        if(result.success){
          history.push('/viewAudits')
          console.log(successToaster)
          successToaster(result.message)
          // dispatch(setLoginData(result.body))  
          // console.log(result.body.token)
          
        } 
        if(result.error){
          errorToaster(result.message)
        }
      })
      console.log(result)
    }
    
    
  };

  useEffect(() => {
    fetch(`${API_URL_BASE}/user/allemployees`).then(res => res.json()).then(data => setAssigneeList(data.body))
  }, [])

  

  return (
    <div>

      <SecondaryNav />
      <h5 className="view_audits1">
        <Link to="/ViewAudits" className="view_audits_back_btn1">
          <p className="fa fa-angle-left" > Add Audits  </p>
        </Link>
      </h5>

      <section className="site-section">
        <div className="container">
          <div className="row">

            <div className="col-lg-12 mb-5">
              <div className='add_audits_form_box'>
                <form className="p-4 border rounded" onSubmit={(e) => handleSubmit(e)} >
                  <div className="row form-group">
                    <div className="col-md-12 mb-3 mb-md-0">
                      <label className="text-black" htmlFor="auditname"> Audit Name</label>
                      <input type="text" className="form-control" value={auditname} onChange={(e) => setAuditName(e.target.value)} name="auditname" id="auditname" placeholder="Audit Name" />
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-12 mb-3 mb-md-0">
                      <label className="text-black" htmlFor="address">Address (Line 1)</label>
                      <input type="text" className="form-control" value={address_line1} onChange={(e) => setAddressLine1(e.target.value)} name="address_line1" id="address_line1" placeholder="Address Line1" />
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-12 mb-3 mb-md-0">
                      <label className="text-black" htmlFor="address">Address (Line 2)</label>
                      <input type="text" className="form-control" value={address_line2} onChange={(e) => setAddressLine2(e.target.value)} name="address_line2" id="address_line2" placeholder="Address Line2" />
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-12 mb-3 mb-md-0">
                      <label className="text-black" htmlFor="address">Place/Location</label>
                      <input type="text" className="form-control" value={address_place_name} onChange={(e) => setPlaceLocation(e.target.value)} name="address_place_name" id="address_place_name" placeholder="Place/Location" />
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-12 mb-3 mb-md-0">
                      <label className="text-black" htmlFor="address">PIN Code</label>
                      <input type="text" className="form-control" value={zipcode} onChange={(e) => setZipcode(e.target.value)} name="zipcode" id="zipcode" placeholder="PIN Code" />
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-12 mb-3 mb-md-0">
                      <label className="text-black" htmlFor="address">No. of Floors</label>
                      <input type="text" className="form-control" value={floors} onChange={(e) => setFloors(e.target.value)} name="floors" id="floors" placeholder="No. of Floors" />
                    </div>
                  </div>
                  {/* <div className="row form-group">
                    <div className="col-md-12 mb-3 mb-md-0">
                      <label className="text-black" htmlFor="role">Assignee</label> <br />
                      <select name="assignee" required id="assignee" value={assignee} onChange={(e) => setAssignee(e.target.value)} className="form-control">
                        <option hidden value>Select Assignee</option>
                        {assigneeList.map((item, key) => <option>{item.emp_id}</option>)}
                      </select>
                    </div>
                  </div> */}
                  <div className="row form-group">
                    <div className="col-md-12 mb-3 mb-md-0">
                      <label className="text-black" htmlFor="startdate">Start Date</label>
                      <input type="date" className="form-control" value={startdate} onChange={(e) => setStartDate(e.target.value)} name="startdate" id="startdate" />
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-12 mb-3 mb-md-0">
                      <label className="text-black" htmlFor="startdate">Created Date</label>
                      <input type="date" className="form-control" value={createddate} onChange={(e) => setCreatedDate(e.target.value)} name="createddate" id="createddate" />
                    </div>
                  </div>
                  {/* <div className="row form-group">
                  <div className="col-md-12 mb-3 mb-md-0">
                    <label className="text-black" htmlFor="createddate">Created Date</label>
                    <input  type="text" className="form-control"  onChange={(e) => setCreatedDate(e.target.value)} name="createddate" id="createddate" />
                  </div>
                </div>   */}
                  <div className="row form-group">
                    <div className="col-md-12 mb-3 mb-md-0">
                      <label className="text-black" htmlFor="createdby">Created By</label>
                      <input type="text" className="form-control" value={createdby} onChange={(e) => setCreatedBy(e.target.value)} name="createdby" id="createdby" placeholder="Created By" />
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-12 mb-3 mb-md-0">
                      <label className="text-black" htmlFor="name">Contact Person</label>
                      <input type="text" className="form-control" value={contactperson} onChange={(e) => setContactPerson(e.target.value)} name="contactperson" id="contactperson" placeholder="Contact Person" />
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-12 mb-3 mb-md-0">
                      <label className="text-black" htmlFor="phone">Phone</label>
                      <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} name="phone" id="phone" placeholder="Phone" />
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-12">
                      <button type="submit" className="btn btn-danger"> Add Audit </button>
                    </div>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>



  );
}

export default AddAudits;