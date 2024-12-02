import { runSimulation } from "../adapters/controllers/queueSimulatorController";
import { outputResultFilePath, outputSampleFilePath } from "../configs/outputs";
import { writeCSV } from "../utils/csvUtils";

async function main() {
  try {
    const { results, samples } = await runSimulation();

    await writeCSV(outputSampleFilePath, samples);
    await writeCSV(outputResultFilePath, results);

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
