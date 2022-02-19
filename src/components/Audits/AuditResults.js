import { React, useEffect, useState, Suspense, lazy } from 'react';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Link, useParams } from "react-router-dom";
import styled from 'styled-components';
import { } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons'
import '../Css/Sys.css';
import axios from 'axios';
import { API_URL_BASE } from '../../utils/constant';
// import ChartResult from './ChartResult';

const ChartResult = lazy(() => import('./ChartResult'))


const AuditResultsWrapper = styled.div`
display: flex;
flex-direction : column;
padding : 1px;
 
.ReactTable{
  .rt-table{
    .rt-thead{
      background-color : white;
      
    }

    .rt-tbody{
      .rt-tr-group{
        &:hover{
          background-color : grey;
          color : white;
          cursor: pointer;
        }
           
      }
      ${'' /* .rt-td{
          margin-left: 35px;
       
      } */}
    }
  }
}
`;


export const auditResultsData = [
  {
    task_id: 1,
    task: "Extinguisher Refil System",
    task_type: "Extinguisher Refill System",
    task_path: "Fire Extinguishers > Subsystem",
    task_update: "Replace Fire Extinguisher Sand",
    estimated_cost: "Rs 3500",
    score_impact: "+3",
  },
  {
    task_id: 2,
    task: "Fire Hydrant Block 1",
    task_type: "Fire Hydrant",
    task_path: "Fire Hydrants > Equipment",
    task_update: "Replace Fire Hydrant",
    estimated_cost: "Rs 10000",
    score_impact: "+5",
  },

  {
    task_id: 3,
    task: "Emergency Exit Block 3",
    task_type: "Emergency Exits",
    task_path: "Emergency exits > Sub Systems",
    task_update: "Build Emergency Exit",
    estimated_cost: "Rs 7000",
    score_impact: "+5",
  },

  {
    task_id: 4,
    task: "Block A 7th floor-1",
    task_type: "Fire Extinguisher",
    task_path: "Fire Extinguishers > Equipment",
    task_update: "Buy new fire extinguisher",
    estimated_cost: "Rs 750",
    score_impact: "+1",
  },
];


function AuditResults(props) {
  const { id } = useParams();
  const [resultData, setResultData] = useState()
  const [locResultData, setLocResultData] = useState()
  const [normalScore, setNormalScore] = useState()
  const [weightedScore, setWeightedScore] = useState()
  const [questionData, setQuestionData] = useState()
  const [totalWeightage, setTotalWeightage] = useState()
  // console.log('id in AuditResult: ', id);
  const columns = [
    {
      Header: (
        <span className="volume-hdr">
          <span className="pr-2">Task</span>
          <FontAwesomeIcon icon={faSort} />
        </span>
      ),
      accessor: "task",
    },
    {
      Header: (
        <span className="volume-hdr">
          <span className="pr-2">Type</span>
          <FontAwesomeIcon icon={faSort} />
        </span>
      ),
      accessor: "task_type",
    },
    {
      Header: (
        <span className="volume-hdr">
          <span className="pr-2">Path</span>
          <FontAwesomeIcon icon={faSort} />
        </span>
      ),
      accessor: "task_path",
    },
    {
      Header: (
        <span className="volume-hdr">
          <span className="pr-2">Task</span>
          <FontAwesomeIcon icon={faSort} />
        </span>
      ),
      accessor: "task_update",
    },
    {
      Header: (
        <span className="volume-hdr">
          <span className="pr-2">Estimated Cost</span>
          <FontAwesomeIcon icon={faSort} />
        </span>
      ),
      accessor: "estimated_cost",
    },
    {
      Header: (
        <span className="volume-hdr">
          <span className="pr-2">Score Impact</span>
          <FontAwesomeIcon icon={faSort} />
        </span>
      ),
      accessor: "score_impact",
    },
  ];

  useEffect(() => {
    //fetch chart data
    axios.get(`${API_URL_BASE}/answers/auditresults/${id}`).then((res) => {
      console.log('response in AuditResult: ', res)
      let temp_unAnsData = [...res.data.body.unAnsData]
      let temp_total_w = res.data.body.resultData[0].total_w
      let temp_total_nw = res.data.body.resultData[0].total_nw
      let unAnsData = []
      temp_unAnsData.forEach((each) => {
        let temp = {
        location: each.location,
        score_nw: each.score_nw,
        score_w: each.score_w,
        system: each.system,
        total_w: temp_total_w,
        total_nw: temp_total_nw
      }
      unAnsData.push(temp)
      })
      // console.log('modified unAnsData: ', unAnsData)
      setResultData([...res.data.body.resultData, ...unAnsData])
      setLocResultData(res.data.body.loc_resultData)
      setQuestionData(res.data.body.questionData)
      let total_weightage = 0
      res.data.body.questionData.forEach((each) => {
        total_weightage = total_weightage + each.weightage
      })
      setTotalWeightage(total_weightage)
      let overall_nw_score = 0
      let overall_wtd_score = 0
      res.data.body.resultData.forEach((each) => {
        overall_nw_score = each.score_nw + overall_nw_score
      });
      res.data.body.loc_resultData.forEach((each) => {
        overall_wtd_score = each.score_w + overall_wtd_score
      });
      setNormalScore(overall_nw_score)
      setWeightedScore(overall_wtd_score)
    })
    
  }, []);

  return (
    <div className="site-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 mb-5">
            {resultData &&
              <Suspense
                fallback={<div>Please wait while the chart loads ...</div>}
              >
                <div className="audit_details_box" >
                  <div className="p-4 border rounded" style={{border: '1ps red solid'}}>
                    <div className="d-flex justify-content-between">
                      <div className="audit_name">Score</div>
                    </div>
                    <div className='score-text-container'>
                      {questionData?.length>0 && <div className='score-text'>Score: {parseInt((normalScore/questionData.length)*100)}%</div>}
                      {totalWeightage !== 0 && <div className='score-text'>Weighted Score: {parseInt((weightedScore/totalWeightage)*100)}%</div>}
                    </div>
                    <ChartResult resultData={resultData} loc_resultData={locResultData} res/>
                    <div className='score-container'>
                      <div className='score-text'><h5>Normal Score</h5></div>
                      <div className='score-text'><h5>Weighted Score</h5></div>
                    </div>
                  </div>
                  
                </div>
                
              </Suspense>
            }
          </div>
        </div>
      </div>
      {/* <AuditResultsWrapper class="container">
                <div >
                  <div className="d-flex justify-content-between">
                    <div className="table_top">Cost Analysis</div>
                    <div className="filter_logo"> <p className="fa fa-filter"></p></div>
                    <div className="three_dots"> <p className="fa fa-ellipsis-v"></p></div>
                  </div>
                </div>
                <ReactTable
                  data={auditResultsData}
                  columns={columns}
                  showPagination={false}
                  defaultPageSize={4}

                />
              </AuditResultsWrapper> */}
    </div>



  )
}

export default AuditResults;