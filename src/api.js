export const simulateRandomProcess = (lambda, T_n ) => {
  let n = 0;
  let t_n;
  let t = [0];
  let r, tau;
  let flag = true;

  while(flag) {
    n++;
    r = Math.random();
    tau = -1.0 / lambda * Math.log(r);
    t_n = t[n - 1] + tau;
    if (t_n > T_n){
      flag = false;
    } else {
      t.push(t_n);
    }
  }
  t = t.slice(1);

  return { t_array: t, count: n - 1, sigma: T_n / n - 1 };
}

const simulateTradeDeficitMarket = () => {

}
const simulateOverstockMarket = () => {

}

export const simulateEquilibriumMarket = (
  R = 50,
  Q_m = 4,
  a = 0.4,
  T = 300,
  P_0 = 7,
  P_1 = 3,
  P_2 = 0.1,
  Q_0 = 0,
  tau = 10,
  sigma = 0.01
) => {
  const P_min = P_1 + P_2;
  const P_max = Q_m / a;
  const P_t = [P_0];
  const Q_t = [0];
  let tempP_t, tempQ_t;
  const randomProcess = simulateRandomProcess(1/10, 300);
  const processAcross = Math.ceil(T / randomProcess.count);
  let processCount = 0;

  for(let t = 1; t <= T; t++) {
    if( t % processAcross === 0) {
      processCount++;
    }
    tempQ_t = (R * (Q_m + randomProcess.t_array[processCount] - a * P_t[t - 1] ) + a * (Q_m + randomProcess.t_array[processCount] - a * P_1)) / (2 * a + R);
    tempP_t = (Q_m + randomProcess.t_array[processCount] + R * P_t[t - 1]) / (2 * a + R);
    Q_t.push(tempQ_t);
    P_t.push(tempP_t);
    console.log(processCount);
  }

  return { Q_t: Q_t, P_t: P_t };
}
