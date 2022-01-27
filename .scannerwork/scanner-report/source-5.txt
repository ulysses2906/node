const readTxt = function (obj) {
  console.log(`==> INSIDE TXT PROCESSING<==`);
  const request = [];

  if (obj.fileText.length === 0) {
    const error = { errorEmpty: `No request(s) to read from the input file.` };

    return error;
  }

  const getResult = obj.fileText.split('\r\n');

  let counter = 0;

  for (const x of getResult) {
    getContent = x;
    counter = counter + 1;

    billing = {
      billing_cycle: Number,
      start_date: Date,
      end_date: Date,
    };

    const startYear = getContent.slice(6, 10);
    const startDay = getContent.slice(4, 6);
    const startMonth = getContent.slice(2, 4);

    const endYear = getContent.slice(14, 18);
    const endDay = getContent.slice(12, 14);
    const endMonth = getContent.slice(10, 12);

    if (startDay === '  ' || startMonth === '  ' || startDay === '   ') {
      const error = { error: `Invalid Start Date format at row ${counter} ` };
      return error;
    } else if (endDay === '  ' || endMonth === '  ' || endDay === '   ') {
      const error = { error: `Invalid End Date format at row ${counter}` };
      return error;
    }

    const startDateToConvert = startYear + '-' + startMonth + '-' + startDay;
    const endDateToConvert = endYear + '-' + endMonth + '-' + endDay;

    const stringStartDate = startDateToConvert.toString();
    const stringEndDate = endDateToConvert.toString();

    const convertedStartDate = new Date(stringStartDate);
    const convertedEndDate = new Date(stringEndDate);

    const billCycle = Number(getContent.slice(0, 2));

    if (billCycle >= 13) {
      const error = { error: `Billing Cycle not on range at ${counter}` };
      return error;
    }
    billing.billing_cycle = billCycle;
    billing.start_date = convertedStartDate;
    billing.end_date = convertedEndDate;

    request.push(billing);
  }
  console.log(`==> Processing Request with 3 parameters`);
  return request;
};

const readCsv = function (obj) {
  console.log(`==> INSIDE CSV PROCESSING<==`);
  const request = [];

  if (obj.fileText.length === 0) {
    const error = { errorEmpty: 'No request(s) to read from the input file.' };

    return error;
  }

  const getResult = obj.fileText.replace(/[/,]/g, '').split('\r\n');

  let counter = 0;

  for (const x of getResult) {
    const getContent = x;
    counter = counter + 1;

    if (/\s/g.test(getContent)) {
      const error = { error: `Invalid Start Date format at row ${counter} ` };
      return error;
    } else if (getContent.length === 15) {
      const error = { error: `Invalid End Date format at row ${counter}` };
      return error;
    }

    const billing = {
      billing_cycle: Number,
      start_date: Date,
      end_date: Date,
    };

    const startYear = getContent.slice(6, 10);
    const startDay = getContent.slice(4, 6);
    const startMonth = getContent.slice(2, 4);

    const endYear = getContent.slice(14, 18);
    const endDay = getContent.slice(12, 14);
    const endMonth = getContent.slice(10, 12);

    const startDateToConvert = startYear + '-' + startMonth + '-' + startDay;
    const endDateToConvert = endYear + '-' + endMonth + '-' + endDay;

    const stringStartDate = startDateToConvert.toString();
    const stringEndDate = endDateToConvert.toString();

    const convertedStartDate = new Date(stringStartDate);
    const convertedEndDate = new Date(stringEndDate);
    const billCycle = Number(getContent.slice(0, 2));

    if (billCycle >= 13) {
      const error = { error: `Billing cycle not on range at row ${counter}` };
      return error;
    }
    billing.billing_cycle = billCycle;
    billing.start_date = convertedStartDate;
    billing.end_date = convertedEndDate;

    request.push(billing);
  }
  console.log(`==> Processing Request with 3 parameters`);
  return request;
};

module.exports = {
  readTxt,
  readCsv,
};
