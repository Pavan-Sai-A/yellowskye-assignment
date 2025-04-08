import React from "react";
const Badge = ({ label }: { label: string }) => (
  <div className="flex items-center text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
    {label}
  </div>
);

export default Badge;
