import { React, useState } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import '../Css/Sys.css';
import SecondaryNav from '../Layouts/SecondaryNav';
import { ADD_AUDIT_CATEGORIES_API } from 'components/api';
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



function AddAuditCategories() {

  const [auditcatname, setAuditCatName] = useState("");
  const [supercategory, setSuperCategory] = useState("");
  // const [createddate, setCreatedDate] = useState("");
  // const [modifieddate, setModifiedDate] = useState("");
  const [createdby, setCreatedBy] = useState("");
  const [draft, setDraft] = useState(false);
  const data = useSelector(state => state);

  console.log("audit categories", data)

  // const dispatch = useDispatch();
  // const history = useHistory()
  const token = useSelector((state)=> state.user.token)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: auditcatname,
      created_by: createdby,
      super_category: supercategory,
      isDraft: draft,
      system_tree: [],
      location_tree: []
    }
    console.log("DEBUG", payload)

    const result = await fetch(ADD_AUDIT_CATEGORIES_API,{
      method : "POST",
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization' : `Bearer ${token}`
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then((result) => {
      console.log("DEBUG",result)
      if(result.success){
        // history.push('/viewAudits')
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
    // const response = await fetch(`${API_URL_BASE}auditCategories/create`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //     // 'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   body: JSON.stringify(payload),
    // })
    // if(response && response.body){
    //   swal("Audit Categories added succesfully");
    //   history.push('viewAuditCategories')
    // }
    // dispatch(auditCategories({
    //   auditcatname: auditcatname,
    //   supercategory: supercategory,
    //   //  createddate: createddate,
    //   //  modifieddate: modifieddate,
    //   createdby: createdby,
    //   draft: draft,


    // })
    // );

  };


//   const NavSpace = styled.div`
// margin-left: 1rem;
// `




  return (
    <div>

      <SecondaryNav />
      <h5 className="view_audit_cat1">
        <Link to="/ViewAuditCategories" className="view_audit_cat_back_btn1">
          <p className="fa fa-angle-left" > Add Audit Categories </p>
        </Link>
      </h5>
      <section className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mb-5">
              <div className='add_audit_categories_form_box'>
                {/* <h2 className="mb-4 text-center" style={{color: '#f54040'}}>Add Audit Categories</h2> */}
                <form className="p-4 border rounded" onSubmit={(e) => handleSubmit(e)} >
                  <div className="row form-group">
                    <div className="col-md-12 mb-3 mb-md-0">
                      <label className="text-black" htmlFor="auditcatname">Name</label>
                      <input type="text" className="form-control" value={auditcatname} onChange={(e) => setAuditCatName(e.target.value)} name="auditcatname" id="auditcatname" placeholder="Audit Category Name" />
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-12 mb-3 mb-md-0">
                      <label className="text-black" htmlFor="supercategory">Super Category</label>
                      <input type="text" className="form-control" value={supercategory} onChange={(e) => setSuperCategory(e.target.value)} name="supercategory" id="supercategory" placeholder="Super Category" />
                    </div>
                  </div>

                  {/* <div className="row form-group">
                  <div className="col-md-12 mb-3 mb-md-0">
                    <label className="text-black" htmlFor="createddate">Created Date</label>
                    <input type="date" className="form-control"  value= {createddate} onChange={(e) => setCreatedDate(e.target.value)} name="createddate" id="createddate"  />
                  </div>
                </div> 
                
                <div className="row form-group">
                  <div className="col-md-12 mb-3 mb-md-0">
                    <label className="text-black" htmlFor="modifieddate">Modified Date</label>
                    <input type="date" className="form-control"  value= {modifieddate} onChange={(e) => setModifiedDate(e.target.value)} name="modifieddate" id="modifieddate" />
                  </div>
                </div> */}

                  <div className="row form-group">
                    <div className="col-md-12 mb-3 mb-md-0">
                      <label className="text-black" htmlFor="createdby">Created By</label>
                      <input type="text" className="form-control" value={createdby} onChange={(e) => setCreatedBy(e.target.value)} name="createdby" id="createdby" placeholder="Created By" />
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-12 mb-3 mb-md-0">
                      <label className="text-black" htmlFor="role">Draft</label> <br />
                      <select name="draft" required id="draft" value={draft?'Yes':'No'} onChange={(e) => setDraft(e.target.value === 'Yes' ? true : false)} className="form-control">
                        <option hidden value>{draft}</option>
                        <option> Yes </option>
                        <option> No </option>
                      </select>
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-12">
                      <button type="submit" className="btn btn-danger"> Add Audit Category </button>
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

export default AddAuditCategories;