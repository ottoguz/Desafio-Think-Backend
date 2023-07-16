/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Device } from "./device.entity";
import { DeviceDto } from "./dto/device.dto";
import { DeviceFilterDto } from "./dto/device-filter.dto";
import { User } from "src/auth/user.entity";

@Injectable()
export class DevicesRepository extends Repository<Device> {
  constructor(private dataSource: DataSource) {
    super(Device, dataSource.createEntityManager());
  }
  
  // Método: Consulta um dispositivo de BD
  async getDevices(deviceFilterDto: DeviceFilterDto): Promise<Device[]> {
    const { name, search } = deviceFilterDto; 
    const query = this.createQueryBuilder('device');
    
    if(name) {
      query.andWhere('device.name = :name', { name }) ;
    }
    
    if (search) {
      query.andWhere(
        'LOWER(device.name) LIKE LOWER(:search) OR LOWER(device.type) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    const devices = await query.getMany();
    return devices;
  }

  //Método: Faz a persistência de um dispositivo no BD
  async createDevice(deviceDto: DeviceDto, user: User): Promise<Device> {
    const { type, local, name } = deviceDto
    console.log(user)

    const device = this.create({
      type,
      local, 
      name, 
    });
    await this.save(device);
    return device;
  }
}