const FormField = ({ label, children }) => (
  <div className="space-y-1">
    {label && <label className="text-sm text-gray-700">{label}</label>}
    {children}
  </div>
);

export default FormField;
