import React from 'react';

const FormField = ({ label, name, type = 'text', value, onChange, required, options, placeholder, rows }) => {
  const base = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition';

  const handleChange = (e) => onChange(name, e.target.value);

  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {type === 'select' ? (
        <select className={base} value={value || ''} onChange={handleChange} required={required}>
          <option value="">— Select —</option>
          {options?.map((o) => (
            <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea className={base} value={value || ''} onChange={handleChange} rows={rows || 3} placeholder={placeholder} required={required} />
      ) : type === 'checkbox' ? (
        <input type="checkbox" checked={!!value} onChange={(e) => onChange(name, e.target.checked)} className="h-4 w-4 text-indigo-600 rounded border-gray-300" />
      ) : (
        <input
          type={type}
          className={base}
          value={value || ''}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  );
};

export default FormField;
