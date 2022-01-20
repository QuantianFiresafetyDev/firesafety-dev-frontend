import React, {useState, useEffect} from 'react';
import { Tree } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'; 
import { v4 as uuidv4 } from 'uuid';
import { API_URL_BASE } from "../../utils/constant";
import { Link, useHistory, useParams } from "react-router-dom";

function SystemTreeStructure ({clicked, treeName, newLocation, currentItem, importCurrentTree, currentTreeToDisplay}) {
    // let x = treeName
    // console.log({
    //   clicked: clicked,
    //   treeName: treeName,
    //   newLocation: newLocation,
    //   currentItem: currentItem,
    //   importCurrentTree: importCurrentTree,
    //   currentTreeToDisplay: currentTreeToDisplay
    // })
    const history = useHistory();
    const { id } = useParams();
    // console.log(id)
    // const DataToDisplay = [{title: `${x}`, key: `${1}`}]

  // console.log('currentItem: ', currentItem)
    // const [currentTree, setCurrenttree] = useState([{title: `Systems`, key: `${1}`, description: '', locations: []}])
    const [currentTree, setCurrenttree] = useState([{title: `Systems`, key: `${1}`}])
    const [AuditCat, setAuditCat] = useState()
    // const [currentClicked, setCurrentClicked] = useState(currentItem)

    useEffect(() => {
      if(id){
        fetch(`${API_URL_BASE}/auditCategories/getSystemById/${id}`).then(res => res.json()).then((res) => {
          // setCurrenttree([{title: `${res.body.name}`, key: `${1}`, description: '', locations: []}])
          setCurrenttree([{title: `${res.body.name}`, key: `${1}`}])
          // console.log(res.body)
        })
      }
      console.log('inside useEffect', currentTree)      
      importCurrentTree(currentTree)
      // if(newLocation) setCurrenttree(oldState => [...oldState, newLocation])
      
    }, [])

    // console.log('newLocation @TreeStructure: ', newLocation)
    // console.log('current Item clicked @TreeStructure: ', currentItem)
    return (
      <Tree
        showLine={true}
        switcherIcon={<DownOutlined />} 
        defaultExpandAll={false}
        onSelect={clicked}
        treeData={currentTreeToDisplay ? currentTreeToDisplay : currentTree}
      />
    );
  }

export default SystemTreeStructure

// const DataToDisplay = [
//     {
//       title: 'Apartment Block',
//       key: `${DataToDisplay.length+1}`,
//       children: [
//         {
//           title: 'Main Building',
//           key: `${uuidv4()}`,
//           children: [
//             {
//               title: 'Floor',
//               key: `${uuidv4()}`,
//               children: [
//                   {
//                       title: 'Flat',
//                       key: `${uuidv4()}`,
//                   }
//               ]
//             },
//             {
//               title: 'Lift Lobby',
//               key: `${uuidv4()}`,
//             },
//             {
//               title: 'Stairways',
//               key: `${uuidv4()}`,
//             },
//           ],
//         },
//         {
//           title: 'Security Gate',
//           key: `${uuidv4()}`,
//           children: [
//             {
//               title: 'Reception & Security',
//               key: `${uuidv4()}`,
//             },
//           ],
//         },
//         {
//           title: 'STP Block',
//           key: `${uuidv4()}`,
//           children: [
//             {
//               title: 'STP Plant',
//               key: `${uuidv4()}`,
//             },
//             {
//               title: 'STP Control Room',
//               key: `${uuidv4()}`,
//             },
//           ],
//         },
//       ],
//     },
//   ]