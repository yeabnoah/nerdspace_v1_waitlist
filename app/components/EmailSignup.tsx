import { useState } from "react";
import toast from "react-hot-toast";
import EmailConfirmationModal from "./EmailConfirmationModal";

interface EmailSignupProps {
  onSubmit: (email: string) => void;
  isSubmitted: boolean;
}

export default function EmailSignup({ onSubmit, isSubmitted }: EmailSignupProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.", {
        icon: "❌",
        duration: 4000,
        style: {
          borderRadius: "0px",
          background: "#111",
          color: "#fff",
        },
      });
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    setShowConfirmation(false);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        onSubmit(email);
        toast.success(
          "Thank you for signing up! We are excited to have you on board!",
          {
            icon: "🎉",
            duration: 5000,
            style: {
              borderRadius: "0px",
              background: "#111",
              color: "#fff",
            },
          }
        );
        setEmail("");
      } else {
        if (data.error === "Email already subscribed") {
          toast.error("This email is already registered.", {
            icon: "⚠️",
            duration: 4000,
            style: {
              borderRadius: "0px",
              background: "#111",
              color: "#fff",
            },
          });
        } else {
          toast.error(data.error || "An error occurred. Please try again.", {
            icon: "❌",
            duration: 4000,
            style: {
              borderRadius: "0px",
              background: "#111",
              color: "#fff",
            },
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.", {
        icon: "❌",
        duration: 4000,
        style: {
          borderRadius: "0px",
          background: "#111",
          color: "#fff",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="relative max-w-xl overflow-hidden overflow-x-hidden bg-[#0A0A0A] mx-auto flex flex-col justify-center items-start shadow-lg">
      {/* Grain overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 grain-overlay" aria-hidden="true" />
      <div className="relative z-20 w-full py-3">
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-5 py-3 rounded-none bg-black text-white placeholder-gray-400 text-base border border-neutral-800 focus:border-white focus:ring-2 focus:ring-white/20 transition outline-none"
            required
          />
          <button
            type="submit"
            className="w-full px-5 py-3 rounded-none bg-white text-black font-bold text-base transition hover:bg-gray-200 disabled:opacity-60 border border-white focus:outline-none"
            disabled={isLoading}
          >
            {isLoading ? "Joining..." : "Join Waitlist"}
          </button>
        </form>
      </div>
      <EmailConfirmationModal
        isOpen={showConfirmation}
        email={email}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
}
