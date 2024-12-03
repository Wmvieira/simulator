export type SimulationResult = {
  iterationId: number;
  averageWaitTime: number;
  utilizationRate: number;
  totalProcessed: number;
  totalTime: number;
  totalWaitTime: number;
  totalQueueTime: number;
  averageQueueLength: number;
};
