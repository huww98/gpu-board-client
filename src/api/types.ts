export interface ProcessInfo {
    pid: number;
    username: string;
    command: string;
    name: string;
    gpuMemoryUsage: number;
}

export interface GPUStatus {
    index: number;
    name: string;
    gpuUtilization: number;
    usedMemory: number;
    totalMemory: number;
    processes: ProcessInfo[];
}

export interface GPUData {
    gpus: GPUStatus[];
    queryTime: string;
}
