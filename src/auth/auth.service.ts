import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/services/user.service';

import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';

@Injectable()
export class AuthService {
    constructor(
        @Inject('UserService') private readonly usersService: UserService,
        @Inject('JwtService') private readonly jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findUserEmail(email);
        if (user) {
            const check = await bcrypt.compare(pass, user.password);
            const userData = {
                _id: user._id,
                email: user.email,
                name: user.name,
            };
            return check ? userData : null;
        } else {
            return null;
        }
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
            user: _.omit(user, ['password']),
        };
    }
}
