export const currency = value => {
  const n = +value;
  if (!isNaN(n) && n >= 0) {
    return (n / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  return '';
};

export const card = ({ first6, last4 }) => [first6, '*'.repeat(6), last4].join('').replace(/.{4}/g, ' $&').trim();
