import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function ManagerStats() {
  const stats = [
    { 
      name: "Présence aujourd'hui", 
      value: "85%", 
      change: "+2%", 
      trend: "up",
      color: "bg-lamaSky dark:bg-lamaSkyDark" 
    },
    { 
      name: "Retards ce mois", 
      value: "3", 
      change: "-1", 
      trend: "down",
      color: "bg-lamaYellow dark:bg-lamaYellowDark" 
    },
    { 
      name: "Absences non justifiées", 
      value: "1", 
      change: "0", 
      trend: "neutral",
      color: "bg-lamaPurple dark:bg-lamaPurpleDark" 
    },
  ];

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="h-2.5 w-2.5 text-green-600 dark:text-green-400" />;
    if (trend === "down") return <TrendingDown className="h-2.5 w-2.5 text-red-600 dark:text-red-400" />;
    return <Minus className="h-2.5 w-2.5 text-gray-400 dark:text-gray-500" />;
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 h-full">
      <h2 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">Statistiques</h2>
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="relative">
            <div className="flex items-center mb-1">
              <div className={`w-2 h-2 rounded-full ${stat.color} mr-1.5`}></div>
              <span className="text-xs text-gray-500 dark:text-gray-400">{stat.name}</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-base font-medium text-gray-800 dark:text-white">{stat.value}</span>
              <div className="flex items-center space-x-1 text-xs">
                {getTrendIcon(stat.trend)}
                <span className={`${
                  stat.trend === "neutral" ? "text-gray-500 dark:text-gray-400" : 
                  stat.trend === "up" ? "text-green-600 dark:text-green-400" : 
                  "text-red-600 dark:text-red-400"
                } text-xs`}>
                  {stat.change}
                </span>
              </div>
            </div>
            <div className="mt-1 w-full h-1 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className={`h-full ${stat.color} rounded-full`} style={{ width: stat.trend === "up" ? "85%" : stat.trend === "down" ? "30%" : "10%" }}></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
        <h3 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Activité Récente</h3>
        <div className="space-y-1.5">
          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-baseline">
            <span className="mr-1 text-xs">•</span>
            <span className="text-gray-600 dark:text-gray-300 font-medium mr-1 text-xs">08:30</span>
            <span className="text-xs">- 3 nouveaux enregistrements</span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-baseline">
            <span className="mr-1 text-xs">•</span>
            <span className="text-gray-600 dark:text-gray-300 font-medium mr-1 text-xs">Hier</span>
            <span className="text-xs">- Rapport hebdomadaire généré</span>
          </div>
        </div>
      </div>
    </div>
  );
}