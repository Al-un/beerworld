package common

// ----------------------------------------------------------------------------
//  Mocking DAO layer
// ----------------------------------------------------------------------------

var (
	dbTableBeers     []Beer
	dbTableCountries []Country
)

func init() {
	dbTableBeers = make([]Beer, len(BeersList))
	dbTableCountries = make([]Country, len(CountriesList))

	copy(dbTableBeers, BeersList)
	copy(dbTableCountries, CountriesList)
}

// CreateBeer add a beer to the DB. As there is no real DB, there is no
// error thrown
func CreateBeer(b Beer) Beer {
	b.ID = GenerateBeerUniqueID(dbTableBeers)
	dbTableBeers = append(dbTableBeers, b)

	return b
}

// CreateCountry add a country to the DB. No duplicate is checked here
func CreateCountry(c Country) Country {
	dbTableCountries = append(dbTableCountries, c)

	return c
}

// FindBeersByCountry fetches all beers given a country code. Empty array is
// returned if country is invalid
func FindBeersByCountry(countryCode string) []Beer {
	beers := make([]Beer, 0)
	country := Country(countryCode)

	for _, b := range dbTableBeers {
		if b.Country == country {
			beers = append(beers, b)
		}
	}

	return beers
}

// FindBeersByID fetches a beer or return nil for an invalid ID
func FindBeersByID(beerID string) *Beer {
	for _, b := range dbTableBeers {
		if b.ID == beerID {
			return &b
		}
	}

	return nil
}

// GetBeers returns all beers
func GetBeers() []Beer {
	return dbTableBeers
}

// GetCountries returns all countries
func GetCountries() []Country {
	return dbTableCountries
}

// DeleteBeer removes a beer based on its ID and returns the number of
// deleted beer(s)
func DeleteBeer(beerID string) int {
	newBeers := make([]Beer, 0)

	for _, b := range dbTableBeers {
		if b.ID != beerID {
			newBeers = append(newBeers, b)
		}
	}

	deleteCount := len(dbTableBeers) - len(newBeers)

	dbTableBeers = newBeers

	return deleteCount
}

// DeleteCountry removes a country based on its code and returns the
// number of deleted countries
func DeleteCountry(countryCode string) int {
	newCountries := make([]Country, 0)
	country := Country(countryCode)

	for _, c := range dbTableCountries {
		if c != country {
			newCountries = append(newCountries, c)
		}
	}

	deleteCount := len(dbTableCountries) - len(newCountries)

	dbTableCountries = newCountries

	return deleteCount
}
