export default function delay(second: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(0);
    }, second * 1000);
  });
}
