import { Sample } from "../../entities/sample";
import { SimulationResult } from "../../entities/simulationResult";
import { generateCustomers } from "../../useCases/generateCustomer";
import { simulateQueue } from "../../useCases/simulatorQueue";

export function runSimulation(sample: Sample): SimulationResult {
  const customers = generateCustomers(sample);
  return simulateQueue(customers);
}
