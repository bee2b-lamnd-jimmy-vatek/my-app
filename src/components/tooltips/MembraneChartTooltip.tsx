/* eslint-disable @typescript-eslint/no-explicit-any */

export const formatTooltip = (value: number, name: string, props: any) => {
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
    const seriesName = props.payload?.series || name;
    return [`${Number(value).toFixed(2)}`, seriesName];
  }
  return [value, name];
};

export const formatTooltipLabel = (label: number) => {
  return new Date(label).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
