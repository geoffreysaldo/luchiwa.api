import { Repository } from 'typeorm';
import { UserInfo } from './user-info.entity';
export declare class UserInfoRepository extends Repository<UserInfo> {
    saveUserInfo(userInfo: UserInfo): Promise<void>;
}
