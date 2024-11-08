"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import Header from "../components/Header";

export default function ProfessionalFintechCategorizer() {
  const [formData, setFormData] = useState({
    description: "",
    amount: 0,
  });

  const [resultData, setResultData] = useState({
    description: "",
    amount: 0,
    category: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8080/categorize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const res = await response.json();
      setResultData(res);
    } catch (error) {
      console.error("Error:", error);
      setError(
        "An error occurred while categorizing the transaction. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-purple-200 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-blue-100 to-transparent opacity-50" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-purple-500 to-transparent opacity-50" />
        <Card className="w-full max-w-2xl bg-white/90 backdrop-blur-sm shadow-lg border-none relative z-10">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center mb-2 text-gray-800">
              SmartFinance Categorizer
            </CardTitle>
            <CardDescription className="text-center text-gray-600 text-lg">
              Effortlessly categorize your transactions with AI precision
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-700">
                  Description
                </Label>
                <Input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter transaction description"
                  required
                  className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-gray-700">
                  Amount
                </Label>
                <Input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Enter transaction amount"
                  required
                  className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Categorize Transaction
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>

            {error && (
              <Alert
                variant="destructive"
                className="mt-6 bg-red-100 border-red-400 text-red-700"
              >
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {resultData.category && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8"
              >
                <Card className="bg-green-50 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-green-800 flex items-center justify-center">
                      <CheckCircle className="mr-2 h-6 w-6 text-green-600" />
                      Transaction Categorized
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-700 mb-4">
                        {resultData.category}
                      </p>
                      <div className="text-gray-700">
                        <p className="mb-2">
                          Description: {resultData.description}
                        </p>
                        <p>Amount: ${resultData.amount.toFixed(2)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
