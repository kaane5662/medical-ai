"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, ClipboardList } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadMedicalRecords() {
  const router = useRouter();
  const [manualEntry, setManualEntry] = useState({
    patientName: "",
    date: "",
    diagnosis: "",
    symptoms: "",
    medications: "",
    notes: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleManualInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setManualEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      // Handle manual entry submission
      if (manualEntry.patientName && manualEntry.date) {
        console.log("Manual Entry:", manualEntry);
        // TODO: Send manual entry data to the backend
      }

      // Handle file upload
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        console.log("Uploading file:", selectedFile.name);
        // TODO: Send file to the backend
      }

      alert("Medical records uploaded successfully!");
    } catch (error) {
      console.error("Error uploading records:", error);
      alert("Failed to upload records. Please try again.");
    } finally {
      setIsUploading(false);
      setManualEntry({
        patientName: "",
        date: "",
        diagnosis: "",
        symptoms: "",
        medications: "",
        notes: "",
      });
      setSelectedFile(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#E1E5F2] text-[#022B3A]">
      {/* Navbar with Back Button */}
      <nav className="flex items-center justify-between px-8 py-4 bg-[#1F7A8C]">
        <div className="flex items-center gap-4">
          {/* Back Button - Redirect to Dashboard */}
          <button className="text-white" onClick={() => router.push("/ddashboard")}>
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

      {/* Upload Medical Records Card */}
      <div className="p-8">
        <Card className="bg-[#FFFFFF] shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="text-[#1F7A8C]" />
              Upload Medical Records
            </CardTitle>
            <CardDescription>Add new medical records for a patient.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Manual Input Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#1F7A8C]">Manual Entry</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="patientName"
                    placeholder="Patient Name"
                    value={manualEntry.patientName}
                    onChange={handleManualInputChange}
                    className="p-2 border rounded"
                    required
                  />
                  <input
                    type="date"
                    name="date"
                    value={manualEntry.date}
                    onChange={handleManualInputChange}
                    className="p-2 border rounded"
                    required
                  />
                  <input
                    type="text"
                    name="diagnosis"
                    placeholder="Diagnosis"
                    value={manualEntry.diagnosis}
                    onChange={handleManualInputChange}
                    className="p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="symptoms"
                    placeholder="Symptoms"
                    value={manualEntry.symptoms}
                    onChange={handleManualInputChange}
                    className="p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="medications"
                    placeholder="Medications"
                    value={manualEntry.medications}
                    onChange={handleManualInputChange}
                    className="p-2 border rounded"
                  />
                  <textarea
                    name="notes"
                    placeholder="Additional Notes"
                    value={manualEntry.notes}
                    onChange={handleManualInputChange}
                    className="p-2 border rounded"
                    rows={3}
                  />
                </div>
              </div>

              {/* File Upload Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#1F7A8C]">Upload Image</h3>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 bg-[#BFDBF7] text-[#022B3A] px-4 py-2 rounded cursor-pointer hover:bg-[#A0C4E2]">
                    <Upload className="w-5 h-5" />
                    <span>{selectedFile ? selectedFile.name : "Choose File"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  {selectedFile && (
                    <Button
                      type="button"
                      onClick={() => setSelectedFile(null)}
                      className="bg-[#1F7A8C] text-[#FFFFFF] hover:bg-[#165E6F]"
                    >
                      Remove File
                    </Button>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-[#1F7A8C] text-[#FFFFFF] hover:bg-[#165E6F]"
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Upload Records"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}