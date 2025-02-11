import React, { useEffect, useState } from "react";
import vite from '../../public/vite.svg'

const MyProfile = () => {
    const [searchHistory, setSearchHistory] = useState([]);

    useEffect(() => {
        const history = JSON.parse(localStorage.getItem("searchHistory")) || [
            {
                symptoms: ["Itching", "Redness"],
                disease: "Eczema",
                image: vite, // Placeholder image
                drugs: ["Hydrocortisone", "Antihistamines"]
            },
            {
                symptoms: ["Rash", "Swelling"],
                disease: "Psoriasis",
                image: vite,
                drugs: ["Salicylic Acid", "Topical Steroids"]
            },
            {
                symptoms: ["Dry Skin", "Cracks"],
                disease: "Athlete’s Foot",
                image: vite,
                drugs: ["Antifungal Cream", "Clotrimazole"]
            }
        ];
        setSearchHistory(history);
    }, []);


    const clearHistory = () => {
        localStorage.removeItem("searchHistory");
        setSearchHistory([]);
    };

    return (
        <div className="mt-5 max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg relative">
          
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">My Search History</h2>
                <button
                    onClick={clearHistory}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Clear History
                </button>
            </div>

            {searchHistory.length === 0 ? (
                <p className="text-gray-500">No search history available.</p>
            ) : (
                <div className="space-y-6 text-black">
                    {searchHistory.map((entry, index) => (
                        <div key={index} className="p-4 border border-gray-300 rounded-lg">
                            <h3 className="text-lg font-semibold text-blue-600">Search {index + 1}</h3>
                            <p><strong>Symptoms:</strong> {entry.symptoms.join(", ")}</p>
                            <p><strong>Predicted Disease:</strong> {entry.disease}</p>

                            {entry.image && (
                                <div className="mt-2">
                                    <img
                                        src={entry.image}
                                        alt="Disease"
                                        className="w-32 h-32 object-cover rounded-md border"
                                    />
                                </div>
                            )}

                            <p className="mt-2"><strong>Recommended Drugs:</strong> {entry.drugs.join(", ")}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyProfile;
