const app = async () => {
    const mymap = L.map('mapid').setView([50.56179485753007, 3.4618081153817815], 13);
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileUrl, { attribution });
    tiles.addTo(mymap);
    
    //MapIcon class
    const mapIcon = L.Icon.extend({
        options: {
            iconSize:     [20, 20],
            shadowSize:   [21, 21],
            iconAnchor:   [22, 94],
            shadowAnchor: [4, 62],
            popupAnchor:  [-3, -76]
        }
    });
    //Customizing icons and setting up layers
    const artIcon = new mapIcon({iconUrl: './media/mapIcons/color-palette-10818.svg', shadowUrl: './media/mapIcons/empty.png'});
    let artLayer = L.layerGroup();
    const tourismIcon = new mapIcon({iconUrl: './media/mapIcons/map-signs-solid.svg', shadowUrl: './media/mapIcons/empty.png'});
    let tourismLayer = L.layerGroup();
    const cultureIcon = new mapIcon({iconUrl: './media/mapIcons/theater-masks-solid.svg', shadowUrl: './media/mapIcons/empty.png'});
    let cultureLayer = L.layerGroup();
    const atmIcon = new mapIcon({iconUrl: './media/mapIcons/euro-sign-solid.svg', shadowUrl: './media/mapIcons/empty.png'});
    let atmLayer = L.layerGroup();
    const playgroundIcon = new mapIcon({iconUrl: './media/mapIcons/child-solid.svg', shadowUrl: './media/mapIcons/empty.png'});
    let playgroundLayer = L.layerGroup();
    const horecaIcon = new mapIcon({iconUrl: './media/mapIcons/utensils-solid.svg', shadowUrl: './media/mapIcons/empty.png'});
    let horecaLayer = L.layerGroup();
    const commerceIcon = new mapIcon({iconUrl: './media/mapIcons/shopping-cart-solid.svg', shadowUrl: './media/mapIcons/empty.png'});
    let commerceLayer = L.layerGroup();
    const sportIcon = new mapIcon({iconUrl: './media/mapIcons/futbol-solid.svg', shadowUrl: './media/mapIcons/empty.png'});
    let sportLayer = L.layerGroup();
    const commuIcon = new mapIcon({iconUrl: './media/mapIcons/people-carry-solid.svg', shadowUrl: './media/mapIcons/empty.png'});
    let commuLayer = L.layerGroup();
    /*
    const dataSources = {
        art: 'https://www.odwb.be/api/records/1.0/search/?dataset=art-dans-la-ville&q=&facet=nomenclature_de_pois',
        tourism: 'https://www.odwb.be/api/records/1.0/search/?dataset=tourisme&q=&facet=nomenclature_de_pois',
        culture: 'https://www.odwb.be/api/records/1.0/search/?dataset=antoing-culture&q=&facet=titre',
        atm: 'https://www.odwb.be/api/records/1.0/search/?dataset=antoing-distributeurs-dargent&q=',
        playground: 'https://www.odwb.be/api/records/1.0/search/?dataset=aires-de-jeux0&q=&facet=titre',
        horeca: 'https://www.odwb.be/api/records/1.0/search/?dataset=horeca&q=&facet=nomenclature_de_pois',
        commerce: 'https://www.odwb.be/api/records/1.0/search/?dataset=antoing-commerces&q=&facet=nomenclature_de_pois',
        sport: 'https://www.odwb.be/api/records/1.0/search/?dataset=antoing-sports&q=&facet=nomenclature_de_pois',
        commu: 'https://www.odwb.be/api/records/1.0/search/?dataset=vie-associative&q=&facet=nomenclature_de_pois'
    } */
    const dataUrls = [
        'https://www.odwb.be/api/records/1.0/search/?dataset=art-dans-la-ville&q=&facet=nomenclature_de_pois',
        'https://www.odwb.be/api/records/1.0/search/?dataset=tourisme&q=&facet=nomenclature_de_pois',
        'https://www.odwb.be/api/records/1.0/search/?dataset=antoing-culture&q=&facet=titre',
        'https://www.odwb.be/api/records/1.0/search/?dataset=antoing-distributeurs-dargent&q=',
        'https://www.odwb.be/api/records/1.0/search/?dataset=aires-de-jeux0&q=&facet=titre',
        'https://www.odwb.be/api/records/1.0/search/?dataset=horeca&q=&facet=nomenclature_de_pois',
        'https://www.odwb.be/api/records/1.0/search/?dataset=antoing-commerces&q=&facet=nomenclature_de_pois',
        'https://www.odwb.be/api/records/1.0/search/?dataset=antoing-sports&q=&facet=nomenclature_de_pois',
        'https://www.odwb.be/api/records/1.0/search/?dataset=vie-associative&q=&facet=nomenclature_de_pois'
    ]
    const getDB = async (src) => {
        const data = await fetch(src);
        const response = await data.json();
        return response.records;
    }
    const addMarker = (coords, icon, popup, layer) => {
        if (layer) {
            L.marker(coords, {icon: icon}).addTo(layer).bindPopup(popup);
        } else {
            L.marker(coords, {icon: icon}).addTo(mymap).bindPopup(popup);
        }
    }
    const dataSets = [];
    for (x=0;x<dataUrls.length;x++) {
        let data = await getDB(dataUrls[x]);
        dataSets.push(data);
    }
    console.log(dataSets);
    for (let item of dataSets) {
        for (let i of item) {
            let icon;
            let popup;
            let layer;
            switch (i.datasetid) {
                case 'art-dans-la-ville':
                    icon = artIcon;
                    popup = `${i.fields.nomenclature_de_pois} : ${i.fields.titre}`;
                    layer = artLayer;
                    break;
                case 'tourisme':
                    icon = tourismIcon;
                    popup = `${i.fields.nomenclature_de_pois} : ${i.fields.titre}`;
                    layer = tourismLayer;
                    break;
                case 'antoing-culture':
                    icon = cultureIcon;
                    popup = `${i.fields.titre}`;
                    layer = cultureLayer;
                    break;
                case 'antoing-distributeurs-dargent':
                    icon = atmIcon;
                    popup = `Distrubuteur ${i.fields.titre}`;
                    layer = atmLayer;
                    break;
                case 'aires-de-jeux0':
                    icon = playgroundIcon;
                    popup = `Plaine de jeux ${i.fields.titre}`;
                    layer = playgroundLayer;
                    break;
                case 'horeca':
                    icon = horecaIcon;
                    popup = `${i.fields.nomenclature_de_pois} : ${i.fields.titre}`;
                    layer = horecaLayer;
                    break;
                case 'antoing-commerces':
                    icon = commerceIcon;
                    popup = `${i.fields.nomenclature_de_pois} : ${i.fields.titre}`;
                    layer = commerceLayer;
                    break;
                case 'antoing-sports':
                    icon = sportIcon;
                    popup = `${i.fields.nomenclature_de_pois} : ${i.fields.titre}`;
                    layer = sportLayer;
                    break;
                case 'vie-associative':
                    icon = commuIcon;
                    popup = `${i.fields.titre}`;
                    layer = commuLayer;
                    break;
                default:
                    console.log('error');
            }
            addMarker(i.fields.coordonnees, icon, popup, layer);
        }
    }
    const overlays = {
        "Art": artLayer,
        "Tourism": tourismLayer,
        "Culture": cultureLayer,
        "ATM": atmLayer,
        "Playgrounds": playgroundLayer,
        "Horeca": horecaLayer,
        "Shops": commerceLayer,
        "Sports": sportLayer,
        "Communities": commuLayer
    }
    L.control.layers(null, overlays).addTo(mymap);
}
app();