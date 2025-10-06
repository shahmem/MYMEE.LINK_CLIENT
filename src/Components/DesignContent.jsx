import React from 'react'
import Profile from './Profile'
import Themes from './Themes'
import IconPosition from './IconPosition'

function DesignContent({user, currentTheme, setTheme, setUser, position, setPosition}) {
  return (
    <div>
      <Profile user={user}   setUser={setUser} />
      <Themes user={user} currentTheme={currentTheme} setTheme={setTheme} />
      <IconPosition position={position} setPosition={setPosition} />
    </div>
  )
}

export default DesignContent