export type SimulationResult = {
  iterationId: number;
  averageWaitTime: number;
  utilizationRate: number;
  totalProcessed: number;
  totalTime: number;
  totalWaitTime: number;
  averageQueueLength: number;
  maxQueueLength: number;
  idleTimes: number[];
};
