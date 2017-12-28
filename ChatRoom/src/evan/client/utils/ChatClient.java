package evan.client.utils;

import evan.client.exceptions.LoginFailedException;
import evan.client.utils.listeners.PrivateChatButtonListener;
import evan.client.utils.listeners.PrivateRoomFrame;
import evan.client.utils.thread.PrivateRoomThread;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.io.*;
import java.net.Socket;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by cfwloader on 3/16/15.
 */

/**
 * 因为是边做原型边设计，所以该类设计得有点难看，该解耦的部分解耦了，部分懒得解耦了。
 */
public class ChatClient extends Frame {

    private Panel panel;

    private TextField textField = new TextField(50);

    private TextArea textArea = new TextArea(40, 80);

    private Socket socket;

    //一个客户端的IO都是共用的，争抢问题。
    private DataOutputStream output;

    private DataInputStream input;

    //公共聊天室的监听线程
    private MessageListenThread massageListener;

    //这个设计看起来有点多余
    private Thread massageListenThread;

    private String globalUsername;

    //考虑到该客户端有多个私人聊天室,使用一个list维护，轮询方式找目标窗口。
    private List<PrivateRoomFrame> privateRoomFrames;

    /*
    public static void main(String[] args){
        ChatClient chatClient = new ChatClient();

        if(chatClient.loginFrame() == 0){

            chatClient.removeAll();

            chatClient.launchFrame();
        }
        //new ChatClient().launchFrame();
    }
    */

    //getter都是用来回调的时候用的。
    public DataOutputStream getOutput() {
        return output;
    }

    public String getGlobalUsername() {
        return globalUsername;
    }

    public DataInputStream getInput() {
        return input;
    }

    public List<PrivateRoomFrame> getPrivateRoomFrames() {
        return privateRoomFrames;
    }

