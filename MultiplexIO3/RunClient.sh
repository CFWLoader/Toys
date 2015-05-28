#!/bin/sh

for i in `seq 1 50`; do
	echo trigger ${i}
	./Client 127.0.0.1 > ./EchoFiles/echoed${i}.txt &
	sleep 0.5s;
done
