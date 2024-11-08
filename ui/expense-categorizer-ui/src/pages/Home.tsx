"use client";

// import a from 'next/a'
import { motion } from "framer-motion";
import { ArrowRight, BarChart2, Upload } from "lucide-react";

import {  Link } from "react-router-dom";
import { FileSpreadsheet, CreditCard, PieChart, FileCheck } from "lucide-react";
import Header from "../components/Header.tsx";
import hero from "../assets/Hero image.svg";
import HowItWorks from "../components/HowItWorks.tsx";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex flex-col relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-blue-100 to-transparent opacity-50" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-purple-500 to-transparent opacity-50" />

      <Header />

      {/* Hero Content */}
      <main className="flex-grow container mx-auto px-6 py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center lg:my-24">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
              <motion.h1
                className="text-4xl md:text-6xl font-bold text-gray-800 mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                SmartFinance Categorizer
              </motion.h1>
            </h1>
            <p className="text-xl text-gray-600">
              <motion.p>
                Effortlessly categorize your financial transactions with AI
                precision, helping you gain insights into your spending habits
                and financial health.
              </motion.p>
            </p>

            <Link to="single-categorization" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              <button className="inline-flex items-center px-6  bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative">
            {/* <div className="absolute -top-8 -left-8 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div> */}
            {/* <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div> */}
            {/* <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div> */}
            <img
              src={hero}
              alt="Financial Analysis"
              className="relative rounded-2xl  w-full max-w-lg mx-auto transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        <HowItWorks />

        {/* Single Transaction Section */}
        <section className="my-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center ">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800">
                Single Transaction Categorization
              </h2>
              <p className="text-lg text-gray-600">
                Quickly categorize individual transactions with our intelligent
                system. Perfect for:
              </p>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">
                    Recent purchases and transactions
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <PieChart className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">
                    Detailed spending analysis
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <FileCheck className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">
                    Immediate categorization feedback
                  </span>
                </li>
              </ul>
              <Link to="single-categorization" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              <button className="inline-flex items-center px-6  bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                Try Single Categorization
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              </Link>
            </div>
            <div className="relative">
              {/* <div className="absolute -z-10 -top-8 -right-8 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div> */}
              <img
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
                alt="Single Transaction"
                className="rounded-2xl shadow-lg w-full max-w-lg mx-auto"
              />
            </div>
          </div>
        </section>

        {/* Bulk Transaction Section */}
        <section className="mb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative">
              {/* <div className="absolute -z-10 -bottom-8 -left-8 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div> */}
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80"
                alt="Bulk Transactions"
                className="rounded-2xl shadow-lg w-full max-w-lg mx-auto"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-3xl font-bold text-gray-800">
                Bulk Transaction Processing
              </h2>
              <p className="text-lg text-gray-600">
                Upload multiple transactions at once and let our AI handle the
                categorization. Ideal for:
              </p>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <FileSpreadsheet className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">
                    Bank statements and CSV files
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <Upload className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">
                    Monthly expense processing
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <BarChart2 className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">
                    Comprehensive financial reports
                  </span>
                </li>
              </ul>
              <Link to="/bulk-categorization" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              <button className="inline-flex items-center px-6  bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                Try Bulk Upload
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
