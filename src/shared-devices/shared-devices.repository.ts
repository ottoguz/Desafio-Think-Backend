/* eslint-disable prettier/prettier */
import { DataSource, Repository } from "typeorm";
import { SharedDevice } from "./shared-device.entity";
import { Injectable } from "@nestjs/common";
import { SharedDeviceDto } from "./dto/shared-device.dto";
import { User } from "src/auth/user.entity";
import { Device } from "src/device/device.entity";
import { SharingLevelEnum } from "./sharing-level.enum";

@Injectable()
export class SharedDevicesRepository extends Repository<SharedDevice> {
  constructor(private datasource: DataSource) {
    super(SharedDevice, datasource.createEntityManager());
  }

  async shareDeviceToUser(userId: string, foundDevice: Device, sharingLevel: SharingLevelEnum): Promise<void> {
    const deviceId = foundDevice.deviceId;
    const sharedDevice = this.create({
        deviceId,
        userId,
        sharingLevel,
    })
    await this.save(sharedDevice);
    //return sharedDevice;
  }
}