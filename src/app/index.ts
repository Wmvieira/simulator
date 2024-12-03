import { runSimulation } from "../adapters/controllers/queueSimulatorController";
import {
  outputResultFilePath,
  outputSampleFilePath,
  outputCustomerResultFilePath,
} from "../configs/outputs";
import { writeCSV } from "../utils/csvUtils";

async function main() {
  try {
    const { results, samples, customers } = await runSimulation();

    await writeCSV(outputSampleFilePath, samples);
    await writeCSV(outputResultFilePath, results);

    customers.forEach(async (customer) => {
      await writeCSV(
        `${outputCustomerResultFilePath}_iteration_${customer.iterationId}.csv`,
        customer.curtomers
      );
    });

    console.log(results);

    console.log(
      "Simulation completed successfully. Results written to:",
      outputResultFilePath
    );
  } catch (error) {
    console.error("Error during simulation:", error);
  }
}

main();
