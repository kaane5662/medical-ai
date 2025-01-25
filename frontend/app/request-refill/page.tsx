"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // Import useRouter

export default function MedicationsRefillPage() {
  const router = useRouter(); // Initialize useRouter

  // Dummy data for medications
  const medications = [
    {
      id: 1,
      name: "Paracetamol",
      dosage: "500mg",
      refillsLeft: 2,
    },
    {
      id: 2,
      name: "Ibuprofen",
      dosage: "400mg",
      refillsLeft: 1,
    },
    {
      id: 3,
      name: "Amoxicillin",
      dosage: "250mg",
      refillsLeft: 3,
    },
  ];

  // Dummy data for pharmacies
  const pharmacies = [
    {
      id: 1,
      name: "Swift Pharmacy",
      address: "123 Health St, Wellness City",
      phone: "(123) 456-7890",
    },
    {
      id: 2,
      name: "CarePlus Pharmacy",
      address: "456 Wellness Ave, Health Town",
      phone: "(987) 654-3210",
    },
    {
      id: 3,
      name: "MediQuick Pharmacy",
      address: "789 Cure Rd, Recovery City",
      phone: "(555) 123-4567",
    },
  ];

  // State to track selected medication and pharmacy
  const [selectedMedication, setSelectedMedication] = useState<number | null>(null);
  const [selectedPharmacy, setSelectedPharmacy] = useState<number | null>(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle refill confirmation
  const handleConfirmRefill = () => {
    setIsConfirmationOpen(false);
    setIsSuccess(true);

    // Simulate a delay for the success message
    setTimeout(() => {
      setIsSuccess(false);
      setSelectedMedication(null);
      setSelectedPharmacy(null);
    }, 3000); // Hide success message after 3 seconds
  };

  return (
    <div className="min-h-screen bg-[#E1E5F2] text-[#022B3A]">
      {/* Navbar with Back Button */}
      <nav className="flex items-center justify-between px-8 py-4 bg-[#1F7A8C]">
        <div className="flex items-center gap-4">
          {/* Back Button - Redirect to /pdashboard */}
          <button className="text-white" onClick={() => router.push("/pdashboard")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Medications Refill</h1>

        {/* Medications List */}
        <Card className="bg-[#FFFFFF] shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Your Medications
            </CardTitle>
            <CardDescription>Select a medication to refill.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {medications.map((medication) => (
                <div
                  key={medication.id}
                  className={`p-4 rounded cursor-pointer ${
                    selectedMedication === medication.id
                      ? "bg-[#1F7A8C] text-[#FFFFFF]"
                      : "bg-[#BFDBF7] text-[#022B3A]"
                  }`}
                  onClick={() => setSelectedMedication(medication.id)}
                >
                  <p className="font-medium">{medication.name}</p>
                  <p className="text-sm">{medication.dosage}</p>
                  <p className="text-sm">Refills left: {medication.refillsLeft}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pharmacies List (Conditional Rendering) */}
        {selectedMedication !== null && (
          <Card className="bg-[#FFFFFF] shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Select a Pharmacy
              </CardTitle>
              <CardDescription>Choose a pharmacy for your refill.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pharmacies.map((pharmacy) => (
                  <div
                    key={pharmacy.id}
                    className={`p-4 rounded cursor-pointer ${
                      selectedPharmacy === pharmacy.id
                        ? "bg-[#1F7A8C] text-[#FFFFFF]"
                        : "bg-[#BFDBF7] text-[#022B3A]"
                    }`}
                    onClick={() => {
                      setSelectedPharmacy(pharmacy.id);
                      setIsConfirmationOpen(true); // Open confirmation modal
                    }}
                  >
                    <p className="font-medium">{pharmacy.name}</p>
                    <p className="text-sm">{pharmacy.address}</p>
                    <p className="text-sm">{pharmacy.phone}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Confirmation Modal */}
        {isConfirmationOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-[#FFFFFF] p-6 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Confirm Refill</h2>
              <p className="mb-6">Are you sure you want to request a refill from this pharmacy?</p>
              <div className="flex justify-end gap-4">
                <Button
                  className="bg-[#BFDBF7] text-[#022B3A] hover:bg-[#A0C4E2]"
                  onClick={() => setIsConfirmationOpen(false)}
                >
                  No
                </Button>
                <Button
                  className="bg-[#1F7A8C] text-[#FFFFFF] hover:bg-[#165E6F]"
                  onClick={handleConfirmRefill}
                >
                  Yes
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Success Message with Animation */}
        {isSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-[#FFFFFF] p-6 rounded-lg w-full max-w-md animate-fade-in">
              <h2 className="text-xl font-bold mb-4 text-[#1F7A8C]">Success!</h2>
              <p className="mb-6">Your medication has been requested for refill.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}