
import { useEffect, useRef, useState } from "react";
import {
  FilesetResolver,
  FaceLandmarker,
} from "@mediapipe/tasks-vision";

const Faceexpression = () => {
  const videoRef = useRef(null);

  const [faceLandmarker, setFaceLandmarker] = useState(null);
  const [detectedExpression, setDetectedExpression] =
    useState("not detected");
  const [cameraReady, setCameraReady] = useState(false);

  // 1. Initialize MediaPipe model
  useEffect(() => {
    let isMounted = true;
    let landmarkerInstance;

    async function initModel() {
      try {
        const filesetResolver =
          await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
          );

        const instance = await FaceLandmarker.createFromOptions(
          filesetResolver,
          {
            baseOptions: {
              modelAssetPath:
                "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
              delegate: "GPU",
            },
            outputFaceBlendshapes: true,
            runningMode: "VIDEO",
            numFaces: 1,
          }
        );

        landmarkerInstance = instance;

        if (isMounted) {
          setFaceLandmarker(instance);
        } else {
          instance.close();
        }
      } catch (error) {
        console.error("Model initialization failed:", error);
      }
    }

    initModel();

    return () => {
      isMounted = false;
      landmarkerInstance?.close();
    };
  }, []);

  // 2. Start webcam after model initialization
  useEffect(() => {
    if (!faceLandmarker) return;

    let stream;
    let cancelled = false;

    async function startCamera() {
      try {
        const cameraStream =
          await navigator.mediaDevices.getUserMedia({
            video: {
              width: 640,
              height: 480,
            },
            audio: false,
          });

        if (cancelled) {
          cameraStream.getTracks().forEach((track) => track.stop());
          return;
        }

        stream = cameraStream;

        const video = videoRef.current;

        if (video) {
          video.srcObject = stream;
          await video.play();

          if (!cancelled) {
            setCameraReady(true);
          }
        }
      } catch (error) {
        console.error("Webcam access failed:", error);
        setCameraReady(false);
      }
    }

    startCamera();

    return () => {
      cancelled = true;
      stream?.getTracks().forEach((track) => track.stop());

      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }

      setCameraReady(false);
    };
  }, [faceLandmarker]);

  // 3. Detect expression only when called
  const detectExpression = () => {
    const video = videoRef.current;

    if (
      !faceLandmarker ||
      !video ||
      video.readyState < 2
    ) {
      return null;
    }

    try {
      const results = faceLandmarker.detectForVideo(
        video,
        performance.now()
      );

      if (!results.faceBlendshapes?.length) {
        setDetectedExpression("no face detected");
        return null;
      }

      const mood = interpretExpressions(
        results.faceBlendshapes[0].categories
      );

      // Update UI state
      setDetectedExpression(mood);

      // Return current mood immediately
      return mood;
    } catch (error) {
      console.error("Expression detection failed:", error);
      return null;
    }
  };

  // 4. Convert blendshapes into a mood label
  const interpretExpressions = (blendshapes) => {
    const shapes = {};

    blendshapes.forEach((item) => {
      shapes[item.categoryName] = item.score;
    });

    if (
      shapes.jawOpen > 0.4 &&
      shapes.mouthSmileLeft < 0.4 &&
      shapes.mouthSmileRight < 0.4
    ) {
      return "surprised";
    }

    if (
      shapes.mouthSmileLeft > 0.45 ||
      shapes.mouthSmileRight > 0.45
    ) {
      return "happy";
    }

    if (
      shapes.browDownLeft > 0.3 &&
      shapes.browDownRight > 0.3
    ) {
      return "angry";
    }

    if (
      shapes.mouthFrownLeft > 0.01 &&
      shapes.mouthFrownRight > 0.01
    ) {
      return "sad";
    }

    return "neutral";
  };

  return {
    faceLandmarker,
    detectedExpression,
    videoRef,
    detectExpression,
    cameraReady,
  };
};

export default Faceexpression;