    //登陆用的界面，顺带初始化这个客户端。
    public int loginFrame(){

        //私人聊天室的维护列表在此初始化
        privateRoomFrames = new LinkedList<PrivateRoomFrame>();

        this.setLocation(750, 400);
        setSize(320, 160);

        Button loginButton = new Button("Login");

        TextField usernameTextField = new TextField(40);
        TextField passwordTextField = new TextField(40);

        this.add(usernameTextField, BorderLayout.NORTH);
        this.add(passwordTextField);
        this.add(loginButton, BorderLayout.AFTER_LAST_LINE);
        this.pack();

        this.addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosing(WindowEvent e) {
                //System.out.println("Closing event triggered.");
                close();
            }
        });

        //System.out.println("Event added.");

        textField.addActionListener(new TextFieldListener());

        //textField.addActionListener(new TextFieldListener());

        //Socket初始化函数在此调用。
        this.connect();

        //监听进程在此初始化，但不启动。
        massageListener = new MessageListenThread(this, input, textArea);
        massageListenThread = new Thread(massageListener);
        //massageListenThread.start();

        this.setVisible(true);

        LoginButtonListener loginButtonListener = new LoginButtonListener(usernameTextField, passwordTextField);

        loginButton.addActionListener(loginButtonListener);

        /*
        String returnCode = null;

        while(returnCode == null){
            returnCode = loginButtonListener.getReturnCode();
        }

        if(!returnCode.equals("ack")){
            System.out.println(returnCode);
            this.close();
        }
        */

        //等待登陆验证
        while (loginButtonListener.getReturnCode() == null);

        return 0;
    }

    //公共聊天室的GUI初始化。
    public void launchFrame(){

        this.setLocation(600, 150);
        this.setSize(960, 540);
        this.setTitle("Chat Room");

        panel = new Panel();

        panel.setLayout(new BoxLayout(panel, BoxLayout.Y_AXIS));

        panel.add(new Label("房间中的用户"));

        this.add(textArea, BorderLayout.CENTER);
        this.add(textField, BorderLayout.SOUTH);
        this.add(panel, BorderLayout.EAST);
        this.pack();

        //System.out.println("Frame launched");

        /*
        this.addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosing(WindowEvent e) {
                //System.out.println("Closing event triggered.");
                try {
                    massageListener.setStopRequest(true);
                    input.close();
                    output.close();
                    socket.close();
                } catch (IOException e1) {
                    e1.printStackTrace();
                    File exceptionFile = new File("errorlog.txt");
                    try {
                        FileOutputStream outputStream = new FileOutputStream(exceptionFile);
                        PrintWriter printWriter = new PrintWriter(outputStream);
                        for (int i = 0; i < e1.getStackTrace().length; ++i) {
                            printWriter.println(e1.getStackTrace()[i]);
                        }
                    } catch (FileNotFoundException e2) {
                        e2.printStackTrace();
                        System.out.println("Fatal error.");
                        System.exit(-4);
                    }
                }
                System.exit(0);
            }
        });
        */

        //System.out.println("Event added.");

        //textField.addActionListener(new TextFieldListener());

        //this.connect();

        /*
            massageListener = new MassageListenThread(input, textArea);
            massageListenThread = new Thread(massageListener);
            massageListenThread.start();
        */

        this.setVisible(true);
    }

    //除了公共聊天里面的信息，其他server过来的都是带着请求的东西，全部集中在这个方法处理。
    public void requestHandle(String requestString){
        String[] requestValue = requestString.split("-");

        //System.out.println(requestString);

        /*
        for(int i = 0; i < requestValue.length; ++i){
            System.out.println(requestValue[i]);
        }
        */

        //客户端更新用户列表。
        if(requestValue[1].trim().equals("userList"))this.updateUserList(requestValue);

        //有人发起了对你的私人聊天，被动创建一个私人房间。
        if(requestValue[1].trim().equals("privateChat")) {

            //System.out.println("A client requested a private chat");
            //System.out.println(requestString);

            //刚开始没理清请求的语句顺序，导致私人聊天室的逻辑混乱。
            PrivateRoomFrame privateRoomFrame = new PrivateRoomFrame("Private room - " + requestValue[2]);
            privateRoomFrame.setChatClient(this);

            //设定对方的名字，相当于ID。以后每次发起私人信息都用这个让server识别信息的目标。
            privateRoomFrame.setOppositeUsername(requestValue[2]);

            privateRoomFrames.add(privateRoomFrame);

            new Thread(new PrivateRoomThread(privateRoomFrame)).start();
        }

        //私人聊天语句信息。
        if(requestValue[1].trim().equals("private")){

            System.out.println(requestString);

            String oppositeUsername = requestValue[4].trim();

            //万恶的轮询方式，一点都不优雅，懒得去给它写优雅一些了。
            for(PrivateRoomFrame privateRoomFrame : privateRoomFrames){
                if(privateRoomFrame.getOppositeUsername().equals(oppositeUsername)){
                    privateRoomFrame.getTextArea().append(String.valueOf(new Date(System.currentTimeMillis())) + "\n");
                    privateRoomFrame.getTextArea().append(oppositeUsername + ": " + "    " + requestValue[3] + "\n\n");
                    break;
                }
            }
        }
    }

    public void updateUserList(String[] requestValue){

        this.remove(panel);

        panel = new Panel();

        panel.setLayout(new BoxLayout(panel, BoxLayout.Y_AXIS));

        panel.add(new Label("房间中的用户"));

        Button button = null;

        for(int i = 2; i < requestValue.length; ++i){
            button = new Button(requestValue[i]);
            button.addActionListener(new PrivateChatButtonListener(this, requestValue[i]));
            panel.add(button);
        }

        this.add(panel, BorderLayout.EAST);

        this.validate();
        this.repaint();

    }

    public void connect(){
        try {
            socket = new Socket("127.0.0.1", 4991);
            output = new DataOutputStream(socket.getOutputStream());
            input = new DataInputStream(socket.getInputStream());
        } catch (IOException e) {
            e.printStackTrace();
            System.exit(-1);
        }
    }

    //退出客户端的时候调用这个方法。
    public void close(){
        try {
            massageListener.setStopRequest(true);
            input.close();
            output.close();
            socket.close();
        } catch (IOException e1) {
            e1.printStackTrace();
            File exceptionFile = new File("errorlog.txt");
            try {
                FileOutputStream outputStream = new FileOutputStream(exceptionFile);
                PrintWriter printWriter = new PrintWriter(outputStream);
                for (int i = 0; i < e1.getStackTrace().length; ++i) {
                    printWriter.println(e1.getStackTrace()[i]);
                }
            } catch (FileNotFoundException e2) {
                e2.printStackTrace();
                System.out.println("Fatal error.");
                System.exit(-4);
            }
        }
        System.exit(0);
    }

    //输入之后击键Enter触发发送消息。
    private class TextFieldListener implements ActionListener {

        @Override
        public void actionPerformed(ActionEvent e) {
            String str = textField.getText().trim();
            //textArea.setText(str);
            /*
            textArea.append(String.valueOf(new Date(System.currentTimeMillis())) + "\n");
            textArea.append("    " + str + "\n\n");
            */
            try {
                output.writeUTF(str);
                output.flush();
            } catch (IOException e1) {
                e1.printStackTrace();
            }

            textField.setText("");
        }
    }

    //登陆的事件监听器。
    private class LoginButtonListener implements ActionListener{

        private TextField username;

        private TextField password;

        private String returnCode = null;

        public LoginButtonListener(TextField username, TextField password) {
            this.username = username;

            this.password = password;
        }

        @Override
        public void actionPerformed(ActionEvent e) {

            globalUsername = username.getText().trim();

            String loginStr = "request-login-" + username.getText().trim() + "-" + password.getText().trim();
            /*
            System.out.println(username.getText().trim());
            System.out.println(password.getText().trim());
            */
            try{
                output.writeUTF(loginStr);
                output.flush();
            } catch (IOException e1) {
                e1.printStackTrace();
            }

            try {

                //System.out.println("Waiting return Code");

                //System.out.println(System.currentTimeMillis());

                returnCode = input.readUTF();

                //System.out.println("Return code got.");

            } catch (IOException e1) {
                //e1.printStackTrace();
                returnCode = "failed";
            }

            //System.out.println(returnCode);
            if(returnCode.trim().equals("ack")){
                removeAll();

                launchFrame();

                massageListenThread.start();
            }else if(returnCode.trim().equals("repeated")){

                username.setText("用户已登陆");

            }
        }

        public String getReturnCode() {
            return returnCode;
        }
    }
}
