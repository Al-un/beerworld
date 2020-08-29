package common

import (
	"math/rand"
	"strings"
	"time"
)

// GenerateBeerID generates a random ID for a new Beer with the form xx-xx
func GenerateBeerID() string {
	rand.Seed(time.Now().UnixNano())

	parts := []string{}
	partsCount, partSize := 2, 2

	for i := 0; i < partsCount; i++ {
		part := ""

		for j := 0; j < partSize; j++ {
			index := rand.Intn(25)
			part += string('a' + index)
		}

		parts = append(parts, part)
	}

	return strings.Join(parts, "-")
}

// IsIDAlreadyExist returns true if the `testedID` already exists in the
// pseudo data table
func IsIDAlreadyExist(beers []Beer, testedID string) bool {
	for _, b := range beers {
		if b.ID == testedID {
			return true
		}
	}

	return false
}

// GenerateBeerUniqueID ensures that the generated ID is unique
func GenerateBeerUniqueID(beers []Beer) string {
	newBeerID := GenerateBeerID()
	for IsIDAlreadyExist(beers, newBeerID) {
		newBeerID = GenerateBeerID()
	}

	return newBeerID
}
