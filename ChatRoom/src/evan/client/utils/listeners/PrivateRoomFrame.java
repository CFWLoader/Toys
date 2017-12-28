package evan.client.utils.listeners;

import evan.client.utils.ChatClient;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.io.IOException;
import java.util.Date;

/**
 * Created by cfwloader on 4/25/15.
 */

/**
 * 私人聊天室用的GUI，和公共聊天室共用一个Socket的IO，消息频发的时候可能产生争抢问题。
 */
public class PrivateRoomFrame extends Frame {

    private ChatClient chatClient;

    private Thread privateRoomThread;

    private String oppositeUsername;

    private Frame frame;

    private TextArea textArea;

    private TextField textField;

    public PrivateRoomFrame(String title) throws HeadlessException {
        super(title);
    }

    public ChatClient getChatClient() {
        return chatClient;
    }

    public void setChatClient(ChatClient chatClient) {
        this.chatClient = chatClient;
    }

    public Thread getPrivateRoomThread() {
        return privateRoomThread;
    }

    public void setPrivateRoomThread(Thread privateRoomThread) {
        this.privateRoomThread = privateRoomThread;
    }

    public String getOppositeUsername() {
        return oppositeUsername;
    }

    public void setOppositeUsername(String oppositeUsername) {
        this.oppositeUsername = oppositeUsername;
    }

    public Frame getFrame() {
        return frame;
    }

    public void setFrame(Frame frame) {
        this.frame = frame;
    }

    public TextArea getTextArea() {
        return textArea;
    }

    public void setTextArea(TextArea textArea) {
        this.textArea = textArea;
    }

    public TextField getTextField() {
        return textField;
    }

    public void setTextField(TextField textField) {
        this.textField = textField;
    }

    //GUI的初始化和公共聊天室差不多。
    public void launch(){

        this.setLocation(600, 150);
        this.setSize(960, 540);

        this.setTextArea(new TextArea(40, 80));
        this.setTextField(new TextField(50));

        this.getTextField().addActionListener(new TextFieldListener());

        this.add(this.getTextArea(), BorderLayout.NORTH);
        this.add(this.getTextField(), BorderLayout.SOUTH);
        this.pack();

        this.addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosing(WindowEvent e) {
                super.windowClosing(e);

                dispose();
            }
        });

        this.setVisible(true);
    }

    private class TextFieldListener implements ActionListener {

        @Override
        public void actionPerformed(ActionEvent e) {
            String str = "request-private-" + oppositeUsername + "-" + textField.getText().trim();
            //textArea.setText(str);
            /*
            textArea.append(String.valueOf(new Date(System.currentTimeMillis())) + "\n");
            textArea.append("    " + str + "\n\n");
            */
            try {
                chatClient.getOutput().writeUTF(str);
                chatClient.getOutput().flush();
            } catch (IOException e1) {
                e1.printStackTrace();
            }

            textArea.append(String.valueOf(new Date(System.currentTimeMillis())) + "\n");
            textArea.append("Me: " + "    " + textField.getText() + "\n\n");

            textField.setText("");
        }
    }
}
