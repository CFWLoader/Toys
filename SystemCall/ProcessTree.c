#include <linux/init.h>
#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/unistd.h>
#include <asm/uaccess.h>
#include <linux/sched.h>

// #include <stdint.h>

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

	pro_info_array_kernel[process_counter].pid = _p->pid;

	pro_info_array_kernel[process_counter].depth = _depth;

	for(l = _p->children.next; l != &(_p->children); l = l->next)
	{
		struct task_struct* t = list_entry(l, struct task_struct, sibling);

		process_tree(t, _depth + 1);
	}
}

uint clr_and_ret_cr0(void)
{
	uint cr0 = 0;

	uint ret;

	//asm("movl %%cr0, %%eax":"=a"(cr0));
	asm("movl %%cr0, %%eax"::"a"(cr0));

	ret = cr0;

	cr0 &= 0xfffeffff;

	asm("movl %%eax, %%cr0"::"a"(cr0));

	return ret;
}

void setback_cr0(uint val)
{
	asm volatile("movl %%eax, %%cr0"::"a"(val));
}

static int __init __init_extra_syscall__(void)
{
	printk("Evan's System call successfully added.");

	__sys_call_table_ptr__ = (unsigned long*)__SYS_CALL_TABLE_ADDR__;

	printk("System call's address: %x\n", __sys_call_table_ptr__);

	funptr = (int(*)(void)) (__sys_call_table_ptr__[__MY_SYS_CALL_NUM__]);

	orig_cr0 = clr_and_ret_cr0();

	__sys_call_table_ptr__[__MY_SYS_CALL_NUM__] = (unsigned long)&__my_syscall__;

	setback_cr0(orig_cr0);

	return 0;
}

asmlinkage long __my_syscall__(char __user* buf)
{
	int depth = 0;

	struct task_struct* p;

	printk("Evan's system call is executing.\n");

	for(p = current; p != &init_task; p = p->parent)
	{
		process_tree(p, depth);
	}

	if(copy_to_user((struct process_info_t*)buf, pro_info_array_kernel, 512 * sizeof(struct process_info_t)))
	{
		return -EFAULT;
	}
	else
	{
		return sizeof(pro_info_array_kernel);
	}
}

static void __exit __exit_extra_syscall__(void)
{
	orig_cr0 = clr_and_ret_cr0();

	__sys_call_table_ptr__[__MY_SYS_CALL_NUM__] = (unsigned long)funptr;

	setback_cr0(orig_cr0);

	printk("Evan's system call exited.\n");
}

module_init(__init_extra_syscall__);

module_exit(__exit_extra_syscall__);

MODULE_LICENSE("GPL");
