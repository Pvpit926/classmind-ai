const RadioCard = ({ label, description, icon, selected = false, onChange, name, value, className = '' }) => {
  return (
    <label
      className={`block cursor-pointer rounded-2xl border-2 p-5 transition-all duration-200 ${
        selected
          ? 'border-accent-500 bg-accent-50 shadow-glow'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-card'
      } ${className}`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={selected}
        onChange={onChange}
        className="sr-only"
      />
      <div className="flex items-start gap-4">
        {icon && <span className="text-2xl mt-0.5">{icon}</span>}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className={`font-semibold ${selected ? 'text-accent-700' : 'text-navy-800'}`}>
              {label}
            </span>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
              selected ? 'border-accent-500 bg-accent-500' : 'border-gray-300'
            }`}>
              {selected && (
                <div className="w-2 h-2 bg-white rounded-full" />
              )}
            </div>
          </div>
          {description && (
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          )}
        </div>
      </div>
    </label>
  );
};

export default RadioCard;
