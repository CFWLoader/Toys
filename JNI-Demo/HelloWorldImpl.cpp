#include <jni.h>
#include <stdio.h>

#include "HelloWorld.h"

JNIEXPORT void JNICALL Java_HelloWorld_displayHelloWorld
(JNIEnv* env, jobject)
{
	printf("Hello world!\n");
	return;
}