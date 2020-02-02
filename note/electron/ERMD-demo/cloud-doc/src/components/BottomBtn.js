import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'

const BottomBtn = ({ text, colorClass, icon, onBtnClick }) => {
  return (
    <button
      className={`btn btn-block no-border ${ colorClass }`}
      onClick = {onBtnClick}
    >
      <FontAwesomeIcon
        className='mr-2'
        title={text}
        icon={icon}
      />
      {text}
    </button>
  )
}

BottomBtn.propTypes = {
  text: PropTypes.string,
  colorClass: PropTypes.string,
  onBtnClick: PropTypes.func,
  icon: PropTypes.object.isRequired
}

BottomBtn.defaultProps = {
  text: '新建'
}

export default BottomBtn