#!/bin/sh

for i in `seq 1 2`; do
	echo trigger ${i}
	./Client 127.0.0.1 &
done
