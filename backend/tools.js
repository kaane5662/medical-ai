const misdiagnosisToolSchema = {
    name: "misdiagnosis_tool",
    description: "Analyze patient symptoms, demographics, and health metrics to determine the likelihood of a misdiagnosis.",
    input_schema: {
        type: "object",
        properties: {
            Disease: {
                type: "string",
                description: "The suspected disease or condition, e.g., 'Flu', 'COVID-19', 'Pneumonia'."
            },
            Fever: {
                type: "boolean",
                description: "Whether the patient has a fever (true/false)."
            },
            Cough: {
                type: "boolean",
                description: "Whether the patient has a cough (true/false)."
            },
            Fatigue: {
                type: "boolean",
                description: "Whether the patient is experiencing fatigue (true/false)."
            },
            difficulty_breathing: {
                type: "boolean",
                description: "Whether the patient is experiencing difficulty breathing (true/false)."
            },
            Age: {
                type: "integer",
                description: "The age of the patient."
            },
            Gender: {
                type: "string",
                description: "The gender of the patient, e.g., 'Male', 'Female', 'Non-binary'."
            },
            blood_pressure: {
                type: "string",
                description: "The patient's blood pressure, categorized e.g. Low, Normal, High"
            },
            cholesterol_level: {
                type: "string",
                description: "The patient's cholesterol level categorized e.g. Low, Normal, High"
            },
            outcome_variable: {
                type: "string",
                description: "The outcome variable to predict, e.g., 'Misdiagnosis Likelihood'."
            }
        },
        required: ["disease", "fever", "cough", "fatigue", "difficulty_breathing", "age", "gender", "blood_pressure", "cholesterol_level", "outcome_variable"]
    }
};

export {misdiagnosisToolSchema}