package main

import "fmt"

func main() {
	fmt.Println("Hello World!")

	age := 42
	fmt.Println("Age: ", age)
	fmt.Println("Address of age is ", &age)

	value := 101
	fmt.Println("Value is\t:\t", value)

	var ptr *int = &value

	fmt.Println("ptr = ", ptr)
	fmt.Println("*ptr : ", *ptr)
	fmt.Println("Address of ptr : ", &ptr)

	// to modify the values in that pointer
	*ptr = 200
	fmt.Println(*ptr)
	fmt.Println(value)
}
