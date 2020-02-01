import React, { useState } from 'react';
import EditInput from './EditInput';
import EditMedsConds from './EditMedsConds';
import AuthService from '../Auth/AuthService';

const EditProfile = (props) => {
  const service = new AuthService();
  const [ user, setUser ] = useState(props.user);
  const [ updates, setUpdates ] = useState({})


  const submitChanges = (e) => {
    e.preventDefault();
    service.updateUser(updates)
    .then(response => {
      setUser(response);
      props.updateUser(response);
      props.setHidden(true);
      props.updatePosts();
    })
  }

  const cancelChanges = (e) => {
    props.setHidden(true)
  }

  const update = (input) => {
    setUpdates({
      ...updates,
      ...input
    })
  }

  const createForm = () => {
    return (
      <form className="actionform">
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <button className="btn" onClick={(e) => cancelChanges(e)}>close</button>
          <button className="btn" onClick={(e) => submitChanges(e)}>save</button>
        </div>
        <div className="modalnames">
          <h3>Edit Profile</h3>
          <EditInput type="text" label="name" inputs={[ {placeholder: 'name', value: props.user.name } ]} setUpdates={update} />
          <EditInput type="text" label="bio" inputs={[ { placeholder: "bio", value: props.user.bio } ]}  setUpdates={update} />
          <EditInput type="text" label="location" inputs={[ { placeholder: 'city', value: props.user.location.city }, { placeholder: 'state', value: props.user.location.state } ]} setUpdates={update} />
          <EditMedsConds label="medications" thing={user.medications} updateUser={props.updateUser} setUser={setUser} />
          <EditMedsConds label="conditions" thing={user.conditions} updateUser={props.updateUser} setUser={setUser} />
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

