export const getRandomValue = () => {
  const sign = Math.random() > 0.5 ? 1 : -1;
  const randomValue = Math.floor(Math.random() * 100) * sign;
  return randomValue;
};
