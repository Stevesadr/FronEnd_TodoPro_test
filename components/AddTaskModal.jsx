import React, { useState } from "react";

const AddTaskModal = ({ isOpen, onClose, onAdd }) => {
  const [title, setTitle] = useState("");
  const [taskDate, setTaskDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [taskHour, setTaskHour] = useState(new Date().getHours());
  const [taskMinute, setTaskMinute] = useState(new Date().getMinutes());

  const handleSubmit = () => {
    if (title.trim()) {
      onAdd(title, taskDate, taskHour, taskMinute);
      setTitle("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-3xl">
      <div className="bg-white rounded-lg p-6 w-96 z-50 border-2">
        <h3 className="text-lg font-semibold mb-4">Add New Task</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hour
              </label>
              <select
                value={taskHour}
                onChange={(e) => setTaskHour(parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={i}>
                    {i.toString().padStart(2, "0")}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minute
              </label>
              <select
                value={taskMinute}
                onChange={(e) => setTaskMinute(parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                {Array.from({ length: 60 }, (_, i) => (
                  <option key={i} value={i}>
                    {i.toString().padStart(0)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
