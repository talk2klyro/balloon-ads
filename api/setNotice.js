//// api/setNotice.js
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { text, token } = req.body || {};

    if (!token || token !== process.env.SUPERADMIN_TOKEN) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (typeof text !== 'string') {
      return res.status(400).json({ error: 'Invalid text' });
    }

    await kv.set('global_notice', text.trim());

    res.status(200).json({ success: true, notice: text.trim() });
  } catch (err) {
    console.error('Error in setNotice:', err);
    res.status(500).json({ error: 'Failed to set notice' });
  }
}
