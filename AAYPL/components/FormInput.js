export default function FormInput({ label, type="text", name, value, onChange, ...props }) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block font-semibold mb-1">{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-600"
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
}