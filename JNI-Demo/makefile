target: libhello.so setEnv

libhello.so: HelloWorldImpl.cpp HelloWorld.h
	g++ HelloWorldImpl.cpp -fPIC -shared -o libhello.so -I/usr/lib/jvm/java-1.8.0-openjdk-amd64/include -I/usr/lib/jvm/java-1.8.0-openjdk-amd64/include/linux

setEnv:
	export export LD_LIBRARY_PATH=.

clean:
	rm -rf libhello.so HelloWorld.class; \
	unset LD_LIBRARY_PATH