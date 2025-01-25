"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ClipboardList } from "lucide-react";
import { useState, useEffect } from "react";

export default function MedicalRecords() {
  // Example initial medical records data
  const initialRecords = [
    {
      id: 1,
      date: "2023-10-01",
      bloodGlucose: "120 mg/dL",
      bloodPressure: "120/80 mmHg",
      symptoms: "Headache, Fatigue",
      medications: "Paracetamol",
      frequency: "Twice a day",
    },
    {
      id: 2,
      date: "2023-10-05",
      bloodGlucose: "110 mg/dL",
      bloodPressure: "118/78 mmHg",
      symptoms: "Dizziness",
      medications: "Ibuprofen",
      frequency: "Once a day",
    },
  ];

  const [medicalRecords, setMedicalRecords] = useState(initialRecords);

  // Simulate updating records when a patient logs data
  useEffect(() => {
    const handleLogUpdate = (event: CustomEvent) => {
      const newLog = event.detail;
      setMedicalRecords((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          date: new Date().toISOString().split("T")[0],
          ...newLog,
        },
      ]);
    };

    // Listen for custom event (e.g., when a patient logs data)
    window.addEventListener("logUpdate", handleLogUpdate);

    // Cleanup event listener
    return () => {
      window.removeEventListener("logUpdate", handleLogUpdate);
    };
  }, []);

  return (
    <Card className="bg-[#FFFFFF] shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="text-[#1F7A8C]" />
          Medical Records
        </CardTitle>
        <CardDescription>View and manage patient medical records.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {medicalRecords.map((record) => (
            <div key={record.id} className="p-4 bg-[#E1E5F2] rounded">
              <p className="text-sm text-[#1F7A8C]">{record.date}</p>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="font-medium">Blood Glucose</p>
                  <p className="text-[#022B3A]">{record.bloodGlucose}</p>
                </div>
                <div>
                  <p className="font-medium">Blood Pressure</p>
                  <p className="text-[#022B3A]">{record.bloodPressure}</p>
                </div>
                <div>
                  <p className="font-medium">Symptoms</p>
                  <p className="text-[#022B3A]">{record.symptoms}</p>
                </div>
                <div>
                  <p className="font-medium">Medications</p>
                  <p className="text-[#022B3A]">{record.medications}</p>
                </div>
                <div>
                  <p className="font-medium">Frequency</p>
                  <p className="text-[#022B3A]">{record.frequency}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}