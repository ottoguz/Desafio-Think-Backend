import { DataSource, Repository } from "typeorm";
import { SharedDevice } from "./shared-device.entity";
import { Injectable } from "@nestjs/common";
import { SharedDeviceDto } from "./dto/shared-device.dto";

@Injectable()
export class SharedDevicesRepository extends Repository<SharedDevice> {
  constructor(private datasource: DataSource) {
    super(SharedDevice, datasource.createEntityManager());
  }

  async shareDeviceToUser(sharedDeviceDto: SharedDeviceDto) {
    const { userId, deviceId, sharingLevel } = sharedDeviceDto;
  }
}