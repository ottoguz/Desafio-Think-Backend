/* eslint-disable prettier/prettier */
import { DataSource, Repository } from "typeorm";
import { SharedDevice } from "./shared-device.entity";
import { Injectable } from "@nestjs/common";
import { SharedDeviceDto } from "./dto/shared-device.dto";
import { UsersRepository } from "src/auth/users.repository";
import { DevicesRepository } from "src/device/devices.repository";
import { User } from "src/auth/user.entity";
import { DevicesService } from "src/device/devices.service";

@Injectable()
export class SharedDevicesRepository extends Repository<SharedDevice> {
  constructor(
    private datasource: DataSource,
    private usersRepository: UsersRepository,
    private devicesRepository: DevicesRepository,
    //private devicesService: DevicesService,
    ) {
    super(SharedDevice, datasource.createEntityManager());
  }

  async shareDeviceToUser(sharedDeviceDto: SharedDeviceDto): Promise<void> {
    const { userId, deviceId, sharingLevel } = sharedDeviceDto;
    const foundUser = await this.usersRepository.findOneBy({ userId: userId });
    const foundDevice = await this.devicesRepository.findOneBy({ deviceId: deviceId })
    console.log(foundUser);
    console.log(foundDevice);
    foundUser.sharedDevices.push(foundDevice)
    await this.usersRepository.save(foundUser);
    
    const sharingLv = this.create({
      userId: userId,
      deviceId: deviceId,
      sharingLevel: sharingLevel,
    })
    await this.save(sharingLv);
    console.log(foundUser)
  }
}