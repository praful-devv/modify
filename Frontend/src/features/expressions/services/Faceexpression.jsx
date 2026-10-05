import { useEffect, useRef, useState } from "react";
import { FilesetResolver, FaceLandmarker } from "@mediapipe/tasks-vision";

const Faceexpression = () => {
  const videoRef = useRef(null);
  const [faceLandmarker, setFaceLandmarker] = useState(null);
  const [detectedExpression, setDetectedExpression] = useState("Neutral");
  const requestRef = useRef(null);

  // 1. Initialize MediaPipe FaceLandmarker
  useEffect(() => {
    async function initModel() {
      // Load WebAssembly binaries optimized for the browser
      const filesetResolver = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm",
      );

      // Create landmarker instance configured for live stream and blendshapes
      const landmarker = await FaceLandmarker.createFromOptions(
        filesetResolver,
        {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
            delegate: "GPU",
          },
          outputFaceBlendshapes: true, // Crucial for facial expressions
          runningMode: "LIVE_STREAM",
          numFaces: 1,
        },
      );

      setFaceLandmarker(landmarker);
    }
    initModel();

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // 2. Start Webcam Stream once the model loads
  useEffect(() => {
    if (!faceLandmarker) return;

    navigator.mediaDevices
      .getUserMedia({ video: { width: 640, height: 480 } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.addEventListener("loadeddata", predictLoop);
        }
      })
      .catch((err) => console.error("Webcam access denied:", err));
  }, [faceLandmarker]);

  // 3. Process Live Frames
  const predictLoop = () => {
    if (!videoRef.current || !faceLandmarker) return;

    let startTimeMs = performance.now();

    // Process frames synchronously aligned to video playback
    if (videoRef.current.currentTime !== -1) {
      const results = faceLandmarker.detectForVideo(
        videoRef.current,
        startTimeMs,
      );

      if (
        results &&
        results.faceBlendshapes &&
        results.faceBlendshapes.length > 0
      ) {
        interpretExpressions(results.faceBlendshapes[0].categories);
      } else {
        setDetectedExpression("No Face Detected");
      }
    }

    requestRef.current = requestAnimationFrame(predictLoop);
  };

  // 4. Custom Scoring Rule to Map Muscle Groups (Blendshapes) to Human Expressions
  const interpretExpressions = (blendshapes) => {
    // MediaPipe gives you 52 blendshape coefficients from 0.0 to 1.0
    const shapes = {};
    blendshapes.forEach((item) => {
      shapes[item.categoryName] = item.score;
    });

    // Custom threshold rules to determine dominant expression
    if (shapes["jawOpen"] > 0.4 && shapes["mouthSmileLeft"] < 0.2) {
      setDetectedExpression("Surprised 😲");
    } else if (
      shapes["mouthSmileLeft"] > 0.45 ||
      shapes["mouthSmileRight"] > 0.45
    ) {
      setDetectedExpression("Smiling/Happy 😄");
    } else if (shapes["browDownLeft"] > 0.4 && shapes["browDownRight"] > 0.4) {
      setDetectedExpression("Angry/Focused 😡");
    } else if (
      shapes["mouthFrownLeft"] > 1 ||
      shapes["mouthFrownRight"] > 0.5
    ) {
      setDetectedExpression("Sad 😢");
    } else {
      setDetectedExpression("Neutral 😐");
    }
  };

  return { faceLandmarker, detectedExpression, videoRef };
};

export default Faceexpression;
