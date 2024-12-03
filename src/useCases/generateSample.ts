import { sampleRandomGeneration } from "../configs/sampleRandomGeneration";
import { inputInterArrivalTimes, inputServiceTime } from "../configs/inputs";
import { Sample } from "../entities/sample";
import { readCSV } from "../utils/csvUtils";

function getRandomValueFromDistribution(data: number[]): number {
  const randomIndex = Math.floor(Math.random() * data.length);
  return data[randomIndex];
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
