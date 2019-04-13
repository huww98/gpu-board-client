import { GPUData } from './types';

export class GPUStatusPublisher {
    private handler = -1;
    private data: GPUData = {
        queryTime: '',
        gpus: [{
            index: 0,
            name: 'mock GPU',
            gpuUtilization: 0,
            usedMemory: 10300,
            totalMemory: 12500,
            processes: [{
                pid: 1056,
                username: 'Amy',
                command: 'python -xxx',
                name: 'python',
                gpuMemoryUsage: 10300,
            }],
        }, {
            index: 1,
            name: 'mock GPU',
            gpuUtilization: 0,
            usedMemory: 10309,
            totalMemory: 12500,
            processes: [{
                pid: 1057,
                username: 'Amy',
                command: 'python -xxx',
                name: 'python',
                gpuMemoryUsage: 10309,
            }],
        }, {
            index: 2,
            name: 'mock GPU',
            gpuUtilization: 0,
            usedMemory: 10309,
            totalMemory: 12500,
            processes: [{
                pid: 1058,
                username: 'Amy',
                command: 'python -xxx',
                name: 'python',
                gpuMemoryUsage: 10309,
            }],
        }, {
            index: 3,
            name: 'mock GPU',
            gpuUtilization: 0,
            usedMemory: 10307,
            totalMemory: 12500,
            processes: [{
                pid: 1059,
                username: 'Amy',
                command: 'python -xxx',
                name: 'python',
                gpuMemoryUsage: 10307,
            }],
        }, {
            index: 4,
            name: 'mock GPU',
            gpuUtilization: 0,
            usedMemory: 1089,
            totalMemory: 12500,
            processes: [{
                pid: 3698,
                username: 'Bob',
                command: 'python -xxx',
                name: 'python',
                gpuMemoryUsage: 1089,
            }],
        }],
    };
    constructor(address: string) { /* Nothing */}

    public onGPUStatusUpdated(callback: (data: GPUData) => void) {
        this.handler = setInterval(() => {
            this.data.gpus.forEach((g) => g.gpuUtilization = Math.random() * 80 + 20);
            this.data.queryTime = new Date().toISOString();
            callback(this.data);
        }, 1 * 1000);
    }

    public close() {
        clearInterval(this.handler);
    }
}
