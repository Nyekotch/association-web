import useAuthStore from '../stores/authStore';

const useAuth = () => {
  const { isAuthenticated, user, token, login, logout, setUser } = useAuthStore();
  return { isAuthenticated, user, token, login, logout, setUser };
};

export default useAuth;
