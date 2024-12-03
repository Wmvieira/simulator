import { iterations } from "../../configs/iterations";
import { Sample } from "../../entities/sample";
import {
  CustomerResults,
  SimulationResult,
} from "../../entities/simulationResult";
import { generateCustomers } from "../../useCases/generateCustomer";
import { simulateQueue } from "../../useCases/simulatorQueue";
import { createSample } from "./createSampleController";

export async function runSimulation(): Promise<{
  results: SimulationResult[];
  samples: Sample[];
  customers: CustomerResults[];
}> {
  const results: SimulationResult[] = [];
  const samples: Sample[] = [];
  const customersResults: CustomerResults[] = [];

  for (let i = 0; i < iterations; i++) {
    const sample = await createSample(i);

    const customers = generateCustomers(sample);
    const { result: simulation, customers: customersResult } = simulateQueue(
      customers,
      i
    );

    results.push(simulation);
    samples.push(sample);
    customersResults.push(customersResult);
  }

  return { results, samples, customers: customersResults };
}
