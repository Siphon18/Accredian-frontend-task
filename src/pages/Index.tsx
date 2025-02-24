import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
    <>
      <Navbar />
      <div className="min-h-screen pt-16">
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

        {/* Benefits Section */}
        <section className="py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
              <h2 className="text-4xl font-bold mb-6">Referral Benefits</h2>
              <p className="text-gray-600 text-lg">Join our referral program and unlock amazing rewards for both you and your friends.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className="p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-primary text-xl font-bold">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
              <h2 className="text-4xl font-bold mb-6">How It Works</h2>
              <p className="text-gray-600 text-lg">Simple steps to start earning rewards</p>
            </div>

            <div className="relative">
              {/* Connection Line */}
              <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-primary/20 -translate-y-1/2" />
              
              <div className="grid lg:grid-cols-4 gap-8">
                {process.map((step, index) => (
                  <div
                    key={step.title}
                    className="relative z-10 text-center animate-fade-in"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="w-16 h-16 mx-auto bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
              <h2 className="text-4xl font-bold mb-6">Frequently Asked Questions</h2>
              <p className="text-gray-600 text-lg">Find answers to common questions about our referral program</p>
            </div>

            <div className="max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className="mb-6 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300">
                    <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
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
      <Footer />
    </>
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

const benefits = [
  {
    title: "Cash Rewards",
    description: "Earn up to $100 for each successful referral. The more friends you bring, the more you earn.",
  },
  {
    title: "Course Credits",
    description: "Get free course credits that you can use to enroll in any of our premium courses.",
  },
  {
    title: "Premium Features",
    description: "Unlock exclusive premium features and content when you refer friends.",
  },
  {
    title: "Friend Discount",
    description: "Your friends get 20% off their first course purchase through your referral.",
  },
  {
    title: "Special Events",
    description: "Get exclusive access to special events and workshops for being an active referrer.",
  },
  {
    title: "Priority Support",
    description: "Enjoy priority customer support and dedicated assistance for you and your referred friends.",
  },
];

const process = [
  {
    title: "Sign Up",
    description: "Create your account or log in to access the referral program",
  },
  {
    title: "Invite Friends",
    description: "Share your unique referral link with friends and family",
  },
  {
    title: "Friends Join",
    description: "Your friends enroll in courses using your referral",
  },
  {
    title: "Earn Rewards",
    description: "Get rewards when your friends complete their first course",
  },
];

const faqs = [
  {
    question: "How does the referral program work?",
    answer: "Our referral program rewards you for bringing friends to our platform. Share your unique referral link, and when your friends enroll in a course, both you and your friend receive rewards.",
  },
  {
    question: "What rewards can I earn?",
    answer: "You can earn cash rewards, course credits, and unlock premium features. The specific reward depends on the number of successful referrals and the courses your friends enroll in.",
  },
  {
    question: "How long does it take to receive rewards?",
    answer: "Rewards are typically credited to your account within 24-48 hours after your referred friend completes their first course purchase.",
  },
  {
    question: "Is there a limit to how many friends I can refer?",
    answer: "No, there's no limit! You can refer as many friends as you'd like and earn rewards for each successful referral.",
  },
  {
    question: "What discount do my friends get?",
    answer: "Your referred friends receive a 20% discount on their first course purchase when they sign up using your referral link.",
  },
];

export default Index;
