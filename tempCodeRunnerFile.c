#include <stdio.h>

int main()
{
    int x, *p;
    x = 3; x = 6; p = &x;
    *p = 9;
    printf("%d %d %d", x, *p, , x);
}