import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // Import your Dialog components
import { useToast } from "@/hooks/use-toast";

// Define the form validation schema
const referralSchema = z.object({
  referrerName: z.string().min(2, "Name must be at least 2 characters"),
  referrerEmail: z.string().email("Please enter a valid email"),
  friendName: z.string().min(2, "Name must be at least 2 characters"),
  friendEmail: z.string().email("Please enter a valid email"),
  course: z.string().min(1, "Please select a course"),
  message: z.string().optional(),
});

type ReferralForm = z.infer<typeof referralSchema>;

const ReferralDialog = () => {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReferralForm>({
    resolver: zodResolver(referralSchema),
  });

  // If using a separate backend, update this URL via env variable
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

  const onSubmit = async (data: ReferralForm) => {
    try {
      const response = await fetch(`${API_URL}/api/referrals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong.");
      }

      await response.json();
      toast({
        title: "Referral Sent Successfully!",
        description: "We'll notify you once your friend enrolls.",
      });
      reset();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <button className="btn-primary">Refer Now</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg" data-aos="zoom-in">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Refer a Friend
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Fill in the details below to refer your friend
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Your Name</label>
              <input
                type="text"
                {...register("referrerName")}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.referrerName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.referrerName.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">Your Email</label>
              <input
                type="email"
                {...register("referrerEmail")}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.referrerEmail && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.referrerEmail.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">Friend's Name</label>
              <input
                type="text"
                {...register("friendName")}
                placeholder="Enter friend's name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.friendName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.friendName.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">Friend's Email</label>
              <input
                type="email"
                {...register("friendEmail")}
                placeholder="Enter friend's email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.friendEmail && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.friendEmail.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">Select Course</label>
              <select
                {...register("course")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select a course</option>
                <option value="web-development">Web Development</option>
                <option value="data-science">Data Science</option>
                <option value="mobile-dev">Mobile Development</option>
                <option value="ui-design">UI/UX Design</option>
              </select>
              {errors.course && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.course.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">
                Personal Message (Optional)
              </label>
              <textarea
                {...register("message")}
                placeholder="Add a personal message..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
              />
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                // Optional: handle dialog close if needed
              }}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
            >
              {isSubmitting ? "Sending..." : "Send Referral"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReferralDialog;
