export default function UserProfileCard() {
    const user = {
      name: "Jean Dupont",
      matricule: "D6M3N093",
      department: "IT",
      email: "jean.dupont@entreprise.com",
      manager: "Marie Martin",
    };
  
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold">
            JD
          </div>
          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-gray-600">#{user.matricule}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div>
            <span className="text-sm text-gray-500">Département:</span>
            <p>{user.department}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Email:</span>
            <p>{user.email}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Manager:</span>
            <p>{user.manager}</p>
          </div>
        </div>
      </div>
    );
  }