import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import Modal from './Modal';
import FormField from './FormField';
import useCRUD from '../../hooks/useCRUD';
import api, { makeService } from '../../services/api';

// ─── Universal Validation Config ─────────────────────────────────────────────
const SPECIAL_CHAR_REGEX = /^[a-zA-Z0-9\s,.\-\/()]+$/;
const NAME_REGEX = /^[a-zA-Z0-9\s,.\-\/()]+$/;
const CODE_REGEX = /^[a-zA-Z0-9\-_]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9+\-\s()]{7,15}$/;
const PINCODE_REGEX = /^[0-9]{4,10}$/;

// Field-level rules: fieldName -> { min, max, regex, regexMsg, required }
const FIELD_RULES = {
  // Company
  companyName:      { min: 2, max: 100, regex: NAME_REGEX,  regexMsg: 'only letters, numbers, spaces and basic punctuation allowed' },
  registrationNo:   { min: 2, max: 50,  regex: CODE_REGEX,  regexMsg: 'only letters, numbers, hyphens and underscores allowed' },

  // Location
  locationName:     { min: 3, max: 100, regex: NAME_REGEX,  regexMsg: 'only letters, numbers, spaces and basic punctuation allowed' },
  address1:         { min: 3, max: 150, regex: SPECIAL_CHAR_REGEX, regexMsg: 'only letters, numbers, spaces and basic punctuation allowed' },

  // Business Group
  bgName:           { min: 2, max: 100, regex: NAME_REGEX,  regexMsg: 'only letters, numbers, spaces and basic punctuation allowed' },

  // Legal Entity / OU / Org
  leName:           { min: 2, max: 100, regex: NAME_REGEX,  regexMsg: 'only letters, numbers, spaces and basic punctuation allowed' },
  ouName:           { min: 2, max: 100, regex: NAME_REGEX,  regexMsg: 'only letters, numbers, spaces and basic punctuation allowed' },
  ouShortCode:      { min: 2, max: 20,  regex: CODE_REGEX,  regexMsg: 'only letters, numbers, hyphens and underscores allowed' },
  orgName:          { min: 2, max: 100, regex: NAME_REGEX,  regexMsg: 'only letters, numbers, spaces and basic punctuation allowed' },
  orgCode:          { min: 2, max: 20,  regex: CODE_REGEX,  regexMsg: 'only letters, numbers, hyphens and underscores allowed' },

  // Person
  firstName:        { min: 2, max: 50,  regex: /^[a-zA-Z\s]+$/, regexMsg: 'only letters and spaces allowed' },
  lastName:         { min: 2, max: 50,  regex: /^[a-zA-Z\s]+$/, regexMsg: 'only letters and spaces allowed' },
  middleName:       { min: 1, max: 50,  regex: /^[a-zA-Z\s]+$/, regexMsg: 'only letters and spaces allowed' },
  email:            { regex: EMAIL_REGEX, regexMsg: 'enter a valid email address' },
  phoneNumber:      { regex: PHONE_REGEX, regexMsg: 'enter a valid phone number' },
  pincode:          { regex: PINCODE_REGEX, regexMsg: 'enter a valid pincode (4-10 digits)' },

  // Grade / Job / Position
  gradeCode:        { min: 1, max: 20,  regex: CODE_REGEX,  regexMsg: 'only letters, numbers, hyphens and underscores allowed' },
  gradeName:        { min: 2, max: 100, regex: NAME_REGEX,  regexMsg: 'only letters, numbers, spaces and basic punctuation allowed' },
  jobCode:          { min: 1, max: 20,  regex: CODE_REGEX,  regexMsg: 'only letters, numbers, hyphens and underscores allowed' },
  jobName:          { min: 2, max: 100, regex: NAME_REGEX,  regexMsg: 'only letters, numbers, spaces and basic punctuation allowed' },
  positionName:     { min: 2, max: 100, regex: NAME_REGEX,  regexMsg: 'only letters, numbers, spaces and basic punctuation allowed' },

  // Payroll / Element
  payrollName:      { min: 2, max: 100, regex: NAME_REGEX,  regexMsg: 'only letters, numbers, spaces and basic punctuation allowed' },
  payrollCode:      { min: 1, max: 20,  regex: CODE_REGEX,  regexMsg: 'only letters, numbers, hyphens and underscores allowed' },
  elementCode:      { min: 1, max: 20,  regex: CODE_REGEX,  regexMsg: 'only letters, numbers, hyphens and underscores allowed' },
  elementName:      { min: 2, max: 100, regex: NAME_REGEX,  regexMsg: 'only letters, numbers, spaces and basic punctuation allowed' },

  // Security
  roleCode:         { min: 2, max: 30,  regex: CODE_REGEX,  regexMsg: 'only letters, numbers, hyphens and underscores allowed' },
  roleName:         { min: 2, max: 100, regex: NAME_REGEX,  regexMsg: 'only letters, numbers, spaces and basic punctuation allowed' },

  // Absence / Leave
  absenceCode:      { min: 1, max: 10,  regex: CODE_REGEX,  regexMsg: 'only letters, numbers, hyphens and underscores allowed' },
  absenceName:      { min: 2, max: 100, regex: NAME_REGEX,  regexMsg: 'only letters, numbers, spaces and basic punctuation allowed' },

  // Training
  programCode:      { min: 1, max: 20,  regex: CODE_REGEX,  regexMsg: 'only letters, numbers, hyphens and underscores allowed' },
  programName:      { min: 2, max: 100, regex: NAME_REGEX,  regexMsg: 'only letters, numbers, spaces and basic punctuation allowed' },

  // Competence
  competenceCode:   { min: 1, max: 20,  regex: CODE_REGEX,  regexMsg: 'only letters, numbers, hyphens and underscores allowed' },
  competenceName:   { min: 2, max: 100, regex: NAME_REGEX,  regexMsg: 'only letters, numbers, spaces and basic punctuation allowed' },

  // Location Type
  locationTypeName: { min: 2, max: 100, regex: NAME_REGEX,  regexMsg: 'only letters, numbers, spaces and basic punctuation allowed' },

  // Schedule
  scheduleCode:     { min: 1, max: 20,  regex: CODE_REGEX,  regexMsg: 'only letters, numbers, hyphens and underscores allowed' },
  scheduleName:     { min: 2, max: 100, regex: NAME_REGEX,  regexMsg: 'only letters, numbers, spaces and basic punctuation allowed' },
};
// ─────────────────────────────────────────────────────────────────────────────

