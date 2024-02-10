import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { dataSourceOptions } from 'db/data-source';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot(dataSourceOptions)],
  controllers: [],
  providers: [],
})
export class AppModule {}
