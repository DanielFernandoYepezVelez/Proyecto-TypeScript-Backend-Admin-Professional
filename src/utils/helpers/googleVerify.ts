import { OAuth2Client } from 'google-auth-library';

class GoogleVerify {
  private client: OAuth2Client;

  constructor() {
    this.client = new OAuth2Client(process.env.CLIENT_ID);
  }

  async verifyToken(token: string) {
    const ticket = await this.client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });

    const payload = ticket.getPayload();
    // const userid = payload?.sub;

    return payload;
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
  }
}

export const googleVerify = new GoogleVerify();
