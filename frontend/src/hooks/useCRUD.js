import { useState, useEffect, useCallback } from 'react';
import { makeService } from '../services/api';
import toast from 'react-hot-toast';

const useCRUD = (endpoint) => {
  const service = makeService(endpoint);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const fetchAll = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const res = await service.getAll({ page, limit: 20, ...params });
      setData(res.data.data || res.data);
      setTotal(res.data.total || 0);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, [endpoint, page]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const create = async (payload) => {
    try {
      const res = await service.create(payload);
      toast.success('Created successfully');
      fetchAll();
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.error || 'Create failed');
      throw err;
    }
  };

  const update = async (id, payload) => {
    try {
      const res = await service.update(id, payload);
      toast.success('Updated successfully');
      fetchAll();
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.error || 'Update failed');
      throw err;
    }
  };

  const remove = async (id) => {
    try {
      await service.remove(id);
      toast.success('Deleted successfully');
      fetchAll();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Delete failed');
      throw err;
    }
  };

  return { data, loading, total, page, setPage, fetchAll, create, update, remove };
};

export default useCRUD;
