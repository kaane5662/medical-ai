"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ClipboardList } from "lucide-react";
import { useState, useEffect } from "react";

export default function MedicalRecords() {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      try {
        // Replace with your MongoDB Data API endpoint and API key
        const endpoint = "https://localhost:5000";
        const apiKey = "process.env.MONGODB_API_KEY";

        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
          body: JSON.stringify({
            dataSource: "Cluster0", // Replace with your cluster name
            database: "your-database-name", // Replace with your database name
            collection: "logs", // Replace with your collection name
            filter: { patient: "PATIENT_ID" }, // Replace with the actual patient ID
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch medical records");
        }

        const data = await response.json();
        setMedicalRecords(data.documents);
      } catch (err) {
        console.error("Error fetching medical records:", err);
        setError("Failed to load medical records. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalRecords();
  }, []);

  if (loading) {
    return <p>Loading medical records...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

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
          {medicalRecords.length > 0 ? (
            medicalRecords.map((record) => (
              <div key={record._id} className="p-4 bg-[#E1E5F2] rounded">
                <p className="text-sm text-[#1F7A8C]">
                  {new Date(record.timestamp).toLocaleDateString()}
                </p>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="font-medium">Blood Glucose</p>
                    <p className="text-[#022B3A]">{record.glucose} mg/dL</p>
                  </div>
                  <div>
                    <p className="font-medium">Blood Pressure</p>
                    <p className="text-[#022B3A]">{record.bloodPressure} mmHg</p>
                  </div>
                  <div>
                    <p className="font-medium">Symptoms</p>
                    <p className="text-[#022B3A]">{record.symptoms.join(", ")}</p>
                  </div>
                  <div>
                    <p className="font-medium">Medications</p>
                    <p className="text-[#022B3A]">{record.medications.join(", ")}</p>
                  </div>
                  <div>
                    <p className="font-medium">Frequency</p>
                    <p className="text-[#022B3A]">{record.frequency}</p>
                  </div>
                  {record.diagnosis && (
                    <div>
                      <p className="font-medium">Diagnosis</p>
                      <p className="text-[#022B3A]">{record.diagnosis}</p>
                    </div>
                  )}
                  {record.description && (
                    <div>
                      <p className="font-medium">Notes</p>
                      <p className="text-[#022B3A]">{record.description}</p>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No medical records found.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}