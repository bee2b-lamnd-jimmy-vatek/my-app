import { useMemo } from 'react';

export interface DataPoint {
  x: number;
  y: number;
}

export type DownsamplingAlgorithm = 'lttb' | 'every-nth' | 'min-max' | 'average';

// interface DownsamplingOptions {
//   algorithm: DownsamplingAlgorithm;
//   threshold: number;
// }

/**
 * Largest Triangle Three Buckets (LTTB) 
 */
const lttbDownsample = (data: DataPoint[], threshold: number): DataPoint[] => {
  if (data.length <= threshold || threshold <= 2) {
    return data;
  }

  const sampled: DataPoint[] = [];
  const bucketSize = (data.length - 2) / (threshold - 2);

  sampled.push(data[0]); 

  for (let i = 0; i < threshold - 2; i++) {
    const bucketStart = Math.floor((i + 1) * bucketSize) + 1;
    const bucketEnd = Math.floor((i + 2) * bucketSize) + 1;
    const bucketEndIndex = Math.min(bucketEnd, data.length - 1);

    const prevPoint = sampled[sampled.length - 1];
    const nextPoint = data[Math.min(bucketEndIndex + 1, data.length - 1)];

    let maxArea = -1;
    let selectedPoint = data[bucketStart];

    for (let j = bucketStart; j < bucketEndIndex; j++) {
      const point = data[j];
      const area = Math.abs(
        (prevPoint.x - nextPoint.x) * (point.y - prevPoint.y) -
        (prevPoint.x - point.x) * (nextPoint.y - prevPoint.y)
      ) / 2;

      if (area > maxArea) {
        maxArea = area;
        selectedPoint = point;
      }
    }

    sampled.push(selectedPoint);
  }

  sampled.push(data[data.length - 1]); 
  return sampled;
};

/**
 * Every Nth Point 
 */
const everyNthDownsample = (data: DataPoint[], threshold: number): DataPoint[] => {
  if (data.length <= threshold) {
    return data;
  }

  const step = Math.ceil(data.length / threshold);
  const sampled: DataPoint[] = [];

  for (let i = 0; i < data.length; i += step) {
    sampled.push(data[i]);
  }

  if (sampled[sampled.length - 1] !== data[data.length - 1]) {
    sampled.push(data[data.length - 1]);
  }

  return sampled;
};

/**
 * Min-Max 
 */
const minMaxDownsample = (data: DataPoint[], threshold: number): DataPoint[] => {
  if (data.length <= threshold) {
    return data;
  }

  const sampled: DataPoint[] = [data[0]];
  const bucketSize = Math.ceil(data.length / threshold);

  for (let i = 1; i < data.length - 1; i += bucketSize) {
    const bucket = data.slice(i, Math.min(i + bucketSize, data.length - 1));
    
    if (bucket.length > 0) {
      const minPoint = bucket.reduce((min, p) => p.y < min.y ? p : min);
      const maxPoint = bucket.reduce((max, p) => p.y > max.y ? p : max);
      
      sampled.push(minPoint);
      if (minPoint !== maxPoint) {
        sampled.push(maxPoint);
      }
    }
  }

  sampled.push(data[data.length - 1]);
  return sampled;
};

/**
 * Average 
 */
const averageDownsample = (data: DataPoint[], threshold: number): DataPoint[] => {
  if (data.length <= threshold) {
    return data;
  }

  const sampled: DataPoint[] = [data[0]];
  const bucketSize = Math.ceil(data.length / threshold);

  for (let i = 1; i < data.length - 1; i += bucketSize) {
    const bucket = data.slice(i, Math.min(i + bucketSize, data.length - 1));
    
    if (bucket.length > 0) {
      const avgX = bucket.reduce((sum, p) => sum + p.x, 0) / bucket.length;
      const avgY = bucket.reduce((sum, p) => sum + p.y, 0) / bucket.length;
      
      sampled.push({ x: avgX, y: avgY });
    }
  }

  sampled.push(data[data.length - 1]);
  return sampled;
};

export const useDownsampling = (
  data: DataPoint[], 
  algorithm: DownsamplingAlgorithm = 'lttb',
  threshold: number = 200
): DataPoint[] => {
  return useMemo(() => {
    if (!data || data.length === 0) return [];

    switch (algorithm) {
      case 'lttb':
        return lttbDownsample(data, Math.min(threshold, data.length));
      case 'every-nth':
        return everyNthDownsample(data, Math.min(threshold, data.length));
      case 'min-max':
        return minMaxDownsample(data, Math.min(threshold, data.length));
      case 'average':
        return averageDownsample(data, Math.min(threshold, data.length));
      default:
        return data;
    }
  }, [data, algorithm, threshold]);
};