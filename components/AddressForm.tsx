"use client";

import { createAddress } from "@/actions/createAddress";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface AddressFormProps {
  onSuccess?: () => void;
  trigger?: React.ReactNode;
}

export function AddressForm({ onSuccess, trigger }: AddressFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session } = authClient.useSession();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    default: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({
      ...formData,
      default: checked,
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Address name is required");
      return false;
    }
    if (!formData.address.trim()) {
      toast.error("Street address is required");
      return false;
    }
    if (!formData.city.trim()) {
      toast.error("City is required");
      return false;
    }
    if (!formData.state.trim() || formData.state.length !== 2) {
      toast.error("State must be 2 letters (e.g., NY, CA)");
      return false;
    }
    if (!formData.zip.match(/^\d{5}(-\d{4})?$/)) {
      toast.error("Please enter a valid ZIP code (e.g., 12345 or 12345-6789)");
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setFormData({
      name: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      default: false,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (!session?.user?.email) {
      toast.error("Please login to add address");
      return;
    }

    setLoading(true);

    try {
      const addressData = {
        name: formData.name,
        email: session.user.email,
        address: formData.address,
        city: formData.city,
        state: formData.state.toUpperCase(),
        zip: formData.zip,
        default: formData.default,
        createdAt: new Date().toISOString(),
      };

      console.log("Sending to server action:", addressData);

      // Call server action
      const result = await createAddress(addressData);

      if (result.success) {
        toast.success("Address added successfully!");
        resetForm();
        setOpen(false);
        onSuccess?.();
      } else {
        toast.error(result.error || "Failed to add address");
      }
    } catch (error) {
      console.error("Error adding address:", error);
      toast.error("Failed to add address. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="w-full mt-4">
            Add New Address +
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Add New Address
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium">
              Address Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g., Home, Work, Office"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              required
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              A friendly name to identify this address
            </p>
          </div>

          <div>
            <Label htmlFor="address" className="text-sm font-medium">
              Street Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="address"
              name="address"
              placeholder="123 Main St, Apt 4B"
              value={formData.address}
              onChange={handleChange}
              disabled={loading}
              required
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city" className="text-sm font-medium">
                City <span className="text-red-500">*</span>
              </Label>
              <Input
                id="city"
                name="city"
                placeholder="New York"
                value={formData.city}
                onChange={handleChange}
                disabled={loading}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="state" className="text-sm font-medium">
                State <span className="text-red-500">*</span>
              </Label>
              <Input
                id="state"
                name="state"
                placeholder="NY"
                maxLength={2}
                value={formData.state}
                onChange={handleChange}
                disabled={loading}
                required
                className="mt-1 uppercase"
              />
              <p className="text-xs text-gray-500 mt-1">2-letter code</p>
            </div>
          </div>

          <div>
            <Label htmlFor="zip" className="text-sm font-medium">
              ZIP Code <span className="text-red-500">*</span>
            </Label>
            <Input
              id="zip"
              name="zip"
              placeholder="12345 or 12345-6789"
              value={formData.zip}
              onChange={handleChange}
              disabled={loading}
              required
              className="mt-1"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="default"
              checked={formData.default}
              onCheckedChange={handleCheckboxChange}
              disabled={loading}
            />
            <Label
              htmlFor="default"
              className="text-sm font-medium cursor-pointer"
            >
              Set as default address
            </Label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-shop_dark_green hover:bg-shop_dark_green/90"
            >
              {loading ? "Adding..." : "Add Address"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
