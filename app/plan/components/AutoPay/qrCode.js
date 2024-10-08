import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';



// Generate QR Code of for Autopay Payment
export const GenerateQRCode = ({value})=> {

    const canvasRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current) {
            QRCode.toCanvas(canvasRef.current, value, { 
                errorCorrectionLevel: 'H',
                // width: '100px'
            }, (error) => {
                if (error) console.error(error);
                // console.log('QR code generated!');
            });
        }
    }, [value]);


    return (
         <div style={{ width: '100%', height: '100%' }}>
            <canvas ref={canvasRef} />
        </div>
    );
};



