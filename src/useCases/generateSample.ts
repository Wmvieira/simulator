import { sampleRandomGeneration } from "../configs/sampleRandomGeneration";
import { inputInterArrivalTimes, inputServiceTime } from "../configs/inputs";
import { Sample } from "../entities/sample";
import { readCSV } from "../utils/csvUtils";

function getRandomValueFromDistribution(data: number[]): number {
  const total = data.reduce((acc, val) => acc + val, 0);
  const random = Math.random() * total;
  let cumulative = 0;

  for (let i = 0; i < data.length; i++) {
    cumulative += data[i];
    if (random < cumulative) {
      return i;
    }
  }

  return data.length;
}

export async function generateSample(iterationId: number): Promise<Sample> {
  const sample: Sample = {
    iterationId,
    serviceTime: [],
    interArrivalTimes: [],
  };

  const tcData = await readCSV(inputInterArrivalTimes);
  const tsData = await readCSV(inputServiceTime);

  if (sampleRandomGeneration) {
    const tcDistribution = tcData.map(Number);
    const tsDistribution = tsData.map(Number);

    for (let i = 0; i < Math.max(tcData.length, tsData.length); i++) {
      const interArrivalTime = getRandomValueFromDistribution(tcDistribution);
      const serviceTime = getRandomValueFromDistribution(tsDistribution);

      sample.interArrivalTimes.push(interArrivalTime);
      sample.serviceTime.push(serviceTime);
    }
  } else {
    sample.interArrivalTimes = tcData.map(Number);
    sample.serviceTime = tsData.map(Number);
  }

  return sample;
}
