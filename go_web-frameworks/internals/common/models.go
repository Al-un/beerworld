package common

// Country refers to the 2-letters ISO code of a country name:
// https://en.wikipedia.org/wiki/ISO_3166-2
type Country string

// Beer : minimalistic beer data model
type Beer struct {
	ID      string
	Name    string
	Country Country
}
