import { useNavigate } from 'react-router'
import { ROUTES } from '@/router/routes'

const AccountPanel = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate(ROUTES.AUTHORISATION)
  }

  if (!user) return null

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
      <p>
        <b>User:</b> {user.username}
      </p>
      <p>
        <b>Role:</b> {user.role}
      </p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default AccountPanel
