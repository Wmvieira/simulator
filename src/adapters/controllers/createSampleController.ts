import { generateSample } from "../../useCases/generateSample";

export function createSample(iterationId: number) {
  return generateSample(iterationId);
}
