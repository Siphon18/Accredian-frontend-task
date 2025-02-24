import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Define the form validation schema using Zod
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

  // Initialize AOS for animations
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
    });
  }, []);

  // If using a separate backend, update the API URL below:
  const API_URL = import.meta.env.VITE_API_URL || ""; // e.g., "https://your-backend.onrender.com"

  // Form submission handler
  const onSubmit = async (data: ReferralForm) => {
    try {
      const response = await fetch(`${API_URL}/api/referrals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

      setIsModalOpen(false);
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
    <>
      <Navbar />
      <div className="min-h-screen pt-16">
        {/* Hero Section */}
        <section
          className="relative overflow-hidden px-6 py-24 sm:px-8 sm:py-32"
          data-aos="fade-up"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
          <div className="container relative mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="max-w-xl" data-aos="fade-right">
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                  Refer & Earn Program
                </span>
                <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  Share Knowledge, <br />
                  <span className="text-primary">Earn Rewards</span>
                </h1>
                <p className="mt-6 text-lg text-gray-600">
                  Refer your friends to our courses and earn exclusive rewards.
                  Help them start their learning journey while you get amazing
                  benefits.
                </p>
                <div className="mt-8">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn-primary"
                  >
                    Refer Now
                  </button>
                </div>
              </div>
              <div className="relative lg:mt-0" data-aos="fade-left">
                <img
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
                  alt="Person using laptop"
                  className="w-full rounded-2xl object-cover shadow-2xl"
                />
              </div>
            </div>
            {/* Features Grid */}
            <div className="mt-24 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="p-4 border rounded-lg"
                  data-aos="zoom-in"
                  data-aos-delay={`${index * 100}`}
                >
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section
          className="py-24 bg-gradient-to-b from-white to-gray-50"
          data-aos="fade-up"
        >
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-6">Referral Benefits</h2>
              <p className="text-gray-600 text-lg">
                Join our referral program and unlock amazing rewards for both
                you and your friends.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className="p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
                  data-aos="flip-up"
                  data-aos-delay={`${index * 150}`}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-primary text-xl font-bold">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24 bg-white" data-aos="fade-up">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-6">How It Works</h2>
              <p className="text-gray-600 text-lg">
                Simple steps to start earning rewards
              </p>
            </div>
            <div className="relative">
              <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-primary/20 -translate-y-1/2" />
              <div className="grid lg:grid-cols-4 gap-8">
                {steps.map((step, index) => (
                  <div
                    key={step.title}
                    className="relative z-10 text-center"
                    data-aos="fade-up"
                    data-aos-delay={`${index * 200}`}
                  >
                    <div className="w-16 h-16 mx-auto bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-24 bg-gray-50" data-aos="fade-up">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 text-lg">
                Find answers to common questions about our referral program
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className="mb-6"
                  data-aos="fade-up"
                  data-aos-delay={`${index * 100}`}
                >
                  <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300">
                    <h3 className="text-lg font-semibold mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Referral Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
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
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="btn-primary">
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

// Sample arrays for features, benefits, process, and FAQs
const features = [
  {
    title: "Earn Rewards",
    description:
      "Get exclusive rewards for each successful referral. The more friends you bring, the more you earn.",
  },
  {
    title: "Track Progress",
    description:
      "Monitor your referrals and rewards in real-time through your personalized dashboard.",
  },
  {
    title: "Easy Sharing",
    description:
      "Share course recommendations with your friends in just a few clicks.",
  },
];

const benefits = [
  {
    title: "Cash Rewards",
    description:
      "Earn up to $100 for each successful referral. The more friends you bring, the more you earn.",
  },
  {
    title: "Course Credits",
    description:
      "Get free course credits that you can use to enroll in any of our premium courses.",
  },
  {
    title: "Premium Features",
    description:
      "Unlock exclusive premium features and content when you refer friends.",
  },
  {
    title: "Friend Discount",
    description:
      "Your friends get 20% off their first course purchase through your referral.",
  },
  {
    title: "Special Events",
    description:
      "Get exclusive access to special events and workshops for being an active referrer.",
  },
  {
    title: "Priority Support",
    description:
      "Enjoy priority customer support and dedicated assistance for you and your referred friends.",
  },
];

const steps = [
  {
    title: "Sign Up",
    description:
      "Create your account or log in to access the referral program.",
  },
  {
    title: "Invite Friends",
    description: "Share your unique referral link with friends and family.",
  },
  {
    title: "Friends Join",
    description: "Your friends enroll in courses using your referral.",
  },
  {
    title: "Earn Rewards",
    description:
      "Get rewards when your friends complete their first course.",
  },
];

const faqs = [
  {
    question: "How does the referral program work?",
    answer:
      "Our referral program rewards you for bringing friends to our platform. Share your unique referral link, and when your friends enroll in a course, both you and your friend receive rewards.",
  },
  {
    question: "What rewards can I earn?",
    answer:
      "You can earn cash rewards, course credits, and unlock premium features. The specific reward depends on the number of successful referrals and the courses your friends enroll in.",
  },
  {
    question: "How long does it take to receive rewards?",
    answer:
      "Rewards are typically credited to your account within 24-48 hours after your referred friend completes their first course purchase.",
  },
  {
    question: "Is there a limit to how many friends I can refer?",
    answer:
      "No, there's no limit! You can refer as many friends as you'd like and earn rewards for each successful referral.",
  },
  {
    question: "What discount do my friends get?",
    answer:
      "Your referred friends receive a 20% discount on their first course purchase when they sign up using your referral link.",
  },
];

export default Index;
