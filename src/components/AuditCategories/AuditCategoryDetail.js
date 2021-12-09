import React from 'react'
import { Link, useParams, useHistory } from "react-router-dom";
import SecondaryNav from "../Layouts/SecondaryNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "../Css/Sys.css";
import AuditCategoryLocation, { AuditCategorySwitch } from './AuditCategoryLocation';
import AuditCategorySystem  from './AuditCategorySystem'

const AuditCategoryDetail = () => {
  const history = useHistory();
  const { id } = useParams();
  console.log(`in AuditCategoryDetail: `, id);
  return (
    <>
      <SecondaryNav />
      <AuditCategorySystem />
      {/* <AuditCategoryLocation /> */}
    </>
  );
};

export default AuditCategoryDetail
