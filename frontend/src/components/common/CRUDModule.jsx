import React, { useState } from 'react';
import DataTable from './DataTable';
import Modal from './Modal';
import FormField from './FormField';
import useCRUD from '../../hooks/useCRUD';

const CRUDModule = ({ title, endpoint, columns, fields, defaultValues = {} }) => {
  const { data, loading, create, update, remove } = useCRUD(endpoint);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(defaultValues);
  const [confirmId, setConfirmId] = useState(null);

  const openCreate = () => {
    setEditing(null);
    setForm(defaultValues);
    setModalOpen(true);
  };

  const openEdit = (row) => {
    setEditing(row);
    setForm({ ...defaultValues, ...row });
    setModalOpen(true);
  };

  const handleChange = (name, value) => setForm((f) => ({ ...f, [name]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) await update(editing.id, form);
      else await create(form);
      setModalOpen(false);
    } catch (_) {}
  };

  const handleDelete = async (id) => {
    await remove(id);
    setConfirmId(null);
  };

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
        onDelete={(id) => setConfirmId(id)}
      />

      {/* Create/Edit Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? `Edit ${title}` : `New ${title}`} size="lg">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fields.map((f) => (
            <div key={f.name} className={f.full ? 'sm:col-span-2' : ''}>
              <FormField {...f} value={form[f.name]} onChange={handleChange} />
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
      <Modal isOpen={!!confirmId} onClose={() => setConfirmId(null)} title="Confirm Delete" size="sm">
        <p className="text-gray-600 mb-6">Are you sure you want to delete this record? This action cannot be undone.</p>
        <div className="flex justify-end gap-3">
          <button onClick={() => setConfirmId(null)}
            className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition">
            Cancel
          </button>
          <button onClick={() => handleDelete(confirmId)}
            className="px-5 py-2 text-sm rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition">
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CRUDModule;
