import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiArrowLeft, HiCamera, HiStop, HiRefresh, HiCheck } from 'react-icons/hi';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Badge from '../../components/Badge';

const FacialAnalysis = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [state, setState] = useState('initial'); // initial, requesting, active, captured, processing, result, error
  const [errorMsg, setErrorMsg] = useState('');
  const [capturedImage, setCapturedImage] = useState(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const startCamera = async () => {
    try {
      setState('requesting');
      setErrorMsg('');
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setState('active');
    } catch (err) {
      console.error('Camera error:', err);
      setState('error');
      if (err.name === 'NotAllowedError') {
        setErrorMsg('Camera access was denied. You can continue using ClassMind AI without this prototype feature.');
      } else if (err.name === 'NotFoundError') {
        setErrorMsg('No camera was detected on this device.');
      } else {
        setErrorMsg('An error occurred while accessing the camera. Ensure you are on a secure connection (HTTPS).');
      }
    }
  };

  const captureFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/png');
      setCapturedImage(dataUrl);
      setState('captured');
      stopCamera(); // Stop camera after capture to save resources
    }
  };

  const retake = () => {
    setCapturedImage(null);
    startCamera();
  };

  const processImage = () => {
    setState('processing');
    // Simulate processing delay
    setTimeout(() => {
      setState('result');
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="pt-2 lg:pt-0 mb-6">
        <button
          onClick={() => {
            stopCamera();
            navigate('/student/dashboard');
          }}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-accent-600 mb-4 transition-colors"
        >
          <HiArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-navy-800 font-display">
              Facial Expression Analysis
            </h1>
            <Badge variant="warning" className="mt-2 inline-flex">Prototype / Coming Soon</Badge>
          </div>
        </div>
      </div>

      <Card className="bg-accent-50 border-accent-100">
        <p className="text-sm text-accent-800 leading-relaxed">
          ClassMind AI is exploring camera-based interaction signals as a future feature. This prototype demonstrates how the experience may work.
        </p>
        <div className="mt-3 p-3 bg-white/60 rounded-lg text-xs text-gray-600 font-medium">
          <strong>Important disclaimer:</strong> Facial-expression analysis is not currently used to diagnose psychological conditions or determine a student's academic ability.
        </div>
      </Card>

      <Card className="flex flex-col items-center justify-center min-h-[400px]">
        {/* Hidden Canvas for Capture */}
        <canvas ref={canvasRef} className="hidden" />

        {state === 'initial' && (
          <div className="text-center max-w-sm">
            <div className="w-16 h-16 bg-accent-100 text-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiCamera className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-navy-800 mb-2">Camera Access</h3>
            <p className="text-gray-500 text-sm mb-6">
              Allow camera access to preview the future facial-analysis experience. We do not store or send your image to our servers.
            </p>
            <Button onClick={startCamera} size="lg" icon={HiCamera}>
              Start Camera
            </Button>
          </div>
        )}

        {state === 'requesting' && (
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-accent-200 border-t-accent-600 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600 font-medium">Requesting camera access...</p>
          </div>
        )}

        {state === 'error' && (
          <div className="text-center max-w-sm">
            <div className="w-16 h-16 bg-danger-50 text-danger-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiCamera className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-navy-800 mb-2">Camera Error</h3>
            <p className="text-gray-500 text-sm mb-6">{errorMsg}</p>
            <Button variant="secondary" onClick={() => navigate('/student/dashboard')}>
              Return to Dashboard
            </Button>
          </div>
        )}

        {state === 'active' && (
          <div className="w-full max-w-2xl flex flex-col items-center">
            <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden mb-6 shadow-lg border-4 border-gray-100">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover transform scale-x-[-1]" // mirror effect
              />
            </div>
            <div className="flex gap-4">
              <Button onClick={captureFrame} size="lg" icon={HiCamera}>
                Capture
              </Button>
              <Button variant="secondary" onClick={() => { stopCamera(); setState('initial'); }} icon={HiStop}>
                Stop Camera
              </Button>
            </div>
          </div>
        )}

        {state === 'captured' && (
          <div className="w-full max-w-2xl flex flex-col items-center">
            <div className="w-full aspect-video bg-gray-100 rounded-2xl overflow-hidden mb-6 shadow-lg border-4 border-gray-100">
              <img src={capturedImage} alt="Captured frame" className="w-full h-full object-cover transform scale-x-[-1]" />
            </div>
            <div className="flex gap-4">
              <Button variant="secondary" onClick={retake} icon={HiRefresh}>
                Retake
              </Button>
              <Button onClick={processImage} iconRight={HiArrowRight}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {state === 'processing' && (
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-accent-100 rounded-full" />
              <div className="absolute inset-0 border-4 border-accent-600 rounded-full border-t-transparent animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-accent-600">
                <HiCamera className="w-8 h-8" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-navy-800 mb-2">Prototype Processing</h3>
            <p className="text-gray-500 text-sm animate-pulse">Analyzing capture signals...</p>
          </div>
        )}

        {state === 'result' && (
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-success-50 text-success-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <HiCheck className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-navy-800 mb-3 font-display">Prototype Result</h3>
            <p className="text-gray-600 mb-6">
              Facial analysis module successfully captured your image.
            </p>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 mb-8 inline-block w-full">
              <span className="text-sm text-gray-500 block mb-1">Status</span>
              <span className="font-semibold text-navy-800">Future AI analysis integration</span>
            </div>
            <Button onClick={() => navigate('/student/dashboard')} size="lg" className="w-full">
              Return to Dashboard
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default FacialAnalysis;
