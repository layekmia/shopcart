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
  resetCart: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartResetAlert = ({ resetCart, isOpen, setIsOpen }: Props) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reset Your Cart?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to reset your cart? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="bg-gray-200 hover:bg-gray-300">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction asChild>
            <button
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={() => {
                resetCart();
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

export default CartResetAlert;
