import React from "react";

const SettingsDash = (props) => {
  return (
    <div className="lg:col-span-3">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
        <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">
              Profile Information
            </h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p>Username: {props.user}</p>
              <p>Email: {props.email}</p>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-2">Preferences</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p>Theme: Light</p>
              <p>Notifications: Enabled</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsDash;
