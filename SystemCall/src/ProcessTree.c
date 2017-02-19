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

struct process_info_t pro_info_array_kernel[512];

uint clr_and_ret_cr0(void);

void setback_cr0(uint val);

asmlinkage long __my_syscall__(char __user* buf);

unsigned orig_cr0;

unsigned long* __sys_call_table_ptr__ = 0;

static int (*funptr)(void);

void process_tree(struct task_struct* _p, int _depth)
{
	struct list_head* l;

	pro_info_array_kernel[counter].pid = _p->pid;

	pro_info_array_kernel[counter].depth = _depth;

	for(l = p->children.next; l != &(p->children); l = l->next)
	{
		struct task_struct* t = list_entry(l, struct task_struct, sibling);

		process_tree(t, _depth + 1);
	}
}

uint clr_and_ret_cr0(void)
{
	uint cr0 = 0;

	uint ret;

	asm("movl %%cr0, %%eax":"=a"(cr0));

	ret = cr0;

	cr0 &= 0xfffeffff;

	asm("movl &&eax, &&cr0"::"a"(cr0));

	return ret;
}

void setback_cr0(uint val)
{
	asm volatile("movl %%eax, %%cr0"::"a"(val));
}

static int __init __init_