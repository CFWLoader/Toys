#include <linux/unistd.h>
#include <syscall.h>
#include <sys/types.h>

#include <stdio.h>

struct process_info_t
{
	uint pid;
	uint depth;
};

struct process_info_t processes[512];

int main(int argc, char* argv[])
{
	int i, j;

	printf("Syscall result: %d.\n", syscall(333, &processes));

	for(i = 0; i < 512; ++i)
	{
		for(j = 0; j < processes[i].depth; ++j)
		{
			printf("|-");
		}

		printf("%d\n", processes[i].pid);

		if(processes[i + 1].pid == 0)
		{
			break;
		}
	}

	return 0;
}