package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.Static("/", "./front-end/dist/front-end")
	router.NoRoute(func(c *gin.Context) {
		c.File("./front-end/dist/front-end/index.html")
	})

	router.Run("localhost:8080")
}
