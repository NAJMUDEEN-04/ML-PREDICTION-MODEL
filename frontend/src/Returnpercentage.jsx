import React from 'react';

function Returnpercentage({data}){
    const percentage = data ? Math.round(data.probability * 100) : 0;
    const isReturned = data ? data.prediction === 1 : false;
    return(
        <>
        <div>
            <div className = "card p-4 text-center" style = {{
                backgroundColor :  "rgb(0, 0, 32)",
                color : "white",
                border : "none"
            }}>
                <h2 className="mb-3 fw-bold">RETURN PREDICTION</h2>

                <svg 
                    viewBox = "0 0 220 135"
                    className = "w-100"
                    style = {{ maxWidth : "350px", margin : "auto"}}
                >
                    <path
                        d = "M 20 110 A 90 90 0 0 1 200 110"
                        fill = "none"
                        stroke = "#475569"
                        strokeWidth = "15"
                        strokeLinecap = "round"
                    />

                    <path 
                        d = 'M 20 110 A 90 90 0 0 1 200 110'
                        fill = "none"
                        stroke = "#22d3ee"
                        strokeWidth = "15"
                        strokeLinecap = "round"
                        pathLength = "100"
                        strokeDasharray = {`${percentage} 100`}
                    />

                    <text
                        x = "110"
                        y = "91"    
                        textAnchor = "middle"
                        fontSize = "32"
                        fontWeight = "bold"
                        fill = "currentColor"
                    >{percentage}%</text>
                </svg>
                <div className="mt-3">
                    <h3 className="mb-2">PREDICTION RESULTS</h3>
                    { data ? (
                        <span className={`badge py-2 px-4 rounded fs-6 ${isReturned ? "bg-success" : "bg-danger"}`}>{isReturned ? "Returned" : "Not Returned"}</span>
                    ) : (
                        <span className="badge fs-6 bg-secondary">Awaiting Prediction</span>
                    )}
                </div>
            </div>
        </div>
        
        </>
    );
}
export default Returnpercentage;