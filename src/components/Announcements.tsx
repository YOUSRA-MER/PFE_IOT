const Announcements = () => {
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <span className="text-xs text-gray-400">View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="bg-lamaSkyLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Team Meeting Scheduled for Next Week</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              2025-01-01
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            The next team meeting is scheduled for next week, where we will discuss the project updates and deadlines. Please make sure to attend.
          </p>
        </div>
        <div className="bg-lamaPurpleLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Holiday Notice: Office Closed</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              2025-01-05
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            The office will be closed from January 5th to 7th in observance of the national holiday. All operations will resume on January 8th.
          </p>
        </div>
        <div className="bg-lamaYellowLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">New Policies Update</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              2025-01-10
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            We have updated the company policies regarding remote work and work-life balance. Please review the new policies in your email.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
