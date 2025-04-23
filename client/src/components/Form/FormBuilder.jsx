// frontend/src/components/Form/FormBuilder.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';;

function FormBuilder() {
  const [title, setTitle] = useState('');
  const [fields, setFields] = useState([]);
  const navigate = useNavigate();



   const [forms, setForms] = useState([]);



  const addField = (type) => {
    setFields([...fields, {
      type,
      label: '',
      placeholder: '',
      required: false,
      options: type === 'dropdown' || type === 'radio' ? [''] : []
    }]);
  };

  const updateField = (index, key, value) => {
    const newFields = [...fields];
    newFields[index][key] = value;
    setFields(newFields);
  };

  const addOption = (index) => {
    const newFields = [...fields];
    newFields[index].options.push('');
    setFields(newFields);
  };

  const updateOption = (fieldIndex, optionIndex, value) => {
    const newFields = [...fields];
    newFields[fieldIndex].options[optionIndex] = value;
    setFields(newFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/forms', 
        { title, fields },
        { headers: { 'x-auth-token': localStorage.getItem('token') } }
      );
      setTitle("")
      setFields([])
       fetchForms();
      navigate('/dashboard');
    } catch (err) {
      console.error('Error creating form:', err);
    }
  };

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
    useEffect(() => {
   
    fetchForms();
  }, []);

  return (
    <div className='container mx-auto '>
      <section className='container mx-auto '>
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Create New Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Form Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border p-2 rounded"
              required />
          </div>
          <div className="flex space-x-2 mb-4">
            <button type="button" onClick={() => addField('text')} className="bg-gray-200 px-4 py-2 rounded">
              Add Text
            </button>
            <button type="button" onClick={() => addField('dropdown')} className="bg-gray-200 px-4 py-2 rounded">
              Add Dropdown
            </button>
            <button type="button" onClick={() => addField('radio')} className="bg-gray-200 px-4 py-2 rounded">
              Add Radio
            </button>
            <button type="button" onClick={() => addField('textarea')} className="bg-gray-200 px-4 py-2 rounded">
              Add Textarea
            </button>
          </div>
          {fields.map((field, index) => (
            <div key={index} className="border p-4 rounded mb-4">
              <div className="mb-2">
                <label className="block mb-1">Label</label>
                <input
                  type="text"
                  value={field.label}
                  onChange={(e) => updateField(index, 'label', e.target.value)}
                  className="w-full border p-2 rounded" />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Placeholder</label>
                <input
                  type="text"
                  value={field.placeholder}
                  onChange={(e) => updateField(index, 'placeholder', e.target.value)}
                  className="w-full border p-2 rounded" />
              </div>
              <div className="mb-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={field.required}
                    onChange={(e) => updateField(index, 'required', e.target.checked)}
                    className="mr-2" />
                  Required
                </label>
              </div>
              {(field.type === 'dropdown' || field.type === 'radio') && (
                <div>
                  <h4 className="font-bold mb-2">Options</h4>
                  {field.options.map((option, optIndex) => (
                    <input
                      key={optIndex}
                      type="text"
                      value={option}
                      onChange={(e) => updateOption(index, optIndex, e.target.value)}
                      className="w-full border p-2 rounded mb-2" />
                  ))}
                  <button
                    type="button"
                    onClick={() => addOption(index)}
                    className="bg-gray-200 px-4 py-2 rounded"
                  >
                    Add Option
                  </button>
                </div>
              )}
            </div>
          ))}
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Create Form
          </button>
        </form>
      </div>
    </section><section>

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
      </section></div>
  );
}

export default FormBuilder;