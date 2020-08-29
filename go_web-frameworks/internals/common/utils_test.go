package common

import "testing"

// TestGenerateUniqueID tests 100 ID
func TestGenerateUniqueID(t *testing.T) {
	testsCount := 100
	beersList := BeersList

	for i := 0; i < testsCount; i++ {
		newBeerID := GenerateBeerUniqueID(beersList)

		if IsIDAlreadyExist(beersList, newBeerID) {
			t.Fatalf("BeerID %s already exists\n", newBeerID)
		}

		beersList = append(beersList, Beer{ID: newBeerID, Name: "xx", Country: "ie"})
	}
}
