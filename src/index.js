import express from 'express';
import { simulateRandomProcess } from './api';

const app = express();

app.set('view engine', 'jade');

app.get('/process', (req, res) => {
  const randomProcess = simulateRandomProcess(1/4, 600);
  res.render('process.jade', {
    lambda: '1/4',
    T_n: '600',
    count: randomProcess.count,
    sigma: randomProcess.sigma,
    array: randomProcess.t_array
   })
})


app.listen(3000, () => {
  console.log('Server is available on http://localhost:3000');
})
