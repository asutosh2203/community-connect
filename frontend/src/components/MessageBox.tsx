import { AlertCircle } from "lucide-react";

// A simple component to show error or success messages
const MessageBox: React.FC<{ message: string; type: "error" | "success" }> = ({
  message,
  type,
}) => {
  if (!message) return null;

  return (
    <div
      className={`rounded-md p-3 text-sm flex items-center space-x-2 ${
        type === "error"
          ? "bg-red-100 text-red-700"
          : "bg-green-100 text-green-700"
      }`}
    >
      <AlertCircle className="h-5 w-5 shrink-0" />
      <span>{message}</span>
    </div>
  );
};

export default MessageBox;
