import { Module } from "@nestjs/common";
import { LotsService } from "./lots.service";
import { LotsController } from "./lots.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Lots } from "./entities/lots.entiti";
@Module({
    imports: [TypeOrmModule.forFeature([Lots])],
    providers: [LotsService],
    controllers: [LotsController]
})
export class LotsModule {}