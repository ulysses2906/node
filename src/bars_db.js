const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const connectionURL = 'mongodb://127.0.0.1:27017/';
const databaseName = 'bars_db';
MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log('Unable to connect to db');
    }
    console.log('Connected!');
    const db = client.db(databaseName);
    db.collection('billings').insertMany(
      [
        {
          billing_cycle: 1,
          billing_month: 'January',
          amount: 7000,
          start_date: new Date('2013-01-15'),
          end_date: new Date('2013-02-14'),
          last_edited: 'admin',
          account: {
            account_name: 'AIRA FAUNA ANSAY',
            date_created: new Date(),
            is_active: 'Y',
            last_edited: 'admin',
            customer: {
              first_name: 'Aira Fauna',
              last_name: 'Ansay',
              address: 'Silang, Cavite',
              status: 'Y',
              date_created: new Date(),
              last_edited: 'admin',
            },
          },
        },
        {
          billing_cycle: 1,
          billing_month: 'January',
          amount: 15000,
          start_date: new Date('2016-01-15'),
          end_date: new Date('2016-02-14'),
          last_edited: 'admin',
          account: {
            account_name: 'STEPHEN ABAD',
            date_created: new Date(),
            is_active: 'Y',
            last_edited: 'admin',
            customer: {
              first_name: 'Stephen',
              last_name: 'Abad',
              address: 'Metro Manila',
              status: 'Y',
              date_created: new Date(),
              last_edited: 'admin',
            },
          },
        },
        {
          billing_cycle: 2,
          billing_month: 'February',
          amount: 10000,
          start_date: new Date('2016-02-01'),
          end_date: new Date('2016-02-28'),
          last_edited: 'admin',
          account: {
            account_name: 'STEPHEN ABAD',
            date_created: new Date(),
            is_active: 'Y',
            last_edited: 'admin',
            customer: {
              first_name: 'Stephen',
              last_name: 'Abad',
              address: 'Metro Manila',
              status: 'Y',
              date_created: new Date(),
              last_edited: 'admin',
            },
          },
        },
        {
          billing_cycle: 2,
          billing_month: 'January',
          amount: 25000,
          start_date: new Date('2016-01-01'),
          end_date: new Date('2016-01-31'),
          last_edited: 'admin',
          account: {
            account_name: 'DANIEL JEORGE BARRION',
            date_created: new Date(),
            is_active: 'Y',
            last_edited: 'admin',
            customer: {
              first_name: 'Daniel Jeorge',
              last_name: 'Barrion',
              address: 'Mandaluyong City',
              status: 'Y',
              date_created: new Date(),
              last_edited: 'admin',
            },
          },
        },
      ],
      (error, result) => {
        if (error) {
          return console.log('Unable to insert data');
        }
        console.log(result.insertedIds);
      }
    );
  }
);
