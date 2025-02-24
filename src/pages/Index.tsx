
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const referralSchema = z.object({
  referrerName: z.string().min(2, "Name must be at least 2 characters"),
  referrerEmail: z.string().email("Please enter a valid email"),
  friendName: z.string().min(2, "Name must be at least 2 characters"),
  friendEmail: z.string().email("Please enter a valid email"),
  course: z.string().min(1, "Please select a course"),
  message: z.string().optional(),
});

type ReferralForm = z.infer<typeof referralSchema>;

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReferralForm>({
    resolver: zodResolver(referralSchema),
  });

  const onSubmit = async (data: ReferralForm) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: "Referral Sent Successfully!",
        description: "We'll notify you once your friend enrolls.",
      });
      
      setIsModalOpen(false);
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-24 sm:px-8 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
        <div className="container relative mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="max-w-xl animate-fade-in">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                Refer & Earn Program
              </span>
              <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Share Knowledge, <br />
                <span className="text-primary">Earn Rewards</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                Refer your friends to our courses and earn exclusive rewards. Help them start their learning journey while you get amazing benefits.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="btn-primary animate-scale-in"
                >
                  Refer Now
                </button>
              </div>
            </div>
            <div className="relative lg:mt-0">
              <img
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
                alt="Person using laptop"
                className="w-full rounded-2xl object-cover shadow-2xl animate-fade-in"
              />
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-24 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="feature-card"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Referral Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Refer a Friend</DialogTitle>
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
                  className="input-field"
                  placeholder="Enter your name"
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
                  className="input-field"
                  placeholder="Enter your email"
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
                  className="input-field"
                  placeholder="Enter friend's name"
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
                  className="input-field"
                  placeholder="Enter friend's email"
                />
                {errors.friendEmail && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.friendEmail.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Select Course</label>
                <select {...register("course")} className="input-field">
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
                <label className="text-sm font-medium">Personal Message (Optional)</label>
                <textarea
                  {...register("message")}
                  className="input-field min-h-[100px]"
                  placeholder="Add a personal message to your friend..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
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
    </div>
  );
};

const features = [
  {
    title: "Earn Rewards",
    description: "Get exclusive rewards for each successful referral. The more friends you bring, the more you earn.",
  },
  {
    title: "Track Progress",
    description: "Monitor your referrals and rewards in real-time through your personalized dashboard.",
  },
  {
    title: "Easy Sharing",
    description: "Share course recommendations with your friends in just a few clicks.",
  },
];

export default Index;
