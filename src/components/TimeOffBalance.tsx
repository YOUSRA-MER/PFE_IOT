export default function TimeOffBalance() {
    const balances = [
      { type: "Congés payés", remaining: 12, total: 25 },
      { type: "RTT", remaining: 3, total: 8 },
      { type: "Congés maladie", remaining: 5, total: 5 },
    ];
  
    return (
      <div className="bg-white p-4 rounded-lg shadow h-full">
        <h2 className="text-lg font-semibold mb-4">Solde de Congés</h2>
        <div className="space-y-4">
          {balances.map((balance, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span>{balance.type}</span>
                <span>{balance.remaining}/{balance.total} jours</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${(balance.remaining / balance.total) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }