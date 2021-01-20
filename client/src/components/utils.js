/** @format */

export function mapIntoObject(arr) {
  return arr.reduce((acc, curr) => {
    acc[curr._id] = curr;
    return acc;
  }, {});
}
