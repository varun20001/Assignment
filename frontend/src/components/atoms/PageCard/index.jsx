import React from 'react'
import './styles.scss'

const PageCard = ({children,classes,styles,disabled}) => {
  return (
    <div className={`page-card ${classes} ${disabled ? 'page-card-disabled' : ''}`} style={styles}>
        {children}
    </div>
  )
}

export default PageCard