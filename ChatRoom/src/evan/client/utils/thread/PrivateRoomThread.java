package evan.client.utils.thread;

import evan.client.utils.listeners.PrivateRoomFrame;

/**
 * Created by cfwloader on 4/25/15.
 */

/**
 * 因为涉及到主动创建私人聊天室和被动加入私人聊天，于是解耦。
 */
public class PrivateRoomThread implements Runnable {

    private PrivateRoomFrame privateRoomFrame;

    public PrivateRoomThread(PrivateRoomFrame privateRoomFrame) {
        this.privateRoomFrame = privateRoomFrame;
    }

    @Override
    public void run() {

        privateRoomFrame.launch();

    }
}
