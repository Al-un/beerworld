package common

// ----------------------------------------------------------------------------
//  Mock initial data
// ----------------------------------------------------------------------------

var (
	// BeersList mocks a table of beers
	BeersList = []Beer{
		{ID: "aa-aa", Name: "Kilkenny", Country: "ie"},           // https://www.beeradvocate.com/beer/profile/665/3628/
		{ID: "aa-bb", Name: "Grimbergen", Country: "be"},         // https://www.beeradvocate.com/beer/profile/436/7864/
		{ID: "aa-cc", Name: "Tripel Karmeliet", Country: "be"},   // https://www.beeradvocate.com/beer/profile/202/656/
		{ID: "aa-dd", Name: "Goose IPA", Country: "us"},          // https://www.beeradvocate.com/beer/profile/1146/3968/,
		{ID: "aa-ee", Name: "Murphy's Irish Red", Country: "ie"}, // https://www.beeradvocate.com/beer/profile/240/913/
	}
	// CountriesList lists all covered countries
	CountriesList = []Country{
		"be",
		"ie",
		"us",
	}
)
