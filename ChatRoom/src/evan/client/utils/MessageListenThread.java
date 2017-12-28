package evan.client.utils;

import java.awt.*;
import java.io.DataInputStream;
import java.io.EOFException;
import java.io.IOException;
import java.util.Date;

/**
 * Created by cfwloader on 4/22/15.
 */
public class MessageListenThread implements Runnable{

    private ChatClient chatClient;

    private DataInputStream input;

    private TextArea textArea;

    private boolean stopRequest;

    public MessageListenThread(ChatClient chatClient, DataInputStream input, TextArea textArea) {
        this.chatClient = chatClient;
        this.input = input;
        this.textArea = textArea;
        stopRequest = false;
    }

    @Override
    public void run() {
        String words;
        while(true && !stopRequest){
            try {
                words = input.readUTF();                       //The old reason that stop closing actions is used BufferedReader readline method.
                if(words == null)break;                         //It will block the thread even the input stream is closed. I have used DataInputStream to replace it.
                if(words.startsWith("request-")){
                    chatClient.requestHandle(words);
                }else {
                    textArea.append(String.valueOf(new Date(System.currentTimeMillis())) + "\n");
                    textArea.append("    " + words + "\n\n");
                }
            } catch (EOFException eofException){
                input = null;
                textArea = null;
            } catch (IOException e) {
                //e.printStackTrace();
                input = null;
                textArea = null;
            }
        }

        System.out.println("Listen thread stopped.");
        input = null;
        textArea = null;
    }

    public void setStopRequest(boolean stopRequest) {
        this.stopRequest = stopRequest;
    }
}
