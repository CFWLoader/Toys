package evan.server.utils;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.EOFException;
import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

/**
 * Created by cfwloader on 4/16/15.
 */

//服务器端用的，用于维护客户端的类。
public class ClientService extends Thread implements Comparable<ClientService>{

    //回调时用的。
    private ChatServer host;

    private Socket clientSocket;

    private DataInputStream inputStream;

    private DataOutputStream outputStream;

    //当作ID用的名字。检测重复登陆靠它了。
    private String username;

    public ClientService(ChatServer chatServer, Socket socket) {

        this.host = chatServer;

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
            }*/
    }

    //每个用户线程都会独立拥有一个用于监听来自于客户端的消息的线程。
    @Override
    public void run() {
        String words;
        while (true) {
            try {
                words = inputStream.readUTF();
                if(words == null)break;
                //System.out.println(words);
                //特殊请求处理。
                if(words.startsWith("request-"))host.specialRequest(words + "-" + username);               //Dealing special request.
                else host.broadcast(username + ": " + words);
            } catch (EOFException eof){
                break;
            } catch (IOException e) {
                break;
                //e.printStackTrace();
            }/* finally {
                    try {
                        inputStream.close();
                        clientSocket.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                        System.exit(-3);
                    }
                }*/
        }
        try {
            inputStream.close();
            inputStream.close();

            host.getClients().remove(this);

            System.out.println("Client: " + clientSocket.getPort() + " exited.");

            host.notifyAllUserToUpdateUserList();

            clientSocket.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public DataOutputStream getOutputStream() {
        return outputStream;
    }

    public DataInputStream getInputStream() {
        return inputStream;
    }

    @Override
    public int compareTo(ClientService o) {
        if(o == null)return -1;
        if(this == o)return 0;
        else return 1;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
