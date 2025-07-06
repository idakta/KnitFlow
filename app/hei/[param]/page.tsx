"use client";
import { useParams } from "next/navigation";

export default function ParamPage() {
  const params = useParams();
  const param = params?.param;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Param from URL:
        </h1>
        <div className="text-xl text-blue-600 border border-blue-400 rounded px-6 py-4 bg-blue-50">
          {param}
        </div>
      </div>
    </div>
  );
}
