import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import Users from '../entities/Users';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users) private usersRepository: Repository<Users>
    ) {}

    async validateUser(email: string, password: string) {
        const user = await this.usersRepository.findOne({
            where: { email },
            select: ['id', 'email', 'password'],
        });
        console.log(email, password, user);
        if (!user) {
            return null;
        }
        const result = await bcrypt.compare(password, user.password);
        if (result) {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }
        return null;
    }

    // async validateRefreshToken(id: number, refreshToken: string) {
    //     const user = await this.usersRepository.findOne({
    //         where: { id },
    //         select: ['id', 'email', 'username', 'nickname', 'refreshToken'],
    //     });
    //
    //     const result = await bcrypt.compare(refreshToken, user.refreshToken);
    //     if (result) {
    //         const { refreshToken, ...userWithoutRefreshToken } = user;
    //         console.log('userWithoutRefreshToken:', userWithoutRefreshToken);
    //         return userWithoutRefreshToken;
    //     }
    // }
}
