import React from 'react'

const FlashMessage = (props) => {

  return (props.isHidden) ? null : (
    <div className="flashmessage">
      {props.message}
    </div>
  )

}

export default FlashMessage;
