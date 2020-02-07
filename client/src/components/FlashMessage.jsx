import React from 'react'

const FlashMessage = (props) => {

  return (props.isHidden) ? null : (
    <div className="floatinglabel">
      UUUUUUUU
      {props.message}
    </div>
  )

}

export default FlashMessage;
