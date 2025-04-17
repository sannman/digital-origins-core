
interface UPIDetails {
  payeeName: string;
  payeeVPA: string;
  amount: number;
  transactionNote?: string;
}

interface QRCodeParams {
  payeeName: string;
  payeeVPA: string;
  amount: number;
  description?: string;
}

export const generateUPIQRString = ({
  payeeName,
  payeeVPA,
  amount,
  transactionNote = "Restaurant Payment"
}: UPIDetails): string => {
  const upiURL = new URL('upi://pay');
  const searchParams = new URLSearchParams({
    pn: payeeName,
    pa: payeeVPA,
    am: amount.toString(),
    tn: transactionNote,
    cu: 'INR'
  });
  
  upiURL.search = searchParams.toString();
  return upiURL.toString();
};

// This function generates a QR code data URL for the provided UPI details
export const generateQRCode = async ({ 
  payeeName, 
  payeeVPA, 
  amount, 
  description = "Restaurant payment" 
}: QRCodeParams): Promise<string> => {
  // Generate the UPI URL string
  const upiString = generateUPIQRString({
    payeeName,
    payeeVPA,
    amount,
    transactionNote: description
  });
  
  // In a real app, this would use a QR code generation library
  // For demo, we'll create a mock QR code with the UPI string embedded
  
  // Simulate a delay as if we're generating a real QR code
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Create a simplified QR code visualization with the actual UPI data
  // In production, you'd use a library like qrcode.react or qrcode
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <rect width="100" height="100" fill="white"/>
    <rect width="30" height="30" x="10" y="10" fill="black"/>
    <rect width="30" height="30" x="60" y="10" fill="black"/>
    <rect width="30" height="30" x="10" y="60" fill="black"/>
    <rect width="10" height="10" x="45" y="45" fill="black"/>
    <text x="50" y="78" font-size="5" text-anchor="middle">₹${amount}</text>
    <text x="50" y="85" font-size="4" text-anchor="middle">${payeeVPA}</text>
    <text x="50" y="95" font-size="3" text-anchor="middle">UPI QR Code</text>
  </svg>`;
};
