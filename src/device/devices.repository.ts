/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Device } from "./device.entity";
import { DeviceDto } from "./dto/device.dto";
import { DeviceFilterDto } from "./dto/device-filter.dto";

@Injectable()
export class DevicesRepository extends Repository<Device> {
  constructor(private dataSource: DataSource) {
    super(Device, dataSource.createEntityManager());
  }

  async getDevices(deviceFilterDto: DeviceFilterDto): Promise<Device[]> {
    const { name, search } = deviceFilterDto; 
    const query = this.createQueryBuilder('device');

    if(name) {
      query.andWhere('device.name = :name', { name }) ;
    }
    
    if (search) {
      query.andWhere(
        'device.name LIKE :search OR device.type LIKE :search',
        { search: `%${search}%` },
      );
    }

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