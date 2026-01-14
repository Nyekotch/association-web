import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Button from '../common/Button';
import { register } from '../../services/authService';
import useAuthStore from '../../stores/authStore';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'MEMBER'
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
    setLoading(true);

    try {
      const response = await register(formData);
      
      // Stocker le token et les infos utilisateur
      localStorage.setItem('token', response.data.accessToken);
      login({
        user: response.data.user,
        token: response.data.accessToken
      });

      toast.success('Inscription réussie !');
      
      // Rediriger selon le rôle de l'utilisateur
      if (response.data.user.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm text-gray-700">Nom</label>
        <input 
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2" 
          placeholder="Votre nom" 
          required
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm text-gray-700">Email</label>
        <input 
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2" 
          type="email" 
          placeholder="vous@example.com" 
          required
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm text-gray-700">Mot de passe</label>
        <input 
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2" 
          type="password" 
          placeholder="••••••••" 
          required
          minLength="6"
        />
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Inscription...' : 'Créer mon compte'}
      </Button>
    </form>
  );
};

export default RegisterForm;
