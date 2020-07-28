import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

class Bcrypt {
  hashPassword(Userpassword: string) {
    const salt = genSaltSync(10);
    return hashSync(Userpassword, salt);
  }

  comparePassword(Userpassword: string, passwordDB: string) {
    return compareSync(Userpassword, passwordDB);
  }
}

export const bcrypt = new Bcrypt();
