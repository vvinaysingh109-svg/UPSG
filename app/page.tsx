"use client";
import React, { useState } from "react";

export default function Home() {
  const [vulnerabilityName, setVulnerabilityName] = useState("");
  const [language, setLanguage] = useState("");
  const [platform, setPlatform] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!vulnerabilityName || !language || !platform) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);
    setOutput("");

    const formData = new FormData();
    formData.append("vulnerabilityName", vulnerabilityName);
    formData.append("language", language);
    formData.append("platform", platform);
    formData.append("description", description);
    if (file) formData.append("file", file);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setOutput(data.patch || "No output returned");
    } catch (error) {
      setOutput("Error contacting backend");
    }

    setLoading(false);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-6"
      style={{ backgroundImage: "url('/green-bg.png')" }}
    >
      <div className="w-full max-w-2xl bg-black/60 backdrop-blur-xl p-6 rounded-xl border border-green-500 shadow-xl">
        <h1 className="text-green-400 text-3xl font-bold text-center mb-6">
          Universal Security Patch Generator
        </h1>

        {/* Vulnerability Name */}
        <label className="text-green-300 font-semibold">Vulnerability Name *</label>
        <input
          type="text"
          placeholder="Example: XSS, SQL Injection"
          value={vulnerabilityName}
          onChange={(e) => setVulnerabilityName(e.target.value)}
          className="w-full p-3 bg-black text-green-400 border border-green-700 rounded-md mb-4"
        />

        {/* Language */}
        <label className="text-green-300 font-semibold">Language *</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full p-3 bg-black text-green-400 border border-green-700 rounded-md mb-4"
        >
          <option value="">Select Language</option>
          <option>Java</option>
          <option>JavaScript</option>
          <option>Python</option>
          <option>PHP</option>
          <option>C#</option>
          <option>Node.js</option>
          <option>Android (Java/Kotlin)</option>
          <option>iOS (Swift)</option>
        </select>

        {/* Platform */}
        <label className="text-green-300 font-semibold">Platform *</label>
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="w-full p-3 bg-black text-green-400 border border-green-700 rounded-md mb-4"
        >
          <option value="">Select Platform</option>
          <option>Web</option>
          <option>Mobile</option>
          <option>API</option>
          <option>Source Code Review</option>
        </select>

        {/* Description */}
        <label className="text-green-300 font-semibold">Vulnerability Description / Notes</label>
        <textarea
          placeholder="Add any PoC text, explanation, or small code snippet"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 bg-black text-green-400 border border-green-700 rounded-md mb-4 h-28"
        />

        {/* File Upload */}
        <label className="text-green-300 font-semibold">Upload PoC (Screenshot / Code / Burp Export)</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full p-3 bg-black text-green-400 border border-green-700 rounded-md mb-4"
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full p-3 bg-green-600 hover:bg-green-700 rounded-lg text-black font-bold transition-all"
        >
          {loading ? "Generating Patch..." : "Generate Patch"}
        </button>

        {/* Output */}
        {output && (
          <div className="mt-6 bg-black border border-green-700 text-green-400 p-4 rounded-md whitespace-pre-wrap">
            {output}
          </div>
        )}
      </div>
    </div>
  );
}
