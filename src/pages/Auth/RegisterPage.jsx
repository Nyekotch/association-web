import RegisterForm from '../../components/auth/RegisterForm';

const RegisterPage = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-4">
      <h1 className="text-2xl font-semibold text-gray-800">Inscription</h1>
      <RegisterForm />
    </div>
  </div>
);

export default RegisterPage;
