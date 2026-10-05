import Faceexpression from "../services/Faceexpression";


export default function FaceExpressionDetector() {
  const { faceLandmarker, detectedExpression, videoRef } = Faceexpression()


  return (
    <div>
      <h2>MediaPipe Face Expression Detector</h2>
      {!faceLandmarker && <p>Loading AI Models (WASM)...</p>}

      <div>
        <video ref={videoRef} autoPlay playsInline muted />
      </div>

      <div>Current State: {detectedExpression}</div>
    </div>
  );
}
