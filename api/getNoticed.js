// api/getNotice.js
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const notice = await kv.get('global_notice');
    res.status(200).json({ notice: notice || '' });
  } catch (err) {
    console.error('Error in getNotice:', err);
    res.status(500).json({ error: 'Failed to fetch notice' });
  }
}
