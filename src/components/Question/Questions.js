import {React, useState} from 'react';
import {} from "react-router-dom";




// const Accordians = styled.div`
//  display: flex;
//  justify-content: center;

// `



export const questionsData = [{  
    question_id: 1,
    question_description: 'Whether the refuge area has been provided? if so, the floor on which provided and the total area provided floor wise',  
    question_type: '',
    question_category: 'Buildings Area',
    },
  
    {  
    question_id: 2,
    question_description: 'Has any hydrant provided in the are been provided from the buildings fire pump?',  
    question_type: '',
    question_category: 'Buildings Area',
    },

    {  
    question_id: 3,
    question_description: 'Does an emergency organization exists in the building ? if so, please give details and append a copy of the emergency (Fire) orders',  
    question_type: '',
    question_category: 'Buildings Area',
    },

    {  
    question_id: 4,
    question_description: 'Has a qualified Fire Officer been appointed for the building either individually or jointly in the other buildngs(s)?',  
    question_type: '',
    question_category: 'Buildings Area',
    },
    {  
    question_id: 5,
    question_description: 'Has the building been protected against lightning ? if so, does the lightning protect confirm to any code ? please indicate details',  
    question_type: '',
    question_category: 'Buildings Area',
    },
    {  
    question_id: 6,
    question_description: 'Where more than one lifts are installed in a common enclosure have individual lifts been seperated by fire resisting walls or 2 hours fire rating',  
    question_type: '',
    question_category: 'Lift Area',
    },
    {  
    question_id: 7,
    question_description: 'Has the lift shaft(S) lift lobby or stairwell been pressurized? if so, give details',  
    question_type: '',
    question_category: 'Lift Area',
    },
    {  
    question_id: 8,
    question_description: 'Have the lift lobbies and staircase been effectively enclosed to prevent fire/smoke entering them from outside at any floor?',  
    question_type: '',
    question_category: 'Lift Area',
    },
    {  
    question_id: 9,
    question_description: 'please indicate the present arrangement for replinishment of water for fire fighting',  
    question_type: '',
    question_category: 'Water Supply',
    },
    {  
    question_id: 10,
    question_description: 'Is a public or other water storage facility available nearby? If so, please give the capacity and distance from your building, also please indicate if it is readily accessible.',  
    question_type: '',
    question_category: 'Water Supply',

    },
    {
    question_id: 11,
    question_description: 'Have internal hydrants been provided if so, please indicate no. of hydrants on each floor including basement(S) and terrace',  
    question_type: '',
    question_category: 'Hydrants',
    },
    {
    question_id: 12,
    question_description: 'Has fire hose been provided near each hydrant? if so, please indicate',  
    question_type: '',
    question_category: 'Hydrants',
    },
       
    ]  
function Questions() {

  const [clicked, setClicked] = useState(false);

  const toggle = index => {
    if (clicked === index) {
      //if clicked question is already active, then close it
      return setClicked(null);
    }

    setClicked(index);
  };


  return (
    <div>
    {/* <Navbar/> */}
    {
            questionsData.map((item, index) => {
            return (
    <div className="accordion" id="accordionExample">
  <div className="card">
    <div className="card-header" id="headingOne">
      <h2 className="mb-0">
        <button onClick={() => toggle(index)} key={index} className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        {item.question_category}
        </button>
      </h2>
    </div>

    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
      <div className="card-body">
      {clicked === index ? (
        <div style = {{marginBottom: "15px"}}>
   
         {item.question_description}
        </div>
      ) : null}
        <div>
         <button type="button" className="btn btn-info">Add</button>
         <button style = {{marginLeft: "15px"}} type="button" className="btn btn-danger">Delete</button>
      </div>
      </div>
    </div>
  </div>
  
</div>
 );
          })}
</div>


  );
}

export default Questions;