let cin_by_validity = [
    {key:["A", "AA", "AJ"], city: "Rabat"}, //
    {key:["AB", "AE"] , city :"Sale"},
    {key: ["AD"], city : "Témara"},
    {key:["B", "BB", "BE", "BH", "BJ", "BK", "BL", "BM", "BF"], city: "Casablanca"},
    {key:["C", "CC", "CD"], city:"Fès"},
    {key: ["CB"], city: "Sefrou"}, //
    {key:["D"], city: "Meknès"}, //
    {key:["DA"], city: "Azrou"},
    {key:["DB"],city: "Ifrane"},
    {key:["DC"], city: "Moulay Driss Zerhoun"},
    {key:["DJ"], city: "Ain Taoujdate"},
    {key:["DN"], city: "El Hajeb"},
    {key:["E", "EE"], city : "Marrakech"},
    {key:["EA"], city: "Ben Guerir"},
    {key:["F"], city: "Oujda"},
    {key:["FA"],city : "Berkane"},
    {key:["FB"],city : "Taourirt"},
    {key:["FC"],city : "El Aioun (oriental)"},
    {key:["FE"],city : "Saïdia"},
    {key:["FG"],city: "Figuig"},
    {key:["FH"], city : "Jerada"},
    {key:["FJ"],city: "Ahfir"},
    {key:["FK"],city: "Touissit"},
    {key:["FL"], city : "Beni Tadjite"},
    {key:["G"], city: "Kenitra"}, //
    {key:["GA"], city: "Sidi Slimane, Sidi Yahya Gharb"},//
    {key:["GB"],city: "Souk El Arbâa du Gharb"},
    {key:["GK"], city : "Sidi Kacem"}, //
    {key:["GM"], city : "Ouezzane"}, //
    {key:["GN"], city : "Mechraa Belqsiri"},
    {key:["H", "HH"], city : "Safi"}, //
    {key:["HA"], city : "Youssoufia"},
    {key:["I"], city : "Beni Mellal"},
    {key:["IA"], city : "Kasba Tadla"},
    {key:["IB"], city : "Fqih Ben Saleh"},
    {key:["IC"], city : "Azilal"},
    {key:["ID"], city : "Souk Sebt"},
    {key:["IE"], city : "Demnate"},
    {key:["J", "JK"], city : "Agadir"}, //
    {key:["JA"], city : "Guelmim"},
    {key:["JB"], city : "Inzegane, Ait Melloul"},
    {key:["JC"], city : "Taroudant"},
    {key:["JD"], city : "Sidi Ifni"}, //
    {key:["JE"], city : "Tiznit"},
    {key:["JF"], city : "Tan Tan"},
    {key:["JT"], city : "Ouled Teima"},
    {key:["JY"], city : "Tata"},
    {key:["K", "KB"], city : "Tanger"},
    {key:["KA"], city : "Assilah"},
    {key:["L"], city : "Tétouan"},
    {key:["LA"], city : "Larache"},
    {key:["LB"], city : "Ksar El Kebir"},
    {key:["LC"], city : "Chefchaouen"},
    {key:["LE"], city : "Martil"},
    {key:["LF"], city : "Fnideq"},
    {key:["LG"], city : "Mdiq"},
    {key:["M"], city : "El Jadida"},
    {key:["MA"] , city: "Azemmour"},
    {key:["MC"], city : "Sidi Bennour"},
    {key:["N"], city : "Essaouira"},
    {key:["O", "OD"], city : "Dakhla"},
    {key:["P"], city : "Ouarzazate"}, //
    {key:["PA"], city : "Tinghir"},
    {key:["PB"], city : "Zagora"},
    {key:["BX", "DF", "PP"], city :"MRE (Marocains Résidents à l'Étranger)"},
    {key:["Q"], city : "Khouribga"},
    {key:["QA"], city : "Oued Zem"},
    {key:["R"], city: "Al Hoceima"}, //
    {key:["RB"], city : "Imzouren"},
    {key:["RC"], city : "Targuist"},
    {key:["S"], city : "Nador"}, //
    {key:["SH"], city : "Lâayoune"},
    {key:["SJ"], city : "Smara"},
    {key:["SK"], city : "Tarfaya"},
    {key:["SL"], city : "Boujdour"},
    {key:["T"], city : "Mohammedia"},
    {key:["TA", "TK"], city : "Benslimane"},
    {key:["U"], city : "Errachidia"},
    {key:["UA"], city : "Goulmima"},
    {key:["UB"], city : "Rich"},
    {key:["UC"], city : "Erfoud"},
    {key:["UD"], city : "Rissani"},
    {key:["V"], city : "Khenifra"},
    {key:["VA"], city : "Midelt, Itzer"},
    {key:["VM"], city : "M'rirt"},
    {key:["W"], city : "Settat"}, //
    {key:["WA"], city : "Berrechid"},
    {key:["WB"], city : "Ben Ahmed"},
    {key:["X"], city : "Khemisset"},
    {key:["XA"], city : "Tiflet"},
    {key:["Y"], city: "El Kelâa des Sraghna"},
    {key:["Z"], city : "Taza"},
    {key:["ZG"], city : "Guercif"},
    {key:["ZT"], city : "Taounate"}
];

module.exports = (cin) => {
    let ind = isNaN(Number(cin[1])) ? cin.substr(0,2) :  cin[0];
    for (el in cin_by_validity)
        for(let i = 0; i < cin_by_validity[el].key.length; i++)
            if (cin_by_validity[el].key[i] === ind.toUpperCase()){
                return cin_by_validity[el].city;
            }
        return null;
};
