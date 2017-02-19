KERNEL_VERSION = `uname -r`

obj-m += hello.o

build: kernel_modules test_run

kernel_modules:
	make -C /lib/module/${KERNEL_VERSION}/build/ M=${CURDIR} modules

test_run:
	gcc -o test_run test_run.c

clean:
	make -C /lib/modules/${KERNEL_VERSION}/build M=${CURDIR} clean