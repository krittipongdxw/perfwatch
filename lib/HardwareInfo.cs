using System;
using System.Linq;
using System.Threading.Tasks;
using OpenHardwareMonitor.Hardware;

public class HardwareInfo
{
    private Computer _computer;

    public HardwareInfo()
    {
        _computer = new Computer()
        {
            CPUEnabled = true,
            GPUEnabled = true,
            RAMEnabled = true,
            FanControllerEnabled = true,
            MainboardEnabled = true,
            HDDEnabled = true
        };

        _computer.Open();
    }

    public async Task<object> GetHardwareData(dynamic input)
    {
        return await Task.Run(() =>
        {
            string result = "";

            foreach (var hardware in _computer.Hardware)
            {
                hardware.Update();
                result += "Hardware: " + hardware.Name + " " + hardware.HardwareType + "\n";

                foreach (var sensor in hardware.Sensors)
                {
                    result += "  - " + sensor.SensorType + ": " + sensor.Name + " = " + sensor.Value + "\n";
                }
            }

            return (object)result;
        });
    }

    public async Task<object> GetCPUModel(dynamic input) {
        return await Task.Run(() =>
        {
            foreach (var hardware in _computer.Hardware)
            {
                if (hardware.HardwareType == HardwareType.CPU) return hardware.Name;
            }

            return "Undefined";
        });
    }

    public async Task<object> GetCPUTemp(dynamic input) {
        return await Task.Run(() =>
        {
            foreach (var hardware in _computer.Hardware)
            {
                if (hardware.HardwareType == HardwareType.CPU)
                {
                    hardware.Update();

                    foreach (var sensor in hardware.Sensors)
                    {
                        if (sensor.SensorType == SensorType.Temperature && sensor.Name == "CPU Package") 
                        {
                            return (object)sensor.Value;
                        }
                    }

                    break;
                }
            }

            return 0.0f;
        });
    }

    public async Task<object> GetCPUAvgClock(dynamic input) {
        return await Task.Run(() =>
        {
            float? result = 0.0f;
            int coreCount = 0;

            foreach (var hardware in _computer.Hardware)
            {
                if (hardware.HardwareType == HardwareType.CPU)
                {
                    hardware.Update();

                    foreach (var sensor in hardware.Sensors)
                    {
                        if (sensor.SensorType == SensorType.Clock && sensor.Name.StartsWith("CPU Core")) 
                        {
                            result += sensor.Value;
                            coreCount++;
                        }
                    }

                    break;
                }
            }

            return coreCount != 0 ? result / coreCount : -1.0f;
        });
    }

    public async Task<object> GetCPUPower(dynamic input) {
        return await Task.Run(() =>
        {
            foreach (var hardware in _computer.Hardware)
            {
                if (hardware.HardwareType == HardwareType.CPU)
                {
                    hardware.Update();

                    foreach (var sensor in hardware.Sensors)
                    {
                        if (sensor.SensorType == SensorType.Power && sensor.Name == "CPU Package") 
                        {
                            return (object)sensor.Value;
                        }
                    }

                    break;
                }
            }

            return 0.0f;
        });
    }

    public async Task<object> GetCPULoad(dynamic input) {
        return await Task.Run(() =>
        {
            foreach (var hardware in _computer.Hardware)
            {
                if (hardware.HardwareType == HardwareType.CPU)
                {
                    hardware.Update();

                    foreach (var sensor in hardware.Sensors)
                    {
                        if (sensor.SensorType == SensorType.Load && sensor.Name == "CPU Total") 
                        {
                            return (object)sensor.Value;
                        }
                    }

                    break;
                }
            }

            return 0.0f;
        });
    }

    public async Task<object> GetCPUFan(dynamic input) {
        return await Task.Run(() =>
        {
            foreach (var hardware in _computer.Hardware)
            {
                if (hardware.HardwareType == HardwareType.CPU)
                {
                    hardware.Update();

                    foreach (var sensor in hardware.Sensors)
                    {
                        if (sensor.SensorType == SensorType.Fan && sensor.Name == "CPU Fan") 
                        {
                            return (object)sensor.Value;
                        }
                    }

                    break;
                }
            }

            return 0.0f;
        });
    }

    public async Task<object> GetGPUModel(dynamic input) {
        return await Task.Run(() =>
        {
            foreach (var hardware in _computer.Hardware)
            {
                if (hardware.HardwareType == HardwareType.GpuAti || hardware.HardwareType == HardwareType.GpuNvidia) return hardware.Name;
            }

            return "Undefined";
        });
    }

