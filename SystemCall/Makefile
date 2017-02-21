KERNEL_VERSION = `uname -r`

obj-m:=ProcessTree.o
# EXTRA_CFLAGS=-m32	# Compiling 32-bit assembly language in 64-bit system.

# ProcessTreemodule-objs:=module

build: kernel_modules test_run

kernel_modules:
	make -C /lib/modules/${KERNEL_VERSION}/build/ M=${CURDIR} modules

test_run:
	gcc -o test_run test_run.c

clean:
	make -C /lib/modules/${KERNEL_VERSION}/build M=${CURDIR} clean
