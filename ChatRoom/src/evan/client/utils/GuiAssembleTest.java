package evan.client.utils;

import javafx.geometry.VerticalDirection;

import javax.swing.*;
import java.awt.*;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

/**
 * Created by cfwloader on 4/22/15.
 */
public class GuiAssembleTest extends Frame {
    public static void main(String[] args){
        new GuiAssembleTest().launchFrame();
    }

    public void launchFrame(){
        
        //Frame mainWindow = new Frame();

        this.setLocation(600, 150);
        //this.setSize(960, 540);
        this.setTitle("Chat Room");

        TextField textField = new TextField(50);
        
        //TextArea textArea1 = new TextArea(40, 80);

        Panel panel = new Panel();

        panel.setLayout(new BoxLayout(panel, BoxLayout.Y_AXIS));

        for(int i = 0; i < 2; ++i){
            panel.add(new Button("btndsfrt" + i));
        }

        TextArea textArea = new TextArea(40, 80);

        this.add(textArea, BorderLayout.CENTER);
        this.add(textField, BorderLayout.SOUTH);
        this.add(panel, BorderLayout.EAST);
        this.pack();

        this.addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosing(WindowEvent e) {
                super.windowClosing(e);
                System.exit(0);
            }
        });

        this.setVisible(true);
    }
}
