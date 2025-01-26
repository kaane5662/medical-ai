"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Calendar, ClipboardList, MessageCircle, Stethoscope, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DoctorDashboard() {
  // Define interfaces for Patient and Appointments
  interface Patient {
    id: number;
    firstName: string;
    lastName: string;
    insuranceNumber: string;
    condition?: string; // Optional field
  }

  interface Appointments {
    appointmentID: string;
    patientName: string;
    reason: string;
    appointmentTimeStamp: Date;
  }

  // State variables
  const [patients, setPatients] = useState<Patient[]>([]);
  const [appointments, setAppointments] = useState<Appointments[]>([]);

  // Fetch patients data
  const fetchPatients = () => {
    axios
      .get("/api/patients", { withCredentials: true })
      .then((res) => {
        setPatients(res.data);
      })
      .catch((error) => {
        console.error("Error fetching patients:", error);
      });
  };

  // Fetch appointments data
  const fetchAppointments = () => {
    axios
      .get("/api/appointments", { withCredentials: true })
      .then((res) => {
        setAppointments(res.data);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchPatients();
    fetchAppointments();
  }, []);

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
          <h1 className="text-xl font-bold text-[#FFFFFF]">Doctor Dashboard</h1>
        </div>

        <div className="flex items-center gap-4">
          <Button className="bg-[#BFDBF7] text-[#022B3A] hover:bg-[#A0C4E2]">
            <Link href="/profile">Profile</Link>
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
                {appointments.length === 0 ? (
                  <p>No appointments found.</p>
                ) : (
                  appointments.map((appointment) => (
                    <div key={appointment.appointmentID} className="flex items-center justify-between">
                      <p className="font-medium">{appointment.patientName}</p>
                      <p className="text-sm text-[#1F7A8C]">
                        {new Date(appointment.appointmentTimeStamp).toLocaleString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Patient List Card */}
          <Card className="bg-[#FFFFFF] shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="text-[#1F7A8C]" />
                Patient List
              </CardTitle>
              <CardDescription>Manage your patients and their records.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patients.length === 0 ? (
                  <p>No patients found.</p>
                ) : (
                  patients.map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between">
                      <p className="font-medium">{`${patient.firstName} ${patient.lastName}`}</p>
                      <p className="text-sm text-[#1F7A8C]">{patient.insuranceNumber}</p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Medical Records Card */}
          <Card className="bg-[#FFFFFF] shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="text-[#1F7A8C]" />
                Medical Records
              </CardTitle>
              <CardDescription>Access and update patient medical records.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full bg-[#BFDBF7] text-[#022B3A] hover:bg-[#A0C4E2]">
                  <Link href="/medical-records">View All Records</Link>
                </Button>
                <Button className="w-full bg-[#BFDBF7] text-[#022B3A] hover:bg-[#A0C4E2]">
                  <Link href="/add-record">Add New Record</Link>
                </Button>
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
              </div>
            </CardContent>
          </Card>

          {/* Health Metrics Overview Card */}
          <Card className="bg-[#FFFFFF] shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="text-[#1F7A8C]" />
                Health Metrics Overview
              </CardTitle>
              <CardDescription>Track patient health metrics.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p><strong>Average Heart Rate:</strong> 72 bpm</p>
                <p><strong>Average Blood Pressure:</strong> 120/80 mmHg</p>
                <p><strong>Most Common Condition:</strong> Hypertension</p>
              </div>
            </CardContent>
          </Card>

          {/* Chat with Patients and AI Companion Card */}
          <Card className="bg-[#FFFFFF] shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="text-[#1F7A8C]" />
                Chat
              </CardTitle>
              <CardDescription>Communicate with your patients or AI Companion.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full bg-[#BFDBF7] text-[#022B3A] hover:bg-[#A0C4E2]">
                  <Link href="/chat-patients">View Chat History</Link>
                </Button>
                <Button className="w-full bg-[#BFDBF7] text-[#022B3A] hover:bg-[#A0C4E2]">
                  <Link href="/dchatbox">Start New Chat with Patient</Link>
                </Button>
                <Button className="w-full bg-[#1F7A8C] text-[#FFFFFF] hover:bg-[#165E6F]">
                  <Link href="/daichatbox">Chat with AI Companion</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 bg-[#1F7A8C] text-[#FFFFFF] text-center">
        <p>© {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
      </footer>
    </div>
  );
}