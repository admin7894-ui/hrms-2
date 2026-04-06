import React from 'react';

const FormField = ({ label, name, type = 'text', value, onChange, onBlur, required, options, placeholder, rows, readOnly }) => {
  const base = `w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition ${readOnly ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : ''}`;

  const handleChange = (e) => onChange(name, e.target.value);
  const handleBlur = (e) => onBlur && onBlur(name, e.target.value);

  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {type === 'toggle' ? (
        <div className="pt-1">
          <button
            type="button"
            onClick={() => onChange(name, !value)}
            className={`${
              value ? 'bg-indigo-600' : 'bg-gray-200'
            } relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none shadow-inner`}
          >
            <span
              className={`${
                value ? 'translate-x-5' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm`}
            />
          </button>
        </div>
      ) : type === 'select' ? (
        <select className={base} value={value || ''} onChange={handleChange} onBlur={handleBlur} required={required} disabled={readOnly}>
          <option value="">— Select —</option>
          {options?.map((o) => (
            <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea className={base} value={value || ''} onChange={handleChange} onBlur={handleBlur} rows={rows || 3} placeholder={placeholder} required={required} readOnly={readOnly} />
      ) : type === 'checkbox' ? (
        <input type="checkbox" checked={!!value} onChange={(e) => onChange(name, e.target.checked)} className="h-4 w-4 text-indigo-600 rounded border-gray-300" disabled={readOnly} />
      ) : (
        <input
          type={type}
          className={base}
          value={value || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          required={required}
          readOnly={readOnly}
        />
      )}
    </div>
  );
};

export default FormField;
