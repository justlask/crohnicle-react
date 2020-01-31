import React, {useState} from 'react'
import AuthService from '../Auth/AuthService';
import GroupImageUpload from './GroupImageUpload';


const CreateGroup = (props) => {
  const [group, setGroup] = useState({});
  const service = new AuthService();

  const handleImage = (image) => {
    setGroup({
      ...group,
      image: image
    })
  }

  const handleChange = (event) => {  
    setGroup({
      ...group,
      [event.target.name]: event.target.value
    })
    console.log(group)
  }

  const createGroup = (e) => {
    e.preventDefault();
    service.createGroup(group)
    .then(response => {
      console.log(response)
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
    <div style={{color: 'white'}}>
      <form>
        <GroupImageUpload handleImage={handleImage} />
        <div className="floatinglabel">
          <label htmlFor="name">Name*</label>
          <input type="text" name="name" placeholder="group name" onChange={handleChange} required />
        </div>
        <div className="floatinglabel">
          <label htmlFor="summary">Summary*</label>
          <textarea name="summary" cols="30" rows="10" placeholder="Tell us about your group" onChange={handleChange} required></textarea>
        </div>
        <div className="floatinglabel">
          <label htmlFor="location">Location</label>
          <input type="text" name="address" placeholder="street address" onChange={handleChange}/>
          <input type="text" name="city" placeholder="city" onChange={handleChange}/>
          <input type="text" name="state" placeholder="state" onChange={handleChange}/>
          <input type="number" name="zipcode" placeholder="zipcode" onChange={handleChange} />
        </div>
        <input type="submit" value="submit" onClick={(e) => createGroup(e)}/>
      </form>
    </div>
  )
}
export default CreateGroup;
