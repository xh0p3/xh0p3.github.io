const DUNGEON_LOC = {
    graveyard: {
        name: { en: "Valhingen Graveyard Chapel", tr: "Valhingen Mezarlık Şapeli" },
        description: {
            en: "You stand in the pristine gardens of Valhingen Graveyard in Phlan. Doomguide Yovir Glandon, high priest of Kelemvor, is sweeping leaves outside the stone chapel. Speak to him to investigate the catacomb desecrations. The stone stairs to the Cloister lead down. (You can 'camp' here to rest).",
            tr: "Phlan'daki Valhingen Mezarlığı'nın bahçelerindesiniz. Kelemvor'un başrahibi Doomguide Yovir Glandon yaprakları süpürüyor. Mezarlık saldırılarını araştırmak için onunla konuşun. Tapınak Mahzenine giden merdivenler güneye iniyor. (Kamp yapıp dinlenmek için: 'camp')."
        },
        exits: { south: "cloister", down: "cloister" },
        exitLabels: {
            south: { en: "descend to Cloister", tr: "Manastır'a in" },
            down: { en: "descend to Cloister", tr: "Manastır'a in" }
        },
        npcs: ["Yovir"],
        items: [],
        monsters: []
    },
    cloister: {
        name: { en: "Cloister of Kelemvor", tr: "Kelemvor Manastırı" },
        description: {
            en: "The base of the stairs opens into a large stone chamber. The far wall is covered by a water-damaged fresco map. An arched doorway leads east to the Funerary Banquet Hall. South leads to the Shrine of Mourning.",
            tr: "Merdivenlerin tabanı geniş bir taş odaya açılıyor. Karşı duvar, sudan zarar görmüş bir harita freskiyle kaplı. Kemerli kapı doğudaki Tören Ziyafet Salonu'na çıkıyor. Güney, Yas Tapınağı'na gidiyor."
        },
        exits: { up: "graveyard", north: "graveyard", east: "banquet_hall", south: "shrine_mourning" },
        exitLabels: {
            up: { en: "climb up to Graveyard", tr: "Mezarlık Şapeline çık" },
            north: { en: "climb up to Graveyard", tr: "Mezarlık Şapeline çık" },
            east: { en: "enter Funerary Banquet Hall", tr: "Ziyafet Salonuna gir" },
            south: { en: "explore Shrine of Mourning", tr: "Yas Tapınağını araştır" }
        },
        items: [],
        monsters: []
    },
    shrine_mourning: {
        name: { en: "Shrine of Mourning", tr: "Yas Tapınağı" },
        description: {
            en: "A silent side-chapel where families pray. A stone altar of Kelemvor sits on the altar platform. You can type 'pray' to seek a blessing. North returns to the Cloister.",
            tr: "Ailelerin dua ettiği sessiz bir yan şapel. Altar platformunda Kelemvor'un taş bir sunağı duruyor. Bir kutsama almak için 'pray' (dua et) yazabilirsiniz. Kuzey, Manastır'a geri döner."
        },
        exits: { north: "cloister" },
        exitLabels: {
            north: { en: "return to Cloister", tr: "Manastır'a dön" }
        },
        items: [],
        monsters: [],
        altarUsed: false
    },
    banquet_hall: {
        name: { en: "Funerary Banquet Hall", tr: "Cenaze Ziyafet Salonu" },
        description: {
            en: "A long table stands here under colored lanterns. In the southern corner, a locked iron gate covers a dark shaft. East leads to the Embalming Vault. West returns to the Cloister.",
            tr: "Renkli fenerlerin altında uzun bir masa duruyor. Güney köşesinde, kilitli bir demir kapı karanlık bir şaftı örtüyor. Doğu, Embalm Odasına çıkıyor. Batı, Manastır'a dönüyor."
        },
        exits: { west: "cloister", east: "embalming_vault", down: "first_families", south: "first_families" },
        exitLabels: {
            west: { en: "return to Cloister", tr: "Manastır'a dön" },
            east: { en: "enter Embalming Vault", tr: "Mumyalama Mahzenine gir" },
            south: { en: "climb down shaft to Crypts", tr: "Şafttan mezarlara in" },
            down: { en: "climb down shaft to Crypts", tr: "Şafttan mezarlara in" }
        },
        locked: { south: "Iron Key", down: "Iron Key" },
        items: [],
        monsters: []
    },
    embalming_vault: {
        name: { en: "Embalming Vault", tr: "Mumyalama Mahzeni" },
        description: {
            en: "A cold stone table stands in the center. Flasks of embalming chemicals line the tables. A zombie minion is rummaging through the vials! West returns to the Banquet Hall.",
            tr: "Merkezde soğuk taştan bir masa duruyor. Masalarda mumyalama kimyasalları şişeleri dizilmiş. Bir zombi minyonu tüpleri karıştırıyor! Batı, Ziyafet Salonu'na dönüyor."
        },
        exits: { west: "banquet_hall" },
        exitLabels: {
            west: { en: "return to Banquet Hall", tr: "Ziyafet Salonuna dön" }
        },
        items: [
            {
                name: "Elixir of Healing",
                desc: "A glowing blue elixir. Restores 15 HP.",
                type: "potion",
                heal: 15
            }
        ],
        monsters: [
            {
                name: "Zombie",
                hp: 15,
                maxHp: 15,
                ac: 8,
                xpAward: 40,
                damage: 5
            }
        ]
    },
    first_families: {
        name: { en: "First Families Crypts", tr: "Köklü Aileler Mezarlığı" },
        description: {
            en: "A series of crypts with doorways sealed by iron grates. West leads to the Crypt of the Ancients. East continues to the Bone Pit. You can climb up to the Banquet Hall.",
            tr: "Demir ızgaralarla kapatılmış bir dizi mezar. Batı, Kadimler Mezarı'na gidiyor. Doğu, Kemik Çukuru'na devam ediyor. Yukarı Ziyafet Salonu'na çıkabilirsiniz."
        },
        exits: { up: "banquet_hall", east: "bone_pit", west: "crypt_ancients" },
        exitLabels: {
            up: { en: "climb up to Banquet Hall", tr: "Ziyafet Salonuna çık" },
            east: { en: "walk to the Bone Pit", tr: "Kemik Çukuruna yürü" },
            west: { en: "enter Crypt of the Ancients", tr: "Kadimler Mezarlığına gir" }
        },
        items: [],
        monsters: []
    },
    crypt_ancients: {
        name: { en: "Crypt of the Ancients", tr: "Kadimlerin Mezarı" },
        description: {
            en: "Dusty sarcophagi are lined against the stone walls. In the corner sits a heavy iron chest. You can try to 'unlock chest' or 'break chest' to recover gold. East returns to the First Families.",
            tr: "Taş duvarların karşısında tozlu lahitler sıralanmış. Köşede ağır demir bir sandık duruyor. Altını almak için 'unlock chest' veya 'break chest' komutunu deneyebilirsiniz. Doğu, Köklü Aileler'e döner."
        },
        exits: { east: "first_families" },
        exitLabels: {
            east: { en: "return to First Families", tr: "Köklü Ailelere dön" }
        },
        items: [],
        monsters: [],
        chestLocked: true
    },
    bone_pit: {
        name: { en: "The Bone Pit", tr: "Kemik Çukururu" },
        description: {
            en: "A circular pit filled to five feet below the lip with humanoid bones. A narrow, slippery ledge hugging the walls is the only path through. Moving east takes you deeper. West leads back to the First Families.",
            tr: "Dairesel bir çukur insan kemikleriyle dolu. Duvarları çevreleyen kaygan, dar bir set tek yoldur. Doğuya gitmek sizi tarikat mahzenlerine götürür. Batı, Köklü Aileler'e geri çıkar."
        },
        exits: { west: "first_families", east: "funerary_cults" },
        exitLabels: {
            west: { en: "return to First Families", tr: "Köklü Ailelere dön" },
            east: { en: "cross to Funerary Cults", tr: "Cenaze Tarikatına geç" }
        },
        items: [],
        monsters: []
    },
    funerary_cults: {
        name: { en: "Funerary Cult Crypts", tr: "Cenaze Tarikatı Mezarları" },
        description: {
            en: "The smell of wood smoke is overpowering. To the north, a dark flight of rickety stairs winds down. West returns to the Bone Pit.",
            tr: "Duman kokusu çok ağır. Kuzeyde, aşağı kıvrılan karanlık, sallantılı merdivenler duruyor. Batı, Kemik Çukuru'na döner."
        },
        exits: { west: "bone_pit", north: "rickety_stairs", down: "rickety_stairs" },
        exitLabels: {
            west: { en: "return to Bone Pit", tr: "Kemik Çukuruna dön" },
            north: { en: "descend Rickety Stairs", tr: "Sallantılı Merdivenlerden in" },
            down: { en: "descend Rickety Stairs", tr: "Sallantılı Merdivenlerden in" }
        },
        items: [],
        monsters: [
            {
                name: "Ghoul",
                hp: 22,
                maxHp: 22,
                ac: 12,
                xpAward: 200,
                damage: 7
            }
        ]
    },
    rickety_stairs: {
        name: { en: "Floor 2: The Rickety Stairs", tr: "Kat 2: Sallantılı Merdivenler" },
        description: {
            en: "Rotted wooden stairs wind around Jergal's statue. East leads to the Crematoria. North leads to the runed Obelisk. South climbs back up to the Upper Cult crypts.",
            tr: "Çürümüş ahşap merdivenler Jergal heykelinin etrafında kıvrılıyor. Doğu, Krematoryum'a çıkıyor. Kuzey, rünlü Obelisk Odası'na gidiyor. Güney, yukarı Tarikat Mezarları'na tırmanıyor."
        },
        exits: { south: "funerary_cults", up: "funerary_cults", east: "crematoria", north: "obelisk_room" },
        exitLabels: {
            south: { en: "climb up to Cult Crypts", tr: "Tarikat Mezarlarına çık" },
            up: { en: "climb up to Cult Crypts", tr: "Tarikat Mezarlarına çık" },
            east: { en: "go to Crematoria Niches", tr: "Krematoryum Hücrelerine git" },
            north: { en: "enter runed Obelisk Room", tr: "Dikilitaş Odasına gir" }
        },
        items: [],
        monsters: []
    },
    obelisk_room: {
        name: { en: "The Obelisk Room", tr: "Dikilitaş Odası" },
        description: {
            en: "An obelisk covered in Celestial runes stands in the center. Type 'read runes' to learn password keys. East leads to the Skeletal Ceiling. South returns to the Rickety Stairs.",
            tr: "Göksel rünlerle kaplı bir dikilitaş duruyor. Şifre anahtarını öğrenmek için 'read runes' yazın. Doğu, İskeletli Tavan'a gidiyor. Güney, Sallantılı Merdivenler'e çıkıyor."
        },
        exits: { south: "rickety_stairs", east: "skeletal_ceiling" },
        exitLabels: {
            south: { en: "return to Rickety Stairs", tr: "Sallantılı Merdivenlere dön" },
            east: { en: "walk into Skeletal Ceiling room", tr: "İskeletli Tavan odasına yürü" }
        },
        items: [],
        monsters: []
    },
    skeletal_ceiling: {
        name: { en: "The Skeletal Ceiling", tr: "İskeletli Tavan" },
        description: {
            en: "burial niches line the walls. Skeletons drop down to ambush you! East leads to the Tomb of Sedrair II. West returns to the Obelisk Room.",
            tr: "Duvarlarda mezar hücreleri sıralanmış. İskeletler pusu kurmak için aşağı düşüyorlar! Doğu, Sedrair II'nin Mezarı'na gidiyor. Batı, Dikilitaş Odası'na dönüyor."
        },
        exits: { west: "obelisk_room", east: "sedrair_tomb" },
        exitLabels: {
            west: { en: "return to Obelisk Room", tr: "Dikilitaş Odasına dön" },
            east: { en: "enter Tomb of Sedrair II", tr: "Sedrair II Mezarına gir" }
        },
        items: [],
        monsters: [
            {
                name: "Skeleton",
                hp: 13,
                maxHp: 13,
                ac: 13,
                xpAward: 50,
                damage: 5
            }
        ]
    },
    crematoria: {
        name: { en: "Crematoria Niches", tr: "Krematoryum Hücreleri" },
        description: {
            en: "The walls bear small crematoria niches. A trio of Welcomer thieves are barricaded here. West goes back to the Rickety Stairs.",
            tr: "Duvarlarda küçük krematoryum hücreleri var. Üç Welcomer hırsızı buraya barikat kurmuş. Batı, Sallantılı Merdivenler'e geri dönüyor."
        },
        exits: { west: "rickety_stairs" },
        exitLabels: {
            west: { en: "return to Rickety Stairs", tr: "Sallantılı Merdivenlere dön" }
        },
        npcs: ["Welcomers"],
        items: [],
        monsters: []
    },
    sedrair_tomb: {
        name: { en: "Tomb of Sedrair II", tr: "Sedrair II Mezarı" },
        description: {
            en: "A mummified noble sits on an ivory throne. A golden crown floats above its head. East exit leads to the Talking Dead Chamber. West returns to the Skeletal Ceiling.",
            tr: "Mermer bir tahtta mumyalanmış bir soylu oturuyor. Altın bir taç başının üzerinde duruyor. Doğu çıkışı Konuşan Ölüler Odasına gidiyor. Batı, İskeletli Tavan'a dönüyor."
        },
        exits: { west: "skeletal_ceiling", east: "talking_dead" },
        exitLabels: {
            west: { en: "return to Skeletal Ceiling", tr: "İskeletli Tavana dön" },
            east: { en: "walk to Talking Dead Chamber", tr: "Konuşan Ölüler Odasına yürü" }
        },
        items: [
            {
                name: "Gold Dagger",
                desc: {
                    en: "A golden plated dagger. Cheap craft, useless as weapon but worth 12 GP.",
                    tr: "Altın kaplama bir hançer. Ucuz işçilik, silah olarak işe yaramaz ama 12 Altın değerinde."
                },
                type: "weapon"
            }
        ],
        monsters: [],
        crownStolen: false
    },
    talking_dead: {
        name: { en: "Talking Dead Chamber", tr: "Konuşan Ölüler Odası" },
        description: {
            en: "Burial niches filled with stacked bones and skulls. Query skulls for clues. East leads to the Crime Scenes. West returns to Sedrair's Tomb.",
            tr: "Mezar hücreleri yığılmış kemik ve kafataslarıyla dolu. İpuçları için kafataslarıyla konuşabilirsiniz. Doğu, Suç Mahalli Odasına çıkar. Batı, Sedrair Mezarına döner."
        },
        exits: { west: "sedrair_tomb", east: "crime_scenes" },
        exitLabels: {
            west: { en: "return to Sedrair's Tomb", tr: "Sedrair II Mezarına dön" },
            east: { en: "go to Crime Scenes Crypt", tr: "Suç Mahalline git" }
        },
        npcs: ["Skulls"],
        items: [],
        monsters: []
    },
    crime_scenes: {
        name: { en: "Crime Scenes Crypt", tr: "Suç Mahalleri Mahzeni" },
        description: {
            en: "These crypts portray terrifying criminal nightmares in Phlan's history. The corridor deepens east into the Necropolis. West returns to the Talking Dead.",
            tr: "Bu mahzenler Phlan tarihindeki suç kabuslarını tasvir ediyor. Geçit doğuya, Necropolis'e doğru derinleşiyor. Batı, Konuşan Ölülere döner."
        },
        exits: { west: "talking_dead", east: "necropolis" },
        exitLabels: {
            west: { en: "return to Talking Dead", tr: "Konuşan Ölülere dön" },
            east: { en: "enter the Necropolis", tr: "Necropolis'e gir" }
        },
        items: [],
        monsters: []
    },
    necropolis: {
        name: { en: "The Necropolis", tr: "Nekropol" },
        description: {
            en: "It feels as if you have entered a silent subterranean city. East leads to the Labyrinth Gate. West returns to the Crime Scenes.",
            tr: "Sanki sessiz bir yeraltı şehrine girmişsiniz gibi hissettiriyor. Doğu, Labirent Kapısı'na çıkıyor. Batı, Suç Mahalline dönüyor."
        },
        exits: { west: "crime_scenes", east: "labyrinth_gate" },
        exitLabels: {
            west: { en: "return to Crime Scenes", tr: "Suç Mahalline dön" },
            east: { en: "enter the Labyrinth Gates", tr: "Labirent Geçitlerine gir" }
        },
        items: [],
        monsters: [
            {
                name: "Ghoul",
                hp: 15,
                maxHp: 15,
                ac: 11,
                xpAward: 100,
                damage: 6
            }
        ]
    },
    labyrinth_gate: {
        name: { en: "The Labyrinth Gates", tr: "Labirent Girişi" },
        description: {
            en: "A dark tunnel leading into a branching maze of crypt streets. East leads to the Labyrinth Intersection. West returns to the Necropolis.",
            tr: "Labirent sokaklarının dallanan çıkmazlarına açılan karanlık bir tünel. Doğu, Labirent Kavşağı'na çıkıyor. Batı, Nekropol'e dönüyor."
        },
        exits: { west: "necropolis", east: "lab_intersection" },
        exitLabels: {
            west: { en: "return to the Necropolis", tr: "Nekropol'e dön" },
            east: { en: "enter Labyrinth Intersection", tr: "Labirent Kavşağına gir" }
        },
        items: [],
        monsters: []
    },
    lab_intersection: {
        name: { en: "Labyrinth Intersection", tr: "Labirent Kavşağı" },
        description: {
            en: "A four-way intersection. North is blocked by a runed stone door. South leads to a flooded dead end. East leads to the Sentry Room. West returns to the Labyrinth Gate.",
            tr: "Karanlık labirentin içinde dört yol ağzı. Kuzey, rünlü ağır taş bir kapıyla kapatılmış. Güney, su basmış bir çıkmaza gidiyor. Doğu, Nöbetçi Odasına çıkıyor. Batı, Labirent Girişi'ne dönüyor."
        },
        exits: { west: "labyrinth_gate", south: "lab_dead_end_flooded", east: "sentry_room", north: "secret_vault" },
        locked: { north: "Celestial Runes" },
        exitLabels: {
            west: { en: "return to Labyrinth Gate", tr: "Labirent Girişine dön" },
            south: { en: "explore the Flooded Passage", tr: "Su Basmış Geçidi araştır" },
            east: { en: "navigate to the Sentry Room", tr: "Nöbetçi Odasına ilerle" },
            north: { en: "unlock the Runic Stone Wall", tr: "Rünlü Taş Duvarı aç" }
        },
        items: [],
        monsters: []
    },
    lab_dead_end_flooded: {
        name: { en: "Flooded Dead End", tr: "Su Basmış Çıkmaz" },
        description: {
            en: "Cold water floods this dead-end crypt. Search the water. North returns to the Labyrinth Intersection.",
            tr: "Soğuk su bu çıkmaz mezarı basmış. Bir şey düşürülmüş mü diye suyu arayabilirsiniz. Kuzey, Labirent Kavşağı'na döner."
        },
        exits: { north: "lab_intersection" },
        exitLabels: {
            north: { en: "return to Labyrinth Intersection", tr: "Labirent Kavşağına dön" }
        },
        items: [
            {
                name: "Silver Ring",
                desc: "A silver ring set with onyx. Worth 30 GP.",
                type: "treasure"
            }
        ],
        monsters: []
    },
    secret_vault: {
        name: { en: "Secret Vault of Jergal", tr: "Jergal'ın Gizli Kasası" },
        description: {
            en: "A small, dust-free chamber holding a stone reliquary pedestal. In the vault, you find a masterfully crafted sword. South returns to the Labyrinth Intersection.",
            tr: "Küçük, tozsuz bir oda. Kasanın içinde, ustalıkla işlenmiş bir kılıç buluyorsunuz. Güney, Labirent Kavşağı'na döner."
        },
        exits: { south: "lab_intersection" },
        exitLabels: {
            south: { en: "return to Labyrinth Intersection", tr: "Labirent Kavşağına dön" }
        },
        items: [
            {
                name: "Thayan Greatsword",
                desc: "A legendary massive steel sword etched with Thayan runes. Deals massive 12 damage.",
                type: "weapon",
                damageOverride: 12
            }
        ],
        monsters: []
    },
    sentry_room: {
        name: { en: "Red Wizard Sentry Room", tr: "Kızıl Büyücü Nöbet Odası" },
        description: {
            en: "A kobold sentinel is sleeping in a small wooden chair. Four zombies stand guard. The Red Wizard's private lair is north. West returns to the Labyrinth.",
            tr: "Bir kobold nöbetçi, küçük ahşap sandalyede mışıl mışıl uyuyor. Dört zombi nöbet tutuyor. Kızıl Büyücü'nün sığınağı kuzeyde. Batı, Labirent Kavşağı'na geri döner."
        },
        exits: { west: "lab_intersection", north: "wizard_lair" },
        exitLabels: {
            west: { en: "return to the Labyrinth", tr: "Labirente dön" },
            north: { en: "enter Rorreth's Lair", tr: "Rorreth Sığınağına gir" }
        },
        items: [],
        monsters: [
            {
                name: "Zombie",
                hp: 18,
                maxHp: 18,
                ac: 8,
                xpAward: 50,
                damage: 6
            }
        ]
    },
    wizard_lair: {
        name: { en: "Rorreth Monforoth's Lair", tr: "Rorreth Monforoth'un Sığınağı" },
        description: {
            en: "Rorreth is stuffing documents into his bag. Defeat him to activate the portal! A swirling green portal is humming to the north.",
            tr: "Rorreth evrakları çantasına tıkıştırıyor. Portalı etkinleştirmek için onu yenin! Kuzeyde yeşil bir ışınlanma portalı mırıldanıyor."
        },
        exits: { south: "sentry_room", north: "underchasm" },
        locked: { north: "Teleport Portal" },
        exitLabels: {
            south: { en: "exit to Sentry Room", tr: "Nöbetçi Odasına çık" },
            north: { en: "step through the Teleport Portal", tr: "Işınlanma Portalından geç" }
        },
        items: [],
        monsters: [
            {
                name: "Rorreth (Red Wizard)",
                hp: 30,
                maxHp: 30,
                ac: 11,
                xpAward: 400,
                damage: 7,
                isGateBoss: true
            }
        ]
    },
    underchasm: {
        name: { en: "Floor 3: The Underchasm", tr: "Kat 3: Yeraltı Kanyonu" },
        description: {
            en: "You stand at the edge of a deep underground ravine. A rickety rope bridge sways in the cold wind. East leads to the Whispering Vaults. South returns to Rorreth's Lair.",
            tr: "Derin bir yeraltı kanyonunun kenarındasınız. Sallantılı bir halat köprü soğuk rüzgarda dalgalanıyor. Doğu, Fısıldayan Mahzenlere çıkıyor. Güney, Rorreth'in Sığınağına dönüyor."
        },
        exits: { south: "wizard_lair", east: "whispering_vaults" },
        exitLabels: {
            south: { en: "return to Wizard Lair", tr: "Büyücü Sığınağına dön" },
            east: { en: "cross bridge to Whispering Vaults", tr: "Köprüden Fısıldayan Mahzenlere geç" }
        },
        items: [],
        monsters: []
    },
    whispering_vaults: {
        name: { en: "The Whispering Vaults", tr: "Fısıldayan Mahzenler" },
        description: {
            en: "An ancient crypt where shadows seem to whisper. A stone mouth is carved on the north wall, posing a riddle. West returns to the Underchasm. South leads to the Welcomer Haven.",
            tr: "Gölgelerin fısıldadığı kadim bir mezar. Kuzey duvara oyulmuş taş bir ağız bilmece soruyor. Batı, Kanyona döner. Güney, Welcomer Sığınağına çıkar."
        },
        exits: { west: "underchasm", south: "welcomer_haven", north: "crystal_cavern" },
        locked: { north: "Riddle Mouth" },
        exitLabels: {
            west: { en: "return to the Underchasm", tr: "Yeraltı Kanyonuna dön" },
            south: { en: "enter Welcomer Haven", tr: "Welcomer Sığınağına gir" },
            north: { en: "solve riddle to enter Caverns", tr: "Bilmeceyi çözüp Mağaralara gir" }
        },
        items: [],
        monsters: []
    },
    welcomer_haven: {
        name: { en: "Welcomer Haven", tr: "Welcomer Sığınağı" },
        description: {
            en: "A secret safehouse built in the caverns. Todor the Smuggler sits by a campfire. You can buy/sell items or 'camp' to rest. North returns to the Whispering Vaults.",
            tr: "Mağaralarda gizli bir sığınak. Todor adında bir kaçakçı kamp ateşinin yanında oturuyor. Ondan ekipman satın alabilir veya 'camp' yazıp dinlenebilirsiniz. Kuzey, Fısıldayan Mahzenlere döner."
        },
        exits: { north: "whispering_vaults" },
        exitLabels: {
            north: { en: "return to Whispering Vaults", tr: "Fısıldayan Mahzenlere dön" }
        },
        npcs: ["Todor"],
        items: [],
        monsters: []
    },
    crystal_cavern: {
        name: { en: "The Crystal Caverns", tr: "Kristal Mağaralar" },
        description: {
            en: "Massive glowing crystals grow from the floor. A monstrous Carrion Crawler has nested here. North exits to Valjevo Castle. South returns to Whispering Vaults.",
            tr: "Yerden devasa parıldayan kristaller büyüyor. Devasa bir Carrion Crawler buraya yuva yapmış. Kuzey, Valjevo Kalesine çıkıyor. Güney, Fısıldayan Mahzenlere döner."
        },
        exits: { south: "whispering_vaults", north: "castle_courtyard" },
        exitLabels: {
            south: { en: "return to Whispering Vaults", tr: "Fısıldayan Mahzenlere dön" },
            north: { en: "climb up to Valjevo Keep Courtyard", tr: "Valjevo Kalesi Avlusuna çık" }
        },
        items: [],
        monsters: [
            {
                name: "Carrion Crawler",
                hp: 40,
                maxHp: 40,
                ac: 13,
                xpAward: 500,
                damage: 8
            }
        ]
    },
    castle_courtyard: {
        name: { en: "Valjevo Castle Courtyard", tr: "Valjevo Kalesi Avlusu" },
        description: {
            en: "You stand in the crumbling stone courtyard of Valjevo Castle. A heavily armored Thayan Knight blocks the keep entrance. You can 'camp' to rest. East leads to the Thayan Lab. South goes back to the Caverns.",
            tr: "Valjevo Kalesi'nin yıkık taş avlusundasınız. Ağır zırhlı bir Thayan Şövalyesi girişi kapatıyor. 'camp' yazarak dinlenebilirsiniz. Doğu, Thayan Laboratuvarına çıkıyor. Güney, Mağaralara döner."
        },
        exits: { south: "crystal_cavern", east: "thayan_lab" },
        exitLabels: {
            south: { en: "descend to Crystal Caverns", tr: "Kristal Mağaralara in" },
            east: { en: "enter the Thayan Laboratory", tr: "Thayan Laboratuvarına gir" }
        },
        items: [],
        monsters: [
            {
                name: "Thayan Knight",
                hp: 30,
                maxHp: 30,
                ac: 15,
                xpAward: 300,
                damage: 8
            }
        ]
    },
    thayan_lab: {
        name: { en: "The Thayan Laboratory", tr: "Thayan Laboratuvarı" },
        description: {
            en: "Benches are littered with alchemy apparatuses. Three levers (Red, Blue, Green) are mounted on the wall. A portcullis blocks the north. West returns to the Courtyard.",
            tr: "Masalar simya aletleriyle dolu. Duvarda üç kol (Kırmızı, Mavi, Yeşil) monteli. Kuzeyi demir parmaklık kapatıyor. Batı, Avluya dönüyor."
        },
        exits: { west: "castle_courtyard", north: "pool_chamber" },
        locked: { north: "Portcullis Levers" },
        exitLabels: {
            west: { en: "return to Courtyard", tr: "Kalenin Avlusuna dön" },
            north: { en: "enter Pool of Radiance Chamber", tr: "Işıltı Havuzu Odasına gir" }
        },
        items: [],
        monsters: []
    },
    pool_chamber: {
        name: { en: "The Pool of Radiance Chamber", tr: "Işıltı Havuzu Odası" },
        description: {
            en: "A pool of water glows with intense violet light. Defeat Rorreth (Empowered) to trigger the Weave Rip and teleport to the Shadowfell! The gateway north will open.",
            tr: "Mor ışıkla parıldayan bir havuz var. Shadowfell'e geçişi tetiklemek için Rorreth'i durdurun! Kuzeydeki ışınlanma geçidi açılacaktır."
        },
        exits: { south: "thayan_lab", north: "shadow_rift" },
        locked: { north: "Weave Portal" },
        exitLabels: {
            south: { en: "exit to Laboratory", tr: "Laboratuvara çık" },
            north: { en: "fall through Weave Rip to Shadowfell", tr: "Işınlanma Yırtığından Shadowfell'e düş" }
        },
        items: [],
        monsters: [
            {
                name: "Rorreth (Empowered)",
                hp: 45,
                maxHp: 45,
                ac: 13,
                xpAward: 600,
                damage: 9,
                isGateBoss: true // unlocks the north portal to shadow fell
            }
        ]
    },
    shadow_rift: {
        name: { en: "Floor 4: Shadow Rift", tr: "Kat 4: Gölge Yırtığı" },
        description: {
            en: "You have fallen into the cold depths of the Shadowfell. Rocky islands float in the dark void. A unstable portal hums behind you. East leads to the Mourning Abyss.",
            tr: "Shadowfell'in soğuk derinliklerine düştünüz. Karanlık boşlukta kayalık adalar yüzüyor. Arkanda kararsız bir portal mırıldanıyor. Doğu, Yas Uçurumuna çıkıyor."
        },
        exits: { south: "pool_chamber", east: "mourning_abyss" },
        exitLabels: {
            south: { en: "look back at Pool of Radiance", tr: "Işıltı Havuzuna geri bak" },
            east: { en: "walk into the Mourning Abyss", tr: "Yas Uçurumuna yürü" }
        },
        items: [],
        monsters: []
    },
    mourning_abyss: {
        name: { en: "The Mourning Abyss", tr: "Yas Uçurumu" },
        description: {
            en: "Cold fog swirls around sharp stone formations. A creeping Shadow Wraith patrols the pass. East leads to Jaxana's Tomb. West returns to the Shadow Rift.",
            tr: "Keskin taş oluşumlarının etrafında soğuk sis dolanıyor. Sinsi bir Gölge İblisi geçitte devriye geziyor. Doğu, Jaxana'nın Mezarına gidiyor. Batı, Gölge Yırtığına dönüyor."
        },
        exits: { west: "shadow_rift", east: "jaxana_tomb" },
        exitLabels: {
            west: { en: "return to Shadow Rift", tr: "Gölge Yırtığına dön" },
            east: { en: "enter Jaxana's Dragon Tomb", tr: "Jaxana'nın Ejderha Mezarına gir" }
        },
        items: [],
        monsters: [
            {
                name: "Shadow Wraith",
                hp: 25,
                maxHp: 25,
                ac: 12,
                xpAward: 300,
                damage: 6
            }
        ]
    },
    jaxana_tomb: {
        name: { en: "Tomb of Jaxana", tr: "Jaxana'nın Mezarı" },
        description: {
            en: "A massive domed cavern. Jaxana, an ancient Shadow Dragon, lies coiled and sleeping. You can try to 'sneak past dragon' (Stealth DC 15) or attack her. East portal exits to Citadel Gatehouse. West returns to Mourning Abyss.",
            tr: "Devasa kubbeli bir mağara. Kadim bir Gölge Ejderhası olan Jaxana kıvrılmış uyuyor. Ejderhanın yanından gizlice geçmeyi deneyebilirsiniz ('sneak past dragon', Çeviklik DC 15) ya da saldırın. Doğu geçidi Kale Barbicanına çıkıyor. Batı, Uçuruma dönüyor."
        },
        exits: { west: "mourning_abyss", east: "citadel_gatehouse" },
        exitLabels: {
            west: { en: "return to Mourning Abyss", tr: "Yas Uçurumuna dön" },
            east: { en: "step through exit portal to surface Citadel", tr: "Çıkış portalından yüzey Kalesine geç" }
        },
        items: [],
        monsters: [
            {
                name: "Jaxana (Shadow Dragon)",
                hp: 60,
                maxHp: 60,
                ac: 15,
                xpAward: 1000,
                damage: 10,
                isSleeping: true // set false if stealth check fails
            }
        ]
    },
    citadel_gatehouse: {
        name: { en: "Floor 5: Citadel Barbican", tr: "Kat 5: Kale Barbicanı" },
        description: {
            en: "You emerge at the stone Gatehouse of the main Thayan Citadel. Heavy fortifications surround you. North leads to the Garrison Barracks. You can 'camp' to rest.",
            tr: "Thayan Kalesinin taş kapı binasında belirdiniz. Etrafınızı ağır tahkimatlar sarıyor. Kuzey, Kışla Koğuşlarına gidiyor. 'camp' yazarak dinlenebilirsiniz."
        },
        exits: { south: "jaxana_tomb", north: "garrison_barracks" },
        exitLabels: {
            south: { en: "look back at Shadow portal", tr: "Gölge portalına geri bak" },
            north: { en: "enter the Garrison Barracks", tr: "Kışla Koğuşlarına gir" }
        },
        items: [],
        monsters: []
    },
    garrison_barracks: {
        name: { en: "Garrison Barracks", tr: "Kışla Koğuşları" },
        description: {
            en: "Rows of military cots are lined up. A Thayan Arch-Mage is preparation spells to attack you! East leads to the Torture Vaults. South returns to Citadel Barbican.",
            tr: "Askeri ranzalar sıralanmış. Thayan Başbüyücüsü size saldırmak için büyü hazırlıyor! Doğu, İşkence Mahzenlerine gidiyor. Güney, Barbicana dönüyor."
        },
        exits: { south: "citadel_gatehouse", east: "torture_vaults" },
        exitLabels: {
            south: { en: "return to Gatehouse Barbican", tr: "Barbicana dön" },
            east: { en: "enter the Torture Vaults", tr: "İşkence Mahzenlerine gir" }
        },
        items: [],
        monsters: [
            {
                name: "Thayan Arch-Mage",
                hp: 30,
                maxHp: 30,
                ac: 12,
                xpAward: 400,
                damage: 8
            }
        ]
    },
    torture_vaults: {
        name: { en: "Citadel Torture Vaults", tr: "Zindan İşkence Odaları" },
        description: {
            en: "An iron cage stands in the center holding a captive Black Fist Knight. You can try to 'rescue knight' to gain a combat ally. North leads to the Sanctum Gates. West returns to Barracks.",
            tr: "Ortada tutsak bir Black Fist Şövalyesini barındıran demir bir kafes duruyor. Bir savaş müttefiki kazanmak için 'rescue knight' yazarak şövalyeyi kurtarabilirsiniz. Kuzey, Tapınak Kapılarına gidiyor. Batı, Kışlaya dönüyor."
        },
        exits: { west: "garrison_barracks", north: "sanctum_gates" },
        exitLabels: {
            west: { en: "return to Garrison Barracks", tr: "Kışlaya dön" },
            north: { en: "advance to Sanctum Gates", tr: "Tapınak Kapılarına ilerle" }
        },
        items: [],
        monsters: [],
        knightRescued: false
    },
    sanctum_gates: {
        name: { en: "Floor 6: The Sanctum Gates", tr: "Kat 6: Tapınak Kapıları" },
        description: {
            en: "A massive obsidian archway. A riddle is carved into the stone mouth: 'Feed me and I live, give me drink and I die. What am I?' West leads to the Alchemy Chamber. South returns to Torture Vaults.",
            tr: "Devasa obsidyen kemerli yol. Taş ağza bir bilmece kazınmış: 'Beni besle yaşarım, bana su ver ölürüm. Ben neyim?' Batı, Simya Odasına gidiyor. Güney, İşkence Mahzenlerine dönüyor."
        },
        exits: { south: "torture_vaults", west: "alchemy_chamber", north: "astral_hearth" },
        locked: { north: "Sanctum Riddle Mouth" },
        exitLabels: {
            south: { en: "return to Torture Vaults", tr: "İşkence Mahzenlerine dön" },
            west: { en: "explore the Alchemy Chamber", tr: "Simya Odasını araştır" },
            north: { en: "solve riddle to enter Final Sanctum", tr: "Bilmeceyi çözüp Büyük Tapınağa gir" }
        },
        items: [],
        monsters: []
    },
    alchemy_chamber: {
        name: { en: "The Alchemy Chamber", tr: "Simya Odası" },
        description: {
            en: "Simya masaları üzerinde iksirler bulunuyor. Sunfire Oil (+5 fire damage bonus to next strike) matches here. East returns to the Sanctum Gates.",
            tr: "Simya masalarında iksirler bulunuyor. Bir şişe Sunfire Yağı bulabilirsiniz. Doğu, Tapınak Kapılarına döner."
        },
        exits: { east: "sanctum_gates" },
        exitLabels: {
            east: { en: "return to Sanctum Gates", tr: "Tapınak Kapılarına dön" }
        },
        items: [
            {
                name: "Sunfire Oil",
                desc: "A glowing orange fluid. Apply to weapon to add +5 fire damage to your next strike.",
                type: "sunfire_potion"
            }
        ],
        monsters: []
    },
    astral_hearth: {
        name: { en: "The Astral Hearth", tr: "Astral Ocak" },
        description: {
            en: "A floating platform in a swirling galaxy void. Vanthrax the Arch-Lich is channeling souls to keep the Weave rip open. Defeat him to seal the rip and open the portal to the Drowned City of Phlan (Chapter 9) to the north!",
            tr: "Dönen galaksi boşluğunda yüzen bir platform. Arch-Lich Vanthrax yırtığı açık tutmak için ruhları kanalize ediyor. Yırtığı kapatıp kuzeydeki Boğulmuş Phlan Şehri'ne (Bölüm 9) giden portalı açmak için onu yenin!"
        },
        exits: { south: "sanctum_gates", north: "drowned_plaza" },
        locked: { north: "Astral Portal" },
        exitLabels: {
            south: { en: "look back at Sanctum Gates", tr: "Tapınak Kapılarına geri bak" },
            north: { en: "step through the Astral Portal to surface", tr: "Astral Portaldan geçerek yüzeye dön" }
        },
        items: [],
        monsters: [
            {
                name: "Vanthrax (Arch-Lich)",
                hp: 80,
                maxHp: 80,
                ac: 15,
                xpAward: 2000,
                damage: 12,
                isGateBoss: true
            }
        ]
    },

    // =============================================
    // CHAPTER 9: THE DROWNED CITY OF PHLAN
    // =============================================
    drowned_plaza: {
        name: { en: "Floor 7: Drowned Market Plaza", tr: "Kat 7: Boğulmuş Çarşı Meydanı" },
        description: {
            en: "You emerge from the Astral Hearth back on the surface — but Phlan is flooded. Knee-deep brackish water fills the once-bustling market. Overturned carts and sodden goods float past. A Water Elemental churns in the central fountain. East leads to the Blackfist Bridge. North leads to the Sunken Temple.",
            tr: "Astral Ocak'tan yüzeye çıkıyorsunuz — ama Phlan su altında. Diz boyu tuzlu su eskiden kalabalık olan çarşıyı doldurmuş. Devrilmiş arabalar ve ıslak mallar yüzüyor. Merkezdeki çeşmede bir Su Elementali çalkalanıyor. Doğu, Black Fist Köprüsüne çıkıyor. Kuzey, Batık Tapınağa gidiyor."
        },
        exits: { south: "astral_hearth", east: "blackfist_bridge", north: "sunken_temple" },
        exitLabels: {
            south: { en: "look back at Astral Hearth portal", tr: "Astral Ocak portalına bak" },
            east: { en: "wade to Blackfist Bridge", tr: "Black Fist Köprüsüne yürü" },
            north: { en: "wade to Sunken Temple", tr: "Batık Tapınağa yürü" }
        },
        items: [
            { name: "Merchant's Chest Key", desc: "A waterlogged brass key found floating in a crate. Opens the locked merchant chest.", type: "key" }
        ],
        monsters: [
            { name: "Water Elemental", hp: 35, maxHp: 35, ac: 13, xpAward: 350, damage: 7 }
        ]
    },
    blackfist_bridge: {
        name: { en: "The Blackfist Bridge", tr: "Black Fist Köprüsü" },
        description: {
            en: "A stone bridge spans the flooded canal. Thayan snipers have taken positions on the far battlements. Halfway across, a locked iron merchant chest sits chained to the railing. You can try to 'open chest' if you have the key. Rangers get advantage on crossing. North leads to the Harbor Docks. West returns to the Plaza.",
            tr: "Taş bir köprü su basmış kanalı geçiyor. Thayan keskin nişancılar uzak siperler almış. Ortada, kilitli bir demir sandık küpeşteye zincirlenmiş. Anahtarınız varsa 'open chest' yazabilirsiniz. Kuzey, Liman İskelelerine çıkıyor. Batı, Meydana döner."
        },
        exits: { west: "drowned_plaza", north: "harbor_docks" },
        exitLabels: {
            west: { en: "return to Drowned Plaza", tr: "Boğulmuş Meydana dön" },
            north: { en: "cross to Harbor Docks", tr: "Liman İskelelerine geç" }
        },
        items: [],
        monsters: [
            { name: "Thayan Sniper", hp: 22, maxHp: 22, ac: 13, xpAward: 250, damage: 8 }
        ],
        bridgeChestOpened: false
    },
    sunken_temple: {
        name: { en: "Sunken Temple of Tyr", tr: "Batık Tyr Tapınağı" },
        description: {
            en: "A grand temple half-submerged in the flood. Statues of Tyr, god of justice, stand in waist-deep water. A stone altar gleams beneath the surface. Three offering bowls are arranged on the altar. 'Offer' gold to Tyr to receive a powerful blessing. South returns to the Drowned Plaza.",
            tr: "Devasa bir tapınak, selin yarısına kadar suya gömülmüş. Bel boyuna kadar suda adalet tanrısı Tyr'in heykelleri duruyor. Taş sunak suyun altında parıldıyor. Sunakta üç adak kasesi var. Tyr'e altın 'offer' yazarak güçlü bir kutsama alabilirsiniz. Güney, Boğulmuş Meydana döner."
        },
        exits: { south: "drowned_plaza" },
        exitLabels: {
            south: { en: "return to Drowned Plaza", tr: "Boğulmuş Meydana dön" }
        },
        items: [
            { name: "Holy Avenger Fragment", desc: "A shard of a legendary paladin sword. Paladins can equip this for +3 damage. Worth 80 GP to others.", type: "weapon", damageOverride: 0, palOnly: true }
        ],
        monsters: [],
        tyrOfferingDone: false
    },
    harbor_docks: {
        name: { en: "The Harbor Docks", tr: "Liman İskeleleri" },
        description: {
            en: "Rickety docks stretch into the flooded harbor. Welcomer pirates have commandeered a moored warship and are raiding the flooded warehouses. Their captain, a brutish half-orc named Brakk, challenges you to a duel. Defeat Brakk and his crew to claim their ship manifest — a key to the Corruption Spire. East leads to the Spire Entrance.",
            tr: "Çürük iskeleler sel basmış limana uzanıyor. Welcomer korsanları demirli bir savaş gemisini ele geçirmiş. Kaptan brutish yarı-ork Brakk sizi düelloya davet ediyor. Brakk'ı ve ekibini yenin ve gemi manifestosunu alın. Doğu, Spire Girişine çıkıyor."
        },
        exits: { south: "blackfist_bridge", east: "spire_entrance" },
        exitLabels: {
            south: { en: "return to Blackfist Bridge", tr: "Black Fist Köprüsüne dön" },
            east: { en: "sail to the Corruption Spire", tr: "Yozlaşma Kulesine yelken aç" }
        },
        npcs: ["Brakk"],
        items: [],
        monsters: [
            { name: "Pirate Captain Brakk", hp: 38, maxHp: 38, ac: 14, xpAward: 400, damage: 8, isGateBoss: true },
            { name: "Welcomer Thug", hp: 20, maxHp: 20, ac: 12, xpAward: 150, damage: 6 }
        ]
    },

    // =============================================
    // CHAPTER 10: THE CORRUPTION SPIRE
    // =============================================
    spire_entrance: {
        name: { en: "Floor 8: Corruption Spire — Entrance", tr: "Kat 8: Yozlaşma Kulesi — Giriş" },
        description: {
            en: "A twisted obsidian spire crackles with corrupt Thayan magic. Black Fist soldiers stand guard at the entrance — but their eyes glow violet. They have been mind-controlled. North leads up into the Spire. You can 'camp' here to rest.",
            tr: "Bükülmüş obsidyen bir kule, bozulmuş Thayan büyüsüyle çatırdıyor. Black Fist askerleri girişi koruyor — ama gözleri mor renkte parlıyor. Zihinleri kontrol altında. Kuzey, Kule içine çıkıyor. Burada 'camp' yazarak dinlenebilirsiniz."
        },
        exits: { west: "harbor_docks", north: "mirror_maze" },
        exitLabels: {
            west: { en: "return to Harbor Docks", tr: "Liman İskelelerine dön" },
            north: { en: "ascend into the Corruption Spire", tr: "Yozlaşma Kulesine tırman" }
        },
        items: [],
        monsters: [
            { name: "Corrupted Black Fist", hp: 28, maxHp: 28, ac: 14, xpAward: 300, damage: 7 },
            { name: "Corrupted Black Fist", hp: 28, maxHp: 28, ac: 14, xpAward: 300, damage: 7 }
        ]
    },
    mirror_maze: {
        name: { en: "The Mirror Maze", tr: "Ayna Labirenti" },
        description: {
            en: "A circular room lined with tall black mirrors. Your reflections stare back, but wrong — each one shows a different death. One mirror pulses with dark energy: this is the focus mirror powering the mind-control. Type 'shatter mirror' to attempt to break it (INT check DC 14). North leads to the Soul Forge. South returns to the Spire Entrance.",
            tr: "Uzun siyah aynalarla kaplı dairesel bir oda. Yansımalarınız geri bakıyor ama yanlış — her biri farklı bir ölümü gösteriyor. Bir ayna karanlık enerjiyle titreşiyor: bu, zihin kontrolünü besleyen odak ayna. Kırmayı denemek için 'shatter mirror' yazın (ZKA kontrolü DC 14). Kuzey, Ruh Ocağına çıkıyor. Güney, Kule Girişine döner."
        },
        exits: { south: "spire_entrance", north: "soul_forge" },
        exitLabels: {
            south: { en: "return to Spire Entrance", tr: "Kule Girişine dön" },
            north: { en: "ascend to the Soul Forge", tr: "Ruh Ocağına tırman" }
        },
        items: [],
        monsters: []
    },
    soul_forge: {
        name: { en: "The Soul Forge", tr: "Ruh Ocağı" },
        description: {
            en: "A massive iron furnace roars at the center. Chained souls orbit it in a violet glow. Corrupted Captain Stedd Rein, once the noblest Black Fist officer, stands before you — now a puppet of the Thayans. Defeat him to break the spire's corruption. North leads to the Dragon Cult Antechamber.",
            tr: "Merkezdeki devasa demir fırın gümbürdüyor. Zincirlenmiş ruhlar mor ışıkla etrafında dönüyor. Bir zamanlar en soylu Black Fist subayı olan Yozlaşmış Kaptan Stedd Rein karşınızda duruyor. Onu yenin ve kulenin bozulmasını kırın. Kuzey, Ejderha Tarikatı Ön Odasına çıkıyor."
        },
        exits: { south: "mirror_maze", north: "cultist_antechamber" },
        exitLabels: {
            south: { en: "return to Mirror Maze", tr: "Ayna Labirentine dön" },
            north: { en: "break through to Dragon Cult Sanctum", tr: "Ejderha Tarikatı Tapınağına geç" }
        },
        items: [
            { name: "Captain's Signet Ring", desc: "Captain Stedd's ring. Proves his corruption. Return it to Glandon for 150 GP reward. Worth 60 GP as treasure.", type: "treasure" }
        ],
        monsters: [
            { name: "Corrupted Captain Stedd", hp: 42, maxHp: 42, ac: 15, xpAward: 550, damage: 9, isGateBoss: true }
        ]
    },

    // =============================================
    // CHAPTER 11: THE DRAGON CULT SANCTUM
    // =============================================
    cultist_antechamber: {
        name: { en: "Floor 9: Dragon Cult Antechamber", tr: "Kat 9: Ejderha Tarikatı Ön Odası" },
        description: {
            en: "Crimson banners depicting a five-headed dragon hang from the vaulted ceiling. Dragon Cult fanatics chant in unison. The smell of sulfur and burnt offerings fills the air. East leads to the Dragon Egg Chamber. North leads to the High Priest's Sanctum.",
            tr: "Tonozlu tavandan beş başlı ejderhayı tasvir eden kırmızı pankartlar asılı. Ejderha Tarikatı fanatikleri topluca ilahi okuyor. Kükürt ve yakılmış adak kokusu havayı dolduruyor. Doğu, Ejderha Yumurtası Odasına çıkıyor. Kuzey, Başrahibin Sanctumuna gidiyor."
        },
        exits: { south: "soul_forge", east: "dragon_egg_chamber", north: "high_priest_sanctum" },
        exitLabels: {
            south: { en: "return to Soul Forge", tr: "Ruh Ocağına dön" },
            east: { en: "enter Dragon Egg Chamber", tr: "Ejderha Yumurtası Odasına gir" },
            north: { en: "approach the High Priest's Sanctum", tr: "Başrahibin Tapınağına ilerle" }
        },
        items: [],
        monsters: [
            { name: "Dragon Cult Fanatic", hp: 25, maxHp: 25, ac: 12, xpAward: 280, damage: 7 }
        ]
    },
    dragon_egg_chamber: {
        name: { en: "The Dragon Egg Chamber", tr: "Ejderha Yumurtası Odası" },
        description: {
            en: "A warm, dark alcove. Three massive red dragon eggs sit in a nest of ash and obsidian shards. If these hatch, Phlan falls. You can 'destroy eggs' — a morally weighty act that grants 200 XP and 80 GP worth of cult treasure, but Cassyt objects. Or 'leave eggs' and move on. West returns to the Antechamber.",
            tr: "Sıcak, karanlık bir niş. Kül ve obsidyen kıymıklarının yuvası üç devasa kırmızı ejderha yumurtası var. Bunlar çatlarsa Phlan çöker. 'destroy eggs' yazabilirsiniz — 200 XP ve 80 Altın değerinde tarikat hazinesi verir ama Cassyt itiraz eder. Ya da 'leave eggs' yazıp ilerleyebilirsiniz. Batı, Ön Odaya döner."
        },
        exits: { west: "cultist_antechamber" },
        exitLabels: {
            west: { en: "return to Antechamber", tr: "Ön Odaya dön" }
        },
        items: [],
        monsters: [],
        eggsDestroyed: false
    },
    high_priest_sanctum: {
        name: { en: "High Priest's Sanctum", tr: "Başrahibin Tapınağı" },
        description: {
            en: "A vast ritual chamber lit by dragonfire braziers. Severin's High Priest, Naergoth the Bleak, levitates above a central altar chanting the Draconic Rite. Defeat him to stop the ritual and earn passage to the Underdark. North leads to the Underdark Entrance.",
            tr: "Ejderha ateşi mangallarıyla aydınlatılmış devasa bir ritüel odası. Severin'in Başrahibi, Kasvetli Naergoth, merkezdeki sunağın üzerinde Ejderha Ritüelini okuyarak levitasyon yapıyor. Ritueli durdurmak ve Karanlık Altı'na geçmek için onu yenin. Kuzey, Karanlık Altı Girişine çıkıyor."
        },
        exits: { south: "cultist_antechamber", north: "underdark_entrance" },
        exitLabels: {
            south: { en: "return to Antechamber", tr: "Ön Odaya dön" },
            north: { en: "descend to the Underdark", tr: "Karanlık Altı'na in" }
        },
        items: [
            { name: "Draconic Ritual Tome", desc: "Naergoth's spellbook. Contains Draconic curses. Worth 120 GP to the right scholar. Can be used as a 'read tome' buff (+2 INT until next camp).", type: "tome" }
        ],
        monsters: [
            { name: "Naergoth the High Priest", hp: 50, maxHp: 50, ac: 13, xpAward: 700, damage: 9, isGateBoss: true },
            { name: "Cultist Zealot", hp: 22, maxHp: 22, ac: 11, xpAward: 150, damage: 6 }
        ]
    },

    // =============================================
    // CHAPTER 12: THE UNDERDARK CROSSING
    // =============================================
    underdark_entrance: {
        name: { en: "Floor 10: Underdark Entrance", tr: "Kat 10: Karanlık Altı Girişi" },
        description: {
            en: "A spiraling stone tunnel descends into absolute darkness. The Goggles of Night activate — the dark becomes grey twilight. Dripping stalactites hang overhead. A pair of Drow Scouts lurk in the shadows. North leads deeper into the Fungal Forest. South returns to the High Priest's Sanctum.",
            tr: "Sarmal bir taş tünel mutlak karanlığa doğru iniyor. Gece Gözlükleri etkinleşiyor — karanlık griye dönüşüyor. Sarkıtlar yukarıdan damlar. Gölgelerde bir çift Drow Keşifçi pusu kurmuş. Kuzey, Mantar Ormanına gidiyor. Güney, Başrahibin Tapınağına döner."
        },
        exits: { south: "high_priest_sanctum", north: "fungal_forest" },
        exitLabels: {
            south: { en: "return to High Priest Sanctum", tr: "Başrahibin Tapınağına dön" },
            north: { en: "move into the Fungal Forest", tr: "Mantar Ormanına ilerle" }
        },
        items: [],
        monsters: [
            { name: "Drow Scout", hp: 20, maxHp: 20, ac: 14, xpAward: 200, damage: 6 }
        ]
    },
    fungal_forest: {
        name: { en: "The Fungal Forest", tr: "Mantar Ormanı" },
        description: {
            en: "Enormous luminescent mushrooms — pink, violet, and sickly yellow — tower overhead. Spores drift through the air. Walking through them deals 2 poison damage per move unless you type 'hold breath'. A Drow Outpost is to the east. North leads to the Spider Queen's Lair. South returns to the Underdark Entrance.",
            tr: "Dev biyolüminesans mantarlar — pembe, mor ve hastalıklı sarı — yukarıda yükseliyor. Sporlar havada süzülüyor. Aralarında yürümek, 'hold breath' yazmadığınız sürece her harekette 2 zehir hasarı verir. Doğuda Drow Karakolu var. Kuzey, Örümcek Kraliçesi'nin İnine gidiyor. Güney, Karanlık Altı Girişine döner."
        },
        exits: { south: "underdark_entrance", east: "drow_outpost", north: "spider_lair" },
        exitLabels: {
            south: { en: "return to Underdark Entrance", tr: "Karanlık Altı Girişine dön" },
            east: { en: "infiltrate the Drow Outpost", tr: "Drow Karakoluna sız" },
            north: { en: "advance to Spider Queen's Lair", tr: "Örümcek Kraliçesi'nin İnine ilerle" }
        },
        items: [],
        monsters: []
    },
    drow_outpost: {
        name: { en: "Drow Outpost", tr: "Drow Karakolu" },
        description: {
            en: "A fortified camp carved into the cavern wall. Drow soldiers rest between shifts. A supply cache holds useful provisions. You can 'sneak through outpost' (DEX DC 13) to grab supplies without fighting, or fight your way through. West returns to the Fungal Forest.",
            tr: "Mağara duvarına oyulmuş tahkimatlı bir kamp. Drow askerleri vardiyalar arasında dinleniyor. Bir ikmal deposu yararlı iaşeler barındırıyor. Savaşmadan malzemeleri almak için 'sneak through outpost' yazabilirsiniz (ÇEV DC 13). Batı, Mantar Ormanına döner."
        },
        exits: { west: "fungal_forest" },
        exitLabels: {
            west: { en: "return to Fungal Forest", tr: "Mantar Ormanına dön" }
        },
        items: [
            { name: "Drow Antitoxin", desc: "Neutralises poison. Grants immunity to spore damage for the next 3 rooms.", type: "potion", heal: 0, antitoxin: true }
        ],
        monsters: [
            { name: "Drow Warrior", hp: 30, maxHp: 30, ac: 15, xpAward: 300, damage: 7 }
        ]
    },
    spider_lair: {
        name: { en: "The Spider Queen's Lair", tr: "Örümcek Kraliçesi'nin İni" },
        description: {
            en: "Thick webbing coats every surface. The temperature drops. Lolth's avatar — a colossal spider the size of a cart horse — descends from the shadowy ceiling. Defeat the Spider Queen to earn passage north to the Floating Citadel. North leads to the Citadel Approach.",
            tr: "Kalın ağlar her yüzeyi kaplıyor. Sıcaklık düşüyor. Lolth'un avatarı — at arabası büyüklüğünde devasa bir örümcek — gölgeli tavandan iniyor. Kuzey Yüzen Kaleye geçiş için Örümcek Kraliçesini yenin. Kuzey, Kale Yaklaşımına çıkıyor."
        },
        exits: { south: "fungal_forest", north: "citadel_approach" },
        exitLabels: {
            south: { en: "retreat to Fungal Forest", tr: "Mantar Ormanına geri çekil" },
            north: { en: "ascend to the Floating Citadel", tr: "Yüzen Kaleye tırman" }
        },
        items: [
            { name: "Spider Silk Cloak", desc: "Woven from Spider Queen webbing. Grants +2 AC bonus when worn.", type: "armor_cloak" }
        ],
        monsters: [
            { name: "Lolth's Spider Avatar", hp: 65, maxHp: 65, ac: 14, xpAward: 900, damage: 10, isGateBoss: true }
        ]
    },

    // =============================================
    // CHAPTER 13: THE FLOATING CITADEL (TRUE FINALE)
    // =============================================
    citadel_approach: {
        name: { en: "Floor 11: Floating Citadel Approach", tr: "Kat 11: Yüzen Kale Yaklaşımı" },
        description: {
            en: "You emerge from the Underdark onto a cliff face high above Phlan. Before you, impossibly, a black-stone citadel floats among the clouds, tethered by chains of crackling magic. A stone bridge leads to the main gate. Dragon Riders patrol on wyverns. North leads to the Dragon's Roost. You can 'camp' here.",
            tr: "Karanlık Altı'ndan Phlan üzerindeki bir kayalığa çıkıyorsunuz. İnanılmaz bir şekilde, bulutlar arasında siyah taştan bir kale yüzüyor ve sihirli zincirlerle bağlı. Bir taş köprü ana kapıya uzanıyor. Ejderha Binicileri wyvern üzerinde devriye geziyor. Kuzey, Ejderha Ağılına çıkıyor. Burada 'camp' yazabilirsiniz."
        },
        exits: { south: "spider_lair", north: "dragon_roost" },
        exitLabels: {
            south: { en: "retreat to Spider Lair", tr: "Örümcek İnine geri çekil" },
            north: { en: "enter the Dragon's Roost", tr: "Ejderha Ağılına gir" }
        },
        items: [],
        monsters: []
    },
    dragon_roost: {
        name: { en: "The Dragon's Roost", tr: "Ejderha Ağılı" },
        description: {
            en: "A vaulted stable where a young bronze dragon named Arvax is chained. He eyes you warily but intelligently — he is enslaved, not loyal. You can 'free dragon' (requires an Iron Key in inventory) to gain him as a combat ally dealing 8 fire damage per round. Or ignore him and proceed. East leads to the Throne Chamber.",
            tr: "Arvax adında genç bir tunç ejderhanın zincirlendiği tonozlu bir ahır. Sizi ihtiyatla ama zekice gözetliyor — sadık değil, esir. Bir savaş müttefiki olarak kazanmak için 'free dragon' yazın (Demir Anahtar gerekli, 8 ateş hasarı). Ya da yoksayıp ilerleyin. Doğu, Taht Odasına çıkıyor."
        },
        exits: { south: "citadel_approach", east: "throne_chamber" },
        exitLabels: {
            south: { en: "return to Citadel Approach", tr: "Kale Yaklaşımına dön" },
            east: { en: "advance to the Throne Chamber", tr: "Taht Odasına ilerle" }
        },
        npcs: ["Arvax"],
        items: [],
        monsters: [],
        dragonFreed: false
    },
    throne_chamber: {
        name: { en: "The Throne of Severin — TRUE FINALE", tr: "Severin'in Tahtı — GERÇEK FINAL" },
        description: {
            en: "The Throne Chamber of the Floating Citadel. Severin Silrajin, the Dragon Queen's champion, sits atop a throne of dragon skulls. He wears the Mask of the Dragon Queen and commands absolute power over the Weave. Defeat him to break the Mask, seal the corruption, and restore Phlan — forever.",
            tr: "Yüzen Kale'nin Taht Odası. Ejderha Kraliçesi'nin şampiyonu Severin Silrajin, ejderha kafataslarından yapılmış tahtın tepesinde oturuyor. Ejderha Kraliçesi'nin Maskesini takmış ve Doku üzerinde mutlak güce sahip. Phlan'ı sonsuza dek kurtarmak için onu yenin."
        },
        exits: { west: "dragon_roost" },
        exitLabels: {
            west: { en: "retreat to Dragon Roost", tr: "Ejderha Ağılına geri çekil" }
        },
        items: [],
        monsters: [
            {
                name: "Severin Silrajin (Dragon Queen's Champion)",
                hp: 100,
                maxHp: 100,
                ac: 17,
                xpAward: 5000,
                damage: 14,
                isFinalBoss: true
            },
            {
                name: "Red Dragon Hatchling",
                hp: 35,
                maxHp: 35,
                ac: 15,
                xpAward: 800,
                damage: 9
            }
        ]
    }
};

