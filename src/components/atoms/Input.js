export default function Input({ value, onChange, placeholder, type = "text", name }) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#D19C4F] transition w-100"
    />
  );
}