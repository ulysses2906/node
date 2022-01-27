const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/bars_db');
const billingsSchema = new mongoose.Schema({
  billing_cycle: Number,
  billing_month: String,
  amount: Number,
  start_date: Date,
  end_date: Date,
  last_edited: String,
  account: {
    account_name: String,
    date_created: Date,
    is_active: String,
    last_edited: String,
    customer: {
      first_name: String,
      last_name: String,
      address: String,
      status: String,
      date_created: Date,
      last_edited: String,
    },
  },
});

billingsSchema.statics.findByCredentials = async (
  billing_cycle,
  start_date,
  end_date
) => {
  const data = await Billings.find({ billing_cycle, start_date, end_date });
  if (!data) {
    throw new Error('No Record Found!');
  }
  return data;
};

const Billings = mongoose.model('Billing', billingsSchema);

module.exports = Billings;
