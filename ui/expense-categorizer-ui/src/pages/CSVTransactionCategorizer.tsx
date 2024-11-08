"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2,  Upload } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "..//components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import Header from "../components/Header";

interface Transaction {
  description: string;
  amount: number;
  category: string;
}

// Sample CSV data
const sampleCSV = `
Description,Amount
Grocery Store,50.00
Gas Station,30.00
Restaurant,25.50
Online Shopping,75.20
`;

export default function CSVTransactionCategorizer() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<Transaction[]>([]);

  const [isSampleFile, setIsSampleFile] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setIsSampleFile(false);
    }
  };

  const handleSampleFile = () => {
    const sampleFile = new File([sampleCSV], "sample.csv", {
      type: "text/csv",
    });
    setFile(sampleFile);
    setIsSampleFile(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a CSV file to upload.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        "http://localhost:8080/upload-expenses-multithreaded",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: Transaction[] = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error:", error);
      setError(
        "An error occurred while categorizing the transactions. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-blue-100 to-transparent opacity-50" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-purple-500 to-transparent opacity-50" />
        <Card className="w-full max-w-4xl bg-white/90 backdrop-blur-sm shadow-lg border-none relative z-10">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center mb-2 text-gray-800">
              CSV Transaction Categorizer
            </CardTitle>
            <CardDescription className="text-center text-gray-600 text-lg">
              Upload a CSV file to categorize multiple transactions at once
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`grid ${
                results.length > 0 ? "md:grid-cols-2" : "grid-cols-1"
              } gap-6`}
            >
              <div className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="csvFile" className="text-gray-700">
                      Upload CSV File
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="file"
                        id="csvFile"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 flex-grow"
                      />
                      <Button
                        type="button"
                        onClick={handleSampleFile}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 whitespace-nowrap"
                      >
                        Try Sample
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500">
                      CSV format: First column for description, second column
                      for amount.
                      {isSampleFile && (
                        <span className="font-semibold">
                          {" "}
                          Using sample file.
                        </span>
                      )}
                    </p>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
                    disabled={isLoading || (!file && !isSampleFile)}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Categorize Transactions
                        <Upload className="ml-2 h-5 w-5" />
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
              </div>

              {results.length > 0 && (
                <div className="overflow-auto max-h-[400px] md:max-h-none">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Description</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Category</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {results.map((transaction, index) => (
                          <TableRow key={index}>
                            <TableCell>{transaction.description}</TableCell>
                            <TableCell>
                              ${transaction.amount.toFixed(2)}
                            </TableCell>
                            <TableCell>{transaction.category}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </motion.div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
