import { useState, useEffect } from 'react';
import FormBuilder from '../components/Form/FormBuilder';
import FormList from '../components/Form/FormList';
import ResponseViewer from '../components/Form/ResponseViewer';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const { formId } = useParams();
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (formId) {
      const fetchForm = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/forms/${formId}`, {
            headers: { 'x-auth-token': localStorage.getItem('token') }
          });
          setForm(res.data);
        } catch (err) {
          console.error('Error fetching form:', err);
        }
      };
      fetchForm();
    }
  }, [formId]);

  return (
    <div className="container mx-auto mt-8">
      {formId && form ? (
        <ResponseViewer formId={formId} form={form} />
      ) : (
        <>
          <FormBuilder />
          {/* <FormList /> */}
        </>
      )}
    </div>
  );
}

export default Dashboard;