/* eslint-disable prettier/prettier */
import { DataSource, Repository } from "typeorm";
import { SharedDevice } from "./shared-device.entity";
import { Injectable } from "@nestjs/common";
import { SharedDeviceDto } from "./dto/shared-device.dto";
import { UsersRepository } from "src/auth/users.repository";
import { DevicesRepository } from "src/device/devices.repository";

@Injectable()
export class SharedDevicesRepository extends Repository<SharedDevice> {
  constructor(
    private datasource: DataSource,
    private usersRepository: UsersRepository,
    private devicesRepository: DevicesRepository,
    ) {
    super(SharedDevice, datasource.createEntityManager());
  }

  async shareDeviceToUser(sharedDeviceDto: SharedDeviceDto): Promise<void> {
    const { userId, deviceId, sharingLevel } = sharedDeviceDto;
    const foundUser = await this.usersRepository.findOneBy({ userId });
    const foundDevice = await this.devicesRepository.createQueryBuilder('device').where('device.deviceId = :deviceId', { deviceId: deviceId}).getOne();
    const sharedDeviceData = this.create({
        userId,
        deviceId, 
        sharingLevel,
    })
    await this.save(sharedDeviceData);
    foundUser.devices.push(foundDevice);
  }
}