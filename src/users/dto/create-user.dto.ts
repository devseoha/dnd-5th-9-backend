import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        example: 'devsh4030@gmail.com',
        description: '이메일',
    })
    public email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'password',
        description: '비밀번호',
    })
    public password: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: '강서하',
        description: '이름',
    })
    public name: string;
}
