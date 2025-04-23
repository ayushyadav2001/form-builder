import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function FormList() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/forms', {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setForms(res.data);
      } catch (err) {
        console.error('Error fetching forms:', err);
      }
    };
    fetchForms();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Your Forms</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {forms.map((form) => (
          <div key={form._id} className="border p-4 rounded">
            <h3 className="text-lg font-bold">{form.title}</h3>
            <p className="text-gray-600">Created: {new Date(form.createdAt).toLocaleDateString()}</p>
            <div className="mt-2">
              <Link
                to={`/form/${form._id}`}
                className="text-blue-500 mr-2"
                target="_blank"
              >
                Public Link
              </Link>
              <Link
                to={`/dashboard/${form._id}`}
                className="text-green-500"
              >
                View Responses
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormList;