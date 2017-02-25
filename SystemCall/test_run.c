#include <linux/unistd.h>
#include <syscall.h>
#include <sys/types.h>

#include <stdio.h>

#include <string.h>
#include <errno.h>

struct process_info_t
{
	unsigned int pid;
	unsigned int depth;
	char pname[16];
};

struct process_info_t processes[512];

int main(int argc, char* argv[])
{
	int i, j, err;

	err = syscall(333);

	printf("Syscall result: %d.\n", err);

	if(err != 0)
	{
		printf("%s\n", strerror(errno));
	}

	// printf("Syscall result: %d.\n", syscall(333, &processes));

	for(i = 0; i < 512; ++i)
	{
		for(j = 0; j < processes[i].depth; ++j)
		{
			printf("|-");
		}

		printf("%d-%s\n", processes[i].pid, processes[i].pname);

		if(processes[i + 1].pid == 0)
		{
			break;
		}
	}

	return 0;
}
