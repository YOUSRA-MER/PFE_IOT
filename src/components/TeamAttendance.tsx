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
    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-gray-800 dark:text-white">Présence de l'équipe</h2>
        <select className="text-xs border border-gray-200 dark:border-gray-600 rounded-md px-2 py-1 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-lamaSky dark:focus:ring-lamaSkyDark">
          <option>Dernier 6 mois</option>
          <option>Dernier 3 mois</option>
          <option>Cette année</option>
        </select>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" strokeOpacity={0.2} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              fontSize={10} 
              tick={{ fill: '#6b7280' }} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              fontSize={10} 
              tick={{ fill: '#6b7280' }} 
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#111827',
                borderRadius: '4px', 
                border: 'none', 
                boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                fontSize: '10px' 
              }} 
            />
            <Legend 
              wrapperStyle={{ 
                paddingTop: '5px', 
                fontSize: '10px',
                color: '#6b7280'
              }} 
            />
            <Bar dataKey="present" name="Présent" fill="#A4D7E1" radius={[3, 3, 0, 0]} />
            <Bar dataKey="absent" name="Absent" fill="#B39BCB" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}