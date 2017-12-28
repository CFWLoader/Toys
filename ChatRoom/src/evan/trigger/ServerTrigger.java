package evan.trigger;

import evan.server.utils.ChatServer;
import evan.server.utils.ClientService;

import java.io.IOException;
import java.net.Socket;
import java.util.concurrent.ConcurrentSkipListSet;

/**
 * Created by cfwloader on 4/16/15.
 */
public class ServerTrigger {
    public static void main(String args[]){
        ChatServer chatServer = new ChatServer();

        chatServer.setClients(new ConcurrentSkipListSet<ClientService>());

        Socket socket;

        ClientService clientService;

        Thread clientServiceThread;

        while (true) {
            try {
                socket = chatServer.getServerSocket().accept();

                System.out.println("A client joint." + socket.getPort());

                clientService = new ClientService(chatServer, socket);

                if(chatServer.validateUser(clientService) == 0) {

                    //System.out.println("Client validate.");

                    chatServer.getClients().add(clientService);

                    chatServer.notifyAllUserToUpdateUserList();

                    clientServiceThread = new Thread(clientService);

                    clientServiceThread.start();

                }else{
                    System.out.println("A client failed to join the room.");
                }
            } catch (IOException e) {
                e.printStackTrace();
                System.out.println("A client failed to connect.");
            }
        }
    }
}
