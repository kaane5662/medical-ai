"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Stethoscope, Pill, Activity, MessageCircle, Plus, ClipboardList } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function PatientDashboard() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [logEntries, setLogEntries] = useState<{ [key: string]: any }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLog, setCurrentLog] = useState({
    bloodGlucose: "",
    bloodPressure: "",
    symptoms: "",
    medications: "",
    frequency: "",
    notes: "",
  });

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleLogSubmit = async () => {
    if (selectedDate) {
      const dateKey = selectedDate.toISOString().split("T")[0];

      // Prepare the log data
      const logData = {
        symptoms: currentLog.symptoms.split(",").map((s) => s.trim()), // Convert symptoms string to array
        glucose: parseFloat(currentLog.bloodGlucose), // Convert to number
        bloodPressure: parseFloat(currentLog.bloodPressure), // Convert to number
        medications: currentLog.medications.split(",").map((m) => m.trim()), // Convert medications string to array
        frequency: currentLog.frequency,
        timestamp: selectedDate,
        description: currentLog.notes,
        patient: "PATIENT_ID", // Replace with the actual patient ID (e.g., from session or context)
        doctor: "DOCTOR_ID", // Replace with the actual doctor ID (e.g., from session or context)
      };

      try {
        // Send the log data to the backend using fetch
        const response = await fetch("/api/logs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(logData),
        });

        if (response.ok) {
          // Update the local state with the new log entry
          setLogEntries((prev) => ({
            ...prev,
            [dateKey]: { ...currentLog },
          }));

          // Close the modal and reset the form
          setIsModalOpen(false);
          setCurrentLog({
            bloodGlucose: "",
            bloodPressure: "",
            symptoms: "",
            medications: "",
            frequency: "",
            notes: "",
          });

          alert("Log saved successfully!");
        } else {
          throw new Error("Failed to save log.");
        }
      } catch (error) {
        console.error("Error saving log:", error);
        alert("Failed to save log. Please try again.");
      }
    }
  };

  // Example doctor notes data
  const doctorNotes = [
    {
      date: "2023-10-01",
      note: "Patient is responding well to the new medication. Continue current dosage.",
    },
    {
      date: "2023-10-05",
      note: "Recommended lifestyle changes: Increase water intake and reduce salt consumption.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#E1E5F2] text-[#022B3A]">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-[#1F7A8C]">
        <div className="flex items-center gap-4">
          <Image
            src="/company-logo.png" // Replace with your company logo
            alt="Company Logo"
            width={40}
            height={40}
          />
          <h1 className="text-xl font-bold text-[#FFFFFF]">Patient Dashboard</h1>
        </div>

        <div className="flex items-center gap-4">
          <Button className="bg-[#BFDBF7] text-[#022B3A] hover:bg-[#A0C4E2]">
            <Link href="/pdashboard">Profile</Link>
          </Button>
          <Button className="bg-[#BFDBF7] text-[#022B3A] hover:bg-[#A0C4E2]">
            <Link href="/">Logout</Link>
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Upcoming Appointments Card */}
          <Card className="bg-[#FFFFFF] shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="text-[#1F7A8C]" />
                Upcoming Appointments
              </CardTitle>
              <CardDescription>View and manage your upcoming appointments.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Dr. John Doe</p>
                  <p className="text-sm text-[#1F7A8C]">10:00 AM</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-medium">Dr. Jane Smith</p>
                  <p className="text-sm text-[#1F7A8C]">2:30 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Medications Card */}
          <Card className="bg-[#FFFFFF] shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pill className="text-[#1F7A8C]" />
                Recent Medications
              </CardTitle>
              <CardDescription>Your prescribed medications.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Paracetamol</p>
                  <p className="text-sm text-[#1F7A8C]">500mg</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-medium">Ibuprofen</p>
                  <p className="text-sm text-[#1F7A8C]">400mg</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Health Metrics Card */}
          <Card className="bg-[#FFFFFF] shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="text-[#1F7A8C]" />
                Health Metrics
              </CardTitle>
              <CardDescription>Track your health progress.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Blood Pressure</p>
                  <p className="text-sm text-[#1F7A8C]">72 BPM</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-medium">Blood Pressure</p>
                  <p className="text-sm text-[#1F7A8C]">120/80 mmHg</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
            <Card className="bg-[#FFFFFF] shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                <Stethoscope className="text-[#1F7A8C]" />
                Quick Actions
                </CardTitle>
                <CardDescription>Quickly access important features.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                <Button className="w-full bg-[#BFDBF7] text-[#022B3A] hover:bg-[#A0C4E2]">
                    <Link href="https://calendly.com/swftt-inc/doctor-appointment">Book Appointment</Link>
                </Button>
                <Button className="w-full bg-[#BFDBF7] text-[#022B3A] hover:bg-[#A0C4E2]">
                    <Link href="/request-refill">Request Medication Refill</Link>
                </Button>
                <Button className="w-full bg-[#BFDBF7] text-[#022B3A] hover:bg-[#A0C4E2]">
                    <Link href="/medical-records">View Medical History</Link>
                </Button>
                {/* Add the new "Recommendations" button */}
                <Button className="w-full bg-[#BFDBF7] text-[#022B3A] hover:bg-[#A0C4E2]">
                    <Link href="/recommendations">Recommendations</Link>
                </Button>
                </div>
            </CardContent>
            </Card>

          {/* Chat Card */}
          <Card className="bg-[#FFFFFF] shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="text-[#1F7A8C]" />
                Chat
              </CardTitle>
              <CardDescription>Connect with your AI Companion or Doctor.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full bg-[#BFDBF7] text-[#022B3A] hover:bg-[#A0C4E2]">
                  <Link href="/aichatbox">Chat with AI Companion</Link>
                </Button>
                <Button className="w-full bg-[#BFDBF7] text-[#022B3A] hover:bg-[#A0C4E2]">
                  <Link href="/chatbox">Chat with Doctor</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Doctor Notes Card */}
          <Card className="bg-[#FFFFFF] shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="text-[#1F7A8C]" />
                Doctor Notes
              </CardTitle>
              <CardDescription>Recent notes from your doctor.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {doctorNotes.map((note, index) => (
                  <div key={index} className="p-4 bg-[#E1E5F2] rounded">
                    <p className="text-sm text-[#1F7A8C]">{note.date}</p>
                    <p className="text-[#022B3A]">{note.note}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Calendar Card */}
          <Card className="bg-[#FFFFFF] shadow-lg col-span-1 md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="text-[#1F7A8C]" />
                Health Log
              </CardTitle>
              <CardDescription>Log your health data for each day.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                {/* Calendar */}
                <div className="w-full md:w-1/2">
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 31 }).map((_, index) => (
                      <div
                        key={index}
                        className={`p-2 text-center cursor-pointer rounded ${
                          selectedDate?.getDate() === index + 1
                            ? "bg-[#1F7A8C] text-[#FFFFFF]"
                            : "bg-[#BFDBF7] text-[#022B3A]"
                        }`}
                        onClick={() => handleDateClick(new Date(new Date().setDate(index + 1)))}
                      >
                        {index + 1}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Log Entry Button and Log Entries */}
                <div className="w-full md:w-1/2">
                  {selectedDate && (
                    <>
                      <Button
                        className="w-full bg-[#1F7A8C] text-[#FFFFFF] hover:bg-[#165E6F] mb-4"
                        onClick={() => setIsModalOpen(true)}
                      >
                        Log Entry
                      </Button>
                      {logEntries[selectedDate.toISOString().split("T")[0]] && (
                        <div className="space-y-4">
                          <p><strong>Blood Glucose:</strong> {logEntries[selectedDate.toISOString().split("T")[0]].bloodGlucose}</p>
                          <p><strong>Blood Pressure:</strong> {logEntries[selectedDate.toISOString().split("T")[0]].heartRate}</p>
                          <p><strong>Symptoms:</strong> {logEntries[selectedDate.toISOString().split("T")[0]].symptoms}</p>
                          <p><strong>Medications:</strong> {logEntries[selectedDate.toISOString().split("T")[0]].medications}</p>
                          <p><strong>Frequency:</strong> {logEntries[selectedDate.toISOString().split("T")[0]].frequency}</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Logging Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-[#FFFFFF] p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Log Health Data for {selectedDate?.toDateString()}</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Blood Glucose (e.g., 120 mg/dL)"
                value={currentLog.bloodGlucose}
                onChange={(e) => setCurrentLog({ ...currentLog, bloodGlucose: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Blood Pressure (e.g., 160/90)"
                value={currentLog.bloodPressure}
                onChange={(e) => setCurrentLog({ ...currentLog, bloodPressure: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Symptoms (e.g., Headache, Fatigue)"
                value={currentLog.symptoms}
                onChange={(e) => setCurrentLog({ ...currentLog, symptoms: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Medications (e.g., Paracetamol)"
                value={currentLog.medications}
                onChange={(e) => setCurrentLog({ ...currentLog, medications: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Frequency (e.g., Twice a day)"
                value={currentLog.frequency}
                onChange={(e) => setCurrentLog({ ...currentLog, frequency: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Any Additional Notes"
                value={currentLog.frequency}
                onChange={(e) => setCurrentLog({ ...currentLog, notes: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <Button className="bg-[#BFDBF7] text-[#022B3A] hover:bg-[#A0C4E2]" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-[#1F7A8C] text-[#FFFFFF] hover:bg-[#165E6F]" onClick={handleLogSubmit}>
                Save
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="p-4 bg-[#1F7A8C] text-[#FFFFFF] text-center">
        <p>© {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
      </footer>
    </div>
  );
}