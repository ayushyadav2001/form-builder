// frontend/src/components/Form/ResponseViewer.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:5000', {
  withCredentials: true,
  transports: ['websocket', 'polling'],
});

function ResponseViewer({ formId, form }) {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    socket.emit('joinForm', formId);

    const fetchResponses = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/responses/${formId}`, {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setResponses(res.data);
      } catch (err) {
        console.error('Error fetching responses:', err);
      }
    };
    fetchResponses();

    socket.on('newResponse', (response) => {
      setResponses((prev) => [...prev, response]);
    });

    return () => {
      socket.off('newResponse');
    };
  }, [formId]);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Responses</h2>
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Timestamp</th>
              {form.fields.map((field, index) => (
                <th key={index} className="border p-2">{field.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {responses.map((response) => (
              <tr key={response._id}>
                <td className="border p-2">
                  {new Date(response.createdAt).toLocaleString()}
                </td>
                {form.fields.map((field, index) => (
                  <td key={index} className="border p-2">
                    {response.responses.find((r) => r.fieldId === index.toString())?.value || '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ResponseViewer;