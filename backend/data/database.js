import { JSONFilePreset } from 'lowdb/node';

const defaultData = {
  enquiries: [],
};

const db = await JSONFilePreset('enquiries.json', defaultData);

export default db;
