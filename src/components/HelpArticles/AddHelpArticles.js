import { React, useState } from 'react';
// import { useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import '../Css/Sys.css';
import SecondaryNav from '../Layouts/SecondaryNav';
import { ADD_HELP_ARTICLES } from 'components/api';
import { errorToaster, successToaster } from 'common/common';
import parse from "html-react-parser"

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

function AddHelpArticles() {

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [descriptionText, setDescriptionText] = useState([]);
  // const data = useSelector(state => state);
  // const token = useSelector((state)=> state.user.token)

  const handleSubmit = async (e) => {
    e.preventDefault();
    let descriptionArray = descriptionText.split("\n")
    console.log(descriptionArray)
    let finalDescriptionToDB = descriptionArray.map((each, key) => {
      // console.log(each)
      let parsed = parse(each)
      let dataToReturn = parsed.props ? parsed.props.children : parsed
      //  console.log(dataToReturn) 
      return dataToReturn})
    const payload = {
      title: title,
      subject: subject,
      description: finalDescriptionToDB,
    }
    console.log("DEBUG", payload)

    const response = await fetch(ADD_HELP_ARTICLES,{
      method : "POST",
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
        console.log(successToaster)
        successToaster(result.message)
      } 
      if(result.error){
        errorToaster(result.message)
      }
    })
    console.log(response)
  };

  return (
    <div>

      <SecondaryNav />
      <h5 className="view_audit_cat1">
        <Link to="/viewArticles" className="view_audit_cat_back_btn1">
          <p className="fa fa-angle-left" > Add Help Articles </p>
        </Link>
      </h5>
      <section className="site-section" style={{marginTop: '50px'}}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mb-5">
              <div className='add_audit_categories_form_box'>
                {/* <h2 className="mb-4 text-center" style={{color: '#f54040'}}>Add Audit Categories</h2> */}
                <form className="p-4 border rounded" onSubmit={(e) => handleSubmit(e)} >
                  <div className="row form-group">
                    <div className="col-md-12 mb-3 mb-md-0">
                      <label className="text-black" htmlFor="title">Title</label>
                      <input type="text" className="form-control" 
                      value={title} onChange={(e) => setTitle(e.target.value)} name="title" id="title" 
                      placeholder="Title" />
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-12 mb-3 mb-md-0">
                      <label className="text-black" htmlFor="subject">Subject</label>
                      <input type="text" className="form-control" value={subject} 
                      onChange={(e) => setSubject(e.target.value)} name="subject" id="subject"
                       placeholder="Subject" />
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-12 mb-3 mb-md-0">
                      <label className="text-black" htmlFor="description">Description</label>
                      <textarea type="text" className="form-control" value={descriptionText} 
                      onChange={(e) => setDescriptionText(e.target.value)} name="description" id="description" 
                      placeholder="Description" rows={15}></textarea>
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-12">
                      <button type="submit" className="btn btn-danger"> Add Help Article </button>
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

export default AddHelpArticles;