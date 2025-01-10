import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { transactionId, userData } = req.body;

  if (!transactionId) {
    return res.status(400).json({ error: 'Transaction ID is required.' });
  }

  try {

    const verifyResponse = await fetch(`https://api.flutterwave.com/v3/transactions/${transactionId}/verify`, {
      headers: {
        Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const verifyData = await verifyResponse.json();

    if (verifyData.status === 'success') {
      console.log('Transaction verified successfully:', verifyData);

      return res.status(200).json({ message: 'Payment confirmed successfully.' });
    } else {
      console.error('Verification failed:', verifyData);
      return res.status(400).json({ error: 'Payment verification failed.' });
    }
  } catch (error) {
    console.error('Error verifying transaction:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}
