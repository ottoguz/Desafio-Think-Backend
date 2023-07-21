/* eslint-disable prettier/prettier */
import { DataSource, Repository } from "typeorm";
import { SharedDevice } from "./shared-device.entity";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { SharedDeviceDto } from "./dto/shared-device.dto";
import { UsersRepository } from "src/auth/users.repository";
import { DevicesRepository } from "src/device/devices.repository";
import { User } from "src/auth/user.entity";
import { SharedDeviceFilterDto } from "./dto/shared-device-filter.dto";

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

  // Método: Consulta um dispositivo compartilhado entre usuários no banco de dados
  async getSharedDevices(sharedDeviceFilterDto: SharedDeviceFilterDto, user: User): Promise<SharedDevice[]> {
    const { name, search } = sharedDeviceFilterDto; 
    const { userId } = user
    const query = this.createQueryBuilder('sharedDevice');
    query.where({ userId });
    
    if(name) {
      query.andWhere('sharedDevice.name = :name', { name }) ;
    }
    
    if (search) {
      query.andWhere(
        '(LOWER(sharedDevice.name) LIKE LOWER(:search) OR LOWER(sharedDevicee.type) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    // Tentará recuperar dispositivos compartilhados entre usuários do banco de dados
    // Se houver algum erro será retornado como log no terminal (c/ stacktrace)
    try {
      const sharedDevices = await query.getMany();
      return sharedDevices;
    } catch (error) {
      /*
      this.logger.error(
        `Failed to get tasks for user "${
          user.email}" .Filters: ${JSON.stringify(deviceFilterDto)}`,
          error.stack,
        );*/
        throw new InternalServerErrorException();
    }
  }

  async shareDeviceToUser(sharedDeviceDto: SharedDeviceDto): Promise<void> {
    const { userId, deviceId, sharingLevel, type, local, name } = sharedDeviceDto;
    const foundUser = await this.usersRepository.findOneBy({ userId: userId });
    const foundDevice = await this.devicesRepository.findOneBy({ deviceId: deviceId })
    foundUser.sharedDevices.push(foundDevice)
    await this.usersRepository.save(foundUser);
    
    const sharingLv = this.create({
      userId: userId,
      deviceId: deviceId,
      sharingLevel: sharingLevel,
      type: foundDevice.type,
      local: foundDevice.local,
      name: foundDevice.name,
    })
    await this.save(sharingLv);
  }
}