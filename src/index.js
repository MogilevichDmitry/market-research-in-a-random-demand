const gaussian = (mean, stdev) => {
  let y2;
  let use_last = false;
  return function() {
    let y1;

    if(use_last) {
      y1 = y2;
      use_last = false;
    } else {
      let x1, x2, w;

      do {
        x1 = 2.0 * Math.random() - 1.0;
        x2 = 2.0 * Math.random() - 1.0;
        w = x1 * x1 + x2 * x2;
      } while( w >= 1.0);

      w = Math.sqrt((-2.0 * Math.log(w)) / w);
      y1 = x1 * w;
      y2 = x2 * w;
      use_last = true;
    }

    var retval = mean + stdev * y1;
    if(retval > 0) {
      return retval;
    }
    return -retval;
  }
}

const getGaussian = gaussian(0, 1);

const getRandom = () => {
  let randomNumber = getGaussian();
  return randomNumber >= 1 ? getRandom() : randomNumber;
}

const simulateRandomProcess = (lambda, T_n ) => {
  let n = 0;
  let t_n;
  let t = [0];
  let r, tau;
  let flag = true;

  while(flag) {
    n++;
    r = getRandom();
    tau = -1.0/lambda * Math.log(r);
    t_n = t[n - 1] + tau;
    if (t_n > T_n){
      flag = false;
    } else {
      t.push(t_n);
    }
  }
  return { t_array: t, count: n - 1, sigma: T_n / n - 1 };
}

const randomProcess = simulateRandomProcess(1/4, 1000);
console.log(randomProcess);
