import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import './TabList.scss'

const TabList = ({ files, activeId, unsaveIds, onTabClick, onCloseTab }) => {
  return (
    <ul className='nav nav-pills tablist-component'>
      {files.map(file => {
        const withUnsaveMark = unsaveIds.includes(file.id)
        const fClassName = classNames({
          'nav-link': true,
          'my-nav-item': true,
          'active': file.id === activeId,
          'withUnsaved': withUnsaveMark
        })
        return (
          <li
            className='nav-item'
            key={file.id}
            onClick={(e) => { e.preventDefault(); onTabClick(file.id) }}
          >
            <a
              href="#"
              // className={'nav-link' + (activeId === file.id ? ' active' : '')}
              className={fClassName}
            >
              {file.title}
              <span
                className='ml-2 close-icon'
                onClick={(e) => { e.stopPropagation(); onCloseTab(file.id); }}
              >
                <FontAwesomeIcon
                  title='关闭'
                  icon={faTimes}
                />
              </span>
              { withUnsaveMark && <span className='ml-2 rounded-circle unsaved-icon'></span>}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

TabList.propTypes = {
  files: PropTypes.array,
  activeId: PropTypes.string,
  unsaveIds: PropTypes.array,
  onTabClick: PropTypes.func,
  onCloseTab: PropTypes.func
}

TabList.defaultProps = {
  unsaveIds: []
}

export default TabList