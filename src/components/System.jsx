import React, { useState } from "react";
import axios from 'axios'

const symptomsList = [
  "itching", "skin_rash", "nodal_skin_eruptions", "continuous_sneezing", "shivering", "chills",
  "joint_pain", "stomach_pain", "acidity", "ulcers_on_tongue", "muscle_wasting", "vomiting",
  "burning_micturition", "spotting_ urination", "fatigue", "weight_gain", "anxiety",
  "cold_hands_and_feets", "mood_swings", "weight_loss", "restlessness", "lethargy",
  "patches_in_throat", "irregular_sugar_level", "cough", "high_fever", "sunken_eyes",
  "breathlessness", "sweating", "dehydration", "indigestion", "headache", "yellowish_skin",
  "dark_urine", "nausea", "loss_of_appetite", "pain_behind_the_eyes", "back_pain", "constipation",
  "abdominal_pain", "diarrhoea", "mild_fever", "yellow_urine", "yellowing_of_eyes",
  "acute_liver_failure", "fluid_overload", "swelling_of_stomach", "swelled_lymph_nodes",
  "malaise", "blurred_and_distorted_vision", "phlegm", "throat_irritation", "redness_of_eyes",
  "sinus_pressure", "runny_nose", "congestion", "chest_pain", "weakness_in_limbs",
  "fast_heart_rate", "pain_during_bowel_movements", "pain_in_anal_region", "bloody_stool",
  "irritation_in_anus", "neck_pain", "dizziness", "cramps", "bruising", "obesity",
  "swollen_legs", "swollen_blood_vessels", "puffy_face_and_eyes", "enlarged_thyroid",
  "brittle_nails", "swollen_extremeties", "excessive_hunger", "extra_marital_contacts",
  "drying_and_tingling_lips", "slurred_speech", "knee_pain", "hip_joint_pain", "muscle_weakness",
  "stiff_neck", "swelling_joints", "movement_stiffness", "spinning_movements", "loss_of_balance",
  "unsteadiness", "weakness_of_one_body_side", "loss_of_smell", "bladder_discomfort",
  "foul_smell_of_urine", "continuous_feel_of_urine", "passage_of_gases", "internal_itching",
  "toxic_look_(typhos)", "depression", "irritability", "muscle_pain", "altered_sensorium",
  "red_spots_over_body", "belly_pain", "abnormal_menstruation", "dischromic_patches",
  "watering_from_eyes", "increased_appetite", "polyuria", "family_history", "mucoid_sputum",
  "rusty_sputum", "lack_of_concentration", "visual_disturbances", "receiving_blood_transfusion",
  "receiving_unsterile_injections", "coma", "stomach_bleeding", "distention_of_abdomen",
  "history_of_alcohol_consumption", "fluid_overload.1", "blood_in_sputum",
  "prominent_veins_on_calf", "palpitations", "painful_walking", "pus_filled_pimples",
  "blackheads", "scurring", "skin_peeling", "silver_like_dusting", "small_dents_in_nails",
  "inflammatory_nails", "blister", "red_sore_around_nose", "yellow_crust_ooze"
];

const msg = 'No Disease Detected'

const diseaseDrugData = {
  "Actinic keratoses and intraepithelial carcinomae": [
    { name: "5-Fluorouracil", description: "A topical chemotherapy that inhibits DNA synthesis in abnormal cells." },
    { name: "Imiquimod", description: "A cream that stimulates the immune system to attack abnormal skin cells." }
  ],
  "Basal cell carcinoma": [
    { name: "Vismodegib", description: "An oral drug that inhibits tumor growth in advanced cases." },
    { name: "Imiquimod", description: "A topical immune response modifier for early-stage tumors." }
  ],
  "Benign keratosis-like lesions": [
    { name: "Cryotherapy", description: "Liquid nitrogen is used to freeze and remove lesions." },
    { name: "Electrodessication", description: "An electric current burns away the lesion." }
  ],
  "Dermatofibroma": [
    { name: "Surgical Excision", description: "The lesion is completely removed via minor surgery." },
    { name: "Laser Therapy", description: "A laser is used to shrink and lighten the lesion." }
  ],
  "Melanocytic nevi": [
    { name: "Surgical Excision", description: "A common method to remove moles that may be cancerous." },
    { name: "Laser Therapy", description: "Used for cosmetic removal of benign moles." }
  ],
  "Pyogenic granulomas and hemorrhage": [
    { name: "Silver Nitrate", description: "A chemical cauterizing agent to stop bleeding and shrink lesions." },
    { name: "Laser Therapy", description: "Used to remove the granuloma with minimal bleeding." }
  ],
  "Melanoma": [
    { name: "Pembrolizumab", description: "An immunotherapy drug that boosts the body's defense against melanoma." },
    { name: "Dabrafenib", description: "A targeted therapy for melanoma with a specific BRAF mutation." }
  ]
};


