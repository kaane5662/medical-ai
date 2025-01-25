"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calendar, Stethoscope, ClipboardList, User, Activity, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function DoctorDashboard() {
  // Example data for patients and appointments
  const patients = [
    { id: 1, name: "John Doe", lastVisit: "2023-10-01", condition: "Hypertension" },
    { id: 2, name: "Jane Smith", lastVisit: "2023-10-05", condition: "Diabetes" },
  ];

  const appointments = [
    { id: 1, patientName: "John Doe", time: "10:00 AM", purpose: "Follow-up" },
    { id: 2, patientName: "Jane Smith", time: "2:30 PM", purpose: "Consultation" },
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
          <h1 className="text-xl font-bold text-[#FFFFFF]">Doctor Dashboard</h1>
        </div>

        <div className="flex items-center gap-4">
          <Button className="bg-[#BFDBF7] text-[#022B3A] hover:bg-[#A0C4E2]">
            <Link href="/profile">Profile</Link>
          </Button>
          <Button className="bg-[#BFDBF7] text-[#022B3A] hover:bg-[#A0C4E2]">
            <Link href="/logout">Logout</Link>
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
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between">
                    <p className="font-medium">{appointment.patientName}</p>
                    <p className="text-sm text-[#1F7A8C]">{appointment.time}</p>
                  </div>
                ))}
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
                {patients.map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between">
                    <p className="font-medium">{patient.name}</p>
                    <p className="text-sm text-[#1F7A8C]">{patient.condition}</p>
                  </div>
                ))}
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
                  <Link href="/prescribe-medication">Prescribe Medication</Link>
                </Button>
                <Button className="w-full bg-[#BFDBF7] text-[#022B3A] hover:bg-[#A0C4E2]">
                  <Link href="/schedule-appointment">Schedule Appointment</Link>
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
                <p><strong>Average Heart Rate:</strong> 72 BPM</p>
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
                  <Link href="/start-chat">Start New Chat with Patient</Link>
                </Button>
                <Button className="w-full bg-[#1F7A8C] text-[#FFFFFF] hover:bg-[#165E6F]">
                  <Link href="/chat-ai">Chat with AI Companion</Link>
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