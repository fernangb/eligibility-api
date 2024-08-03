import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
    <html>
      <body>
        <p>Welcome to Eligibily API</p>
        <p>To check my documentation, please <a href="https://customer-eligibility-api.vercel.app/docs">click here</a></p>
      </body>
    </html>
  `;
  }
}
