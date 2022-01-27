const request = require('supertest');
const app = require('../src/app');

const validCsv = 'C:/BARS_TEST/valid-csv.csv';
const billingCycleCsv = 'C:/BARS_TEST/billing-cycle-not-on-range-csv.csv';
const invalidEndCsv = 'C:/BARS_TEST/invalid-end-date-csv.csv';
const invalidStartCsv = 'C:/BARS_TEST/invalid-start-date-csv.csv';
const emptyCsv = 'C:/BARS_TEST/empty-csv.csv';
const validTxt = 'C:/BARS_TEST/valid-txt.txt';
const billingCycleTxt = 'C:/BARS_TEST/billing-cycle-not-on-range-txt.txt';
const invalidEndTxt = 'C:/BARS_TEST/invalid-end-date-txt.txt';
const invalidStartTxt = 'C:/BARS_TEST/invalid-start-date-txt.txt';
const emptyTxt = 'C:/BARS_TEST/empty-txt.txt';

jest.setTimeout(30000);
test('Read CSV Valid Request Parameter', () => {
  request(app).post('/upload').attach('upload', validCsv).expect(200);
});

test('Read Invalid CSV Request With Invalid Billing Cycle', async () => {
  await request(app)
    .post('/upload')
    .attach('upload', billingCycleCsv)
    .expect(400);
});
test('Read Invalid CSV Request With Invalid Start Date Format', async () => {
  await request(app)
    .post('/upload')
    .attach('upload', invalidStartCsv)
    .expect(400);
});

test('Read Invalid CSV Request With Invalid End Date Format', async () => {
  await request(app)
    .post('/upload')
    .attach('upload', invalidEndCsv)
    .expect(400);
});

test('Read an empty CSV file.', async () => {
  await request(app).post('/upload').attach('upload', emptyCsv).expect(400);
});

test('Read TXT Valid Request Parameter', () => {
  request(app).post('/upload').attach('upload', validTxt).expect(200);
});

test('Read Invalid TXT Request With Invalid Billing Cycle', async () => {
  await request(app)
    .post('/upload')
    .attach('upload', billingCycleTxt)
    .expect(400);
});
test('Read Invalid TXT Request With Invalid Start Date Format', async () => {
  await request(app)
    .post('/upload')
    .attach('upload', invalidStartTxt)
    .expect(400);
});

test('Read Invalid TXT Request With Invalid End Date Format', async () => {
  await request(app)
    .post('/upload')
    .attach('upload', invalidEndTxt)
    .expect(400);
});

test('Read an empty TXT file.', async () => {
  await request(app).post('/upload').attach('upload', emptyTxt).expect(400);
});
