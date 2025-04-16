
interface UPIDetails {
  payeeName: string;
  payeeVPA: string;
  amount: number;
  transactionNote?: string;
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
