
interface UPIDetails {
  payeeName: string;
  payeeVPA: string;
  amount: number;
  transactionNote?: string;
}

interface QRCodeParams {
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

// This function generates a QR code data URL for the provided amount and description
export const generateQRCode = async ({ amount, description = "Restaurant payment" }: QRCodeParams): Promise<string> => {
  // In a real app, this would use the UPI details from the user's settings
  // and then generate a real QR code with a library
  
  // For demonstration purposes, we'll create a mock QR code data URL
  // This simulates what a QR code generation library would do
  
  // Simulate a delay as if we're generating a real QR code
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return a placeholder QR code data URL
  // In a real app, you'd use a library like qrcode.react or qrcode to generate this
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><rect width="30" height="30" x="10" y="10" fill="black"/><rect width="30" height="30" x="60" y="10" fill="black"/><rect width="30" height="30" x="10" y="60" fill="black"/><rect width="10" height="10" x="45" y="45" fill="black"/><text x="50" y="78" font-size="5" text-anchor="middle">₹${amount}</text></svg>`;
};
