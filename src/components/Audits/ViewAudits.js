import { React, useEffect, useState } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import SecondaryNav from '../Layouts/SecondaryNav';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons'
import '../Css/Sys.css';
import { Link } from "react-router-dom";
import PostAddIcon from '@material-ui/icons/PostAdd';
import { API_URL_BASE } from "../../utils/constant";
import { useSelector } from "react-redux";
import moment from 'moment'
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

const AuditTableWrapper = styled.div`
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
          text-align: left; 
          position: relative;
          left: -9px;
          font-size: 14px;  
     
             

         }
       }
     }
   }
`;

// const NavSpace = styled.div`
//   margin-left: 1rem;
// `

function ViewAudits() {
  const [data, setdata] = useState([]);
  const history = useHistory();
  // const token = useSelector((state)=> state.user.token)
  // console.log(token);
  useEffect(() => {
    async function fetchAuditData(){
      await fetch(`${API_URL_BASE}/audit/all`, {
        // headers: {
        //   'Authorization': `Bearer ${token}`
        // }
      }).then(res => res.json()).then((data) => {
        console.log("List of All Audits: ", data.body)
        setdata(data.body)
      })
    }
    fetchAuditData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
    
  const columns = [
    {
      Header: (
        <span className="volume-hdr">
          <span className="pr-2"  style ={{position: "relative", top: "-2px"}}>Audit Name</span>
          <FontAwesomeIcon style ={{fontSize: "20px", color: '#707070'}} icon={faSort}/>
        </span>
       
      ),
      accessor: "name",
    },
    {
      Header: (
        <span className="volume-hdr">
          <span className="pr-2" style ={{position: "relative", top: "-2px"}}>Assignee</span>
          <FontAwesomeIcon style ={{fontSize: "20px", color: '#707070'}}  icon={faSort}/>
        </span>
      ),
      accessor: "assignee",
    },
    {
      Header: (
        <span className="volume-hdr">
          <span className="pr-2"  style ={{position: "relative", top: "-2px"}}>Start Date</span>
          <FontAwesomeIcon style ={{fontSize: "20px", color: '#707070'}}  icon={faSort}/>
        </span>
      ),
      accessor: "updatedAt",
      Cell : prop => {
        console.log(data.start_date)
        const startDate = moment(data.start_date).format("DD-MM-YYYY");
        // const date = new Date(data.start_date)
        console.log('date: ', startDate, 'date_momentjs: ', moment(startDate).format())
        return startDate;
      }
    },
    {
      Header: (
        <span className="volume-hdr">
          <span className="pr-2"  style ={{position: "relative", top: "-2px"}}>Created Date</span>
          <FontAwesomeIcon style ={{fontSize: "20px", color: '#707070'}}  icon={faSort}/>
        </span>
      ),
      accessor: "createdAt",
      Cell : prop => {
        const createdDate = moment(data.created_date).format("DD-MM-YYYY");
        return createdDate;
      }
    },
    {
      Header: (
        <span className="volume-hdr">
          <span className="pr-2"  style ={{position: "relative", top: "-2px"}}>Created By</span>
          <FontAwesomeIcon style ={{fontSize: "20px", color: '#707070'}}  icon={faSort}/>
        </span>
      ),
      accessor: "created_by",
    },
    // {
    //   Header: (
    //     <span className="volume-hdr">
    //       <span className="pr-2"  style ={{position: "relative", top: "-2px"}}>Progress</span>
    //       <FontAwesomeIcon style ={{fontSize: "20px", color: '#707070'}}  icon={faSort}/>
    //     </span>
    //   ),
    //   accessor: "progress",
    // },
  ];


  console.log("DEBUG: ", data)



  return (
    <>
   
      <SecondaryNav/>
      <div>
      <div className="d-flex justify-content-between">
                <div className = "table_top">Audits</div>
              <div className= "audit_adding_sign"> <Link className='link_col' to= "/AddAudits"><PostAddIcon/></Link></div> 
              {/* <div className= "filter_logo"> <p className="fa fa-filter"></p></div>
             <div className="three_dots"> <p className="fa fa-ellipsis-v"></p></div> */}
          </div>
        </div>
      <AuditTableWrapper className="container">
     
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
            history.push(`/AuditDetails/${rowData.original.id}`)
          } })}
          />
      </AuditTableWrapper>
    </>
  );
}

export default ViewAudits;