const NPC_DIALOGUES_LOC = {
    yovir: {
        en: [
            "Doomguide Yovir Glandon stops sweeping: 'Kelemvor's blessings upon you. The resting dead in our catacombs are being raised and disturbed. I need courageous souls to clear them.'",
            "Glandon continues: 'I can pay you 100 Gold Pieces and offer a pair of Goggles of Night for your excursion. Theft from the resting dead is strictly forbidden.'",
            "Doomguide Glandon asks: 'Do you accept the mission to cleanse the catacombs and save Phlan?' (Type \"accept\" or \"decline\")",
            "Glandon gestures to a young woman standing nearby: 'Acolyte Cassyt knows the history of these catacombs. She shall guide you. Do you want to invite her to join your party?' (Type \"invite cassyt\" or \"do not invite\")"
        ],
        tr: [
            "Doomguide Yovir Glandon süpürmeyi bırakır: 'Kelemvor'un kutsaması üzerinizde olsun. Mahzenlerimizdeki ölüler uyandırılıyor ve rahatsız ediliyor. Onları temizlemek için cesur ruhlara ihtiyacım var.'",
            "Glandon devam ediyor: 'Göreviniz için size 100 Altın ödeyebilir ve bir Gece Gözlüğü verebilirim. Yatan ölülerden hırsızlık yapmak kesinlikle yasaktır.'",
            "Doomguide Glandon soruyor: 'Mahzenleri temizleme ve Phlan'ı kurtarma görevini kabul ediyor musunuz?' (Kabul et / Reddet)",
            "Glandon yakınlarda duran genç bir kadını işaret eder: 'Çırak Cassyt bu mahzenlerin tarihini biliyor. Size rehberlik edecek. Onu ekibinize davet etmek istiyor musunuz?' (Cassyt'i davet et / Davet etme)"
        ]
    },
    welcomers: {
        en: [
            "The tiefling thief whispers: 'Shh! Quiet! The corridors are crawling with zombies. We got trapped trying to steal some trinkets.'",
            "The half-orc hiccups, holding a flask: 'You guys look tough! Can you help us escape? We have 80 GP of plundered gold we can share if you get us out without telling the priests!'",
            "The elf thief groans: 'If you want to help us out, we can leave some treasure. Just don't let Cassyt tell Glandon!'"
        ],
        tr: [
            "Tiefling hırsız fısıldıyor: 'Şşşt! Sessiz olun! Koridorlar zombilerle kaynıyor. Birkaç süs eşyası çalmaya çalışırken burada kapana kısıldık.'",
            "Yarı-ork viski şişesini tutarak hıçkırıyor: 'Siz güçlü görünüyorsunuz! Kaçmamıza yardım edebilir misiniz? Rahiplere söylemeden bizi çıkarırsanız paylaşabileceğimiz 80 Altın yağmamız var!'",
            "Elfe dönüşen hırsız inliyor: 'Bize yardım etmek isterseniz size biraz hazine bırakabiliriz. Yeter ki Cassyt bunu Glandon'a söylemesin!'"
        ]
    },
    skulls: {
        en: [
            "The skulls whisper in chorus: 'The Red Wizard Monforoth digs toward the Pool of Radiance...'",
            "Another skull chatters: 'The Pool lies deep under Valjevo Keep. The Necromancer seeks to connect it to the weave...'",
            "A third skull rasps: 'Beware the Necropolis, it is infested with wandering ghouls and shadows!'",
            "The skulls whisper: 'Doomguide Glandon is noble, but he knows nothing of the deep catacombs...'",
            "The skulls fall silent. The Speak with Dead enchantment fades."
        ],
        tr: [
            "Kafatasları koro halinde fısıldıyor: 'Kızıl Büyücü Monforoth, Işıltı Havuzu'na doğru kazı yapıyor...'",
            "Başka bir kafatası çatırdıyor: 'Havuz, Valjevo Kalesi'nin derinliklerinde yatıyor. Necromancer onu dokuya bağlamak istiyor...'",
            "Üçüncü bir kafatası fısıldıyor: 'Necropolis'e dikkat edin, orası gezgin gulyabanilerle dolu!'",
            "Kafatasları fısıldıyor: 'Doomguide Glandon soylu bir adam ama derin mahzenler hakkında hiçbir şey bilmiyor...'",
            "Kafatasları sessizliğe bürünüyor. Konuşma büyüsü sona erdi."
        ]
    },
    todor: {
        en: [
            "Todor grins: 'Hey traveler! I buy treasures and sell smuggled Thayan equipment. Try typing 'buy sword' (200 GP), 'buy plate' (150 GP), 'buy potion' (20 GP) or 'sell crown' / 'sell ring'!'"
        ],
        tr: [
            "Todor sırıtır: 'Selam yolcu! Hazine satın alır ve kaçak Thayan ekipmanları satarım. Şunları yazabilirsin: 'buy sword' (200 Altın), 'buy plate' (150 Altın), 'buy potion' (20 Altın) veya 'sell crown' / 'sell ring'!'"
        ]
    },
    brakk: {
        en: [
            "Pirate Captain Brakk flexes his tusks: 'HAR! Another landlubber pokin' around MY docks. The Welcomers run this harbor now, mate. Pay a toll or get wet!'",
            "Brakk eyes your weapon: 'Not bad steel. But Brakk has never lost a duel. Prove yourself or leave Phlan to its flood!'"
        ],
        tr: [
            "Korsan Kaptan Brakk dişlerini gösterir: 'HAR! Kendi iskelelerimde başka bir kara papu çlu. Welcomers artık bu limanı yönetiyor dostum. Vergi öde ya da ıslan!'",
            "Brakk silahınıza bakıyor: 'Fena çelik değil. Ama Brakk hiç düello kaybetmedi. Kendini kanıtla ya da Phlan'ı sele bırak!'"
        ]
    },
    arvax: {
        en: [
            "Arvax the bronze dragon rumbles in a voice like rolling thunder: 'You... are not Thayan. These chains have bound me for three moons. I will not forget a debt.'",
            "Arvax's eyes glow warm amber: 'Free me and I shall burn your enemies to cinders. I swear by the Oath of Bronze — I will not harm the innocent of Phlan.'"
        ],
        tr: [
            "Tunç ejderha Arvax, yuvarlanmış gök gürültüsü gibi bir sesle gümbürder: 'Siz... Thayan değilsiniz. Bu zincirler beni üç aydır bağlıyor. Bir borcu unutmam.'",
            "Arvax'ın gözleri sıcak kehribar rengiyle parlıyor: 'Beni serbest bırak, düşmanlarını kül edeceğim. Tunç Yemini üzerine yemin ederim — Phlan'ın masumlarına zarar vermeyeceğim.'"
        ]
    }
};

