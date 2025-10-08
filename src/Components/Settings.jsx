import React from 'react'
import UsernameSettings from './UsernameSettings'

function Settings({ user, setUser }) {
  return (
    <div>
        <UsernameSettings  user={user} setUser={setUser} />
    </div>
  )
}

export default Settings