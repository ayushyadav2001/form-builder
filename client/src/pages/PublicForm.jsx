import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FormView from '../components/Form/FormView';

function PublicForm() {
  const { id } = useParams();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/forms/${id}`);
        setForm(res.data);
      } catch (err) {
        console.error('Error fetching public form:', err);
      }
    };
    fetchForm();
  }, [id]);

  if (!form) return <div>Loading...</div>;

  return <FormView form={form} />;
}

export default PublicForm;