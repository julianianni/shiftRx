import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: true,
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class BidGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {}

  handleDisconnect(client: Socket) {}

  @SubscribeMessage('joinAuction')
  async handleJoinAuction(client: Socket, auctionId: string) {
    client.join(auctionId);
  }

  async broadcastNewBid(auctionId: string, bid: any) {
    console.log(`new bid on backend on auctionId: ${auctionId}`);
    this.server.to(auctionId).emit('newBid', bid);
  }
}
