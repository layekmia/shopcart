import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";

interface Props {
  onReset: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  title: string;
  details: string;
}

const ResetAlert = ({ onReset, isOpen, setIsOpen, title, details }: Props) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{details}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="bg-gray-200 hover:bg-gray-300">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction asChild>
            <button
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={() => {
                onReset();
                toast.success("Cart reset successfully");
                setIsOpen(false);
              }}
            >
              Yes, Reset
            </button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ResetAlert;
