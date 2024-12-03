import { iterations } from "../../configs/iterations";
import { Sample } from "../../entities/sample";
import { SimulationResult } from "../../entities/simulationResult";
import { generateCustomers } from "../../useCases/generateCustomer";
import { simulateQueue } from "../../useCases/simulatorQueue";
import { createSample } from "./createSampleController";

export async function runSimulation(): Promise<{
  results: SimulationResult[];
  samples: Sample[];
}> {
  const results: SimulationResult[] = [];
  const samples: Sample[] = [];

  for (let i = 0; i < iterations; i++) {
    const sample = await createSample(i);
    
    const customers = generateCustomers(sample);
    const simulation = simulateQueue(customers, i);

    results.push(simulation);
    samples.push(sample);
  }

  return { results, samples };
}
