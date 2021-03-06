/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from '@nestjs/graphql';
import { MyBaseEntity } from 'src/base/base.entity';
import { encryptHelper } from 'src/helper/encrypt.helper';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'user' })
export class User extends MyBaseEntity<User> {
  @Field(type => String)
  @PrimaryGeneratedColumn('uuid', { name: 'userId' })
  userId: string;

  @Column({ name: 'username', length: 100, unique: true })
  username: string;

  @Column({ name: 'password', length: 100 })
  private password: string;

  @Field(type => String)
  @Column({ name: 'email', length: 100, unique: true })
  email: string;

  public hashPassword() {
    this.password = encryptHelper.hash(this.password);
  }

  public comparePassword(plainPassword: string) {
    return encryptHelper.compare(plainPassword, this.password);
  }
}
