import React from "react";
import { Upload, Brain, PieChart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  return (
    <section className="mb-24 container mx-auto px-6">
      <h2 className="text-4xl font-bold text-gray-800 text-center mb-24">
        How It Works
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        <StepCard
          icon={<Upload />}
          step={1}
          title="Upload Transactions"
          description="Enter a single transaction or upload a CSV file with multiple transactions. Our system accepts data from most major banks and financial institutions."
        />
        <StepCard
          icon={<Brain />}
          step={2}
          title="AI Processing"
          description="Our advanced AI analyzes transaction descriptions, amounts, and patterns to automatically categorize each transaction with high accuracy."
        />
        <StepCard
          icon={<PieChart />}
          step={3}
          title="Get Insights"
          description="View detailed categorization results, spending patterns, and financial insights through interactive charts and reports."
        />
      </div>

      {/* <div className="mt-16 relative">
        <div className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-blue-600 -translate-y-1/2"></div>
        <div className="hidden md:block absolute top-1/2 right-1/3 w-1/3 h-0.5 bg-blue-600 -translate-y-1/2"></div>
      </div> */}

      <div className="text-center mt-16">
        <Link
          to="single-categorization"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          <button className="inline-flex items-center px-8  bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-lg">
            Get Started Now
            <ArrowRight className="ml-2 h-6 w-6" />
          </button>
        </Link>
      </div>
    </section>
  );
};

interface StepCardProps {
  icon: React.ReactNode;
  step: number;
  title: string;
  description: string;
}

const StepCard = ({ icon, step, title, description }: StepCardProps) => {
  return (
    <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
      <div className="absolute -top-8 left-1/2 -translate-x-1/2">
        <div className="bg-blue-600 rounded-full p-4 shadow-lg">
          {React.cloneElement(icon as React.ReactElement, {
            className: "w-8 h-8 text-white",
          })}
        </div>
      </div>
      <div className="mt-8 text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {step}. {title}
        </h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default HowItWorks;
