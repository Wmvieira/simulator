import { createSample } from "../adapters/controllers/createSampleController";
import { runSimulation } from "../adapters/controllers/queueSimulatorController";
import { sampleGeneration } from "../configs/sampleGeneration";
import { outputResultFilePath, outputSampleFilePath } from "../configs/sdout";
import { writeCSV } from "../utils/csvUtils";

async function main() {
  try {
    const sample = await createSample();

    const result = runSimulation(sample);

    await writeCSV(outputResultFilePath, [result]);
    await writeCSV(outputSampleFilePath, [sample]);

    console.log(result);

    console.log(
      "Simulation completed successfully. Results written to:",
      outputResultFilePath
    );
  } catch (error) {
    console.error("Error during simulation:", error);
  }
}

main();
