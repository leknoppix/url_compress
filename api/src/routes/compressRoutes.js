const express = require('express');
const { v4: uuidv4 } = require('uuid');
const compressionService = require('../services/compressionService');

const router = express.Router();

router.post('/compress', (req, res, next) => {
  try {
    const { urls } = req.body;
    
    if (typeof urls !== 'string' && !Array.isArray(urls)) {
      return res.status(400).json({ error: 'Invalid input: urls must be a string or an array' });
    }

    const urlArray = Array.isArray(urls) ? urls : [urls];

    const MAX_URLS = parseInt(process.env.MAX_URLS, 10);
    if (MAX_URLS > 0 && urlArray.length > MAX_URLS) {
      return res.status(400).json({ error: `Too many URLs. Maximum allowed: ${MAX_URLS}` });
    }

    const invalidUrls = urlArray.filter(url => !url.match(/^https?:\/\/.+/));
    if (invalidUrls.length > 0) {
      return res.status(400).json({ error: 'Invalid URLs detected', invalidUrls });
    }

    const taskId = uuidv4();
    compressionService.startCompressionTask(taskId, urlArray);

    res.status(202).json({ task_id: taskId, message: 'Compression started' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;