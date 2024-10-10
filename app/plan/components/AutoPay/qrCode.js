import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';



// Generate QR Code of for Autopay Payment
export const GenerateQRCode = ({value})=> {

    const canvasRef = useRef(null);

    useEffect(() => {
        const setCanvasSize = () => {
            const width = window.innerWidth > 700 ? 250 : window.innerWidth * 0.8; // adjust for responsiveness
            if (canvasRef.current) {
                QRCode.toCanvas(canvasRef.current, value, { 
                    errorCorrectionLevel: 'H',
                    width: width,
                }, (error) => {
                    if (error) console.error(error);
                });
            }
        };

        setCanvasSize();
        window.addEventListener('resize', setCanvasSize); // Update QR code on window resize

        return () => window.removeEventListener('resize', setCanvasSize); // Cleanup on unmount
    }, [value]);


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <canvas ref={canvasRef} />
        </div>
    );
};



