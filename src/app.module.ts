import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UsersModule } from './users/users.module';
import { PhotosModule } from './photos/photos.module';
import { User } from './users/entities/user.entity';
import { Photo } from './photos/entities/photo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'nest_test',
      entities: [User, Photo],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    PhotosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
