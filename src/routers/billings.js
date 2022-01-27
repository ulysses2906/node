const express = require('express');
const router = new express.Router();
const multer = require('multer');
const fileRead = require('../file/file-read');
const Billings = require('../models/billings-schema');
const { ConnectionStates } = require('mongoose');

const upload = multer();

router.post('/upload', upload.single('upload'), async (req, res) => {
  const file = req.file;

  if (file.originalname.endsWith('csv')) {
    console.log(`===========================> Filepath: ${file.originalname}`);
    const multerText = Buffer.from(file.buffer).toString('utf-8'); // this reads and converts the contents of the text file into string

    const result = {
      fileText: multerText,
    };

    const getRequest = fileRead.readCsv(result);

    if (getRequest.hasOwnProperty('error')) {
      return res.status(400).send(getRequest);
    } else if (getRequest.hasOwnProperty('errorEmpty')) {
      return res.status(400).send(getRequest.errorEmpty);
    }

    try {
      const Records = [];

      for (const x of getRequest) {
        const getMatch = x;
        const match = await Billings.find(getMatch);
        const obj = {
          billing_cycle: match[0].billing_cycle,
          start_date: match[0].start_date.toLocaleDateString(),
          end_date: match[0].end_date.toLocaleDateString(),
          first_name: match[0].account.customer.first_name,
          last_name: match[0].account.customer.last_name,
          amount: match[0].amount,
        };
        Records.push(obj);
      }
      res.send(Records);
    } catch (error) {
      res.status(404).send('No Record Found!');
    }
  } else if (file.originalname.endsWith('txt')) {
    console.log(`===========================> Filepath: ${file.originalname}`);

    const multerText = Buffer.from(file.buffer).toString('utf-8'); // this reads and converts the contents of the text file into string

    const result = {
      fileText: multerText,
    };

    const getRequest = fileRead.readTxt(result);

    if (getRequest.hasOwnProperty('error')) {
      return res.status(400).send(getRequest);
    } else if (getRequest.hasOwnProperty('errorEmpty')) {
      return res.status(400).send(getRequest.errorEmpty);
    }

    try {
      const Records = [];

      for (const x of getRequest) {
        const getMatch = x;
        const match = await Billings.find(getMatch);
        const obj = {
          billing_cycle: match[0].billing_cycle,
          start_date: match[0].start_date.toLocaleDateString(),
          end_date: match[0].end_date.toLocaleDateString(),
          first_name: match[0].account.customer.first_name,
          last_name: match[0].account.customer.last_name,
          amount: match[0].amount,
        };
        Records.push(obj);
      }

      res.send(Records);
    } catch (error) {
      res.status(404).send('No Record Found!');
    }
  } else {
    res.status(400).send('File is not supported for processing');
  }
});

module.exports = router;
