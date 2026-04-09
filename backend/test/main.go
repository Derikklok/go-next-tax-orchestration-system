package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

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

func mergeConflixTest(){
	greetUser("new user",25)
}

func main() {
	x := 78
	printValues()
	fmt.Println(name)
	fmt.Println(x)
	greetUser("pasiya", 25)
	mergeConflixTest()

	//initialize gin
	r := gin.Default()

	r.GET("/", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"message": "Hello World!",
		})
	})

	r.Run(":8080")
}
