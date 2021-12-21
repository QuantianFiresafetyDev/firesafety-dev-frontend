import { React, useEffect, useState } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
// import Navbar from "../Navbar/Navbar";
import SecondaryNav from '../Layouts/SecondaryNav';
import styled from 'styled-components';
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import '../Css/Sys.css';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

import { API_URL_BASE } from "../../utils/constant";
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
   padding : 9px;



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
            font-size: 13px;
           
    
         }
         
       }
     }
   }
`;



// const NavSpace = styled.div`
//   margin-left: 1rem;
// `
export const auditCategoryData = [
  {
    audit_cat_id: 1,
    audit_cat_name: "Hospital Revision 3.5",
    super_category: "Hospital",
    created_date: "10/01/21",
    modified_date: "31/01/2021",
    created_by: "Parvezsh",
    draft: "Yes",
  },
  {
    audit_cat_id: 2,
    audit_cat_name: "NBC New rules",
    super_category: "High Rise Apartment",
    created_date: "20/01/2021",
    modified_date: "05/02/21",
    created_by: "Parvezsh",
    draft: "No",

  },


];

function ViewAuditCategories() {
  const [data, setData] = useState([])
  const history = useHistory();
  useEffect(() => {
    async function fetchAuditCategoriesData(){
    await fetch(`${API_URL_BASE}/auditCategories`, {
      method: 'GET',
    }).then(res => res.json()).then(data => setData(data.body))}
    fetchAuditCategoriesData()
  }, [])

  const columns = [
    {
      Header: (
        <span className="volume-hdr">
          <span className="pr-2" style={{ position: "relative", top: "-2px" }}>Name</span>
          <FontAwesomeIcon style={{ fontSize: "20px", color: '#707070' }} icon={faSort} />
        </span>
      ),
      accessor: "name",
    },
    {
      Header: (
        <span className="volume-hdr">
          <span className="pr-2" style={{ position: "relative", top: "-2px" }}>Super Category</span>
          <FontAwesomeIcon style={{ fontSize: "20px", color: '#707070' }} icon={faSort} />
        </span>
      ),
      accessor: "super_category",
    },
    {
      Header: (
        <span className="volume-hdr">
          <span className="pr-2" style={{ position: "relative", top: "-2px" }}>Created Date</span>
          <FontAwesomeIcon style={{ fontSize: "20px", color: '#707070' }} icon={faSort} />
        </span>
      ),
      accessor: "createdAt",
      Cell: prop => {
        const date = new Date(prop.value);
        return date.toDateString()
      }
    },
    {
      Header: (
        <span className="volume-hdr">
          <span className="pr-2" style={{ position: "relative", top: "-2px" }}>Modified Date</span>
          <FontAwesomeIcon style={{ fontSize: "20px", color: '#707070' }} icon={faSort} />
        </span>
      ),
      accessor: "updatedAt",
      Cell: prop => {
        const date = new Date(prop.value);
        return date.toDateString()
      }
    },
    {
      Header: (
        <span className="volume-hdr">
          <span className="pr-2" style={{ position: "relative", top: "-2px" }}>Created By</span>
          <FontAwesomeIcon style={{ fontSize: "20px", color: '#707070' }} icon={faSort} />
        </span>
      ),
      accessor: "created_by",
    },
    {
      Header: (
        <span className="volume-hdr">
          <span className="pr-2" style={{ position: "relative", top: "-2px" }}>Draft</span>
          <FontAwesomeIcon style={{ fontSize: "20px", color: '#707070' }} icon={faSort} />
        </span>
      ),
      accessor: "isDraft",
      Cell: prop => prop.value ? 'Yes' : 'No'

    }

  ];

  console.log("DEBUG view categories", data)

  return (
    <>
      <SecondaryNav />
      <div className="d-flex justify-content-between">

        <h5 className="cat_audit"><Link to="/viewAudits" className="audit_cat_back_button"><p className="fa fa-angle-left"> </p></Link> Audit Categories </h5>
        <div className="audit_cat_adding_sign"> <Link className='link_col' to="/AddAuditCategories"><PlaylistAddIcon /></Link></div>

      </div>
      {/*       
      <h5 className="cat_audit"><Link to = "/AddAuditCategories" className= "audit_cat_back_button"><p className="fa fa-angle-left"> </p></Link> Audit Categories </h5>  */}
      <div className="view_audit_categories_table">
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
            ) => ({
              onClick: () => {
                console.log("DEBUG", rowData)
                // let auditCatdata = {
                //   detailOfAuditCategory: rowData.original
                // }
                // history.push(`/AuditTemplate/${rowData.original.id}`)
                history.push(`/AuditCategoryDetail/${rowData.original.id}`)
                // history.push(`/AuditCategoryDetail/${auditCatdata}`)
              }
            })}

          />
        </AuditTableWrapper>

      </div>

    </>
  );
}

export default ViewAuditCategories;
