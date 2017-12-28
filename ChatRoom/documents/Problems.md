# 项目中潜在的隐患

一个客户端中的IO全都用一个DataOuputStream和DataInputStream，存在并发隐患。<br/>
当然，ChatServer中的ClientService的IO也是一个，目测隐患不小。<br/>
对方退出私人聊天室的时候，这边无法响应，反正不卖钱，懒得给它做好来了。<br/>
部分解耦，又有些懒得解耦，特别难看的设计。