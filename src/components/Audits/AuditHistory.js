import { React, useState, useEffect } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';
import axios from 'axios';
import '../Css/Sys.css';
import auditHistorydata from './tempAuditdata'
import { API_URL_BASE } from '../../utils/constant';
import moment from 'moment';
import { useHistory } from "react-router-dom";
import { VscClose } from 'react-icons/vsc'

const AuditHistoryWrapper = styled.div`
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

const InspectionHistory = styled.div`
  display: flex;
  flex-direction : column;
  width: 35%;
  border-left: 1px solid #ddd
`

function AuditHistory(props) {
  const data = auditHistorydata;
  const [answerHistoryData, setAnswerHistoryData] = useState([])
  const history = useHistory();
  const { id } = useParams();
  const [showInspectionHistory, setShowInspectionHistory] = useState(false)
  const [dataToDisplay, setDataToDisplay] = useState()
  const [auditInspectionReportData, setAuditInspectionReportData] = useState()
  const [rowClicked, setRowClicked] = useState()

  useEffect(() => {
    console.log('AuditHistory audit id: ', id)
    async function fetchHistoryAnserData(){
      await fetch(`${API_URL_BASE}/answers/auditid/${id}`, {
        // headers: {
        //   'Authorization': `Bearer ${token}`
        // }
      }).then(res => res.json()).then((data, indx) => {
        console.log(data.body)
        setAuditInspectionReportData(data.body)
        let historyRowData = data.body.map((each, idx) => {
          return {
            name: each.location,
            type: each.system,
            // path: each.sub_system,
            inspection_date: props.inspection_date,
            // status: 'In Progress',
            auditID: each.auditID,
            answers: each.answerObj,
            assignee: each.emp_id,
            // auditPlace: each.name,
          }
        })
        // console.log('historyRowData: ', historyRowData)
        // console.log(props)
        // console.log(auditInspectionReportData)
        setAnswerHistoryData(historyRowData);
      })
    }
    fetchHistoryAnserData()
  }, [])

  const columns = [
    {
      Header: (
        <span className="volume-hdr">
          <span className="pr-2"  style ={{position: "relative", top: "-2px"}}>Name</span>
          <FontAwesomeIcon style ={{fontSize: "20px", color: '#707070'}} icon={faSort}/>
        </span>
      ),
      accessor: "name",
    },
    {
      Header:  (
        <span className="volume-hdr">
          <span className="pr-2"  style ={{position: "relative", top: "-2px"}}>Type</span>
          <FontAwesomeIcon style ={{fontSize: "20px", color: '#707070'}} icon={faSort}/>
        </span>
      ),
      accessor: "type",
    },
    // {
    //   Header:  (
    //     <span className="volume-hdr">
    //       <span className="pr-2" style ={{position: "relative", top: "-2px"}}>Path</span>
    //       <FontAwesomeIcon style ={{fontSize: "20px", color: '#707070'}} icon={faSort}/>
    //     </span>
    //   ),
    //   accessor: "path",
    // },
    {
      Header: (
        <span className="volume-hdr">
          <span className="pr-2" style ={{position: "relative", top: "-2px"}}>Inspection Date</span>
          <FontAwesomeIcon style ={{fontSize: "20px", color: '#707070'}} icon={faSort}/>
        </span>
      ),
      accessor: "inspection_date",
    },
  ];

  return (
  
    <div className ='audit_history_space'>
    
     {/* <SideBar/> */}
      
      <div className ="audit_history_table" style={{width: showInspectionHistory?'65%':'100%'}}>
      <AuditHistoryWrapper className="container">   
      <div>    
      <div className="d-flex justify-content-between" >
                <div className = "audit_history_table_top">Inspection History</div>
          </div>
        </div>
       
        <ReactTable
          data={answerHistoryData}
          columns={columns}
          defaultPageSize={8}
          showPagination={false}
          // getTdProps={(state, rowInfo, instance)}
          getTrProps={(
            state,
            rowData,
            rowInfo,
            instance
          ) => ({onClick: () =>{
            // console.log("DEBUG",rowData)
            // console.log(rowInfo.index)
            setRowClicked(rowData.index)
            setDataToDisplay(rowData.original)
            setShowInspectionHistory(true)
          } })}
        />
       
      </AuditHistoryWrapper>
      
      </div>
      {showInspectionHistory && <InspectionHistory>
        <div className='view_au_insp_top'>
          <div className='view_audit_inspection'>View Inspection</div>
          <div style={{marginRight: '10px'}}>
            <VscClose 
              onClick={() => setShowInspectionHistory(false)}
              /></div>
        </div>
        <div className='au_hist_view_insp'>
          <div style={{paddingTop: '10px', paddingBottom: '10px'}}><strong>{props.auditToBeDone.name}</strong></div>
          <div style={{paddingTop: '5px', paddingBottom: '5px'}}><strong>Name:</strong> <span style={{paddingLeft: '10px'}}>{dataToDisplay ? dataToDisplay.name : 'None'}</span></div>
          <div style={{paddingTop: '5px', paddingBottom: '5px'}}><strong>Inspection Date:</strong> <span style={{paddingLeft: '10px'}}>{dataToDisplay ? dataToDisplay.inspection_date : 'Not Inspected'}</span></div>
          <div style={{paddingTop: '5px', paddingBottom: '5px'}}><strong>Inspected By:</strong> <span style={{paddingLeft: '10px'}}>{dataToDisplay ? dataToDisplay.assignee : 'None'}</span></div>
          <div><div style={{paddingTop: '20px', paddingBottom: '20px'}}><strong>Inspection Report:</strong></div>
          {auditInspectionReportData[rowClicked].answerObj.map((each, index) => {
            return (
              <div style={{paddingTop: '10px'}}>
                  <div>{each.questionDesc}</div>
                  <div style={{paddingTop: '5px', paddingBottom: '5px'}}>
                    {(each.questionType === 'Yes/No') && 
                      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'start'}}>
                        <div className={each.answerDesc === 'Yes' ? 'ans_wrapper black_ans_wrapper' : 'ans_wrapper white_ans_wrapper'}>Yes</div>
                        <div className={each.answerDesc === 'No' ? 'ans_wrapper black_ans_wrapper' : 'ans_wrapper white_ans_wrapper'}>No</div>
                      </div>}
                    {(each.questionType === 'Descriptive') && <div className='descriptive_ans_display'>{each.answerDesc}</div>}
                    {(each.questionType === 'Single Select' || each.questionType === 'Multi Select') && 
                      <div>
                        <ul>
                        {Array.isArray(each.answerDesc) && each.answerDesc.map((eachAns, indx) => {
                          return (
                            <div className='ans_wrapper black_ans_wrapper ans_multi_single_width'>
                              <li>{eachAns}</li>
                            </div>
                          )
                        })}
                        </ul>
                      </div>
                    }
                  </div>
                  </div>
            )
            
          })}</div>

        </div>
      </InspectionHistory>}
    
      
    
    </div>

   
   

  );
}

export default AuditHistory;
