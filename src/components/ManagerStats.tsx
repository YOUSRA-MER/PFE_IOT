export default function ManagerStats() {
    const stats = [
      { name: "Présence aujourd'hui", value: "85%", change: "+2%" },
      { name: "Retards ce mois", value: "3", change: "-1" },
      { name: "Absences non justifiées", value: "1", change: "0" },
    ];
  
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Statistiques</h2>
        <div className="space-y-4">
          {stats.map((stat, index) => (
            <div key={index} className="border-b pb-4 last:border-b-0">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">{stat.name}</span>
                <span className="font-medium">{stat.value}</span>
              </div>
              <div className="text-xs text-green-600 mt-1">
                {stat.change} vs mois dernier
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }