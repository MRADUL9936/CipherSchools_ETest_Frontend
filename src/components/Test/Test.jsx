import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Test() {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from backend
    const fetchTests = async () => {
      try {
        const response = await fetch('https://cipherschools-etest-backend.onrender.com/test');
        const data = await response.json();
        setTests(data); // Store fetched tests in state
      } catch (error) {
        console.error('Error fetching test data:', error);
      }
    };

    fetchTests();
  }, []);


  ///function after use click on the start test
  function startTest(testId) {
    navigate('/tests/permissions', { state: { testId } });
    // Navigate to the test page or start the test logic here
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Available Tests</h1>
      {tests.map((test) => (
        <div
          key={test._id}
          className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200"
        >
          <h2 className="text-xl font-semibold">{test.title}</h2>
          <p className="text-gray-600 mb-4">{test.description}</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => startTest(test._id)}
          >
            Start Test
          </button>
        </div>
      ))}
    </div>
  );


}
