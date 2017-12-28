package evan.server.utils;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentSkipListSet;

/**
 * Created by cfwloader on 3/17/15.
 */

//聊天室的服务类，多用户频发信息的时候应该会引发IO的异常。
public class ChatServer {

    private ServerSocket serverSocket;

    private Set<ClientService> clients;

    //本来想做一个map来映射私人聊天室的客户关系，后来想想有点复杂，不做了。
    //使用万恶的轮询方式。
    //private Map<ClientService, ClientService> privateChats;

    /*
    public static void main(String[] args) {

        ChatServer chatServer = new ChatServer();

        chatServer.clients = new ConcurrentSkipListSet<ClientService>();

        Socket socket;

        ClientService clientService;

        Thread clientServiceThread;

        while (true) {
            try {
                socket = chatServer.serverSocket.accept();
                System.out.println("A client joint." + socket.getPort());
                clientService = new ClientService(socket);
                chatServer.clients.add(clientService);
                clientServiceThread = new Thread(clientService);
                clientServiceThread.start();
            } catch (IOException e) {
                e.printStackTrace();
                System.out.println("A client failed to connect.");
            }
        }
    }
    */

    public ChatServer() {

        //privateChats = new HashMap<ClientService, ClientService>();

        try {
            serverSocket = new ServerSocket(4991);
        } catch (IOException e) {
            e.printStackTrace();
            System.exit(-1);
        }
    }

    public ServerSocket getServerSocket() {
        return serverSocket;
    }

    public void setServerSocket(ServerSocket serverSocket) {
        this.serverSocket = serverSocket;
    }

    public Set<ClientService> getClients() {
        return clients;
    }

    public void setClients(Set<ClientService> clients) {
        this.clients = clients;
    }

    //公共聊天室用的广播方法。
    public void broadcast(String msg) {
        for (ClientService clientService : clients) {
            try {
                clientService.getOutputStream().writeUTF(msg);
                clientService.getOutputStream().flush();
            } catch (IOException e) {
                //e.printStackTrace();
            }
            /*
            clientService.getPrintWriter().println(clientService.clientSocket.getPort() + ":  " + msg);
            clientService.getPrintWriter().flush();
            */
        }
    }

    /*
    private static class ClientService implements Runnable,Comparable<ClientService> {

        private Socket clientSocket;

        private DataInputStream inputStream;

        private DataOutputStream outputStream;

        ClientService(Socket socket) {
            clientSocket = socket;
            try {
                inputStream = new DataInputStream(clientSocket.getInputStream());
                outputStream = new DataOutputStream(clientSocket.getOutputStream());
            } catch (IOException e) {
                e.printStackTrace();
            }/* finally {

                clientSocket = null;
                try {
                    clientSocket.close();
                } catch (IOException e) {
                    e.printStackTrace();
                    System.exit(-2);
                }
            }
        }

        @Override
        public void run() {
            String words;
            while (true) {
                try {
                    words = inputStream.readUTF();
                    if(words == null)break;
                    System.out.println(words);
                    ChatServer.broadcast(words);
                } catch (EOFException eof){
                    break;
                } catch (IOException e) {
                    e.printStackTrace();
                }/* finally {
                    try {
                        inputStream.close();
                        clientSocket.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                        System.exit(-3);
                    }
                }
            }
            try {
                inputStream.close();
                inputStream.close();

                ChatServer.clients.remove(this);
                System.out.println("Client: " + clientSocket.getPort() + " exited.");

                clientSocket.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        public DataOutputStream getOutputStream() {
            return outputStream;
        }

        @Override
        public int compareTo(ClientService o) {
            if(o == null)return -1;
            if(this == o)return 0;
            else return 1;
        }
    }
    */

    //处理来自客户端的用户请求。
    public void specialRequest(String request) {

        String[] requestContents = request.split("-");

        //请求私人聊天搭线，万恶的轮询方法查找目标客户端。
        if(requestContents[1].trim().equals("privateChat")){
            //System.out.println("A private chat accept.");
            //System.out.println("From " + requestContents[2]);
            //System.out.println("To " + requestContents[3]);
            ClientService targetClient = null;

            for(ClientService clientService : clients){
                if(clientService.getUsername().equals(requestContents[3])){
                    targetClient = clientService;
                    break;
                }
            }

            //System.out.println("Target:" + targetClient.getUsername());
            if(targetClient !=  null) {
                try {
                    targetClient.getOutputStream().writeUTF(request);
                    targetClient.getOutputStream().flush();
                } catch (IOException e) {

                    //注意这里吞了异常

                    //e.printStackTrace();
                }
            }
        }

        //私人消息的处理，轮询又来了。
        if(requestContents[1].trim().equals("private")){
            //System.out.println("A private chat accept.");
            //System.out.println("From " + requestContents[2]);
            //System.out.println("To " + requestContents[3]);
            ClientService targetClient = null;

            for(ClientService clientService : clients){
                if(clientService.getUsername().equals(requestContents[2])){
                    targetClient = clientService;
                    break;
                }
            }

            //System.out.println("Target:" + targetClient.getUsername());

            if(targetClient !=  null) {
                try {
                    targetClient.getOutputStream().writeUTF(request);
                    targetClient.getOutputStream().flush();
                } catch (IOException e) {

                    //注意这里吞了异常

                    //e.printStackTrace();
                }
            }
        }
    }

    //每次有用户进入聊天室或者退出，都会通知聊天室内的用户更新自己的用户列表。
    public void notifyAllUserToUpdateUserList(){

        StringBuilder stringBuilder = new StringBuilder();

        stringBuilder.append("request-userList-");

        for(ClientService clientService : clients){
            stringBuilder.append(clientService.getUsername());
            stringBuilder.append("-");
        }

        stringBuilder.deleteCharAt(stringBuilder.length() - 1);

        this.broadcast(stringBuilder.toString());
    }

    //登陆验证函数，没有数据库，只能检测重复登陆问题。
    public int validateUser(ClientService clientService) {

        String rawStr = null;

        try {
            rawStr = clientService.getInputStream().readUTF();
        } catch (IOException e) {
            //e.printStackTrace();
            return -1;
        }

        String[] loginInfo = rawStr.split("-");

        String password = null;
        String username = null;

        try {
            username = loginInfo[2];
            password = loginInfo[3];
        } catch (NullPointerException e) {
            return -1;
        }

        boolean repeatLogin = false;

        for (ClientService clientService1 : clients) {
            if (clientService1.getUsername().equals(username)) {
                repeatLogin = true;
                break;
            }
        }

        /*
        Here should be some data confirmation of user.
        But I don't implement it because the database configuration
        is hard to synchronize in other computer.
         */

        try {

            if (repeatLogin) {

                clientService.getOutputStream().writeUTF("repeated");

                clientService.getOutputStream().flush();

                return -1;

            } else {

                clientService.getOutputStream().writeUTF("ack");

                clientService.getOutputStream().flush();
            }

            //clientService.getOutputStream().flush();

            /*
            int tickTock = 0;
            while(tickTock++ < 20){

                clientService.getOutputStream().writeUTF("ack");

                clientService.getOutputStream().flush();

                System.out.println("Trying " + tickTock);
            }
            */

            //System.out.println(System.currentTimeMillis());

            //System.out.println("Ack sent.");

            clientService.setUsername(username);

        } catch (IOException e) {
            e.printStackTrace();
        }

        return 0;
    }
}