const System = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [recommendedDrugs, setRecommendedDrugs] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [detectedDisease, setDetectedDisease] = useState();
  const [diseaseDrugs, setDiseaseDrugs] = useState([]);
  const [pending, setpending] = useState(false)

  const handleSelectSymptom = (event) => {
    const symptom = event.target.value;
    if (symptom && !selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleRemoveSymptom = (symptom) => {
    setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
  };

  const handleGetDrugs = async () => {
    if (selectedSymptoms.length === 0) {
      alert("Please select at least one symptom!");
      return;
    }
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: selectedSymptoms.join(",") })
      });
      const data = await response.json();
      const medications = data.medications[0].replace(/'/g, '"');
      setRecommendedDrugs(JSON.parse(medications));
    } catch (error) {
      alert("Something Went Wrong !!!")
      console.error(error, " Something Went Wrong !!!");
    }
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handlePredictDisease = async () => {
    if (!selectedImage) {
      alert("Please choose an image first!");
      return;
    }
    setpending(true)
    const formData = new FormData();
    formData.append("image", selectedImage);
    try {
      const response = await axios.post("http://127.0.0.1:5000/predictdisease", formData);
      const data = await response.data;
      const detectedDisease = data.disease || msg;
      setDetectedDisease(detectedDisease);
      setDiseaseDrugs(diseaseDrugData[detectedDisease] || []);
      setpending(false)
    } catch (error) {
      console.error("Error predicting disease:", error);
      setpending(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="mt-4 w-full max-w-5xl bg-white shadow-lg rounded-lg p-8 flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-blue-50 p-6 rounded-lg text-black">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">Select Symptoms</h2>
          <select onChange={handleSelectSymptom} className="w-full p-2 border border-gray-300 rounded-md">
            <option value="">-- Select Symptom --</option>
            {symptomsList.map((symptom, index) => (
              <option key={index} value={symptom}>{symptom}</option>
            ))}
          </select>
          <div className="mt-2 ">
            {selectedSymptoms.map((symptom, index) => (
              <span key={index} className="bg-blue-200 text-blue-800 p-2 rounded-md m-1 inline-block ">
                {symptom} <span onClick={() => handleRemoveSymptom(symptom)} className="cursor-pointer m-1 text-black hover:font-bold">x</span>
              </span>
            ))}
          </div>
          <button onClick={handleGetDrugs} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Get Drugs
          </button>
          {recommendedDrugs.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-blue-700">Recommended Drugs:</h3>
              <ul className="list-disc ml-5 mt-2 text-gray-700">
                {recommendedDrugs.map((drug, index) => (
                  <li key={index}>{drug}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="flex-1 bg-green-50 p-6 rounded-lg flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4 text-green-700">Detect Skin Disease</h2>
          <input type="file" accept="image/*" onChange={handleImageChange} className="text-gray-500 w-full p-2 border border-gray-300 rounded-md" />
          {selectedImage && <p className="text-sm text-gray-600 mt-2">Selected: {selectedImage.name}</p>}
          <button onClick={handlePredictDisease} className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
            Predict Disease & Recommend Drug
          </button>
          {detectedDisease && (
            <div className="mt-4 flex items-center gap-6">
              <img src={URL.createObjectURL(selectedImage)} alt="Disease Preview" className="w-28 h-28 object-cover rounded-lg border-2 border-gray-300" />
              <div>
                <h3 className="text-lg font-semibold text-green-700">Detected Disease:</h3>
                <p className={`${detectedDisease == msg ? 'text-red-700 font-bold' : 'text-gray-600'}`}>{detectedDisease}</p>

                <h3 className="text-lg font-semibold mt-2 text-green-700">Recommended Drugs:</h3>

                <ul className="list-disc ml-5 mt-2 text-gray-700">
                  {diseaseDrugs.map((drug, index) => (
                    <li key={index}>
                      <strong>{drug.name}:</strong> {drug.description}
                    </li>
                  ))}
                </ul>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default System;
