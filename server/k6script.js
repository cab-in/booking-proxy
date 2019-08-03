/* eslint-disable no-unused-vars */
import http from 'k6/http';
import { sleep } from 'k6';

let listings = open('./csv/listings.csv');
listings = listings.split('\n');

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0; const
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const desiredRPS = 1000;
const RPSperVU = 20;
const VUsRequired = Math.round(desiredRPS / RPSperVU);

export const options = {
  vus: VUsRequired,
  duration: '120s',
};

export default function () {
  const iterationStart = new Date().getTime();
  const uuid = uuidv4();
  const day = '2019-07-19';
  const payload = JSON.stringify({
    booking_id: uuid, user_id: uuid, day,
  });
  const params = { headers: { 'Content-Type': 'application/json' } };

  for (const i of Array(RPSperVU).keys()) {
    http.get(`http://localhost:3000/api/bookings/${listings[Math.floor(Math.random() * (99999 - 0) + 0)]}`);
    // http.post(`http://localhost:3000/api/bookings/${listings[Math.floor(Math.random() * (99999 - 0) + 0)]}`, payload, params);
}
  const iterationDuration = (new Date().getTime() - iterationStart) / 1000;
  const sleepTime = 1 - iterationDuration; // 1 second minus time spent on request execution

  if (sleepTime > 0) {
    sleep(sleepTime);
  }
}
