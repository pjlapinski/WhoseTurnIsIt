const mod = (n, m) => {
  const remain = n % m;
  return Math.floor(remain >= 0 ? remain : remain + m);
};

export { mod };
