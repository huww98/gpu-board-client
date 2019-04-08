export interface ProcessInfo {
    pid: number;
    username: string;
    command: string;
    gpuMemoryUsage: number;
}

export interface GPUStatus {
    index: number;
    name: string;
    gpuUtilization: number;
    gpuTemperature: number;
    usedMemory: number;
    totalMemory: number;
    processes: ProcessInfo[];
}

export interface GPUData {
    hostname: string;
    gpus: GPUStatus[];
    queryTime: string;
}
