/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Device } from "./device.entity";

@Injectable()
export class DevicesRepository extends Repository<Device> {
  constructor(private dataSource: DataSource) {
    super(Device, dataSource.createEntityManager());
  }
}