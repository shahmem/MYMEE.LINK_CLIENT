import React from 'react'
import UsernameSettings from './UsernameSettings'
import ChangePassword from './ChangePassword'

function Settings({ user, setUser, apiBase }) {
  return (
    <div>
        <UsernameSettings  user={user} setUser={setUser} />
        <ChangePassword apiBase={apiBase} user={user} />
    </div>
  )
}

export default Settings