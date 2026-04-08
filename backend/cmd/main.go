package main

import "fmt"

// var has gloabl scope
var name string = "sachin"

func printValues() {
	// := has local scope can only use within functions
	x := 10
	fmt.Println("Hello World")
	fmt.Println(name)
	fmt.Println(x)
}

func greetUser(name string, age int) {
	fmt.Println("My name is ", name, " and ", " I'm ", age)
}

func main() {
	x := 78
	printValues()
	fmt.Println(name)
	fmt.Println(x)
	greetUser("pasiya", 25)
}
