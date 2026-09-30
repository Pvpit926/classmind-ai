import { forwardRef } from 'react';

const Select = forwardRef(({
  label,
  error,
  options = [],
  placeholder = 'Select an option',
  id,
  className = '',
  ...props
}, ref) => {
  const selectId = id || `select-${label?.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={selectId}
        className={`w-full px-4 py-3 bg-white border rounded-xl text-navy-800 
          focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-200
          appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%236b7280%22%20d%3D%22M2.22%204.47a.75.75%200%20011.06%200L6%207.19l2.72-2.72a.75.75%200%20011.06%201.06l-3.25%203.25a.75.75%200%2001-1.06%200L2.22%205.53a.75.75%200%20010-1.06z%22%2F%3E%3C%2Fsvg%3E')]
          bg-[length:12px] bg-[right_16px_center] bg-no-repeat pr-10
          ${error ? 'border-danger-400 focus:ring-danger-500' : 'border-gray-200'}
        `}
        aria-invalid={error ? 'true' : 'false'}
        {...props}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((opt) => (
          <option key={typeof opt === 'string' ? opt : opt.value} value={typeof opt === 'string' ? opt : opt.value}>
            {typeof opt === 'string' ? opt : opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-danger-500" role="alert">{error}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
