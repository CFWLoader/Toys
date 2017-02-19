#include <linux/init.h>
#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/unistd.h>
#include <asm/uaccess.h>
#include <linux/sched.h>

#include <stdint.h>

static const unsigned int __MY_SYS_CALL_NUM__ = 333;
static const uint64_t __SYS_CALL_TABLE_ADDR__ = 0xcccc0000;

static unsigned int process_counter = 0;

struct process_info_t
{
	uint pid;
	uint depth;
};

struct process_info_t pro_info_array_in_kernel[512];