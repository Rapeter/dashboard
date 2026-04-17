"use client"
import React, { useState } from 'react';

export default function SurveyForm() {
  const [formData, setFormData] = useState({
    givenName: '',
    surname: '',
    contactNumber: '',
    email: '',
    farmName: '',
    farmStreetAddress: '',
    townCity: '',
    postcode: '',
    state: '',
    region: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // This is where you will eventually send the data to your Next.js API / MySQL backend
    console.log("Form Data Submitted:", formData);
    alert("Form submitted! Check console for data.");
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* Header */}
      <header className="bg-[#091a40] h-28 flex items-center px-8 sm:px-16">
        <img
          src="https://q.surveys.unimelb.edu.au/CP/Graphic.php?IM=IM_6PTif2kLNeUE5Bs"
          alt="The University of Melbourne"
          className="h-16"
          /* Note: You will need to add a white logo to your public folder */
        />
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-gray-300 h-[6px]">
        <div className="bg-[#091a40] h-full w-[1%]"></div>
      </div>
      <div className="px-4 py-1 text-sm text-gray-600">
        0% Survey Completion
      </div>

      {/* Form Container */}
      <main className="max-w-3xl mx-auto py-12 px-6 sm:px-12">
        <form onSubmit={handleSubmit} className="space-y-6">

          <h2 className="text-xl text-gray-800 mb-6">
            <span className="text-black">*</span> Please provide the following information.
          </h2>

          <div className="space-y-5">
            <div className="flex flex-col">
              <label className="mb-1 text-sm text-gray-700">Contact given name</label>
              <input
                type="text" name="givenName" value={formData.givenName} onChange={handleChange}
                className="border border-gray-300 rounded-[4px] p-2.5 bg-[#f8f9fa] focus:outline-none focus:border-[#091a40]"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm text-gray-700">Contact surname</label>
              <input
                type="text" name="surname" value={formData.surname} onChange={handleChange}
                className="border border-gray-300 rounded-[4px] p-2.5 bg-[#f8f9fa] focus:outline-none focus:border-[#091a40]"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm text-gray-700">Contact number</label>
              <input
                type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange}
                className="border border-gray-300 rounded-[4px] p-2.5 bg-[#f8f9fa] focus:outline-none focus:border-[#091a40]"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm text-gray-700">Email</label>
              <input
                type="email" name="email" value={formData.email} onChange={handleChange}
                className="border border-gray-300 rounded-[4px] p-2.5 bg-[#f8f9fa] focus:outline-none focus:border-[#091a40]"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm text-gray-700">Farm name</label>
              <input
                type="text" name="farmName" value={formData.farmName} onChange={handleChange}
                className="border border-gray-300 rounded-[4px] p-2.5 bg-[#f8f9fa] focus:outline-none focus:border-[#091a40]"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm text-gray-700">Farm street address</label>
              <input
                type="text" name="farmStreetAddress" value={formData.farmStreetAddress} onChange={handleChange}
                className="border border-gray-300 rounded-[4px] p-2.5 bg-[#f8f9fa] focus:outline-none focus:border-[#091a40]"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm text-gray-700">Town/City</label>
              <input
                type="text" name="townCity" value={formData.townCity} onChange={handleChange}
                className="border border-gray-300 rounded-[4px] p-2.5 bg-[#f8f9fa] focus:outline-none focus:border-[#091a40]"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm text-gray-700">Postcode</label>
              <input
                type="text" name="postcode" value={formData.postcode} onChange={handleChange}
                className="border border-gray-300 rounded-[4px] p-2.5 bg-[#f8f9fa] focus:outline-none focus:border-[#091a40]"
              />
            </div>
          </div>

          <div className="pt-8">
            <h2 className="text-lg text-gray-800 mb-4">
              <span className="text-black">*</span> State and region (If you do not know which region your farm is located in, please search the region based on your nearest town <a href="#" className="underline text-blue-700">here</a>)
            </h2>

            <div className="space-y-5">
              <div className="flex flex-col">
                <label className="mb-1 text-sm text-gray-700">State</label>
                <select
                  name="state" value={formData.state} onChange={handleChange}
                  className="border border-gray-300 rounded-[4px] p-2.5 bg-[#f8f9fa] focus:outline-none focus:border-[#091a40] appearance-none"
                >
                  <option value=""></option>
                  <option value="VIC">Victoria</option>
                  <option value="NSW">New South Wales</option>
                  <option value="QLD">Queensland</option>
                  <option value="WA">Western Australia</option>
                  <option value="SA">South Australia</option>
                  <option value="TAS">Tasmania</option>
                  <option value="ACT">Australian Capital Territory</option>
                  <option value="NT">Northern Territory</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm text-gray-700">Region</label>
                <select
                  name="region" value={formData.region} onChange={handleChange}
                  className="border border-gray-300 rounded-[4px] p-2.5 bg-[#f8f9fa] focus:outline-none focus:border-[#091a40] appearance-none"
                >
                  <option value=""></option>
                  <option value="region1">Region 1</option>
                  <option value="region2">Region 2</option>
                  {/* Add actual regions here based on state selection eventually */}
                </select>
              </div>
            </div>
          </div>

          {/* Submit/Next Button */}
          <div className="flex justify-end pt-8">
            <button
              type="submit"
              className="bg-[#091a40] text-white px-6 py-2.5 rounded hover:bg-[#071433] transition-colors flex items-center font-medium"
            >
              Next page <span className="ml-2 font-bold">&gt;</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}