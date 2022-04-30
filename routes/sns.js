import express from 'express'
import { publish, subscribe, listSubscriptions, unsubscribe } from '../services/sns'

const router = express.Router()

// Publish Message to SNS
router.post('/publish', async (req, res) => {
  const { success, data } = await publish(req.body)
  if (success) {
    return res.json({ success, data })
  }
  return res.status(500).json({ success: false, message: 'Error Occured !!!'})
});

// Subscribe to SNS
router.post('/subscribe', async (req, res) => {
  const { success, data } = await subscribe(req.body)
  if (success) {
    return res.json({ success, data })
  }
  return res.status(500).json({ success: false, message: 'Error Occured !!!'})
});

// Unsubscribe to SNS
router.post('/unsubscribe', async (req, res) => {
  const { success, data } = await unsubscribe(req.body)
  if (success) {
    return res.json({ success, data })
  }
  return res.status(500).json({ success: false, message: 'Error Occured !!!'})
});

// List All Subscriptions for SNS
router.get('/subscriptions', async (_req, res) => {
  const { success, data } = await listSubscriptions()
  if (success) {
    return res.json({ success, data })
  }
  return res.status(500).json({ success: false, message: 'Error Occured !!!'})
});

export default router