let DUNGEON = {};
function initDungeon() {
    DUNGEON = {};
    for (const key in DUNGEON_LOC) {
        DUNGEON[key] = {
            name: DUNGEON_LOC[key].name[state.lang],
            description: DUNGEON_LOC[key].description[state.lang],
            exits: { ...DUNGEON_LOC[key].exits },
            items: DUNGEON_LOC[key].items.map(item => ({
                name: typeof item.name === "string" ? item.name : item.name[state.lang],
                desc: typeof item.desc === "string" ? item.desc : item.desc[state.lang],
                type: item.type,
                heal: item.heal,
                acBonus: item.acBonus,
                damageOverride: item.damageOverride,
                antitoxin: item.antitoxin,
                palOnly: item.palOnly
            })),
            monsters: DUNGEON_LOC[key].monsters.map(monster => ({ ...monster })),
            npcs: roomNpcs(key),
            locked: DUNGEON_LOC[key].locked ? { ...DUNGEON_LOC[key].locked } : undefined,
            crownStolen: DUNGEON_LOC[key].crownStolen,
            altarUsed: DUNGEON_LOC[key].altarUsed,
            chestLocked: DUNGEON_LOC[key].chestLocked,
            knightRescued: DUNGEON_LOC[key].knightRescued,
            bridgeChestOpened: DUNGEON_LOC[key].bridgeChestOpened,
            eggsDestroyed: DUNGEON_LOC[key].eggsDestroyed,
            dragonFreed: DUNGEON_LOC[key].dragonFreed,
            tyrOfferingDone: DUNGEON_LOC[key].tyrOfferingDone
        };
    }
}

function roomNpcs(key) {
    if (key === "graveyard") return ["Yovir"];
    if (key === "crematoria") return ["Welcomers"];
    if (key === "talking_dead") return ["Skulls"];
    if (key === "welcomer_haven") return ["Todor"];
    if (key === "harbor_docks") return ["Brakk"];
    if (key === "dragon_roost") return ["Arvax"];
    return [];
}
