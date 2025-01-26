"use client"; // Mark this component as a Client Component

import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

const DoctorSignUp = () => {
const router = useRouter()
const [formData, setFormData] = useState({
fullName: "",
dateofbirth: "",
email: "",
address: "",
phonenumber: "",
gender: "",
boardcertifications: "",
malpracticeid: "",
medicalLicense: "",
specialization: "",
hospital: "",
proofOfIdentity: null,
proofOfPractice: null,
username: "",
password: "",
termsAccepted: false,
consultationModes: [],
availableHours: "",
});

const handleInputChange = (e) => {
const { name, value, type, checked } = e.target;
setFormData({
    ...formData,
    [name]: type === "checkbox" ? checked : value,
});
};

const handleFileChange = (e) => {
const { name, files } = e.target;
setFormData({
    ...formData,
    [name]: files[0],
});
};

const handleSubmit = (e:any) => {
e.preventDefault();
console.log("Form Data:", formData);
axios.post(`${process.env.NEXT_PUBLIC_SERVER}/doctors`,formData,{withCredentials:true}).then((res)=>{
    router.push("/dashboard");
}).catch((error:any)=>{
    
})
// Add your submission logic here
};

return (
<div className="min-h-screen flex items-center justify-center bg-[#022834]">
    <div className="bg-[#1F7A9C] p-8 rounded-lg shadow-lg w-full max-w-lg">
    <h1 className="text-3xl font-bold text-[#FFFFFF] text-center mb-6">Doctor Sign Up</h1>
    <form onSubmit={handleSubmit} className="space-y-4">
        <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-[#FFFFFF]">
            Full Name
        </label>
        <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-[#FFFFFF] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#BF0F7] focus:border-[#BF0F7]"
            required
        />
        </div>
        <div>
        <label htmlFor="dateofbirth" className="block text-sm font-medium text-[#FFFFFF]">
            Date of Birth
        </label>
        <input
            type="date"
            id="dateofbirth"
            name="dateofbirth"
            value={formData.dateofbirth}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-[#FFFFFF] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#BF0F7] focus:border-[#BF0F7]"
            required
        />
        </div>
        <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#FFFFFF]">
            Email
        </label>
        <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-[#FFFFFF] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#BF0F7] focus:border-[#BF0F7]"
            required
        />
        </div>
        <div>
        <label htmlFor="address" className="block text-sm font-medium text-[#FFFFFF]">
            Address
        </label>
        <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-[#FFFFFF] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#BF0F7] focus:border-[#BF0F7]"
            required
        />
        </div>
        <div>
        <label htmlFor="phonenumber" className="block text-sm font-medium text-[#FFFFFF]">
            Phone Number
        </label>
        <input
            type="text"
            id="phonenumber"
            name="phonenumber"
            value={formData.phonenumber}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-[#FFFFFF] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#BF0F7] focus:border-[#BF0F7]"
            required
        />
        </div>
        <div>
        <label htmlFor="medicalLicense" className="block text-sm font-medium text-[#FFFFFF]">
            Medical License Number
        </label>
        <input
            type="text"
            id="medicalLicense"
            name="medicalLicense"
            value={formData.medicalLicense}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-[#FFFFFF] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#BF0F7] focus:border-[#BF0F7]"
            required
        />
        </div>
        <div>
        <label htmlFor="malpracticeid" className="block text-sm font-medium text-[#FFFFFF]">
            Malpractice ID
        </label>
        <input
            type="text"
            id="malpracticeid"
            name="malpracticeid"
            value={formData.malpracticeid}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-[#FFFFFF] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#BF0F7] focus:border-[#BF0F7]"
            required
        />
        </div>
        <div>
        <label htmlFor="specialization" className="block text-sm font-medium text-[#FFFFFF]">
            Specialization
        </label>
        <select
            id="specialization"
            name="specialization"
            value={formData.specialization}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-[#FFFFFF] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#BF0F7] focus:border-[#BF0F7]"
            required
        >
        
            <option value="Pediatrician">Pediatrician</option>
            <option value="Surgeon">Surgeon</option>
            <option value="Oncologist">Oncologist</option>
            <option value="Radiologist">Radiologist</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Endocrinologist">Endocrinologist</option>
            <option value="Gastroenterologist">Gastroenterologist</option>
            <option value="Hematologist">Hematologist</option>
            <option value="Nephrologist">Nephrologist</option>
            <option value="Ophthalmologist">Ophthalmologist</option>
            <option value="Psychiatrist">Psychiatrist</option>
            <option value="Pulmonologist">Pulmonologist</option>
            <option value="Rheumatologist">Rheumatologist</option>
            <option value="Allergist/Immunologist">Allergist/Immunologist</option>
            <option value="Anesthesiologist">Anesthesiologist</option>
            <option value="Obstetrician/Gynecologist">Obstetrician/Gynecologist</option>
            <option value="Urologist">Urologist</option>
            <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
            <option value="Plastic Surgeon">Plastic Surgeon</option>
            <option value="Sports Medicine Specialist">Sports Medicine Specialist</option>
            <option value="Palliative Care Specialist">Palliative Care Specialist</option>
            <option value="Family Medicine">Family Medicine</option>
            <option value="Pathologist">Pathologist</option>
            <option value="Emergency Medicine">Emergency Medicine</option>
            <option value="Infectious Disease Specialist">Infectious Disease Specialist</option>
            <option value="Clinical Geneticist">Clinical Geneticist</option>
            <option value="Critical Care Medicine Specialist">Critical Care Medicine Specialist</option>
            <option value="Sleep Medicine Specialist">Sleep Medicine Specialist</option>
            <option value="Otolaryngologist (ENT)">Otolaryngologist (ENT)</option>

        </select>
        </div>
        <div>
        <label htmlFor="hospital" className="block text-sm font-medium text-[#FFFFFF]">
            Hospital/Clinic Name
        </label>
        <select
            id="hospital"
            name="hospital"
            value={formData.hospital}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-[#FFFFFF] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#BF0F7] focus:border-[#BF0F7]"
            required
        >
            <option value="">Select Hospital/Clinic</option>
            <option value="NewYork-Presbyterian Hospital">NewYork-Presbyterian Hospital</option>
            <option value="Mount Sinai Hospital">Mount Sinai Hospital</option>
            <option value="NYU Langone Health">NYU Langone Health</option>
            <option value="Bellevue Hospital Center">Bellevue Hospital Center</option>
            <option value="Lenox Hill Hospital">Lenox Hill Hospital</option>
            <option value="Weill Cornell Medicine">Weill Cornell Medicine</option>
            <option value="Columbia University Irving Medical Center">Columbia University Irving Medical Center</option>
            <option value="MedStar Georgetown University Hospital">MedStar Georgetown University Hospital</option>
            <option value="Howard University Hospital">Howard University Hospital</option>
            <option value="George Washington University Hospital">George Washington University Hospital</option>
            <option value="Children's National Hospital">Children's National Hospital</option>
            <option value="Sibley Memorial Hospital">Sibley Memorial Hospital</option>
            <option value="Georgetown University Medical Center">Georgetown University Medical Center</option>
        </select>
        </div>
        <div>
        <label htmlFor="boardcertifications" className="block text-sm font-medium text-[#FFFFFF]">
            Board Certifications
        </label>
        <select
            id="boardcertifications"
            name="boardcertifications"
            value={formData.boardcertifications}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-[#FFFFFF] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#BF0F7] focus:border-[#BF0F7]"
            required
        >
            <option value="">Select Board Certification</option>
            <option value="American Board of Internal Medicine">American Board of Internal Medicine</option>
            <option value="American Board of Obstetrics and Gynecology">American Board of Obstetrics and Gynecology</option>
            <option value="American Board of Dermatology">American Board of Dermatology</option>
            <option value="American Board of Orthopaedic Surgery">American Board of Orthopaedic Surgery</option>
            <option value="American Board of Pediatrics">American Board of Pediatrics</option>
            <option value="American Board of Radiology">American Board of Radiology</option>
            <option value="American Board of Surgery">American Board of Surgery</option>
            <option value="American Board of Anesthesiology">American Board of Anesthesiology</option>
            <option value="American Board of Family Medicine">American Board of Family Medicine</option>
            <option value="American Board of Emergency Medicine">American Board of Emergency Medicine</option>
            <option value="American Board of Psychiatry and Neurology">American Board of Psychiatry and Neurology</option>
            <option value="American Board of Pathology">American Board of Pathology</option>
            <option value="American Board of Plastic Surgery">American Board of Plastic Surgery</option>
            <option value="American Board of Ophthalmology">American Board of Ophthalmology</option>
            <option value="American Board of Allergy and Immunology">American Board of Allergy and Immunology</option>
            <option value="American Board of Preventive Medicine">American Board of Preventive Medicine</option>
            <option value="American Board of Nuclear Medicine">American Board of Nuclear Medicine</option>
            <option value="American Board of Medical Genetics and Genomics">American Board of Medical Genetics and Genomics</option>
            <option value="American Board of Geriatrics">American Board of Geriatrics</option>
            <option value="American Board of Rheumatology">American Board of Rheumatology</option>
            <option value="American Board of Cardiology">American Board of Cardiology</option>
            <option value="American Board of Endocrinology">American Board of Endocrinology</option>
        </select>
        </div>
        <div>
        <label htmlFor="proofOfIdentity" className="block text-sm font-medium text-[#FFFFFF]">
            Proof of Identity
        </label>
        <input
            type="file"
            id="proofOfIdentity"
            name="proofOfIdentity"
            onChange={handleFileChange}
            className="mt-1 block w-full text-[#FFFFFF]"
            required
        />
        </div>
        <div>
        <label htmlFor="proofOfPractice" className="block text-sm font-medium text-[#FFFFFF]">
            Proof of Medical Practice
        </label>
        <input
            type="file"
            id="proofOfPractice"
            name="proofOfPractice"
            onChange={handleFileChange}
            className="mt-1 block w-full text-[#FFFFFF]"
            required
        />
        </div>
        <div>
        <label htmlFor="username" className="block text-sm font-medium text-[#FFFFFF]">
            Username
        </label>
        <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-[#FFFFFF] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#BF0F7] focus:border-[#BF0F7]"
            required
        />
        </div>
        <div>
        <label htmlFor="password" className="block text-sm font-medium text-[#FFFFFF]">
            Password
        </label>
        <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-[#FFFFFF] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#BF0F7] focus:border-[#BF0F7]"
            required
        />
        </div>
        <div>
        <label className="block text-sm font-medium text-[#FFFFFF]">
            Consultation Modes Offered
        </label>
        <div className="flex items-center space-x-4">
            <label className="flex items-center text-[#FFFFFF]">
            <input
                type="checkbox"
                name="consultationModes"
                value="In-Person"
                onChange={(e) => {
                const { checked, value } = e.target;
                setFormData((prev) => ({
                    ...prev,
                    consultationModes: checked
                    ? [...prev.consultationModes, value]
                    : prev.consultationModes.filter((mode) => mode !== value),
                }));
                }}
                className="mr-2"
            />
            In-Person
            </label>
            <label className="flex items-center text-[#FFFFFF]">
            <input
                type="checkbox"
                name="consultationModes"
                value="Video Call"
                onChange={(e) => {
                const { checked, value } = e.target;
                setFormData((prev) => ({
                    ...prev,
                    consultationModes: checked
                    ? [...prev.consultationModes, value]
                    : prev.consultationModes.filter((mode) => mode !== value),
                }));
                }}
                className="mr-2"
            />
            Video Call
            </label>
            <label className="flex items-center text-[#FFFFFF]">
            <input
                type="checkbox"
                name="consultationModes"
                value="Phone Call"
                onChange={(e) => {
                const { checked, value } = e.target;
                setFormData((prev) => ({
                    ...prev,
                    consultationModes: checked
                    ? [...prev.consultationModes, value]
                    : prev.consultationModes.filter((mode) => mode !== value),
                }));
                }}
                className="mr-2"
            />
            Phone Call
            </label>
        </div>
        </div>
        <div>
        <label htmlFor="availableHours" className="block text-sm font-medium text-[#FFFFFF]">
            Available Hours
        </label>
        <input
            type="text"
            id="availableHours"
            name="availableHours"
            value={formData.availableHours}
            onChange={handleInputChange}
            placeholder="e.g., Mon-Fri 9am-5pm"
            className="mt-1 block w-full px-3 py-2 bg-[#FFFFFF] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#BF0F7] focus:border-[#BF0F7]"
            required
        />
        </div>
        <div className="flex items-center">
        <input
            type="checkbox"
            id="termsAccepted"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleInputChange}
            className="mr-2"
            required
        />
        <label htmlFor="termsAccepted" className="text-sm text-[#FFFFFF]">
            I accept the Terms and Conditions
        </label>
        </div>
        <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#022834] bg-[#BF0F7] hover:bg-[#A30E6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BF0F7]"
        >
        Submit
        </button>
    </form>
    </div>
</div>
);
};

export default DoctorSignUp;
