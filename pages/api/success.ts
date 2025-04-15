
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { generateCoverLetter, generatePDF, sendEmail } from '../../utils/helpers';
import fs from 'fs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { session_id } = req.query;
  if (!session_id) return res.status(400).send('Missing session_id');

  const session = await stripe.checkout.sessions.retrieve(session_id as string);
  const { language, job, about } = session.metadata as any;

  const letter = generateCoverLetter(language, job, about);
  const pdfPath = generatePDF(letter, session_id + '.pdf');

  await sendEmail('client@example.com', 'Your AI Cover Letter', 'Attached is your generated cover letter.', pdfPath);

  res.status(200).json({ success: true });
}
