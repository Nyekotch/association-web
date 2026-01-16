import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Button from '../common/Button';
import { login } from '../../services/authService';
import useAuthStore from '../../stores/authStore';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login: setAuth } = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    setLoading(true);

    try {
      console.log('Attempting login...');
      const response = await login(formData);
      console.log('Login response:', response);
      
      // Stocker le token et les infos utilisateur
      localStorage.setItem('token', response.data.accessToken);
      setAuth({
        user: response.data.user,
        token: response.data.accessToken
      });

      toast.success('Connexion réussie !');
      
      // Logs pour diagnostiquer
      console.log('User role:', response.data.user.role);
      console.log('Role type:', typeof response.data.user.role);
      console.log('Role comparison:', response.data.user.role === 'ADMIN');
      console.log('Role comparison uppercase:', response.data.user.role.toUpperCase() === 'ADMIN');
      
      // Rediriger selon le rôle de l'utilisateur
      if (response.data.user.role === 'ADMIN') {
        console.log('Redirecting to admin dashboard...');
        navigate('/admin/dashboard');
      } else {
        console.log('Redirecting to user dashboard...');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      console.error('Response status:', error.response?.status);
      console.error('Response data:', error.response?.data);
      console.error('Error message:', error.message);
      
      let errorMessage = 'Erreur lors de la connexion';
      
      if (error.response?.status === 401) {
        errorMessage = 'Email ou mot de passe incorrect';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm mx-auto">
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Email</label>
        <input 
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
          type="email" 
          placeholder="vous@example.com" 
          required
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Mot de passe</label>
        <input 
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
          type="password" 
          placeholder="•••••••" 
          required
        />
      </div>
      <Button type="submit" disabled={loading} className="w-full text-base py-3">
        {loading ? 'Connexion...' : 'Se connecter'}
      </Button>
    </form>
  );
};

export default LoginForm;