function validateField(name, value, label, isRequired) {
  const isEmpty = value === undefined || value === null || String(value).trim() === '';

  if (isEmpty) {
    return isRequired ? `${label} is required.` : null;
  }

  const rules = FIELD_RULES[name];
  if (!rules) return null;

  const str = String(value).trim();

  if (rules.min && str.length < rules.min) {
    return `${label} must be at least ${rules.min} characters.`;
  }
  if (rules.max && str.length > rules.max) {
    return `${label} must be at most ${rules.max} characters.`;
  }
  if (rules.regex && !rules.regex.test(str)) {
    return `${label} is invalid — ${rules.regexMsg}.`;
  }

  return null;
}

function validateForm(fields, form) {
  const errors = {};
  fields.forEach((f) => {
    const err = validateField(f.name, form[f.name], f.label, f.required);
    if (err) errors[f.name] = err;
  });
  return errors;
}
// ─────────────────────────────────────────────────────────────────────────────

const CRUDModule = ({ title, endpoint, columns, fields, defaultValues = {}, deleteConfirmation }) => {
  const { data, loading, create, update, remove } = useCRUD(endpoint);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(defaultValues);
  const [confirmId, setConfirmId] = useState(null);
  const [optionsData, setOptionsData] = useState({});
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [deleteError, setDeleteError] = useState(null);

  const fetchOptions = async (field, currentForm = {}) => {
    if (!field.optionsUrl) return;
    try {
      const params = { limit: 200 };
      if (field.dependsOn) {
        const parentValue = currentForm[field.dependsOn];
        if (!parentValue) {
          setOptionsData(prev => ({ ...prev, [field.name]: [] }));
          return;
        }
        params[field.dependsOn] = parentValue;
      }
      const service = makeService(field.optionsUrl);
      const res = await service.getAll(params);
      const items = res.data.data || res.data;
      const mappedOptions = items.map(item => ({
        value: field.optionValue ? item[field.optionValue] : item.id,
        label: item[field.optionLabel || 'name'] || item.id,
      }));
      setOptionsData(prev => ({ ...prev, [field.name]: mappedOptions }));
    } catch (err) {
      console.error(`Failed to fetch options for ${field.name}:`, err);
    }
  };

  useEffect(() => {
    if (modalOpen) {
      fields.forEach(f => {
        if (f.optionsUrl && !f.dependsOn) fetchOptions(f, form);
        else if (f.optionsUrl && f.dependsOn && form[f.dependsOn]) fetchOptions(f, form);
      });
    }
  }, [modalOpen]);

  const openCreate = () => {
    setEditing(null);
    setForm(defaultValues);
    setError(null);
    setFieldErrors({});
    setModalOpen(true);
  };

  const openEdit = (row) => {
    setEditing(row);
    setForm({ ...defaultValues, ...row });
    setError(null);
    setFieldErrors({});
    setModalOpen(true);
  };

  const handleChange = (name, value) => {
    setError(null);
    setFieldErrors(prev => ({ ...prev, [name]: null }));
    setForm((f) => {
      const newForm = { ...f, [name]: value };
      fields.forEach(field => {
        if (field.dependsOn === name) {
          newForm[field.name] = '';
          fetchOptions(field, newForm);
        }
      });
      return newForm;
    });
    const field = fields.find(f => f.name === name);
    if (field?.trigger) handleTrigger(field, value);
  };

  const handleTrigger = async (field, value) => {
    if (!field.trigger || !value) return;
    try {
      const { url, params, mapping } = field.trigger;
      const queryParams = params ? params(value) : { [field.name]: value };
      const response = await api.get(`/${url}`, { params: queryParams });
      if (response.data) {
        const result = response.data;
        const updates = {};
        Object.entries(mapping).forEach(([formField, apiField]) => {
          if (result[apiField] !== undefined) updates[formField] = result[apiField];
        });
        setForm(f => ({ ...f, ...updates }));
      }
    } catch (err) {
      console.error('Trigger failed:', err);
    }
  };

  const handleBlur = (name, value) => {
    // Validate on blur if field has rules
    if (FIELD_RULES[name] && value !== undefined && value !== '') {
      const field = fields.find(f => f.name === name);
      if (field) {
        const err = validateField(name, value, field.label, field.required);
        if (err) setFieldErrors(prev => ({ ...prev, [name]: err }));
      }
    }
    const field = fields.find(f => f.name === name);
    if (field?.trigger) handleTrigger(field, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const errors = validateForm(fields, form);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      // Scroll to first error
      const firstErrorKey = Object.keys(errors)[0];
      const el = document.querySelector(`[name="${firstErrorKey}"]`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    try {
      if (editing) await update(editing.id, form);
      else await create(form);
      setModalOpen(false);
      setFieldErrors({});
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'An unexpected error occurred';
      setError(msg);
    }
  };

  const handleDelete = async (id) => {
    setDeleteError(null);
    try {
      await remove(id);
      setConfirmId(null);
    } catch (err) {
      const status = err.response?.status;
      const msg = err.response?.data?.error || err.message || 'An unexpected error occurred';
      if (status === 409) {
        setDeleteError('Cannot delete: this record has dependent data. Remove related records first.');
      } else {
        setDeleteError(msg);
      }
    }
  };

  const handleToggle = async (id, key, newValue) => {
    try {
      await update(id, { [key]: newValue });
    } catch (err) {
      console.error('Toggle failed:', err);
    }
  };

  const hasErrors = Object.values(fieldErrors).some(Boolean);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <button
          onClick={openCreate}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition shadow-sm"
        >
          + Add New
        </button>
      </div>

      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        onEdit={openEdit}
        onDelete={(id) => { setDeleteError(null); setConfirmId(id); }}
        onToggle={handleToggle}
      />

      {/* Create/Edit Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? `Edit ${title}` : `New ${title}`} size="lg">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm flex items-center gap-2">
            <span className="text-base">⚠️</span>
            {error}
          </div>
        )}
        {hasErrors && (
          <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 text-sm">
            ⚠ Please fix the errors below before submitting.
          </div>
        )}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fields.map((f) => (
            <div key={f.name} className={f.full ? 'sm:col-span-2' : ''}>
              <FormField
                {...f}
                value={form[f.name]}
                onChange={handleChange}
                onBlur={handleBlur}
                options={f.optionsUrl ? optionsData[f.name] : f.options}
                error={fieldErrors[f.name]}
              />
              {fieldErrors[f.name] && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <span>⚠</span> {fieldErrors[f.name]}
                </p>
              )}
            </div>
          ))}
          <div className="sm:col-span-2 flex justify-end gap-3 pt-2 border-t border-gray-100">
            <button type="button" onClick={() => setModalOpen(false)}
              className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition">
              Cancel
            </button>
            <button type="submit"
              className="px-5 py-2 text-sm rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition shadow-sm">
              {editing ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal
        isOpen={!!confirmId}
        onClose={() => { setConfirmId(null); setDeleteError(null); }}
        title="Confirm Delete"
        size="sm"
      >
        {deleteError ? (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
            <p className="font-medium">⚠️ Cannot Delete</p>
            <p className="mt-1">{deleteError}</p>
          </div>
        ) : (
          <p className="text-gray-600 mb-6">
            {deleteConfirmation || "Are you sure you want to delete this record? This action cannot be undone."}
          </p>
        )}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => { setConfirmId(null); setDeleteError(null); }}
            className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition"
          >
            {deleteError ? 'Close' : 'Cancel'}
          </button>
          {!deleteError && (
            <button
              onClick={() => handleDelete(confirmId)}
              className="px-5 py-2 text-sm rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
            >
              Delete
            </button>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default CRUDModule;