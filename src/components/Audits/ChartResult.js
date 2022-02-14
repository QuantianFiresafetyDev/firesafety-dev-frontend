import React, {useState, useEffect} from 'react';
import {
    ResponsiveContainer,
    BarChart,
    ChartCard,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend, Label,
    Bar,
    Tooltip,
    ComposedChart,
    Line,
  } from "recharts";
  import '../Css/Sys.css';

  const ChartResult = (props) => {
    // const [MonthlyPRData, setMonthlyPRData] = useState(props.chartData.overallMonthlyPR);
    const [resultData, setResultData] = useState(props.resultData)
    const [locResultData, setlocResultData] = useState(props.loc_resultData)
    // console.log('props resultData: ', props.resultData)
  
    const SYSTEM_ARR = props?.resultData?.map(each => each.system)
  
    // const dataToPLot = MonthlyPRData.map((each, index) => {
    //   return { month: index, PR: each };
    // });

    const wtd_systemDataToPlot = props?.resultData?.map((each) => {
      // console.log('wtd_systemDataToPlot: ', each.system, each.score_w, each.total_w)
      return(
        { sys: each.system, wtd_score: (each.score_w/each.total_w)*100}
      )
    })

    const non_wtd_systemDataToPlot = props?.resultData?.map((each) => {
      // console.log('non_wtd_systemDataToPlot: ', each.system, each.score_nw, each.total_nw)
      return(
        { system: each.system, non_wtd_score: (each.score_nw/each.total_nw)*100}
      )
    })

    const wtd_locDataToPlot = props?.loc_resultData?.map((each) => {
      if(each.score_w>0){
        return (
          {location: each.location, wtd_score: (each.score_w/each.total_w)*100}
        )
      }
    })

    const non_wtd_locDataToPlot = props?.loc_resultData?.map((each) => {
      if(each.score_nw>0){
        return (
          {location: each.location, non_wtd_score: (each.score_nw/each.total_nw)*100}
        )
      }
      
    })


    // useEffect(() => {}, [])
  
    // const formatXAxis = (numVal) => {
    //   return MONTHS_ARR[numVal];
    // };

    const formatXAxis = (numVal) => {
      return numVal;
    };
  
    // const CustomTooltip = ({active, payload, label}) => {
    //     console.log(payload)
    //     if(active){
    //       return (
    //           <div style={{
    //               borderRadius: '0.25rem',
    //               background: '#449923',
    //               color: '#fff',
    //               padding: '1rem',
    //               boxShadow: '15px 30px 40px 5px rgba(255, 255, 255, 0.5)',
    //               textAlign: 'center'
    //           }}>
    //               <h5>{SYSTEM_ARR[label]}</h5>
    //               <p>SCORE: {payload && payload[0].payload.PR}</p>
    //           </div>
    //           )
    //     } else 
    //     return null
    // }
  
    return (
      // <ChartCard heading="Audit Score">
      <>
      {/* <div className='result-container'> */}
        
      <div className='chart-container'>
        {/* <div className='non-wtd-score-container'> */}
      <ResponsiveContainer barGap={5} height="60%" aspect={0.7}>
        <BarChart 
          width='20%' 
          height={250}
          data={non_wtd_systemDataToPlot} 
          layout="vertical">
          <XAxis 
            dataKey="non_wtd_score"
            height={150}
            axisLine={false}
            // dx={5}
            fontSize={15}
            position="center"
            type="number"
            // tick={{stroke: 'black'}}
            tickLine={false}
            tickFormatter={formatXAxis} 
            >
            <Label 
              // value="Normal Score" 
              offset={20} 
              position="insideTop" 
              // fontSize='20'
              />
          </XAxis>
          <YAxis
            dataKey="system" 
            width={100}
            fontSize={10}
            axisLine={false} 
            tickLine={false}
            type="category" 
            tick={{stroke: 'black'}}
            >
            <Label 
              // value="System" 
              angle= "-90" 
              offset={0} 
              position="center" 
              // fontSize='20' 
              />
          </YAxis>
          {/* <Tooltip 
              content={<CustomTooltip />}
              /> */}
          {/* <Legend /> */}
          {/* <CartesianGrid stroke="#f5f5f5" /> */}
          <Bar 
            dataKey="non_wtd_score" 
            barSize={15} 
            fill="grey" />
          <Line type="monotone" dataKey="non_wtd_score" stroke="#ff7300" />
        </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer height="60%" aspect={0.7}>
        <BarChart 
          width='20%' 
          height={350} 
          data={non_wtd_locDataToPlot} 
          layout="vertical">
          <XAxis 
            // dataKey="non_wtd_score"
            height={150}
            axisLine={false}
            fontSize={15}
            position="center"
            // dx={0}
            type="number"
            // tick={{stroke: 'black'}}
            tickLine={false}
            tickFormatter={formatXAxis} >
            <Label 
              // value="Normal Score" 
              offset={20} 
              position="insideTop" 
              // fontSize='20'
              />
          </XAxis>
          <YAxis
            dataKey="location" 
            width={100}
            fontSize={10} 
            axisLine={false} 
            tickLine={false}
            type="category" 
            tick={{stroke: 'black'}}>
            <Label 
              // value="Location" 
              angle= "-90" 
              offset={0} 
              position="center" 
              // fontSize='20' 
              />
          </YAxis>
          {/* <Tooltip 
              content={<CustomTooltip />}
              /> */}
          {/* <Legend /> */}
          {/* <CartesianGrid stroke="#f5f5f5" /> */}
          <Bar 
            dataKey="non_wtd_score" 
            barSize={15} 
            fill="grey" />
          <Line type="monotone" dataKey="non_wtd_score" stroke="#ff7300" />
        </BarChart>
      </ResponsiveContainer>
      {/* </div> */}
      {/* <div className='wtd-score-container'> */}
      <ResponsiveContainer height="60%" aspect={0.7}>
        <BarChart 
          width='20%' 
          height={350} 
          data={wtd_systemDataToPlot} 
          layout="vertical">
          <XAxis 
            dataKey="wtd_score"
            height={150}
            axisLine={false}
            fontSize={15}
            position="center"
            // dx={0}
            type="number"
            // tick={{stroke: 'black'}}
            tickLine={false}
            tickFormatter={formatXAxis} >
            <Label 
              // value="Weighted Score" 
              offset={20} 
              position="insideTop" 
              fontSize='20'/>
          </XAxis>
          <YAxis
            dataKey="sys" 
            width={100}
            fontSize={10} 
            axisLine={false} 
            tickLine={false}
            type="category" 
            tick={{stroke: 'black'}}>
            <Label 
              // value="System" 
              angle= "-90" 
              offset={0} 
              position="center" 
              fontSize='20' />
          </YAxis>
          {/* <Tooltip 
              content={<CustomTooltip />}
              /> */}
          {/* <Legend /> */}
          {/* <CartesianGrid stroke="#f5f5f5" /> */}
          <Bar 
            dataKey="wtd_score" 
            barSize={15} 
            fill="grey" />
          <Line type="monotone" dataKey="wtd_score" stroke="#ff7300" />
        </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer height="60%" aspect={0.7}>
        <BarChart 
          width='20%' 
          height={350}
          data={wtd_locDataToPlot} 
          layout="vertical">
          <XAxis 
            dataKey="wtd_score"
            height={150}
            axisLine={false}
            fontSize={15}
            position="center"
            // dx={0}
            type="number"
            // tick={{stroke: 'black'}}
            tickLine={false}
            tickFormatter={formatXAxis} >
            <Label 
              // value="Weighted Score" 
              offset={20} 
              position="insideTop" 
              fontSize='10'/>
          </XAxis>
          <YAxis
            dataKey="location" 
            width={100}
            fontSize={10} 
            axisLine={false} 
            tickLine={false}
            type="category" 
            tick={{stroke: 'black'}}>
            <Label 
              // value="Location" 
              angle= "-90" 
              offset={0} 
              position="center" 
              fontSize='20' />
          </YAxis>
          {/* <Tooltip 
              content={<CustomTooltip />}
              /> */}
          {/* <Legend /> */}
          {/* <CartesianGrid stroke="#f5f5f5" /> */}
          <Bar 
            dataKey="wtd_score" 
            barSize={15} 
            fill="grey" />
          <Line type="monotone" dataKey="wtd_score" stroke="#ff7300" />
        </BarChart>
      </ResponsiveContainer>
      {/* </div> */}
      </div>
      {/* </div> */}
      </>
      // </ChartCard>
      
    );
  };
  
  export default ChartResult;
