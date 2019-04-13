import io from 'socket.io-client';
import { GPUData } from './types';

interface IOGPUData {
    gpus: Array<{
        index: number;
        name: string;
        utilization: {
            gpu: number,
            memory: number,
        };
        memory: {
            total: number;
            used: number;
            free: number;
        };
        processes: Array<{
            pid: number;
            username: string;
            command: string;
            name: string;
            gpu_memory_usage: number;
        }>;
    }>;
    query_time: string;
}

export class GPUStatusPublisher {

    private ioSocket: SocketIOClient.Socket;

    constructor(address: string) {
        this.ioSocket = io(address);
    }

    public onGPUStatusUpdated(callback: (data: GPUData) => void) {
        this.ioSocket.on('gpustat', (rawData: IOGPUData) => {
            const parsedData: GPUData = {
                queryTime: rawData.query_time,
                gpus: rawData.gpus.map((g) => ({
                    index: g.index,
                    name: g.name,
                    gpuUtilization: g.utilization.gpu,
                    usedMemory: g.memory.used,
                    totalMemory: g.memory.total,
                    processes: g.processes.map((p) => ({
                        pid: p.pid,
                        username: p.username,
                        command: p.command,
                        name: p.name,
                        gpuMemoryUsage: p.gpu_memory_usage,
                    })),
                })),
            };
            callback(parsedData);
        });
    }

    public close() {
        this.ioSocket.disconnect();
    }
}
