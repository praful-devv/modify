import Faceexpression from "../services/Faceexpression";

const FaceExpressionDetector = () => {

  

  const { faceLandmarker, detectedExpression, videoRef } = Faceexpression();

  return (
    <div className="h-screen flex items-center justify-center ">
      <div>
        {!faceLandmarker && <p>Loading AI Models (WASM)...</p>}

        <div>
          <video ref={videoRef} autoPlay playsInline muted />
        </div>

        <div className="text-2xl">Current State: {detectedExpression}</div>
      </div>
    </div>
  );
};

export default FaceExpressionDetector;
