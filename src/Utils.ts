export type geohashBbox = {
    geohash: string;
    min_lng: string;
    min_lat: string;
    max_lng: string;
    max_lat: string;
};


export function getValidGeohashes(geohash: string): string[] {
    let listOfValidGeohashes = [
        "sgu3",
        "sggc",
        "sf",
        "th3m",
        "thew",
        "thex",
        "t5",
        "th3h",
        "sg",
        "thet",
        "sgu6",
        "t4",
        "the2",
        "su",
        "tk",
        "sv",
        "tj",
        "suk4",
        "suk5",
        "sgq2",
        "th",
        "th3k",
        "sggf",
        "sgnr",
        "th35",
        "sggg",
        "th3j"
    ]
    console.log("getValidGeohashes() geohash: ", geohash)


    if (geohash.length === 5) {
        const includes4 = listOfValidGeohashes.includes(geohash.slice(0, 4))

        if (includes4)
            return [geohash.slice(0, 4)]
        else
            return [geohash.slice(0, 2)]
    }

    if (geohash.length === 4) {
        let validGeohashes = listOfValidGeohashes
            .filter((validGeohash) => validGeohash.startsWith(geohash))

        if (validGeohashes.length === 0)
            return [geohash.slice(0, 2)]
        else
            return validGeohashes
    }

    if (geohash.length === 3)
        return listOfValidGeohashes
            .filter((validGeohash) => validGeohash.startsWith(geohash))
            .concat(geohash.slice(0, 2));


    if (geohash.length === 2) {
        return listOfValidGeohashes
            .filter((validGeohash) => validGeohash.startsWith(geohash))
    }

    if (geohash.length === 1) {
        return listOfValidGeohashes
            .filter((validGeohash) => validGeohash.startsWith(geohash))
    }

    return [];
}

export function getGeohashesInBbox(min_lng: number, min_lat: number, max_lng: number, max_lat: number): string[] {
    let geohashes = [
        {
            geohash: "sgu3",
            min_lng: 39.7265625,
            min_lat: 21.26953125,
            max_lng: 40.078125,
            max_lat: 21.4453125,
        },
        {
            geohash: "sggc",
            min_lng: 39.0234375,
            min_lat: 21.26953125,
            max_lng: 39.375,
            max_lat: 21.4453125,
        },
        {
            geohash: "sf",
            min_lng: 33.75,
            min_lat: 11.25,
            max_lng: 45.0,
            max_lat: 16.875,
        },
        {
            geohash: "th3m",
            min_lng: 46.7578125,
            min_lat: 24.78515625,
            max_lng: 47.109375,
            max_lat: 24.9609375,
        },
        {
            geohash: "thew",
            min_lng: 49.921875,
            min_lat: 26.3671875,
            max_lng: 50.2734375,
            max_lat: 26.54296875,
        },
        {
            geohash: "thex",
            min_lng: 49.921875,
            min_lat: 26.54296875,
            max_lng: 50.2734375,
            max_lat: 26.71875,
        },
        {
            geohash: "t5",
            min_lng: 45.0,
            min_lat: 16.875,
            max_lng: 56.25,
            max_lat: 22.5,
        },
        {
            geohash: "th3h",
            min_lng: 46.40625,
            min_lat: 24.609375,
            max_lng: 46.7578125,
            max_lat: 24.78515625,
        },
        {
            geohash: "sg",
            min_lng: 33.75,
            min_lat: 16.875,
            max_lng: 45.0,
            max_lat: 22.5,
        },
        {
            geohash: "thet",
            min_lng: 49.921875,
            min_lat: 26.19140625,
            max_lng: 50.2734375,
            max_lat: 26.3671875,
        },
        {
            geohash: "sgu6",
            min_lng: 39.7265625,
            min_lat: 21.4453125,
            max_lng: 40.078125,
            max_lat: 21.62109375,
        },
        {
            geohash: "t4",
            min_lng: 45.0,
            min_lat: 11.25,
            max_lng: 56.25,
            max_lat: 16.875,
        },
        {
            geohash: "the2",
            min_lng: 49.5703125,
            min_lat: 25.3125,
            max_lng: 49.921875,
            max_lat: 25.48828125,
        },
        {
            geohash: "su",
            min_lng: 33.75,
            min_lat: 22.5,
            max_lng: 45.0,
            max_lat: 28.125,
        },
        {
            geohash: "tk",
            min_lng: 56.25,
            min_lat: 22.5,
            max_lng: 67.5,
            max_lat: 28.125,
        },
        {
            geohash: "sv",
            min_lng: 33.75,
            min_lat: 28.125,
            max_lng: 45.0,
            max_lat: 33.75,
        },
        {
            geohash: "tj",
            min_lng: 45.0,
            min_lat: 28.125,
            max_lng: 56.25,
            max_lat: 33.75,
        },
        {
            geohash: "suk4",
            min_lng: 39.375,
            min_lat: 24.2578125,
            max_lng: 39.7265625,
            max_lat: 24.43359375,
        },
        {
            geohash: "suk5",
            min_lng: 39.375,
            min_lat: 24.43359375,
            max_lng: 39.7265625,
            max_lat: 24.609375,
        },
        {
            geohash: "sgq2",
            min_lng: 42.5390625,
            min_lat: 18.28125,
            max_lng: 42.890625,
            max_lat: 18.45703125,
        },
        {
            geohash: "th",
            min_lng: 45.0,
            min_lat: 22.5,
            max_lng: 56.25,
            max_lat: 28.125,
        },
        {
            geohash: "th3k",
            min_lng: 46.7578125,
            min_lat: 24.609375,
            max_lng: 47.109375,
            max_lat: 24.78515625,
        },
        {
            geohash: "sggf",
            min_lng: 39.0234375,
            min_lat: 21.4453125,
            max_lng: 39.375,
            max_lat: 21.62109375,
        },
        {
            geohash: "sgnr",
            min_lng: 42.5390625,
            min_lat: 18.10546875,
            max_lng: 42.890625,
            max_lat: 18.28125,
        },
        {
            geohash: "th35",
            min_lng: 46.40625,
            min_lat: 24.43359375,
            max_lng: 46.7578125,
            max_lat: 24.609375,
        },
        {
            geohash: "sggg",
            min_lng: 39.0234375,
            min_lat: 21.62109375,
            max_lng: 39.375,
            max_lat: 21.796875,
        },
        {
            geohash: "th3j",
            min_lng: 46.40625,
            min_lat: 24.78515625,
            max_lng: 46.7578125,
            max_lat: 24.9609375,
        },
    ];
    geohashes = geohashes.filter((geohash) => {
        if (geohash.max_lng < min_lng || geohash.min_lng > max_lng) {
            return false;
        }

        if (geohash.max_lat < min_lat || geohash.min_lat > max_lat) {
            return false;
        }

        return true;
    });

    return geohashes.map((geohash) => geohash.geohash);
}
