package evan.client.utils.listeners;

import evan.client.utils.ChatClient;
import evan.client.utils.thread.PrivateRoomThread;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.io.IOException;
import java.util.function.BinaryOperator;

/**
 * Created by cfwloader on 4/24/15.
 */
public class PrivateChatButtonListener implements ActionListener {

    private PrivateRoomFrame privateRoomFrame;

    private ChatClient chatClient;

    private String oppositeUsername;

    public PrivateChatButtonListener(ChatClient chatClient, String oppositeUsername) {

        this.chatClient = chatClient;

        this.oppositeUsername = oppositeUsername;

        /*

        privateRoomFrame = new PrivateRoomFrame("Private room" + "-" + oppositeUsername);

        privateRoomFrame.setChatClient(chatClient);

        privateRoomFrame.setOppositeUsername(oppositeUsername);

        chatClient.getPrivateRoomFrames().add(privateRoomFrame);
        */

        /*
        this.chatClient = chatClient;
        this.oppositeUsername = oppositeUsername;

        chatClient.getPrivateChatButtonListeners().add(this);
        */
    }

    @Override
    public void actionPerformed(ActionEvent e) {

        privateRoomFrame = new PrivateRoomFrame("Private room" + " - " + oppositeUsername);

        privateRoomFrame.setChatClient(chatClient);

        privateRoomFrame.setOppositeUsername(oppositeUsername);

        chatClient.getPrivateRoomFrames().add(privateRoomFrame);

        String privateRequest = "request-privateChat-" + privateRoomFrame.getChatClient().getGlobalUsername() + "-" + privateRoomFrame.getOppositeUsername();

        try {
            privateRoomFrame.getChatClient().getOutput().writeUTF(privateRequest);
            privateRoomFrame.getChatClient().getOutput().flush();
        } catch (IOException e1) {
            e1.printStackTrace();
        }

        Thread privateRoomThread = new Thread(new PrivateRoomThread(privateRoomFrame));

        privateRoomThread.start();
    }



}
