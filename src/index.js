import express from 'express';
import { simulateRandomProcess, simulateEquilibriumMarket } from './api';

const app = express();

app.set('view engine', 'jade');

app.get('/process', (req, res) => {
  const randomProcess = simulateRandomProcess(1/2, 300);
  res.render('process.jade', {
    lambda: '1/2',
    T_n: '300',
    count: randomProcess.count,
    sigma: randomProcess.sigma,
    array: randomProcess.t_array
   })
})

app.get('/equilibrium', (req, res) => {
  const equilibriumMarket = simulateEquilibriumMarket();
  res.render('result', {
    Q_t: equilibriumMarket.Q_t,
    q_length: equilibriumMarket.Q_t.length,
    P_t: equilibriumMarket.P_t,
    p_length: equilibriumMarket.P_t.length,
  })
})


app.listen(3000, () => {
  console.log('Server is available on http://localhost:3000');
})
