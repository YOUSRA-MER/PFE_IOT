import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', present: 20, absent: 2 },
  { name: 'Feb', present: 18, absent: 4 },
  { name: 'Mar', present: 22, absent: 1 },
  { name: 'Apr', present: 19, absent: 3 },
  { name: 'May', present: 21, absent: 1 },
];

export default function TeamAttendance() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Présence de l'équipe</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="present" fill="#4ade80" />
            <Bar dataKey="absent" fill="#f87171" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}