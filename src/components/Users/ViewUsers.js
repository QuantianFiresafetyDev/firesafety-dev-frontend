import {React, useEffect, useState}from 'react';
import { useHistory } from 'react-router-dom';
import  ReactTable  from 'react-table-v6';
import "react-table-v6/react-table.css"
// import Navbar from '../Navbar/Navbar';
import SecondaryNav from '../Layouts/SecondaryNav';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import '../Css/Sys.css';


// import NavLogo from '../../assets/images/NavLogo.PNG';
import { API_URL_BASE } from '../../utils/constant';
import { useSelector } from 'react-redux';
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

const ViewUsersWrapper = styled.div`
   display: flex;
   flex-direction : column;
   padding : 12px;
  
   
   .ReactTable{
     .rt-table{
       .rt-thead{
         background-color : white;
         
         .rt-th{
          text-align: left;
          border-right:  transparent;
          padding: 1.1rem;
          position: relative;
          left: -8px;
          font-size: 13px;   
        }
       }

       .rt-tbody{

         .rt-tr-group{
           &:hover{
             background-color : grey;
             color : white;
             cursor: pointer;
           }
         }
      
         .rt-td{
          
          padding: 1.1rem;
          border-left: transparent;
          border-right:  transparent;
          position: relative;
          left: -9px;
          font-size: 14px;   
        
    

         }
       }
     }
   }
`;

 
function ViewUsers(){

 const [data, setdata] = useState([])
 const token = useSelector((state)=> state.user.token)

  useEffect(() => {
    async function fetchAllEmployeesData(){
      await fetch(`${API_URL_BASE}/user/allemployees`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => res.json()).then((userdata)=>{console.log(userdata); setdata(userdata.body)})
    }
    fetchAllEmployeesData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
    
   const columns = [{   
    Header: (
      <span className="volume-hdr">
        <span className="pr-2"  style ={{position: "relative", top: "-2px"}}>First Name</span>
        <FontAwesomeIcon  style ={{fontSize: "20px", color: '#707070'}} icon={faSort}/>
      </span>
    ),
    accessor: 'firstname' 
   },{  
    Header: (
      <span className="volume-hdr">
        <span className="pr-2"  style ={{position: "relative", top: "-2px"}}>Last Name</span>
        <FontAwesomeIcon  style ={{fontSize: "20px", color: '#707070'}} icon={faSort}/>
      </span>
    ),
    accessor: 'lastname'
  },{  
    Header: (
      <span className="volume-hdr">
        <span className="pr-2"  style ={{position: "relative", top: "-2px"}}>Employee ID</span>
        <FontAwesomeIcon  style ={{fontSize: "20px", color: '#707070'}} icon={faSort}/>
      </span>
    ),
    accessor: 'emp_id'
  },{  
    Header: (
      <span className="volume-hdr">
        <span className="pr-2"  style ={{position: "relative", top: "-2px"}}>Role</span>
        <FontAwesomeIcon  style ={{fontSize: "20px", color: '#707070'}} icon={faSort}/>
      </span>
    ),
    accessor: 'role'
  },{  
    Header: (
      <span className="volume-hdr">
        <span className="pr-2"  style ={{position: "relative", top: "-2px"}}>Email</span>
        <FontAwesomeIcon  style ={{fontSize: "20px", color: '#707070'}} icon={faSort}/>
      </span>
    ),
    accessor: 'email'
  },{  
    Header: (
      <span className="volume-hdr">
        <span className="pr-2"  style ={{position: "relative", top: "-2px"}}>Phone</span>
        <FontAwesomeIcon  style ={{fontSize: "20px", color: '#707070'}} icon={faSort}/>
      </span>
    ),
    accessor: 'phone'
  },{  
    Header: (
      <span className="volume-hdr">
        <span className="pr-2"  style ={{position: "relative", top: "-2px"}}>Created Date</span>
        <FontAwesomeIcon  style ={{fontSize: "20px", color: '#707070'}} icon={faSort}/>
      </span>
    ),
    accessor: 'createdAt',
    Cell : prop => {
      const date = new Date(prop.value);
      return date.toDateString();
    }
  },{  
    Header: (
      <span className="volume-hdr">
        <span className="pr-2"  style ={{position: "relative", top: "-2px"}}>Created By</span>
        <FontAwesomeIcon  style ={{fontSize: "20px", color: '#707070'}} icon={faSort}/>
      </span>
    ),
    accessor: 'created_by'
},{  
    Header: (
      <span className="volume-hdr">
        <span className="pr-2"  style ={{position: "relative", top: "-2px"}}>Status</span>
        <FontAwesomeIcon  style ={{fontSize: "20px", color: '#707070'}} icon={faSort}/>
      </span>
    ),
    accessor: 'online_status'

   }]  

   const history = useHistory();

  return (
     <>

    <SecondaryNav/>
    <div>
      <div className="d-flex justify-content-between">
                <div className = "table_top">Users</div>
                <div className= "users_adding_sign"> <Link className='link_col' to= "/AddUsers"><PersonAddIcon/></Link></div>
              {/* <div className= "filter_logo"> <p className="fa fa-filter"></p></div>
             <div className="three_dots"> <p className="fa fa-ellipsis-v"></p></div> */}
          </div>
        </div>
    <ViewUsersWrapper className="container">
      { data.length ? 
      <ReactTable  
        data={data}  
        columns={columns}  
        showPagination={false}
        getTrProps={(
          state,
          rowData,
          column,
          instance
        ) => ({onClick: () =>{
          console.log("DEBUG",rowData)
          // let user = {emp_id: rowData.original.emp_id,
          //   id: rowData.original._id
          // }
          history.push(`/UserDetails/${rowData.original._id}`)
        } })}
      /> : '...loading'}
        
    </ViewUsersWrapper>
     
  </>
  );
}

export default ViewUsers;
