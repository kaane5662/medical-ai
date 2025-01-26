"use client"; // Mark this component as a Client Component

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DoctorSignUp = () => {
const router = useRouter()
const [formData, setFormData] = useState({
firstName: "",
lastName: "",
dateofbirth: "",
email: "",
address: "",
phoneNumber: "",
hasInsurance: "",
insuranceProvider: "",
insuranceNumber: "",
gender: "",
proofOfIdentity: null,
username: "",
password: "",
tosAccepted: false,
});

const handleInputChange = (e:any) => {
const { name, value, type, checked } = e.target;
console.log(value)
setFormData({
    ...formData,
    [name]: type === "checkbox" ? checked : value,
});
};

const handleFileChange = (e:any) => {
const { name, files } = e.target;

setFormData({
    ...formData,
    [name]: files[0],
});
};

const handleSubmit = (e) => {
e.preventDefault();
console.log("Form Data:", formData);
axios.post(`${process.env.NEXT_PUBLIC_SERVER}/patients`,formData,{withCredentials:true}).then((res)=>{
    router.push("/pdashboard");
}).catch((error:any)=>{
    console.error(error)
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
                First Name
            </label>
            <input
                type="text"
                id="fullName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-[#FFFFFF] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#BF0F7] focus:border-[#BF0F7]"
                required
            />
            </div>
            <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-[#FFFFFF]">
                Last Name
            </label>
            <input
                type="text"
                id="fullName"
                name="lastName"
                value={formData.lastName}
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
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-[#FFFFFF] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#BF0F7] focus:border-[#BF0F7]"
            required
        />
        </div>
        <div>
        <label htmlFor="hasInsurance" className="block text-sm font-medium text-[#FFFFFF]">
            Do you have insurance
        </label>
        <select
            id="hasInsurance"
            name="hasInsurance"
            value={formData.hasInsurance}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-[#FFFFFF] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#BF0F7] focus:border-[#BF0F7]"
            required
        >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
        </select>
        </div>
        <div>
        <label htmlFor="insuranceprovider" className="block text-sm font-medium text-[#FFFFFF]">
            What insurance provider do you have?
        </label>
        <select
            id="insuranceprovider"
            name="insuranceProvider"
            value={formData.insuranceProvider}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-[#FFFFFF] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#BF0F7] focus:border-[#BF0F7]"
            required
        >
            <option value="Blue Shield">Blue Shield</option>
            <option value="Medicare">Medicare</option>
            <option value="Aetna">Aetna</option>
            <option value="Cigna">Cigna</option>
            <option value="UnitedHealthcare">UnitedHealthcare</option>
            <option value="Kaiser Permanente">Kaiser Permanente</option>
            <option value="Humana">Humana</option>
            <option value="Anthem">Anthem</option>
            <option value="Blue Cross Blue Shield">Blue Cross Blue Shield</option>
            <option value="Molina Healthcare">Molina Healthcare</option>
            <option value="Health Net">Health Net</option>
            <option value="Centene">Centene</option>
            <option value="Oscar Health">Oscar Health</option>
            <option value="TRICARE">TRICARE</option>
            <option value="WellCare">WellCare</option>
            <option value="Ambetter">Ambetter</option>
            <option value="Highmark">Highmark</option>
            <option value="Medicaid">Medicaid</option>
            <option value="Mutual of Omaha">Mutual of Omaha</option>
            <option value="The Hartford">The Hartford</option>
            <option value="AmeriHealth">AmeriHealth</option>
            <option value="Principal">Principal</option>
            <option value="Guardian Life">Guardian Life</option>


        </select>
        </div>
        
        <div>
        <label htmlFor="insuranceNumber" className="block text-sm font-medium text-[#FFFFFF]">
            Insurance Number
        </label>
        <input
            type="text"
            id="insuranceNumber"
            name="insuranceNumber"
            value={formData.insuranceNumber}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-[#FFFFFF] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#BF0F7] focus:border-[#BF0F7]"
            required
        />
        </div>
        <div></div>
            {/* <div>
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
            </div> */}
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
            Preferred Consultation Mode
        </label>
        
        </div>
        <div className="flex items-center">
        <input
            type="checkbox"
            id="tosAccepted"
            name="tosAccepted"
            checked={formData.tosAccepted}
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
