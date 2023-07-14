/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Device } from "./device.entity";
import { DeviceDto } from "./dto/device.dto";

@Injectable()
export class DevicesRepository extends Repository<Device> {
  constructor(private dataSource: DataSource) {
    super(Device, dataSource.createEntityManager());
  }

  async getDevices(deviceDto: DeviceDto): Promise<Device[]> {
    // const {}
    const query = this.createQueryBuilder('device');
    const devices = await query.getMany();
    return devices;
  }

  async createDevice(deviceDto: DeviceDto): Promise<void> {
    const { type, local, name, user } = deviceDto

    const device = this.create({
      type,
      local, 
      name, 
      user,
    });
    await this.save(device);
  }
}