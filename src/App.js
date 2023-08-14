import React from 'react';
import CombinedBarChart from './CombinedBarChart';

const datasets = [
  {
    label: 'Data 1',
    data: [
      { date: '2023-08-01', remediation: 10, totalInvocations: 50 },
      { date: '2023-08-02', remediation: 15, totalInvocations: 60 },
      { date: '2023-08-03', remediation: 35, totalInvocations: 10 },
      // Add more data entries here
    ],
    backgroundColor: 'rgba(66, 165, 245, 0.6)',
  },
  {
    label: 'Data 2',
    data: [
      { date: '2023-08-01', remediation: 5, totalInvocations: 30 },
      { date: '2023-08-02', remediation: 12, totalInvocations: 40 },
      // Add more data entries here
    ],
    backgroundColor: 'rgba(255, 99, 132, 0.6)',
  },
  {
    label: 'Data 3',
    data: [
      { date: '2023-08-01', remediation: 15, totalInvocations: 50 },
      { date: '2023-08-03', remediation: 12, totalInvocations: 40 },
      // Add more data entries here
    ],
    backgroundColor: 'rgba(125, 99, 132, 0.6)',
  },
  // Add more datasets here
  
];

function App() {
  return (
    <div className="App">
      <CombinedBarChart datasets={datasets} />
    </div>
  );
}

export default App;
