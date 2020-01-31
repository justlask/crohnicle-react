import React, { useState } from 'react';
import EditInput from './EditInput';
import EditMedsConds from './EditMedsConds';

const EditProfile = (props) => {
  const [ user, setUser ] = useState(props.user);
  const [ updates, setUpdates ] = useState(null)


  const submitChanges = (e) => {
    e.preventDefault();
    console.log(user)
    // props.setHidden(true);
    console.log(updates)
  }

  const cancelChanges = (e) => {
    props.setHidden(true)
  }

  const createForm = () => {
    return (
      <form className="actionform">
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <button style={{color: 'black'}} onClick={(e) => cancelChanges(e)}>close</button>
          <button style={{color: 'black'}} onClick={(e) => submitChanges(e)}>save</button>
        </div>
        <div className="modalnames">
          <h3>Edit Profile</h3>
          <EditInput type="text" label="name" inputs={[ {placeholder: 'name', value: props.user.name } ]} setUser={setUpdates} />
          <EditInput type="text" label="bio" inputs={[ { placeholder: "bio", value: props.user.bio } ]}  setUser={setUpdates} />
          <EditInput type="text" label="location" inputs={[ { placeholder: 'city', value: props.user.location.city }, { placeholder: 'state', value: props.user.location.state } ]} setUser={setUpdates} />
          <EditMedsConds label="medications" thing={user.medications} updateUser={props.updateUser} />
          <EditMedsConds label="conditions" thing={user.conditions} updateUser={props.updateUser}/>
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

