
import useSong from "../../home/hooks/useSong";
import Faceexpression from "../services/Faceexpression";

const FaceExpressionDetector = () => {
  const {
    faceLandmarker,
    detectedExpression,
    videoRef,
    detectExpression,
    cameraReady,
  } = Faceexpression();

  const { SongHook, song, loading, error } = useSong();

  const handleDetect = async () => {
    const mood = detectExpression();

    if (!mood) return;

    await SongHook(mood);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-5">
        {!faceLandmarker && <p>Loading AI model...</p>}

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full max-w-md rounded-xl"
        />

        <div className="flex justify-center ">
          <audio
            key={song?.song?.url}
            controls
            autoPlay
            src={song?.song?.url}
          />
        </div>

        <button
          onClick={handleDetect}
          disabled={!faceLandmarker || !cameraReady || loading}
          className="rounded-lg bg-blue-600 px-6 py-3 text-white disabled:opacity-50"
        >
          {loading ? "Finding Song..." : "Detect Expression"}
        </button>

        <div className="text-2xl">Current State: {detectedExpression}</div>

        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default FaceExpressionDetector;

