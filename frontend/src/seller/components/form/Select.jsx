const Select = ({
  label,
  name,
  value,
  onChange,
  options = [],
  error,
  className = "",
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm text-gray-500 font-medium">
          {label}
        </label>
      )}

      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full border rounded-xl px-4 py-2 text-sm outline-none transition-all
        ${error 
          ? "border-red-400 focus:ring-2 focus:ring-red-400" 
          : "border-gray-200 focus:ring-2 focus:ring-indigo-500"}
        bg-white shadow-sm ${className}`}
      >
        <option value="">Select {label}</option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Select;