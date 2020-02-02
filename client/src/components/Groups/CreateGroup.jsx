import React, {useState} from 'react'
import AuthService from '../Auth/AuthService';
import GroupImageUpload from './GroupImageUpload';
import EditInput from '../Profile/EditInput';

const CreateGroup = (props) => {
  const [group, setGroup] = useState({});
  const service = new AuthService();

  const handleImage = (image) => {
    setGroup({
      ...group,
      image: image
    })
  }

  const handleChange = (response) => {  
    setGroup({
      ...group,
      ...response
    })
  }

  const createGroup = (e) => {
    e.preventDefault();
    service.createGroup(group)
    .then(response => {
      setGroup(response)
      props.isCreated(true)
    })
  }

  return (props.isHidden) ? null : (props.newGroup) ? (
    <div>
      <h1 style={{color: 'white'}}>{group.name} has been created</h1>
    </div>
  ) :
  (
    <div className="creategroup">
      <form className="actionform">
        <div className="modalnames">
          <EditInput type="text" label="name" inputs={[ {placeholder: 'name', value: undefined } ]} setUpdates={handleChange} />
          <EditInput type="textarea" label="summary" inputs={[ {placeholder: 'summary', value: undefined } ]} setUpdates={handleChange} />
          <EditInput type="text" label="location" inputs={[ {placeholder: 'address', value: undefined }, {placeholder: 'city', value: undefined },{placeholder: 'state', value: undefined },{placeholder: 'zipcode', value: undefined } ]} setUpdates={handleChange} />
          <GroupImageUpload handleImage={handleImage} />
          <input className="btn" type="submit" value="submit" onClick={(e) => createGroup(e)}/>
        </div>

      </form>
    </div>
  )
}
export default CreateGroup;
