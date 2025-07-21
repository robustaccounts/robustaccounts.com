import React from "react";
import LeadForm from "@/components/lead-form";

interface ScheduleCallProps {
  isOpen: boolean;
  onClose: () => void;
}

const ScheduleCall: React.FC<ScheduleCallProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <LeadForm />
      </div>
    </div>
  );
};

export default ScheduleCall;
