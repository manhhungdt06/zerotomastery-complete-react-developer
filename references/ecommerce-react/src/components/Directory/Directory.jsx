import React from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { directorySectionsSelector } from '../../redux/directory/directory.selectors'

import MenuItem from '../MenuItem/MenuItem'

import './Directory.scss'

function Directory({ sections }) {
  return (
    <div className='directory-menu'>
      {sections.map(({ id, ...sectionProps }) => (
        <MenuItem key={id} {...sectionProps} />
      ))}
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  sections: directorySectionsSelector
})

export default connect(mapStateToProps)(Directory)
