import { Injectable } from '@nestjs/common';
import { Photo } from 'src/photos/entities/photo.entity';
import {
  Repository,
  Connection,
  Transaction,
  TransactionRepository,
} from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { TransactionDTO } from './dto/transaction.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly usersRepository: Repository<User>;
  private readonly photosRepository: Repository<Photo>;

  constructor(connection: Connection) {
    this.usersRepository = connection.getRepository(User);
    this.photosRepository = connection.getRepository(Photo);
  }

  async transaction_test(transactionDTO: TransactionDTO) {
    return await this._transaction_test(
      transactionDTO,
      this.usersRepository,
      this.photosRepository
    );
  }

  // transactions permitem que, se por algum motivo alguma query falhar, as outras querys que foram executadas com sucesso nao serao commitadas para o banco de dados (util para multiplos inserts, insert que depende de outro insert)
  @Transaction()
  private async _transaction_test(
    transactionDTO: TransactionDTO,
    @TransactionRepository(User) usersRepository: Repository<User>,
    @TransactionRepository(Photo) photosRepository: Repository<Photo>
  ) {
    const usuario_criado = await usersRepository.save(
      usersRepository.create({ ...transactionDTO })
    );
    console.log(usuario_criado.id);
    // lancamento de erro para testar transcation
    // throw new Error('error');
    // quando da erro, o log abaixo nao eh para imprimir
    console.log(usuario_criado.firstName);
    await photosRepository.save(
      photosRepository.create({
        type: transactionDTO.type,
        userId: usuario_criado.id,
      })
    );
    return { message: 'sucesso' };
  }

  async create(createUserDto: CreateUserDto): Promise<void> {
    await this.usersRepository.save(this.usersRepository.create(createUserDto));
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({
      select: ['firstName', 'lastName', 'isActive'],
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number): Promise<User | Error> {
    const user = await this.usersRepository.findOne(id, {
      select: ['firstName', 'lastName', 'isActive'],
    });
    if (!user) {
      return new Error('User not found');
    }
    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto
  ): Promise<void | Error> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      return new Error('User not found');
    }
    user.firstName = updateUserDto.firstName;
    user.lastName = updateUserDto.lastName;
    user.isActive = updateUserDto.isActive;
    await this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void | Error> {
    if (!(await this.usersRepository.findOne(id))) {
      return new Error('User not found');
    }
    await this.usersRepository.delete(id);
  }
}
