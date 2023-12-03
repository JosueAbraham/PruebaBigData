import React, { useState } from 'react';

const DiabetesChecker = () => {
    const [values, setValues] = useState({
        Cholesterol: '',
        Glucose: '',
        HDLChol: '',
        CholHDLRatio: '',
        Age: '',
        Gender: '',
        Height: '',
        Weight: '',
        BMI: '',
        SystolicBP: '',
        DiastolicBP: '',
        Waist: '',
        Hip: '',
        WaistHipRatio: '',
    });

    const [predictionResult, setPredictionResult] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };

    const handleVerify = async () => {
        try {
            const response = await fetch('http://localhost:3000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error(`Error al realizar la predicción. Código de estado: ${response.status}`);
            }

            const resultData = await response.json();

            if (resultData.error) {
                console.error('Error del servidor:', resultData.error);
                setPredictionResult('Error al realizar la predicción.');
            } else {
                // Modificación aquí: Ahora el resultado es directamente la respuesta del servidor
                setPredictionResult(resultData.prediction);
            }
        } catch (error) {
            console.error('Error al realizar la predicción:', error);
            setPredictionResult('Error al realizar la predicción.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Diabetes Checker</h2>
            {Object.keys(values).map((key) => (
                <div key={key} className="mb-3">
                    <label htmlFor={key} className="form-label">
                        {key}
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id={key}
                        name={key}
                        value={values[key]}
                        onChange={handleChange}
                    />
                </div>
            ))}
            <button className="btn btn-primary" onClick={handleVerify}>
                Verificar
            </button>

            {predictionResult !== null && (
                <div className="mt-3">
                    <strong>Resultado:</strong> {predictionResult === 1 ? 'Tiene diabetes.' : 'No tiene diabetes.'}
                </div>
            )}
        </div>
    );
};

export default DiabetesChecker;