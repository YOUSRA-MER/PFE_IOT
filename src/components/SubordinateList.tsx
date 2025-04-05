import Table from "@/components/Table";

const subordinates = [
  { name: "Jean Dupont", department: "IT", lastCheckIn: "08:45", status: "Present" },
  { name: "Marie Martin", department: "HR", lastCheckIn: "09:15", status: "Present" },
  { name: "Pierre Durand", department: "Finance", lastCheckIn: "08:30", status: "Present" },
  { name: "Sophie Lambert", department: "IT", lastCheckIn: "-", status: "Absent" },
];

export default function SubordinateList() {
  const columns = [
    { header: "Nom", accessor: "name" },
    { header: "Département", accessor: "department" },
    { header: "Dernier Pointage", accessor: "lastCheckIn" },
    { 
      header: "Statut", 
      accessor: "status",
      renderCell: (status: string) => (
        <span className={`px-2 py-1 rounded text-xs ${
          status === "Present" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}>
          {status}
        </span>
      )
    },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Mes Collaborateurs</h2>
      <Table 
        columns={columns} 
        data={subordinates}
        className="w-full"
      />
    </div>
  );
}