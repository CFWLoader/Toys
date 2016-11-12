#ifndef SHAREDLOADER_H_
#define SHAREDLOADER_H_

#include "ConfResolver.h"

typedef float (*GeneralFun)(float, float);

GeneralFun loadFuntion(struct FunProp funProp);

#endif