import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from './auth.service'
import { ErrorInfo } from '@/common/constants/result-code'
import { ApiException } from '@/common/exceptions/api.exception'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authSerevice: AuthService) {
    super()
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authSerevice.validateUser(username, password)
    if (!user) throw new ApiException(ErrorInfo.ERR_10002)
    return user
  }
}
