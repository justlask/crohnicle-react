import React, { useState } from 'react';
import EditInput from './EditInput'

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
          <EditInput placeholder="name" label="name" value={props.user.name} />
          {/* <div className="editinput" onFocus={isFocused} onBlur={isBlur}>
            <label>Name</label>
            <input type="text" placeholder="name" value={props.user.name} />
          </div> */}
          <EditInput placeholder="bio" label="bio" value={props.user.bio} />
          {/* <div className="editinput" onFocus={isFocused} onBlur={isBlur}>
            <label>Bio</label>
            <input type="text" placeholder="bio" value={props.user.bio} />
          </div> */}
          <div className="editinput">
            <label>Location</label>
            <input type="text" placeholder="city" defaultValue={props.user.location.city}/>
            <input type="text" placeholder="state" defaultValue={props.user.location.state}/>
          </div>
          <div className="editinput">
            <label>Medications</label>
            <input type="text" placeholder="medications" />
          </div>
          <div className="editinput">
            <label>Conditions</label>
            <input type="text" placeholder="illness/conditions" />
          </div>
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

