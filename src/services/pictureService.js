
const pictures = [
    {
        id: 1,
        alt: "Paris"
    },
    {
        id: 2,
        alt: "Berlin"
    },
    {
        id: 3,
        alt: "Zurich"
    },
    {
        id: 4,
        alt: "Geneva"
    },
    {
        id: 5,
        alt: "Frankfurt"
    },
    {
        id: 6,
        alt: "London"
    },
    {
        id: 7,
        alt: "Hamburg"
    },
    {
        id: 8,
        alt: "Rome"
    },
    {
        id: 9,
        alt: "Strassbourg"
    },
    {
        id: 10,
        alt: "Brussel"
    },
]

export function getAltbyId(searchId) {
    console.log(searchId)
    const selectedPicture = pictures.find((picture) => picture.id === searchId)
    return selectedPicture.alt
}

export function getPictures() {
    return pictures
}