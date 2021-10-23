const app = async () => {
    const mymap = L.map('mapid').setView([50.56179485753007, 3.4618081153817815], 13);
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileUrl, { attribution });
    tiles.addTo(mymap);
    
    
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
    }
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
    const addMarker = (coords) => {
        L.marker(coords).addTo(mymap);
    }
    const dataSets = [];
    for (x=0;x<dataUrls.length;x++) {
        let data = await getDB(dataUrls[x]);
        dataSets.push(data);
    }
    console.log(dataSets);
    for (let item of dataSets) {
        for (let i of item) {
            addMarker(i.fields.coordonnees);
        }
    }
}
app();