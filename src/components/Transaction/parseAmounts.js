export default ({ amount, tipAmount, payment }) => {
  const start = (amount || 0) + (tipAmount || 0);
  const final = (payment?.amount || 0) + (payment?.tipAmount || 0);
  const partial = start > final;
  const remaining = start - final;
  return { start, final, partial, remaining };
};
