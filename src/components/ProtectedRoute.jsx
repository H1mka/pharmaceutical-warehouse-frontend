import { Navigate } from 'react-router'

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'))

  // skip role, when allowedRoles empty
  if (!allowedRoles || !allowedRoles.length) return children

  if (!user) {
    // Если пользователь не авторизован, редирект на авторизацию
    return <Navigate to='/authorisation' />
  }

  if (!allowedRoles.includes(user.role)) {
    // Если роль не подходит, редирект на главную или показать ошибку
    return <Navigate to='/' />
  }

  return children
}

export default ProtectedRoute