    public async Task<object> GetGPUTemp(dynamic input) {
        return await Task.Run(() =>
        {
            foreach (var hardware in _computer.Hardware)
            {
                if (hardware.HardwareType == HardwareType.GpuAti || hardware.HardwareType == HardwareType.GpuNvidia)
                {
                    hardware.Update();

                    foreach (var sensor in hardware.Sensors)
                    {
                        if (sensor.SensorType == SensorType.Temperature && sensor.Name == "GPU Core") 
                        {
                            return (object)sensor.Value;
                        }
                    }

                    break;
                }
            }

            return 0.0f;
        });
    }

    public async Task<object> GetGPUClock(dynamic input) {
        return await Task.Run(() =>
        {
            foreach (var hardware in _computer.Hardware)
            {
                if (hardware.HardwareType == HardwareType.GpuAti || hardware.HardwareType == HardwareType.GpuNvidia)
                {
                    hardware.Update();

                    foreach (var sensor in hardware.Sensors)
                    {
                        if (sensor.SensorType == SensorType.Clock && sensor.Name == "GPU Core") 
                        {
                            return (object)sensor.Value;
                        }
                    }

                    break;
                }
            }

            return 0.0f;
        });
    }

    public async Task<object> GetGPUPower(dynamic input) {
        return await Task.Run(() =>
        {
            foreach (var hardware in _computer.Hardware)
            {
                if (hardware.HardwareType == HardwareType.GpuAti || hardware.HardwareType == HardwareType.GpuNvidia)
                {
                    hardware.Update();

                    foreach (var sensor in hardware.Sensors)
                    {
                        if (sensor.SensorType == SensorType.Power && sensor.Name == "GPU Total") 
                        {
                            return (object)sensor.Value;
                        }
                    }

                    break;
                }
            }

            return 0.0f;
        });
    }

    public async Task<object> GetGPULoad(dynamic input) {
        return await Task.Run(() =>
        {
            foreach (var hardware in _computer.Hardware)
            {
                if (hardware.HardwareType == HardwareType.GpuAti || hardware.HardwareType == HardwareType.GpuNvidia)
                {
                    hardware.Update();

                    foreach (var sensor in hardware.Sensors)
                    {
                        if (sensor.SensorType == SensorType.Load && sensor.Name == "GPU Core") 
                        {
                            return (object)sensor.Value;
                        }
                    }

                    break;
                }
            }

            return 0.0f;
        });
    }

    public async Task<object> GetGPUFan(dynamic input) {
        return await Task.Run(() =>
        {
            foreach (var hardware in _computer.Hardware)
            {
                if (hardware.HardwareType == HardwareType.GpuAti || hardware.HardwareType == HardwareType.GpuNvidia)
                {
                    hardware.Update();

                    foreach (var sensor in hardware.Sensors)
                    {
                        if (sensor.SensorType == SensorType.Fan && sensor.Name == "GPU Fan") 
                        {
                            return (object)sensor.Value;
                        }
                    }

                    break;
                }
            }

            return 0.0f;
        });
    }

    public async Task<object> GetMemoryLoad(dynamic input) {
        return await Task.Run(() =>
        {
            foreach (var hardware in _computer.Hardware)
            {
                if (hardware.HardwareType == HardwareType.RAM)
                {
                    hardware.Update();

                    foreach (var sensor in hardware.Sensors)
                    {
                        if (sensor.SensorType == SensorType.Load && sensor.Name == "Memory") 
                        {
                            return (object)sensor.Value;
                        }
                    }

                    break;
                }
            }

            return 0.0f;
        });
    }

    public async Task<object> GetMemoryUsed(dynamic input) {
        return await Task.Run(() =>
        {
            foreach (var hardware in _computer.Hardware)
            {
                if (hardware.HardwareType == HardwareType.RAM)
                {
                    hardware.Update();

                    foreach (var sensor in hardware.Sensors)
                    {
                        if (sensor.SensorType == SensorType.Data && sensor.Name == "Used Memory") 
                        {
                            return (object)sensor.Value;
                        }
                    }

                    break;
                }
            }

            return 0.0f;
        });
    }

        public async Task<object> GetMemoryAvailable(dynamic input) {
        return await Task.Run(() =>
        {
            foreach (var hardware in _computer.Hardware)
            {
                if (hardware.HardwareType == HardwareType.RAM)
                {
                    hardware.Update();

                    foreach (var sensor in hardware.Sensors)
                    {
                        if (sensor.SensorType == SensorType.Data && sensor.Name == "Available Memory") 
                        {
                            return (object)sensor.Value;
                        }
                    }

                    break;
                }
            }

            return 0.0f;
        });
    }
}
