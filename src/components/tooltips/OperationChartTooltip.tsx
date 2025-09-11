/* eslint-disable @typescript-eslint/no-explicit-any */

export const formatTooltip = (value: number, name: string, label: string) => {
  if (name === "x") {
    return [
      new Date(value).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    ];
  }
  if (name === "y") {
    return [`${Number(value).toFixed(2)}`, label];
  }
  return [value, name];
};
