import LoginForm from '../../components/auth/LoginForm';

const LoginPage = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-4">
      <h1 className="text-2xl font-semibold text-gray-800">Connexion</h1>
      <LoginForm />
    </div>
  </div>
);

export default LoginPage;
