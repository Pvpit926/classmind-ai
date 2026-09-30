import { useRef, useState, useCallback, useEffect } from 'react';
import Button from './Button';
import { HiCamera, HiVideoCamera, HiStop } from 'react-icons/hi';

const CameraPreview = ({ onCapture, className = '' }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [captured, setCaptured] = useState(null);
  const [processing, setProcessing] = useState(false);

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 640, height: 480 },
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setError('Camera access denied. Please allow camera access to use this feature.');
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  }, [stream]);

  const capture = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    const imageData = canvas.toDataURL('image/jpeg');
    setCaptured(imageData);
    setProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setProcessing(false);
      onCapture?.(imageData);
    }, 2000);
  }, [onCapture]);

  const reset = useCallback(() => {
    setCaptured(null);
    setProcessing(false);
  }, []);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className={`${className}`}>
      <div className="relative bg-gray-900 rounded-2xl overflow-hidden aspect-video flex items-center justify-center">
        {!stream && !captured && (
          <div className="text-center p-8">
            <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4">
              <HiVideoCamera className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-400 mb-4">Camera access required</p>
            <Button onClick={startCamera} variant="primary">
              Start Camera
            </Button>
          </div>
        )}

        {stream && !captured && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        )}

        {captured && (
          <img src={captured} alt="Captured" className="w-full h-full object-cover" />
        )}

        {processing && (
          <div className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center">
              <div className="w-10 h-10 border-3 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-3"
                style={{ borderWidth: '3px' }} />
              <p className="text-white font-medium">Processing...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="text-center p-8">
            <p className="text-red-400 text-sm">{error}</p>
            <Button onClick={startCamera} variant="secondary" size="sm" className="mt-3">
              Try Again
            </Button>
          </div>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {stream && !captured && (
        <div className="flex justify-center gap-3 mt-4">
          <Button onClick={capture} icon={HiCamera}>
            Capture
          </Button>
          <Button variant="secondary" onClick={stopCamera} icon={HiStop}>
            Stop Camera
          </Button>
        </div>
      )}

      {captured && !processing && (
        <div className="flex justify-center gap-3 mt-4">
          <Button variant="secondary" onClick={reset}>
            Take Another
          </Button>
        </div>
      )}
    </div>
  );
};

export default CameraPreview;
