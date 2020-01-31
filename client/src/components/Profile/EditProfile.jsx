import React, { useState } from 'react';
import EditInput from './EditInput';
import EditMedsConds from './EditMedsConds';

const EditProfile = (props) => {
  const [ user, setUser ] = useState(props.user);

  const createForm = () => {
    return (
      <form className="actionform">
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <button style={{color: 'black'}} onClick={(e) => props.setHidden(true)}>close</button>
          <button style={{color: 'black'}} onClick={(e) => props.setHidden(true)}>save</button>
        </div>
        <div className="modalnames">
          <h3>Edit Profile</h3>
          <EditInput type="text" label="name" inputs={[ {placeholder: 'name', value: props.user.name } ]} />
          <EditInput type="text" label="bio" inputs={[ { placeholder: "bio", value: props.user.bio } ]}  />
          <EditInput type="text" label="location" inputs={[ { placeholder: 'city', value: props.user.location.city }, { placeholder: 'state', value: props.user.location.state } ]} />
          <EditMedsConds label="medications" thing={user.medications}/>
          <EditMedsConds label="conditions" thing={user.conditions}/>
        </div>
      </form>
    )
  }

  return (props.isHidden) ? null :
  (
    <div className="backdrop">
      <div className="modal">
      {createForm()}
      </div>
   </div>
  )
}
export default EditProfile;

