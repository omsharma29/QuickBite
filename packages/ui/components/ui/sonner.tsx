import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "bg-[#1E293B] text-white border border-[#F17228] shadow-lg", // Custom toast background & border
          description: "text-gray-300", // Message text
          actionButton: "bg-[#F17228] text-white hover:bg-[#FF5900] px-3 py-1 rounded-md", // Action button styling
          closeButton: "text-white hover:text-gray-400", // Close button styling
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
