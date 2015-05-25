#!/bin/sh

for i in `seq 1 200`; do
	echo trigger ${i}
	./Client 127.0.0.1 > ./EchoFiles/echoed${i}.txt &
done
