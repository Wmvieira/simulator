export type SimulationResult = {
  averageWaitTime: number;
  utilizationRate: number;
  totalProcessed: number;
  totalTime: number;
  totalWaitTime: number;
  averageQueueLength: number;
  maxQueueLength: number;
  idleTimes: number[];
};
