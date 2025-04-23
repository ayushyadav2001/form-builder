import { useState } from 'react';
import axios from 'axios';

function FormView({ form }) {
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/responses/${form._id}`, {
        responses: Object.entries(responses).map(([fieldId, value]) => ({
          fieldId,
          value
        }))
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  if (submitted) {
    return (
      <div className="container mx-auto mt-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
        <p>Your response has been submitted successfully.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">{form.title}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {form.fields.map((field, index) => (
          <div key={index} className="mb-4">
            <label className="block mb-1">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            {field.type === 'text' && (
              <input
                type="text"
                placeholder={field.placeholder}
                onChange={(e) => setResponses({ ...responses, [index]: e.target.value })}
                className="w-full border p-2 rounded"
                required={field.required}
              />
            )}
            {field.type === 'textarea' && (
              <textarea
                placeholder={field.placeholder}
                onChange={(e) => setResponses({ ...responses, [index]: e.target.value })}
                className="w-full border p-2 rounded"
                required={field.required}
              />
            )}
            {field.type === 'dropdown' && (
              <select
                onChange={(e) => setResponses({ ...responses, [index]: e.target.value })}
                className="w-full border p-2 rounded"
                required={field.required}
              >
                <option value="">Select an option</option>
                {field.options.map((option, optIndex) => (
                  <option key={optIndex} value={option}>{option}</option>
                ))}
              </select>
            )}
            {field.type === 'radio' && (
              <div className="space-y-2">
                {field.options.map((option, optIndex) => (
                  <label key={optIndex} className="flex items-center">
                    <input
                      type="radio"
                      name={`field-${index}`}
                      value={option}
                      onChange={(e) => setResponses({ ...responses, [index]: e.target.value })}
                      className="mr-2"
                      required={field.required}
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}

export default FormView;