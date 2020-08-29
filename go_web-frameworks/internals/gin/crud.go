package gin

import (
	"net/http"

	"github.com/Al-un/go_web-frameworks/internals/common"
	"github.com/gin-gonic/gin"
)

// SetupCrud creates a simple endpoint with basic CRUD functions
func SetupCrud() {
	r := gin.Default()

	r.GET("/beers", handleListBeers)
	r.POST("/beers", handleCreateBeer)
	r.GET("/beers/detail/:beerID", handleFindBeer)
	r.DELETE("/beers/detail/:beerID", handleDeleteBeer)
	r.GET("/beers/search", handleFindBeerByCountry)
	r.GET("/countries", handleListCountries)

	r.Run()
}

func handleCreateBeer(c *gin.Context) {
	var beer common.Beer

	if c.BindJSON(&beer) == nil {
		beer = common.CreateBeer(beer)
		c.JSON(http.StatusOK, beer)
		return
	}

	c.String(http.StatusBadRequest, "Invalid beer: %v", beer)
}

func handleDeleteBeer(c *gin.Context) {
	beerID := c.Param("beerID")
	deleteCount := common.DeleteBeer(beerID)

	if deleteCount > 0 {
		c.Status(http.StatusNoContent)
	} else {
		c.Status(http.StatusNotFound)
	}
}

func handleFindBeer(c *gin.Context) {
	beerID := c.Param("beerID")
	beer := common.FindBeersByID(beerID)

	if beer != nil {
		c.JSON(http.StatusOK, beer)
	} else {
		c.Status(http.StatusNotFound)
	}

}

func handleFindBeerByCountry(c *gin.Context) {
	countryCode := c.Query("country")
	beers := common.FindBeersByCountry(countryCode)

	if len(beers) > 0 {
		c.JSON(http.StatusOK, beers)
	} else {
		c.JSON(http.StatusNotFound, []common.Beer{})
	}

}

func handleListBeers(c *gin.Context) {
	beers := common.GetBeers()
	c.JSON(http.StatusOK, beers)
}

func handleListCountries(c *gin.Context) {
	c.JSON(http.StatusOK, common.GetCountries())
}
