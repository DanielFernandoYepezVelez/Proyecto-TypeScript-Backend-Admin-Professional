import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

class PassportJwt {
  private options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY || 'token_para_desarrollo',
  };

  public nuevaStrategia() {
    return new Strategy(
      this.options,
      async (payloadFromJwt, done): Promise<any> => {
        /* EN CASO DE SER NECESARIO HACER LO SIGUIENTE */
        /* Hago Una Consulta A La DB Por El Id Del Usuario Que Tengo En El Token, Que Guarde Anteriormente Al Momento De Crearlo En Su Respectivo Payload */

        /* const conn = await pool;
        const query = await conn.query('SELECT * FROM users WHERE id = ?', [
          payloadFromJwt.id,
        ]); */

        // const idUser = payloadFromJwt.idUser;
        // const roleUser = payloadFromJwt.roleUser;

        if (payloadFromJwt) {
          return done(null, payloadFromJwt.idUser);
        }

        return done(null, false);
      }
    );
  }
}

export const passportJwt = new PassportJwt();
