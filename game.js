// Murder of Crows: Dues for the Dead
// A D&D 5e Adventurers League Campaign (DDEX1-4) with Turkish Localization

const CROW_ASCII = `
 ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⡟⠋⢻⣷⣄⡀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⣾⣿⣷⣿⣿⣿⣿⣿⣶⣾⣿⣿⠿⠿⠿⠶⠄⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠉⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀Murder of Crows
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀A game made by Murder
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⣿⣿⣿⣿⣿⠟⠻⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⣿⣿⣿⣿⣆⣤⠿⢶⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⣿⣿⣿⣿⣿⣿⡀⠀⠀⠀⠑⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠸⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠙⠛⠋⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`;

// ASCII Art for Environment Rooms
const ROOM_ART = {
    graveyard: `
       +       +
      _|_     _|_   VALHINGEN GRAVEYARD
      | |     | |   Phlan, Cloister Chapel
    `,
    cloister: `
       _________
      /  _____  \\
     |  /     \\  |  CLOISTER OF KELEMVOR
     |  |  M  |  |  Ancient Fresco Map
    `,
    shrine_mourning: `
        _______
       |   +   |    SHRINE OF MOURNING
       |_______|    Stone Pray Altar
       [=======]
    `,
    banquet_hall: `
      [=========]   FUNERARY BANQUET
      |  o   o  |   Shaft Descents
      |=========|
    `,
    embalming_vault: `
       .-------.
      /   ___   \\   EMBALMING TABLE
      |___|___|__|  Alchemical Flasks
    `,
    first_families: `
       _______
      | o   o |     FIRST FAMILIES
      |   -   |     Macabre Dioramas
      |_______|
    `,
    crypt_ancients: `
       _________
      /         \\   CRYPT OF ANCIENTS
     /  R.I.P   \\  Locked Iron Chest
     |__________|
    `,
    bone_pit: `
      \\         /
       \\_______/    THE BONE PIT
        \\_____/      human bones
    `,
    funerary_cults: `
       ||  ||  ||
      [==========]   FUNERARY CULTS
       ||  ||  ||    Smoke-Stained Crypt
    `,
    rickety_stairs: `
       _
      | |___        RICKETY STAIRS
      |___| |___    Jergal Statue
          |___| |
    `,
    obelisk_room: `
         / \\
        /   \\       THE OBELISK ROOM
       |  *  |      Mysterious Runes
       |  I  |
    `,
    skeletal_ceiling: `
       =======
        x x x       SKELETAL CEILING
       =======      Plaster Ambush
    `,
    crematoria: `
       .-------.
       | ( O ) |    CREMATORIA NICHES
       |_______|    Welcomer Hideout
    `,
    sedrair_tomb: `
         (###)
        [=====]     TOMB OF SEDRAIR II
        /=====\\     Trapped Throne
    `,
    talking_dead: `
       (o) (o)
       _||_||_      TALKING DEAD SKULLS
      [=======]     Speak with Dead
    `,
    crime_scenes: `
      /=======\\
      | X   X |     CRIME SCENES CRYPT
      \\=======/     Immortalized Nightmares
    `,
    necropolis: `
       _/\_/\_
      |  |  |  |    THE NECROPOLIS
      |__|__|__|    Subterranean City
    `,
    lab_intersection: `
       |   |
     --+   +--      LABYRINTH PATHS
     --+   +--      Branching Maze
       |   |
    `,
    secret_vault: `
       * * * *
      *  [+]  *     SECRET VAULT
      *  ___  *     Thayan Reliquary
       * * * *
    `,
    sentry_room: `
       .---.
      ( o o )       SENTRY POST
      (  -  )       Sleeping Kobold
       \`---'
    `,
    wizard_lair: `
       * * * *
      *       *     RED WIZARD LAIR
      *  (X)  *     Rorreth Monforoth
       * * * *
    `,
    underchasm: `
       /     \\
      /  ___  \\     THE UNDERCHASM
     |  /   \\  |    Rope Suspension Bridge
     |__|___|__|
    `,
    whispering_vaults: `
       _________
      (  o   o  )   WHISPERING VAULT
       \\   O   /    Stone Riddle Mouth
        \`-----\`
    `,
    welcomer_haven: `
      [=========]
      |  _   _  |   WELCOMER HAVEN
      | |_| |_| |   Smuggler Campfire
      |_________|
    `,
    crystal_cavern: `
      /\\/\\/\\/\\/\\
     <  o   o  >    CRYSTAL CAVERNS
      \\/\\/\\/\\/\\/    Carrion Crawler Nest
    `,
    castle_courtyard: `
       /\\__/\_
      /  __  \\     VALJEVO COURTYARD
     |  /  \\  |    Thayan Guardpost
     |__|__|__|
    `,
    thayan_lab: `
       || | ||
      [=======]     THAYAN LABORATORY
       | O O |      Three Colored Levers
      [=======]
    `,
    pool_chamber: `
       (  ~  )
      ( ~ ~ ~ )     POOL OF RADIANCE
     [=========]    The Font of Power
     \\_________/
    `,
    shadow_rift: `
       /=======\\
      /  ~ ~ ~  \\   SHADOWFELL RIFT
      |  O   O  |   Floating Rocks
      \\=========/
    `,
    mourning_abyss: `
       \\       /
        \\_____/     MOURNING ABYSS
        /     \\     Shadow Wraith Patrol
       /_______\\
    `,
    jaxana_tomb: `
       /\\___/\\
      / o   o \\     JAXANA'S DRAGON TOMB
     (    V    )    Coiled Shadow Dragon
      \\_______/
    `,
    citadel_gatehouse: `
       [=======]
      [| M   M |]   CITADEL BARBICAN
       |_______|    Garrison Defenses
    `,
    garrison_barracks: `
      =========
      | | | | |     GARRISON BARRACKS
      =========     Thayan Cot Halls
    `,
    torture_vaults: `
       .-------.
      /  [ X ]  \\   TORTURE VAULTS
      |___|___|__|  Prison Cage Allies
    `,
    sanctum_gates: `
       _________
      /  _____  \\   SANCTUM RIDDLE GATE
     |  /     \\  |  Arch-Lich Sigils
     |__|_____|__|
    `,
    alchemy_chamber: `
      [=========]
      | ( O O ) |   ALCHEMY BENCHES
      |=========|   Sunfire Brews
    `,
    astral_hearth: `
       * * * *
      *  (X)  *     THE ASTRAL HEARTH
      *  LICH *     Vanthrax the Arch-Lich
       * * * *
    `,
    drowned_plaza: `
      ~  ~  ~  ~
     [==========]   DROWNED MARKET
      ~  ~  ~  ~    Flooded Phlan Plaza
    `,
    blackfist_bridge: `
      ====/==\====
      |  Bridge  |  BLACKFIST BRIDGE
      ====\==/====  Sniper Battlements
    `,
    sunken_temple: `
       +   +   +
      [=========]   SUNKEN TEMPLE TYR
     ~ ~ ~ ~ ~ ~    Justice Under Water
    `,
    harbor_docks: `
      | | | | | |
      |_DOCKS__|_|  HARBOR DOCKS
      ~  ship ~     Pirate Warship
    `,
    spire_entrance: `
         /|\
        / | \     CORRUPTION SPIRE
       /  |  \    Obsidian Entry
      /___I___\
    `,
    mirror_maze: `
      | || || |
      | MIRROR |   MIRROR MAZE
      | || || |    Reflection Deaths
    `,
    soul_forge: `
        .---.
       ( O O )      SOUL FORGE
      [=======]     Iron Furnace
       \  ~  /
    `,
    cultist_antechamber: `
      ^  ^  ^  ^
     [===========]  CULT ANTECHAMBER
      v  v  v  v    Dragon Banners
    `,
    dragon_egg_chamber: `
         (o)
       ( o o )     DRAGON EGG CHAMBER
      (  o o  )    Red Dragon Clutch
    `,
    high_priest_sanctum: `
        /   \
       / (X) \     HIGH PRIEST SANCTUM
      /  |||  \    Draconic Ritual
     /___|||___\
    `,
    underdark_entrance: `
      .  .  .  .
       \  |  /      UNDERDARK ENTRANCE
        \ | /       Spiraling Descent
         \|/
    `,
    fungal_forest: `
      v  V  v  V
      |  |  |  |    FUNGAL FOREST
      ^  ^  ^  ^    Spore Clouds
    `,
    drow_outpost: `
      [ == == == ]
      |  D R O W |   DROW OUTPOST
      [ == == == ]   Shadow Elves
    `,
    spider_lair: `
      \/\/\/\/\/\
     < oo   oo >    SPIDER QUEEN'S LAIR
      /\/\/\/\/\/   Lolth's Avatar
    `,
    citadel_approach: `
       _________
      /  clouds  \   CITADEL APPROACH
     |  [=====]  |   Floating Fortress
    `,
    dragon_roost: `
       /\___/\
      / o   o \     DRAGON ROOST
     (   Arvax  )   Chained Bronze Dragon
    `,
    throne_chamber: `
      ***   ***
     *  (X)   *     THRONE OF SEVERIN
     *  MASK  *     Dragon Queen Champion
      ***   ***
    `
};

// ASCII Art for Monsters
const MONSTER_ART = {
    "Vile Sewer Rat": `
      (\\_/)
      (o.o)   VILE RAT
       > ^ <
    `,
    "Ghoul": `
      (o.o) 
      (( ))   HUNGRY GHOUL
       V V
    `,
    "Zombie": `
       .---.
      ( x x ) ZOMBIE MINION
      (  =  )
       \`---'
    `,
    "Skeleton": `
       .---.
      / o o \\ SKELETON SENTRY
      \\  -  /
       \`---'
    `,
    "Thug": `
      ( @ @ ) WELCOMER THUG
       \\_-_/
    `,
    "Carrion Crawler": `
     \\ \\ \\ / / /
      (o.o.o.o)     CARRION CRAWLER
      |||||||||
    `,
    "Thayan Knight": `
      /|  ___
     O|===|* >  THAYAN KNIGHT
      \\|  ---
    `,
    "Rorreth (Red Wizard)": `
       .---.
      / o o \\ RORRETH MONFOROTH
      \\  O  / Red Robed Necromancer
       \`---'
    `,
    "Rorreth (Empowered)": `
       .---.
      / x x \\ RORRETH (POOL EMPOWERED)
      \\  O  / Glowing Violet Eyes
       \`---'
    `,
    "Shadow Wraith": `
      .-~~-.
     (  oo  )       SHADOW WRAITH
      \\_-_/
    `,
    "Jaxana (Shadow Dragon)": `
      /\\___/\\
     / o   o \\      JAXANA (SHADOW DRAGON)
    (    V    )     Coiled Scales
     \\_  _  _/
       \\/ \\/
    `,
    "Thayan Arch-Mage": `
       .---.
      ( @ @ )       THAYAN ARCH-MAGE
      (  O  )
       \`---'
    `,
    "Vanthrax (Arch-Lich)": `
      .-----.
     / X   X \\      VANTHRAX THE ARCH-LICH
    |    O    |     Astral Crown
     \\  ---  /
      \`-----\`
    `,
    "Water Elemental": `
      ~ ~ ~ ~ ~
     ( o   o  )   WATER ELEMENTAL
     (  ~   ~ )   Flooded Phlan Fount
    `,
    "Thayan Sniper": `
       .---.         THAYAN SNIPER
      ( > > )        Crossbow Expert
       \ | /
    `,
    "Pirate Captain Brakk": `
      ( @ @ )      PIRATE CAPTAIN BRAKK
       \_-_/       Welcomer Admiral
       /|||\
    `,
    "Corrupted Black Fist": `
       .---.         CORRUPTED GUARD
      ( x x )        Mind-Controlled
      (  O  )
    `,
    "Corrupted Captain Stedd": `
       .---.         CORRUPTED CAPTAIN
      ( X X )        Stedd Rein
      (  -  )
       \`---'
    `,
    "Dragon Cult Fanatic": `
      v (o)(o) v
       \  D D /    CULT FANATIC
        \ | /      Draconic Zealot
    `,
    "Naergoth the High Priest": `
        / | \
       / (X) \     NAERGOTH THE BLEAK
      |  |||||  |  Draconic High Priest
    `,
    "Drow Scout": `
      .\ | /.
      (o   o)      DROW SCOUT
       \___/       Shadow Elf
    `,
    "Drow Warrior": `
      .|   |.
      (X   X)      DROW WARRIOR
      [=====]      Chain Armored
    `,
    "Lolth's Spider Avatar": `
     /o\ /o\ /o\
    ( o   o   o )   LOLTH'S AVATAR
     \ \|||||/ /    Colossal Spider
      \________/
    `,
    "Severin Silrajin (Dragon Queen's Champion)": `
        /\  /\
       /MASK\\      SEVERIN SILRAJIN
      (  (X)  )     Dragon Queen Champion
       \______/
    `
};

// Localization Dictionaries
const TRANSLATIONS = {
    en: {
        char_sheet: "CHARACTER SHEET",
        select_class_instr: "Select your class to begin:",
        class_warrior_title: "WARRIOR",
        class_warrior_desc: "High HP, Strong physical attacks. Uses Swords.",
        class_rogue_title: "ROGUE",
        class_rogue_desc: "High Dexterity, avoids attacks, sneak attacks.",
        class_mage_title: "MAGE",
        class_mage_desc: "High Intellect, casts magic shields & projectiles.",
        class_cleric_title: "CLERIC",
        class_cleric_desc: "High Wisdom, heals wounds & casts smites.",
        class_ranger_title: "RANGER",
        class_ranger_desc: "High Dexterity, uses longbows & double shots.",
        class_paladin_title: "PALADIN",
        class_paladin_desc: "High Strength & Armor, smites undead.",
        name_lbl: "NAME:",
        class_lbl: "CLASS:",
        level_lbl: "LEVEL:",
        xp_lbl: "XP:",
        gold_lbl: "GOLD:",
        inventory_lbl: "INVENTORY",
        directions_lbl: "DIRECTIONS",
        footer_commands: "Commands: go [direction], look, take [item], use [item], attack, stats, help",
        boot_system: "SYSTEM BOOTING...",
        boot_dungeon: "LOADING DUES FOR THE DEAD PROTOCOL...",
        boot_welcome: "Welcome to Valhingen Graveyard in Phlan. Select your class on the left to begin your investigation.",
        enter_class: "Select class first...",
        enter_command: "Enter command here...",
        char_creation_complete: "--- CHARACTER CREATION COMPLETE ---",
        char_chosen: "You have chosen the path of the",
        char_stats: "Stats",
        equipped_weapon: "Equipped Weapon",
        empty_inv: "Your pockets are empty.",
        action_chips_header: "SUGGESTED ACTIONS",
        no_go: "You cannot go that way.",
        locked_msg: "The path to the {dir} is locked. You need the {key} to open it.",
        unlock_msg: "Using the {key}, you unlock the passage to the {dir}!",
        take_fail: "You search but there is no '{item}' here to take.",
        take_success: "You retrieve the {item}.",
        examining: "[Examining]:",
        fountain_dried: "The water hums no longer. The fountain is dry.",
        fountain_drink: "You drink the glowing violet water. Rejuvenating warmth seals your wounds. (Healed +{heal} HP, Gained +20 XP)",
        chest_open_already: "The chest has already been opened.",
        chest_no_key: "The brass chest is locked tight. The lock is heavy and rusted shut. You need the Iron Key.",
        chest_open: "You unlock the padlock. Inside you find:",
        potion_use: "You swallow the crimson fluid. Your gashes knit together. (Restored +{heal} HP)",
        flee_msg: "You flee back to the safety of the entry halls!",
        scroll_no: "You do not have a spell scroll!",
        scroll_use: "You read the crackling sunburst scroll! A flash scorches the {enemy}! (Enemy AC is lowered by 4!)",
        combat_roll: "[Attack Roll: {roll} + Mod: {mod} = Total: {total} vs AC: {ac}]",
        combat_hit: "HIT! You strike the {enemy} for {dmg} damage!",
        combat_miss: "MISS! Your strike bounces off the enemy defenses.",
        enemy_dead: "DEFEATED! The {enemy} collapses to the floor. You gain +{xp} XP.",
        shadow_king_defeat: "THE SHADOW KING SCREAMS AS HE DISSOLVES. A dark metal Shadow Signet falls to the floor. Take it and return to the surface.",
        drake_defeat: "SEVERIN SILRAJIN SCREAMS AS THE MASK OF THE DRAGON QUEEN SHATTERS! THE FLOATING CITADEL BEGINS TO CRUMBLE. THE WEAVE SEALS, THE FLOOD RECEDES, AND PHLAN IS RESTORED. YOU HAVE COMPLETED THE MURDER OF CROWS CAMPAIGN!",
        enemy_attack: "The {enemy} strikes at you!",
        enemy_roll: "[Enemy Attack: {roll} vs Your AC: {ac}]",
        enemy_hit: "HIT! The {enemy} deals {dmg} damage to you.",
        player_dead: "AS THE DARKNESS ENVELOPES YOU, YOUR JOURNEY ENDS. Restart the game to resurrect your hero.",
        enemy_miss: "The attack misses you!",
        lvl_up: "*** LEVEL UP! *** You are now Level {level}! Max health is {maxHp}.",
        help_commands: "Commands:\n  go [direction] - Move.\n  look - Describe room.\n  talk [npc] - Conversate.\n  take [item] - Collect item.\n  inventory - Display inventory.\n  stats - Display attributes.",
        talk_no_one: "There is no one here to talk to.",
        talk_not_found: "There is no one named '{name}' here.",
        shop_no_blacksmith: "Grim isn't here. You can buy supplies from Grim at the Blacksmith shop in town square.",
        shop_buy_what: "Grim sells: 'potion' (10 GP) or 'shield' (15 GP).",
        shop_no_gold: "You do not have enough gold.",
        shop_potion_buy: "Bought Elixir of Healing for 10 GP.",
        shop_has_shield: "You already have a shield.",
        shop_shield_buy: "Bought Leather Shield for 15 GP.",
        shop_no_sell: "Item unavailable.",
        rest_no_tavern: "You cannot rest here. Rest at the Inn.",
        rest_no_gold: "You need 5 GP to rest.",
        rest_success: "You paid 5 GP and slept in a warm room. (Restored to Max HP)",
        drink_what: "Drink what?",
        unlock_what: "Unlock what?",
        unrecognized: "Command '{cmd}' not recognized.",
        combat_options_only: "In combat, choose 'attack', 'flee', or 'use scroll'."
    },
    tr: {
        char_sheet: "KARAKTER FORMU",
        select_class_instr: "Başlamak için sınıfınızı seçin:",
        class_warrior_title: "SAVAŞÇI",
        class_warrior_desc: "Yüksek HP, Güçlü fiziksel saldırılar. Kılıç kullanır.",
        class_rogue_title: "HAYDUT",
        class_rogue_desc: "Yüksek Çeviklik, saldırılardan kaçar, gizli saldırılar yapar.",
        class_mage_title: "BÜYÜCÜ",
        class_mage_desc: "Yüksek Zeka, sihirli atışlar yapar ve kalkan açar.",
        class_cleric_title: "RUHBAN",
        class_cleric_desc: "Yüksek İnanç, yaraları iyileştirir ve kutsal hasar vurur.",
        class_ranger_title: "KORUCU",
        class_ranger_desc: "Yüksek Çeviklik, uzun yay ve çift atış kullanır.",
        class_paladin_title: "PALADİN",
        class_paladin_desc: "Yüksek Güç ve Zırh, hortlaklara kutsal darbe indirir.",
        name_lbl: "İSİM:",
        class_lbl: "SINIF:",
        level_lbl: "SEVİYE:",
        xp_lbl: "XP:",
        gold_lbl: "ALTIN:",
        inventory_lbl: "ENVANTER",
        directions_lbl: "YÖNLER",
        footer_commands: "Komutlar: git [yön], bak, al [eşya], kullan [eşya], saldır, durum, yardım",
        boot_system: "SİSTEM BAŞLATILIYOR...",
        boot_dungeon: "ÖLÜLER İÇİN BORÇLAR PROTOKOLÜ YÜKLENİYOR...",
        boot_welcome: "Phlan'daki Valhingen Mezarlığı'na hoş geldiniz. Araştırmaya başlamak için soldan sınıfınızı seçin.",
        enter_class: "Önce sınıf seçin...",
        enter_command: "Komutu buraya yazın...",
        char_creation_complete: "--- KARAKTER OLUŞTURMA TAMAMLANDI ---",
        char_chosen: "Şu sınıfın yolunu seçtiniz:",
        char_stats: "Nitelikler",
        equipped_weapon: "Kuşanılmış Silah",
        empty_inv: "Cepleriniz bomboş.",
        action_chips_header: "ÖNERİLEN EYLEMLER",
        no_go: "O yöne gidemezsiniz.",
        locked_msg: "{dir} yönündeki yol kilitli. Açmak için {key} ihtiyacınız var.",
        unlock_msg: "{key} kullanarak {dir} kapısını açtınız!",
        take_fail: "Aradınız ama burada alacak bir '{item}' yok.",
        take_success: "Eğilip {item} alıyorsunuz.",
        examining: "[İnceleniyor]:",
        fountain_dried: "Su artık mırıldanmıyor. Çeşme kurumuş.",
        fountain_drink: "Çeşmenin mor suyundan içiyorsunuz. Sıcaklık yaralarınızı kapatıyor. (İyileşti +{heal} HP, Kazanıldı +20 XP)",
        chest_open_already: "Sandık zaten açılmış.",
        chest_no_key: "Sandık kilitli. Asma kilit ağır ve paslanmış. Demir Anahtar'a ihtiyacınız var.",
        chest_open: "Asma kilidi açtınız. İçinde şunları buldunuz:",
        potion_use: "Kırmızı sıvıyı yutuyorsunuz. Kesikleriniz kapanıyor. (Yenilendi +{heal} HP)",
        flee_msg: "Giriş salonlarının güvenliğine doğru kaçıyorsunuz!",
        scroll_no: "Ceplerinizde parşömen yok!",
        scroll_use: "Güneş patlaması parşömenini okudunuz! Işık {enemy} kör etti! (Düşman AC 4 azaldı!)",
        combat_roll: "[Saldırı Zarı: {roll} + Mod: {mod} = Toplam: {total} vs AC: {ac}]",
        combat_hit: "DARBE! {enemy} vurarak {dmg} hasar verdiniz!",
        combat_miss: "ISKA! Saldırınız düşman savunmasından sekti.",
        enemy_dead: "YENİLDİ! {enemy} yere yığılıyor. +{xp} XP kazandınız.",
        shadow_king_defeat: "GÖLGE KRAL ÇIĞLIK ATARAK ERİYOR. Gölge Mührü yere düşüyor. Alın ve yüzeye dönün.",
        drake_defeat: "SEVERİN SİLRAJİN ÇIĞLIK ATARAK EJDERHA KRALİÇESİ'NİN MASKESİ PARÇALANIYOR! YÜZEN KALE DAĞILMAYA BAŞLIYOR. DOKU KAPANIYOR, SEL ÇEKİLİYOR VE PHLAN KURTARILIYOR. MURDER OF CROWS SEFERİNİ TAMAMLADINIZ!",
        enemy_attack: "{enemy} size saldırıyor!",
        enemy_roll: "[Düşman Saldırısı: {roll} vs Sizin AC: {ac}]",
        enemy_hit: "DURUM! {enemy} size {dmg} hasar verdi.",
        player_dead: "KARANLIK SİZİ SARARKEN YOLCULUĞUNUZ SONA ERİYOR. Kahramanınızı canlandırmak için oyunu yeniden başlatın.",
        enemy_miss: "Saldırı ıskaladı!",
        lvl_up: "*** SEVİYE ATLADINIZ! *** {level}. Seviyesiniz! Aksimum sağlık {maxHp} oldu.",
        help_commands: "Komutlar:\n  go [yön] - İlerle.\n  look - Odayı incele.\n  talk [npc] - Konuş.\n  take [eşya] - Yerden al.\n  inventory - Eşyalar.\n  stats - Durum.",
        talk_no_one: "Burada konuşacak kimse yok.",
        talk_not_found: "Burada '{name}' adında biri yok.",
        shop_no_blacksmith: "Demirci Grim burada değil. Demirci dükkanına gidip alışveriş yapın.",
        shop_buy_what: "Grim şunları satıyor: 'potion' (10 GP) veya 'shield' (15 GP).",
        shop_no_gold: "Yeterli altınınız yok.",
        shop_potion_buy: "10 Altın'a İyileşme İksiri alındı.",
        shop_has_shield: "Zaten bir kalkanınız var.",
        shop_shield_buy: "15 Altın'a Deri Kalkan alındı.",
        shop_no_sell: "Öğe mevcut değil.",
        rest_no_tavern: "Burada dinlenemezsiniz. Handa dinlenin.",
        rest_no_gold: "Dinlenmek için 5 Altın gerekir.",
        rest_success: "5 Altın ödeyip sıcak odada uyudunuz. (Sağlık yenilendi)",
        drink_what: "Ne içeceksiniz?",
        unlock_what: "Ne açacaksınız?",
        unrecognized: "Komut '{cmd}' anlaşılamadı.",
        combat_options_only: "Savaşta sadece 'attack', 'flee' veya 'use scroll' komutlarını seçebilirsiniz."
    }
};

// Character Templates with progression level caps up to Level 5
const CLASSES = {
    Warrior: { hp: 24, maxHp: 24, str: 16, dex: 12, int: 8, ac: 15, weaponName: { en: "Steel Broadsword", tr: "Çelik Kılıç" }, weaponDamage: 8, skills: ["Attack", "Charge"] },
    Rogue: { hp: 18, maxHp: 18, str: 11, dex: 17, int: 12, ac: 14, weaponName: { en: "Twin Daggers", tr: "Çift Hançer" }, weaponDamage: 6, skills: ["Attack", "Sneak Attack"] },
    Mage: { hp: 14, maxHp: 14, str: 8, dex: 13, int: 16, ac: 11, weaponName: { en: "Apprentice Staff", tr: "Asa" }, weaponDamage: 4, skills: ["Attack", "Fireball"] },
    Cleric: { hp: 20, maxHp: 20, str: 13, dex: 10, int: 15, ac: 16, weaponName: { en: "Blessed Mace", tr: "Kutsal Gürz" }, weaponDamage: 6, skills: ["Attack", "Heal"] },
    Ranger: { hp: 18, maxHp: 18, str: 12, dex: 16, int: 10, ac: 14, weaponName: { en: "Hunter Bow", tr: "Korucu Yayı" }, weaponDamage: 6, skills: ["Attack", "Double Shot"] },
    Paladin: { hp: 22, maxHp: 22, str: 15, dex: 9, int: 11, ac: 17, weaponName: { en: "Iron Claymore", tr: "Demir Çiftel" }, weaponDamage: 8, skills: ["Attack", "Smite"] }
};

// Dues for the Dead Campaign Rooms (DUNGEON_LOC)
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
            en: "A floating platform in a swirling galaxy void. Vanthrax the Arch-Lich is channeling souls to keep the Weave rip open. Defeat him to seal the rip and win the campaign!",
            tr: "Dönen galaksi boşluğunda yüzen bir platform. Arch-Lich Vanthrax yırtığı açık tutmak için ruhları kanalize ediyor. Yırtığı kapatmak ve seferi kazanmak için onu yenin!"
        },
        exits: { south: "sanctum_gates" },
        exitLabels: {
            south: { en: "look back at Sanctum Gates", tr: "Tapınak Kapılarına geri bak" }
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
            { name: "Pirate Captain Brakk", hp: 38, maxHp: 38, ac: 14, xpAward: 400, damage: 8, isGateBoss: true }
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
            { name: "Naergoth the High Priest", hp: 50, maxHp: 50, ac: 13, xpAward: 700, damage: 9, isGateBoss: true }
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
            }
        ]
    }
};

const NPC_DIALOGUES_LOC = {
    yovir: {
        en: [
            "Doomguide Yovir Glandon stops sweeping: 'Kelemvor's blessings upon you. The resting dead in our catacombs are being raised and disturbed. I need courageous souls to clear them.'",
            "Glandon continues: 'I can pay you 100 Gold Pieces and offer a pair of Goggles of Night for your excursion. Theft from the resting dead is strictly forbidden.'",
            "Glandon gestures to a young woman: 'Acolyte Cassyt knows the history of these catacombs. She shall guide you. (Type \"talk yovir\" again to hire Cassyt, or go south to start)'",
            "Glandon smiles solemnly: 'Cassyt is ready to assist you. May Kelemvor watch over your spirit.'"
        ],
        tr: [
            "Doomguide Yovir Glandon süpürmeyi bırakır: 'Kelemvor'un kutsaması üzerinizde olsun. Mahzenlerimizdeki ölüler uyandırılıyor ve rahatsız ediliyor. Onları temizlemek için cesur ruhlara ihtiyacım var.'",
            "Glandon devam ediyor: 'Göreviniz için size 100 Altın ödeyebilir ve bir Gece Gözlüğü verebilirim. Yatan ölülerden hırsızlık yapmak kesinlikle yasaktır.'",
            "Glandon genç bir kadını işaret eder: 'Çırak Cassyt bu mahzenlerin tarihini biliyor. Size rehberlik edecek. (Cassyt'i işe almak için tekrar \"talk yovir\" yazın ya da güneye inin)'",
            "Glandon ciddi bir şekilde gülümser: 'Cassyt size yardım etmeye hazır. Kelemvor ruhunuzu korusun.'"
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
            "Yarı-ork viski şişesini tutarak hıçkırıyor: 'Siz güçlü görünüyorsunuz! Kaçmamıza yardım edebilir misiniz? Rahiplere söylemeden bizi çıkarırsanız paylaşabileceğimiz 80 Altın yağmamız var!'"
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

// Game and Player State
let state = {
    lang: "en",
    class: null,
    name: "Hero",
    hp: 0,
    maxHp: 0,
    str: 10,
    dex: 10,
    int: 10,
    ac: 10,
    weaponName: "Fists",
    weaponDamage: 4,
    skills: [],
    xp: 0,
    level: 1,
    gold: 15,
    inventory: [],
    currentRoom: "graveyard",
    combat: null,
    npcDialogueIndices: {},
    companion: null, // "Cassyt"
    gogglesEquipped: false,
    readObeliskRunes: false,
    blueLeverPulled: false,
    greenLeverPulled: false,
    allyKnight: false,
    sunfireOilEquipped: false,
    holdingBreath: false,
    allyDragon: false,
    tyrOfferingDone: false,
    mirrorShattered: false,
    readTomeActive: false
};

const inputEl = document.getElementById("console-input");
const outputEl = document.getElementById("console-output");

function writeArt(artText, cssClass = "") {
    if (!artText) return;
    const artPre = document.createElement("pre");
    artPre.className = `console-line ${cssClass}`;
    artPre.style.fontFamily = "var(--font-mono)";
    artPre.style.fontSize = "10px";
    artPre.style.lineHeight = "1.2";
    artPre.style.color = "var(--accent-color)";
    artPre.style.textShadow = "var(--accent-glow)";
    artPre.style.margin = "10px 0";
    artPre.textContent = artText;
    outputEl.appendChild(artPre);
    outputEl.scrollTop = outputEl.scrollHeight;
}

function writeLine(text, cssClass = "") {
    const line = document.createElement("div");
    line.className = `console-line ${cssClass}`;
    line.textContent = text;
    outputEl.appendChild(line);
    outputEl.scrollTop = outputEl.scrollHeight;
}

function logCommand(text) {
    writeLine(`> ${text}`, "user-command");
}

function setLanguage(lang) {
    state.lang = lang;

    document.getElementById("lang-en").classList.toggle("active", lang === "en");
    document.getElementById("lang-tr").classList.toggle("active", lang === "tr");

    document.querySelectorAll("[data-translate]").forEach(el => {
        const key = el.getAttribute("data-translate");
        if (TRANSLATIONS[lang][key]) {
            el.textContent = TRANSLATIONS[lang][key];
        }
    });

    if (state.class) {
        inputEl.placeholder = TRANSLATIONS[lang].enter_command;
    } else {
        inputEl.placeholder = TRANSLATIONS[lang].enter_class;
    }

    const oldDungeon = { ...DUNGEON };
    initDungeon();
    for (const key in DUNGEON) {
        if (oldDungeon[key]) {
            DUNGEON[key].items = oldDungeon[key].items;
            DUNGEON[key].monsters = oldDungeon[key].monsters;
            DUNGEON[key].locked = oldDungeon[key].locked;
            DUNGEON[key].crownStolen = oldDungeon[key].crownStolen;
            DUNGEON[key].altarUsed = oldDungeon[key].altarUsed;
            DUNGEON[key].chestLocked = oldDungeon[key].chestLocked;
            DUNGEON[key].knightRescued = oldDungeon[key].knightRescued;
        }
    }

    updateUI();

    if (state.class) {
        describeRoom();
    } else {
        renderBootArt();
    }
}

function renderBootArt() {
    outputEl.innerHTML = "";
    writeLine(TRANSLATIONS[state.lang].boot_system, "system-msg");
    writeLine(TRANSLATIONS[state.lang].boot_dungeon, "system-msg");

    const banner = document.createElement("pre");
    banner.className = "console-line title-art";
    banner.textContent = CROW_ASCII;
    outputEl.appendChild(banner);

    // Print Detailed Campaign Backstory Prologue
    const prologueEn = `
----------------------------------------------------------------------
                  --- DUES FOR THE DEAD PROLOGUE ---
Phlan, a thousand-year-old trade city on the northern shore of the Moonsea,
is in tragic decay. The Lord Protector is dead. The cruel soldiers of
the Black Fist enforce harsh martial law, leaving the citizens to seek
refuge with the criminal syndicate known as the Welcomers.

Now, a darker threat whispers in the shadows. The Cult of the Dragon has
recruited expatriate Thayan Red Wizards to locate the Pool of Radiance—an
ancient, volatile reservoir of magic locked beneath Valjevo Keep.

To build an excavating army, they have begun desecrating the graves in
Valhingen Graveyard. Doomguide Yovir Glandon needs brave adventurers to
descend into the catacombs, defeat the necromancers, and save Phlan.
----------------------------------------------------------------------`;

    const prologueTr = `
----------------------------------------------------------------------
                  --- ÖLÜLER İÇİN BORÇLAR ÖNSÖZÜ ---
Moonsea'nin kuzey kıyısındaki bin yıllık ticaret şehri Phlan, trajik bir
çöküş içinde. Koruyucu Lord öldü. Black Fist'in acımasız askerleri sert
sıkıyönetim uygularken, halk Welcomers suç örgütüne sığınıyor.

Şimdi gölgelerde daha karanlık bir tehdit fısıldıyor. Ejderha Tarikatı,
Valjevo Kalesi'nin altındaki Işıltı Havuzu'nu bulmak için Thayan Kızıl
Büyücülerini işe aldı.

Kazı ordusu kurmak için Valhingen Mezarlığı'ndaki mezarları talan etmeye
başladılar. Doomguide Yovir Glandon, mahzenlere inecek, büyücüleri alt
edecek ve Phlan'ı kurtaracak cesur kahramanlar arıyor.
----------------------------------------------------------------------`;

    writeLine(state.lang === "tr" ? prologueTr : prologueEn, "text-gold");
    writeLine(TRANSLATIONS[state.lang].boot_welcome);
}

function selectClass(className) {
    const selected = CLASSES[className];
    if (!selected) return;

    state.class = className;
    state.hp = selected.hp;
    state.maxHp = selected.maxHp;
    state.str = selected.str;
    state.dex = selected.dex;
    state.int = selected.int;
    state.ac = selected.ac;
    state.weaponName = typeof selected.weaponName === "string" ? selected.weaponName : selected.weaponName[state.lang];
    state.weaponDamage = selected.weaponDamage;
    state.skills = [...selected.skills];
    state.gold = 15;

    document.getElementById("class-select-screen").classList.add("hidden");
    document.getElementById("char-stats-info").classList.remove("hidden");

    inputEl.removeAttribute("disabled");
    inputEl.placeholder = TRANSLATIONS[state.lang].enter_command;
    inputEl.focus();

    writeLine(TRANSLATIONS[state.lang].char_creation_complete, "system-msg");
    writeLine(`${TRANSLATIONS[state.lang].char_chosen} ${TRANSLATIONS[state.lang]["class_" + className.toLowerCase() + "_title"]}.`);
    writeLine(`${TRANSLATIONS[state.lang].char_stats}: HP ${state.hp}/${state.maxHp}, STR ${state.str}, DEX ${state.dex}, INT ${state.int}, AC ${state.ac}`);
    writeLine(`${TRANSLATIONS[state.lang].equipped_weapon}: ${state.weaponName}`);
    writeLine("-----------------------------------", "system-msg");

    updateUI();
    describeRoom();
}

function updateUI() {
    if (!state.class) return;

    document.getElementById("stat-name").textContent = state.name;
    const classKey = "class_" + state.class.toLowerCase() + "_title";
    document.getElementById("stat-class").textContent = TRANSLATIONS[state.lang][classKey];

    document.getElementById("stat-level").textContent = state.level;
    document.getElementById("stat-xp").textContent = `${state.xp} / ${state.level * 100}`;
    document.getElementById("hp-text").textContent = `${state.hp}/${state.maxHp}`;

    const hpPct = Math.max(0, (state.hp / state.maxHp) * 100);
    document.getElementById("hp-bar").style.width = `${hpPct}%`;

    document.getElementById("stat-str").textContent = state.str;
    document.getElementById("stat-dex").textContent = state.dex;
    document.getElementById("stat-int").textContent = state.int;

    const hasShield = state.inventory.some(i => i.type === "shield");
    const classBaseAc = CLASSES[state.class].ac;
    let acBonus = hasShield ? 1 : 0;

    const hasPlate = state.inventory.some(i => i.name === "Splint Mail" || i.name === "Yarım Plaka Zırh");
    if (hasPlate) acBonus += 3;

    const hasCloakOfSpiders = state.inventory.some(i => i.name === "Spider Silk Cloak");
    if (hasCloakOfSpiders) acBonus += 2;

    if (state.gogglesEquipped) acBonus += 1;
    state.ac = classBaseAc + acBonus;
    document.getElementById("stat-ac").textContent = state.ac;

    document.getElementById("stat-gold").textContent = `${state.gold} GP`;

    const invList = document.getElementById("inventory-list");
    invList.innerHTML = "";
    if (state.inventory.length === 0) {
        invList.innerHTML = `<p class="empty-inventory-msg">${TRANSLATIONS[state.lang].empty_inv}</p>`;
    } else {
        state.inventory.forEach((item, index) => {
            const itemEl = document.createElement("div");
            itemEl.className = `inventory-item ${item.type === "key" ? "quest" : ""}`;

            let actionBtn = "";
            if (item.type === "potion") {
                const btnLbl = state.lang === "tr" ? "İç" : "Drink";
                actionBtn = `<button onclick="useInventoryItem(${index})">${btnLbl}</button>`;
            }

            itemEl.innerHTML = `
                <span>${item.name}</span>
                ${actionBtn}
            `;
            invList.appendChild(itemEl);
        });
    }

    updateSuggestionChips();
}

function getSkillCommand() {
    if (state.class === "Warrior") return "charge";
    if (state.class === "Rogue") return "sneak attack";
    if (state.class === "Mage") return "fireball";
    if (state.class === "Cleric") return "heal";
    if (state.class === "Ranger") return "double shot";
    if (state.class === "Paladin") return "smite";
    return "";
}

function getSkillTranslation() {
    if (state.class === "Warrior") return state.lang === "tr" ? "hücum" : "charge";
    if (state.class === "Rogue") return state.lang === "tr" ? "gizli saldırı" : "sneak attack";
    if (state.class === "Mage") return state.lang === "tr" ? "ateş topu" : "fireball";
    if (state.class === "Cleric") return state.lang === "tr" ? "iyileş" : "heal";
    if (state.class === "Ranger") return state.lang === "tr" ? "çift atış" : "double shot";
    if (state.class === "Paladin") return state.lang === "tr" ? "darbe" : "smite";
    return "";
}

function updateSuggestionChips() {
    const chipsContainer = document.getElementById("action-chips");
    chipsContainer.innerHTML = "";

    if (state.class && state.hp <= 0) {
        const restartLbl = state.lang === "tr" ? "Yeniden Başlat" : "Restart Game";
        const chip = document.createElement("span");
        chip.className = "chip restart-chip";
        chip.style.backgroundColor = "var(--combat-color)";
        chip.style.color = "#fff";
        chip.textContent = restartLbl;
        chip.onclick = () => {
            restartGame();
        };
        chipsContainer.appendChild(chip);
        return;
    }

    const room = DUNGEON[state.currentRoom];
    let options = [];

    if (state.combat) {
        const fleeCmd = state.lang === "tr" ? "kaç" : "flee";

        if (!state.combat.skillUsed) {
            options = [getSkillTranslation(), fleeCmd];
        } else {
            const attackCmd = state.lang === "tr" ? "saldır" : "attack";
            options = [attackCmd, fleeCmd];
        }
    } else {
        const lookCmd = state.lang === "tr" ? "bak" : "look";
        options = [lookCmd];

        const addedRooms = new Set();
        for (const dir in room.exits) {
            const targetRoom = room.exits[dir];
            if (addedRooms.has(targetRoom)) continue;
            addedRooms.add(targetRoom);

            const goCmd = state.lang === "tr" ? `git ${dir}` : `go ${dir}`;
            const labelMap = DUNGEON_LOC[state.currentRoom].exitLabels;
            let displayLabel = labelMap && labelMap[dir] ? labelMap[dir][state.lang] : `${state.lang === "tr" ? "git" : "go"} ${dir}`;

            options.push({ cmd: goCmd, label: displayLabel });
        }

        if (room.npcs && room.npcs.length > 0) {
            room.npcs.forEach(n => {
                const talkCmd = state.lang === "tr" ? "konuş" : "talk";
                options.push(`${talkCmd} ${n.toLowerCase()}`);
            });
        }

        if (room.items && room.items.length > 0) {
            room.items.forEach(i => {
                const takeCmd = state.lang === "tr" ? "al" : "take";
                options.push(`${takeCmd} ${i.name.toLowerCase()}`);
            });
        }

        // Jaxana Shadow Dragon stealth option
        if (state.currentRoom === "jaxana_tomb" && room.monsters && room.monsters.length > 0 && room.monsters[0].isSleeping) {
            options.push("sneak past dragon");
        }

        // Kevin rescue option
        if (state.currentRoom === "torture_vaults" && !room.knightRescued) {
            options.push("rescue knight");
        }

        // Camp options in safe zones
        const safeZones = ["graveyard", "welcomer_haven", "castle_courtyard", "citadel_gatehouse", "spire_entrance", "citadel_approach"];
        if (safeZones.includes(state.currentRoom)) {
            options.push(state.lang === "tr" ? "kamp kur" : "camp");
        }

        // Smuggler interactions
        if (state.currentRoom === "welcomer_haven") {
            const hasCrown = state.inventory.some(i => i.name.includes("Crown") || i.name.includes("Tacı"));
            const hasRing = state.inventory.some(i => i.name.includes("Ring") || i.name.includes("Yüzük"));
            if (hasCrown) options.push("sell crown");
            if (hasRing) options.push("sell ring");
            if (state.gold >= 20) options.push("buy potion");
            if (state.gold >= 150) options.push("buy plate");
            if (state.gold >= 200) options.push("buy sword");
        }

        // Whispering Vault Riddle inputs
        if (state.currentRoom === "whispering_vaults" && room.locked && room.locked.north) {
            options.push("answer shadow");
            options.push("answer echo");
            options.push("answer wind");
        }

        // Sanctum Gates Riddle inputs
        if (state.currentRoom === "sanctum_gates" && room.locked && room.locked.north) {
            options.push("answer water");
            options.push("answer shadow");
            options.push("answer fire");
        }

        // Thayan Lab Levers inputs
        if (state.currentRoom === "thayan_lab" && room.locked && room.locked.north) {
            options.push("pull red");
            options.push("pull blue");
            options.push("pull green");
        }

        // Shrine room active options
        if (state.currentRoom === "shrine_mourning" && !room.altarUsed) {
            options.push(state.lang === "tr" ? "dua et" : "pray");
        }

        // Crypt of Ancients locked chest
        if (state.currentRoom === "crypt_ancients" && room.chestLocked) {
            options.push(state.lang === "tr" ? "sandık aç" : "unlock chest");
            options.push(state.lang === "tr" ? "sandık kır" : "break chest");
        }

        // Obelisk room runes
        if (state.currentRoom === "obelisk_room" && !state.readObeliskRunes) {
            options.push(state.lang === "tr" ? "rünleri oku" : "read runes");
        }

        if (state.currentRoom === "sedrair_tomb" && !room.crownStolen) {
            const stealCmd = state.lang === "tr" ? "al taç" : "take crown";
            options.push(stealCmd);
        }

        // Chapter 9: Drowned City
        if (state.currentRoom === "sunken_temple" && !room.tyrOfferingDone && state.gold >= 30) {
            options.push(state.lang === "tr" ? "adak sun" : "offer");
        }
        if (state.currentRoom === "blackfist_bridge" && !room.bridgeChestOpened) {
            options.push(state.lang === "tr" ? "kasayı aç" : "open chest");
        }

        // Chapter 10: Corruption Spire
        if (state.currentRoom === "mirror_maze" && !state.mirrorShattered) {
            options.push(state.lang === "tr" ? "aynayı kır" : "shatter mirror");
        }

        // Chapter 11: Dragon Cult Sanctum
        if (state.currentRoom === "dragon_egg_chamber" && !room.eggsDestroyed) {
            options.push(state.lang === "tr" ? "yumurtaları yok et" : "destroy eggs");
            options.push(state.lang === "tr" ? "yumurtaları bırak" : "leave eggs");
        }
        const hasTome = state.inventory.some(i => i.type === "tome");
        if (hasTome && !state.readTomeActive) {
            options.push(state.lang === "tr" ? "tome oku" : "read tome");
        }

        // Chapter 12: Underdark
        if (state.currentRoom === "fungal_forest") {
            options.push(state.lang === "tr" ? "nefes tut" : "hold breath");
        }
        if (state.currentRoom === "drow_outpost" && room.monsters && room.monsters.length > 0) {
            options.push(state.lang === "tr" ? "karakoldan sız" : "sneak through outpost");
        }

        // Chapter 13: Floating Citadel
        if (state.currentRoom === "dragon_roost" && !room.dragonFreed) {
            options.push(state.lang === "tr" ? "ejderhayı serbest bırak" : "free dragon");
        }

    } // end else (not in combat)

    options.forEach(opt => {
        const chip = document.createElement("span");
        chip.className = "chip";
        if (typeof opt === "object") {
            chip.textContent = opt.label;
            chip.onclick = () => {
                logCommand(opt.label);
                handleCommand(opt.cmd);
            };
        } else {
            chip.textContent = opt;
            chip.onclick = () => {
                logCommand(opt);
                handleCommand(opt);
            };
        }
        chipsContainer.appendChild(chip);
    });
}

function restartGame() {
    state.class = null;
    state.hp = 0;
    state.maxHp = 0;
    state.xp = 0;
    state.level = 1;
    state.gold = 15;
    state.inventory = [];
    state.currentRoom = "graveyard";
    state.combat = null;
    state.npcDialogueIndices = {};
    state.companion = null;
    state.gogglesEquipped = false;
    state.readObeliskRunes = false;
    state.blueLeverPulled = false;
    state.greenLeverPulled = false;
    state.allyKnight = false;
    state.sunfireOilEquipped = false;

    document.getElementById("class-select-screen").classList.remove("hidden");
    document.getElementById("char-stats-info").classList.add("hidden");
    inputEl.removeAttribute("disabled");

    initDungeon();
    renderBootArt();
    updateUI();
}

function handleCommand(cmdText) {
    const input = cmdText.trim().toLowerCase();
    if (!input) return;

    if (state.class && state.hp <= 0) {
        if (input === "restart" || input === "yeniden başlat" || input === "restart game") {
            restartGame();
        }
        return;
    }

    let combatInput = input;
    if (state.combat) {
        // Translate Turkish combat inputs
        if (input === "saldır") combatInput = "attack";
        if (input === "kaç") combatInput = "flee";
        if (input === "iyileş") combatInput = "heal";
        if (input === "çift atış") combatInput = "double shot";
        if (input === "darbe") combatInput = "smite";
        if (input === "hücum") combatInput = "charge";
        if (input === "gizli saldırı") combatInput = "sneak attack";
        if (input === "ateş topu") combatInput = "fireball";

        const classSkill = getSkillCommand();
        if (!state.combat.skillUsed && combatInput === "attack") {
            const err = state.lang === "tr"
                ? `Önce sınıf yeteneğinizi (${getSkillTranslation()}) kullanmalısınız!`
                : `You must use your class-specific skill (${classSkill}) first!`;
            writeLine(err, "combat-log");
            return;
        }

        if (state.combat.skillUsed && combatInput === classSkill) {
            const err = state.lang === "tr"
                ? `Bu dövüşte sınıf yeteneğinizi zaten kullandınız! Savaşmak için 'saldır' komutunu kullanın.`
                : `You have already used your class-specific skill this fight! Use 'attack'.`;
            writeLine(err, "combat-log");
            return;
        }

        handleCombatCommand(combatInput);
        return;
    }

    // Direct active actions
    if (input === "camp" || input === "kamp kur") { restAtCamp(); return; }
    if (input === "pray" || input === "dua et") { prayAtAltar(); return; }
    if (input === "read runes" || input === "rünleri oku") { readObeliskRunes(); return; }
    if (input === "unlock chest" || input === "sandık aç") { unlockIronChest(); return; }
    if (input === "break chest" || input === "sandık kır") { breakIronChest(); return; }
    if (input === "sneak past dragon") { sneakPastJaxana(); return; }
    if (input === "rescue knight") { rescueBlackFistKnight(); return; }
    // Chapter 9-13 new commands
    if (input === "shatter mirror" || input === "aynayı kır") { shatterMirror(); return; }
    if (input === "destroy eggs" || input === "yumurtaları yok et") { destroyDragonEggs(); return; }
    if (input === "leave eggs" || input === "yumurtaları bırak") { leaveDragonEggs(); return; }
    if (input === "offer" || input === "adak sun") { tyrOffering(); return; }
    if (input === "hold breath" || input === "nefes tut") { holdBreath(); return; }
    if (input === "sneak through outpost" || input === "karakoldan sız") { sneakThroughOutpost(); return; }
    if (input === "free dragon" || input === "ejderhayı serbest bırak") { freeDragon(); return; }
    if (input === "open chest" || input === "kasayı aç") { openBridgeChest(); return; }
    if (input === "read tome" || input === "tome oku") { readTome(); return; }

    // Smuggler Merchant actions
    if (state.currentRoom === "welcomer_haven") {
        if (input === "sell crown") { sellTreasure("Crown"); return; }
        if (input === "sell ring") { sellTreasure("Ring"); return; }
        if (input === "buy potion") { buyFromMerchant("potion", 20); return; }
        if (input === "buy plate") { buyFromMerchant("plate", 150); return; }
        if (input === "buy sword") { buyFromMerchant("sword", 200); return; }
    }

    // Riddle Vault answers
    if (input.startsWith("answer ")) {
        solveRiddle(input.substring(7));
        return;
    }

    // Thayan Lab Levers
    if (input.startsWith("pull ")) {
        pullLever(input.substring(5));
        return;
    }

    const parts = input.split(" ");
    let command = parts[0];
    const target = parts.slice(1).join(" ");

    // Turkish command aliases
    if (command === "git") command = "go";
    if (command === "bak") command = "look";
    if (command === "konuş") command = "talk";
    if (command === "al") command = "take";
    if (command === "durum") command = "stats";
    if (command === "yardım") command = "help";

    switch (command) {
        case "help":
            writeLine(TRANSLATIONS[state.lang].help_commands, "system-msg");
            break;
        case "go":
            movePlayer(target);
            break;
        case "look":
            describeRoom();
            break;
        case "talk":
            talkNPC(target);
            break;
        case "take":
            if (target === "crown" || target === "taç") {
                stealCrown();
            } else {
                takeItem(target);
            }
            break;
        case "inventory":
            logInventory();
            break;
        case "stats":
            writeLine(`Name: ${state.name} | Class: ${state.class} | Level: ${state.level}`);
            writeLine(`HP: ${state.hp}/${state.maxHp} | AC: ${state.ac}`);
            writeLine(`STR: ${state.str} | DEX: ${state.dex} | INT: ${state.int}`);
            break;
        default:
            writeLine(TRANSLATIONS[state.lang].unrecognized.replace("{cmd}", command));
            break;
    }

    updateUI();
}

function movePlayer(direction) {
    let dir = direction;
    if (direction === "kuzey") dir = "north";
    if (direction === "güney") dir = "south";
    if (direction === "doğu") dir = "east";
    if (direction === "batı") dir = "west";
    if (direction === "yukarı") dir = "up";
    if (direction === "aşağı") dir = "down";

    const room = DUNGEON[state.currentRoom];
    if (!room.exits[dir]) {
        writeLine(TRANSLATIONS[state.lang].no_go);
        return;
    }

    // Runic vault gate check
    if (room.exits[dir] === "secret_vault" && !state.readObeliskRunes) {
        writeLine(state.lang === "tr"
            ? "Taş duvarın üzerindeki rünleri okuyamıyorsunuz. Önce Dikilitaş Odası'nda 'read runes' yazın!"
            : "The heavy stone wall is locked by glowing Celestial runes. You cannot decipher them yet! Read the Obelisk first.", "combat-log");
        return;
    }

    if (room.locked && room.locked[dir]) {
        const requiredKey = room.locked[dir];
        const hasKey = state.inventory.some(i => i.name === requiredKey);
        if (!hasKey) {
            writeLine(TRANSLATIONS[state.lang].locked_msg.replace("{dir}", dir).replace("{key}", requiredKey));
            return;
        } else {
            writeLine(TRANSLATIONS[state.lang].unlock_msg.replace("{dir}", dir).replace("{key}", requiredKey));
            delete room.locked[dir];
        }
    }

    const nextRoomKey = room.exits[dir];

    // Bone pit dex check
    if (nextRoomKey === "funerary_cults" && state.currentRoom === "bone_pit") {
        let roll = rollDice(20) + Math.floor((state.dex - 10) / 2);
        writeLine(state.lang === "tr"
            ? `Kemik çukurunu geçmek için Denge (DEX) Zarı: d20 + Mod = ${roll} (DC: 5)`
            : `Dexterity check to cross the Bone Pit: d20 + Mod = ${roll} (DC: 5)`, "system-msg");
        if (roll < 5) {
            writeLine(state.lang === "tr"
                ? "Kayıp sivri kemiklerin üzerine düştünüz! (3 hasar aldınız)"
                : "You slip and crash into the jagged bones! (Took 3 piercing damage)", "combat-log");
            state.hp = Math.max(1, state.hp - 3);
        } else {
            writeLine(state.lang === "tr" ? "Yavaş adımlarla çukuru güvenle geçtiniz." : "With careful steps, you traverse the ledge safely.", "combat-victory");
        }
    }

    // Rickety stairs dex check
    if (nextRoomKey === "crematoria" && state.currentRoom === "rickety_stairs") {
        let roll = rollDice(20) + Math.floor((state.dex - 10) / 2);
        writeLine(state.lang === "tr"
            ? `Sallantılı Merdiven Çeviklik Zarı: d20 + Mod = ${roll} (DC: 10)`
            : `Dexterity check on Rickety Stairs: d20 + Mod = ${roll} (DC: 10)`, "system-msg");
        if (roll < 10) {
            writeLine(state.lang === "tr"
                ? "Merdivenden düştünüz! (5 hasar aldınız)"
                : "You tumble down the wooden steps! (Took 5 bludgeoning damage)", "combat-log");
            state.hp = Math.max(1, state.hp - 5);
        } else {
            writeLine(state.lang === "tr" ? "Çürük tahtaları atlayarak güvenle indiniz." : "You tread lightly and land safely.", "combat-victory");
        }
    }

    state.currentRoom = nextRoomKey;
    describeRoom();
}

function takeItem(targetName) {
    const room = DUNGEON[state.currentRoom];
    const itemIndex = room.items.findIndex(i => i.name.toLowerCase() === targetName.toLowerCase());

    if (itemIndex === -1) {
        writeLine(TRANSLATIONS[state.lang].take_fail.replace("{item}", targetName));
        return;
    }

    const item = room.items.splice(itemIndex, 1)[0];

    if (item.type === "sunfire_potion") {
        state.sunfireOilEquipped = true;
        writeLine(state.lang === "tr" ? "Sunfire Yağı silahınıza uygulandı! Bir sonraki vuruşunuz +5 alev hasarı yapacak." : "You coat your weapon in Sunfire Oil! Your next strike deals +5 fire damage.", "text-gold");
        return;
    }

    if (item.damageOverride) {
        state.weaponName = item.name;
        state.weaponDamage = item.damageOverride;
        writeLine(state.lang === "tr" ? `[Silah Kuşanıldı]: Hasarınız ${item.damageOverride} olarak güncellendi!` : `[Weapon Equipped]: Your combat damage is now ${item.damageOverride}!`, "text-gold");
    }

    state.inventory.push(item);
    writeLine(TRANSLATIONS[state.lang].take_success.replace("{item}", item.name), "text-gold");
    writeLine(`${TRANSLATIONS[state.lang].examining} ${typeof item.desc === "string" ? item.desc : item.desc[state.lang]}`, "system-msg");
    updateUI();
}

function stealCrown() {
    const room = DUNGEON["sedrair_tomb"];
    if (room.crownStolen) {
        writeLine(state.lang === "tr" ? "Taç zaten alınmış." : "The crown has already been taken.");
        return;
    }

    let checkRoll = rollDice(20) + Math.floor((state.int - 10) / 2);
    writeLine(state.lang === "tr"
        ? `Tuzak tespiti için Zeka Zarı: d20 + Mod = ${checkRoll} (DC: 15)`
        : `Investigation check to spot traps: d20 + Mod = ${checkRoll} (DC: 15)`, "system-msg");

    let advantage = checkRoll >= 15;
    if (advantage) writeLine(state.lang === "tr" ? "Avantaj! Gizli telleri fark ettiniz." : "Advantage! You spotted the hidden wires.", "combat-victory");

    let roll1 = rollDice(20) + Math.floor((state.dex - 10) / 2);
    let roll2 = advantage ? rollDice(20) + Math.floor((state.dex - 10) / 2) : roll1;
    let finalRoll = Math.max(roll1, roll2);

    writeLine(state.lang === "tr"
        ? `El Çabukluğu Zarı: Toplam = ${finalRoll} (DC: 20)`
        : `Sleight of Hand check: Total = ${finalRoll} (DC: 20)`, "system-msg");

    room.crownStolen = true;

    if (finalRoll >= 20) {
        writeLine(state.lang === "tr" ? "KUSURSUZ! Ağırlıkları yerleştirip tacı aldınız." : "PERFECT STEAL! You secured the crown.", "combat-victory");
        state.inventory.push({
            name: state.lang === "tr" ? "Sedrair Tacı" : "Crown of Sedrair II",
            desc: "A beautiful crown of solid gold. Worth 250 GP.",
            type: "treasure"
        });
    } else {
        writeLine(state.lang === "tr" ? "TUZAK! Şimşek tılsımı patladı!" : "TRAP TRIGGERED! Glyph of Warding erupted!", "combat-log");
        let trapDmg = rollDice(8) + rollDice(8);
        let saveRoll = rollDice(20) + Math.floor((state.dex - 10) / 2);
        if (saveRoll >= 13) { trapDmg = Math.floor(trapDmg / 2); writeLine(state.lang === "tr" ? `Kısmen kaçındınız! Yarı hasar: ${trapDmg}` : `Partial dodge! Halved damage: ${trapDmg}`, "combat-victory"); }
        else writeLine(state.lang === "tr" ? `Kaçamadınız! Tam hasar: ${trapDmg}` : `No dodge! Full damage: ${trapDmg}`, "combat-log");
        state.hp = Math.max(1, state.hp - trapDmg);
        state.inventory.push({
            name: state.lang === "tr" ? "Kavrulmuş Sedrair Tacı" : "Ruined Crown of Sedrair II",
            desc: "A charred ruined crown. Worth 50 GP.",
            type: "treasure"
        });
    }
    updateUI();
}

function talkNPC(targetName) {
    const room = DUNGEON[state.currentRoom];
    if (!room.npcs || room.npcs.length === 0) {
        writeLine(TRANSLATIONS[state.lang].talk_no_one);
        return;
    }

    let npc = room.npcs[0];
    if (targetName) {
        const found = room.npcs.find(n => n.toLowerCase() === targetName.toLowerCase());
        if (found) npc = found;
        else {
            writeLine(TRANSLATIONS[state.lang].talk_not_found.replace("{name}", targetName));
            return;
        }
    }

    const npcKey = npc.toLowerCase();

    if (npcKey === "yovir") {
        if (state.companion === "Cassyt") {
            writeLine(state.lang === "tr"
                ? "Doomguide Yovir Glandon başıyla onaylar: 'Kelemvor sizi ve Cassyt'i korusun.'"
                : "Doomguide Yovir Glandon nods: 'May Kelemvor protect you and Cassyt.'", "combat-victory");
            return;
        }

        if (state.npcDialogueIndices[npcKey] === undefined) state.npcDialogueIndices[npcKey] = 0;
        const idx = state.npcDialogueIndices[npcKey];
        const dialogues = NPC_DIALOGUES_LOC[npcKey][state.lang];
        writeLine(dialogues[idx], "combat-victory");

        if (idx === 2) {
            state.companion = "Cassyt";
            writeLine(state.lang === "tr" ? "Cassyt ekibinize katıldı!" : "Acolyte Cassyt joined your party!", "combat-victory");
            state.inventory.push({
                name: state.lang === "tr" ? "Gece Gözlüğü" : "Goggles of Night",
                desc: "Gives darkvision. AC +1.",
                type: "ring"
            });
            state.gogglesEquipped = true;
            writeLine(state.lang === "tr" ? "Gece Gözlüğü kuşanıldı! (AC +1)" : "Goggles of Night equipped! (AC +1)", "text-gold");
            state.inventory.push({
                name: "Iron Key",
                desc: "A heavy iron key. Unlocks the banquet hall shaft gate.",
                type: "key"
            });
            writeLine(state.lang === "tr" ? "Demir Anahtar envantere eklendi!" : "Iron Key added to inventory!", "text-gold");
        }

        state.npcDialogueIndices[npcKey] = Math.min(idx + 1, dialogues.length - 1);
    } else {
        const dialogues = NPC_DIALOGUES_LOC[npcKey] && NPC_DIALOGUES_LOC[npcKey][state.lang];
        if (!dialogues) return;
        if (state.npcDialogueIndices[npcKey] === undefined) state.npcDialogueIndices[npcKey] = 0;
        const idx = state.npcDialogueIndices[npcKey];
        writeLine(dialogues[idx], "combat-victory");
        state.npcDialogueIndices[npcKey] = (idx + 1) % dialogues.length;
    }
}

function useInventoryItem(index) {
    const item = state.inventory[index];
    if (!item) return;
    if (item.type === "potion") {
        state.inventory.splice(index, 1);
        const heal = item.heal || 10;
        const oldHp = state.hp;
        state.hp = Math.min(state.maxHp, state.hp + heal);
        writeLine(TRANSLATIONS[state.lang].potion_use.replace("{name}", item.name).replace("{heal}", state.hp - oldHp));
    }
    updateUI();
}

function logInventory() {
    if (state.inventory.length === 0) {
        writeLine(TRANSLATIONS[state.lang].empty_inv);
    } else {
        writeLine(state.lang === "tr" ? "Envanterinizdeki Eşyalar:" : "Inventory Items:");
        state.inventory.forEach(item => {
            const descText = typeof item.desc === "string" ? item.desc : (item.desc ? item.desc[state.lang] : "");
            writeLine(` - ${item.name}: ${descText}`);
        });
    }
}

function prayAtAltar() {
    const room = DUNGEON["shrine_mourning"];
    if (room.altarUsed) {
        writeLine(state.lang === "tr" ? "Sunak zaten kullanıldı." : "The altar has already been used.");
        return;
    }
    room.altarUsed = true;
    let roll = rollDice(3);
    if (roll === 1) {
        state.str += 2;
        writeLine(state.lang === "tr" ? "Kelemvor gücünüzü kutsadı! (+2 GÜÇ)" : "Kelemvor blesses your arm! (Strength +2)", "combat-victory");
    } else if (roll === 2) {
        state.dex += 2;
        writeLine(state.lang === "tr" ? "Kelemvor çevikliğinizi kutsadı! (+2 ÇEVİKLİK)" : "Kelemvor blesses your reflexes! (Dexterity +2)", "combat-victory");
    } else {
        state.hp = state.maxHp;
        writeLine(state.lang === "tr" ? "Kutsal ışık yaralarınızı kapattı. Tam HP!" : "A warm light seals your wounds. Restored to Full HP!", "combat-victory");
    }
    updateUI();
}

function readObeliskRunes() {
    if (state.readObeliskRunes) {
        writeLine(state.lang === "tr" ? "Rünleri zaten ezberledi niz." : "You have already memorized the runes.");
        return;
    }
    state.readObeliskRunes = true;
    writeLine(state.lang === "tr"
        ? "Obelisk üzerindeki Göksel rünleri inceliyorsunuz. Antik yazıtlar çözülüyor ve Jergal'ın Kasasının şifre anahtarını ezberlediniz!"
        : "You study the glowing Celestial runes on the Obelisk. You memorize the cipher key for the Secret Vault of Jergal!", "combat-victory");
    updateUI();
}

function unlockIronChest() {
    const room = DUNGEON["crypt_ancients"];
    if (!room.chestLocked) { writeLine(TRANSLATIONS[state.lang].chest_open_already); return; }

    if (state.class === "Rogue") {
        room.chestLocked = false;
        writeLine(state.lang === "tr" ? "Haydut çevikliğiyle kilit açma setinizi kullanarak demir sandığı sessizce açtınız!" : "Using your Rogue tools, you lockpick the chest effortlessly!", "combat-victory");
        grantChestLoot();
    } else {
        let roll = rollDice(20) + Math.floor((state.dex - 10) / 2);
        writeLine(state.lang === "tr" ? `Kilit Açma Zarı: d20 + Mod = ${roll} (DC: 12)` : `Lockpick Check: d20 + Mod = ${roll} (DC: 12)`, "system-msg");
        if (roll >= 12) { room.chestLocked = false; writeLine(state.lang === "tr" ? "Kilidi açtınız!" : "Lockpick Succeeded!", "combat-victory"); grantChestLoot(); }
        else writeLine(state.lang === "tr" ? "Kilidi açamadınız." : "Lockpick Failed.", "combat-log");
    }
    updateUI();
}

function breakIronChest() {
    const room = DUNGEON["crypt_ancients"];
    if (!room.chestLocked) { writeLine(TRANSLATIONS[state.lang].chest_open_already); return; }

    let roll = rollDice(20) + Math.floor((state.str - 10) / 2);
    writeLine(state.lang === "tr" ? `Sandık Kırma Zarı: d20 + Mod = ${roll} (DC: 15)` : `Strength Smash Check: d20 + Mod = ${roll} (DC: 15)`, "system-msg");
    if (roll >= 15) { room.chestLocked = false; writeLine(state.lang === "tr" ? "Menteşeleri kırdınız!" : "You shatter the iron lock!", "combat-victory"); grantChestLoot(); }
    else writeLine(state.lang === "tr" ? "Sandık sapasağlam." : "Your strike slides off the iron bands.", "combat-log");
    updateUI();
}

function grantChestLoot() {
    state.gold += 50;
    state.inventory.push({ name: state.lang === "tr" ? "İyileşme İksiri" : "Elixir of Healing", desc: "Restores 15 HP.", type: "potion", heal: 15 });
    writeLine(state.lang === "tr" ? "Sandıktan 50 Altın ve İyileşme İksiri buldunuz!" : "Found 50 GP and an Elixir of Healing inside the chest!", "text-gold");
}

function shatterMirror() {
    if (state.mirrorShattered) {
        writeLine(state.lang === "tr" ? "Odak Ayna zaten kırılmış." : "The focus mirror is already shattered.");
        return;
    }
    const roll = rollDice(20) + Math.floor((state.int - 10) / 2);
    writeLine(state.lang === "tr" ? `Odak Ayna'yı kırmak için Zeka Zarı: d20 + Mod = ${roll} (DC: 14)` : `Intelligence check to identify and shatter the focus mirror: d20 + Mod = ${roll} (DC: 14)`, "system-msg");
    if (roll >= 14) {
        state.mirrorShattered = true;
        writeLine(state.lang === "tr"
            ? "Doğru aynanın nasıl parlak bir şekilde daha koyu pulsladığını fark ediyorsunuz. Kılıcınızın kabzasıyla şiddetle vuruyorsunuz — mor alev içinde patlayarak dağılıyor! Bağlı askerler şaşkınlıkla etrafına bakıyor."
            : "You notice how one mirror pulses slightly darker than the rest. You drive your pommel into its center — it shatters in a burst of violet flame! Controlled soldiers blink in confusion.", "combat-victory");
        state.xp += 150;
        writeLine(state.lang === "tr" ? "+150 XP kazandınız!" : "+150 XP gained!", "text-gold");
        checkLevelUp();
    } else {
        writeLine(state.lang === "tr"
            ? "Yanlış aynayı kırdınız! Karanlık enerji patlaması 4 hasar verdi."
            : "You shattered the wrong mirror! A pulse of dark energy slams you for 4 damage.", "combat-log");
        state.hp = Math.max(1, state.hp - 4);
    }
    updateUI();
}

function destroyDragonEggs() {
    const room = DUNGEON["dragon_egg_chamber"];
    if (room.eggsDestroyed) {
        writeLine(state.lang === "tr" ? "Yumurtalar zaten yok edildi." : "The eggs have already been destroyed.");
        return;
    }
    room.eggsDestroyed = true;
    if (state.companion === "Cassyt") {
        writeLine(state.lang === "tr"
            ? "Cassyt elini yumruk yapar: 'Hayır! Bu doğmuşlara işkence yapılmış — onlar savunmasız! Bunu yapma!'"
            : "Cassyt clenches her fist: 'No! These hatchlings were tortured into evil — they are innocent! Don't do this!'", "combat-log");
    }
    writeLine(state.lang === "tr"
        ? "Yumurtaları yok ediyorsunuz. Phlan bir tehditten daha kurtuldu — ama bu eylem ağır hissettiriyor."
        : "You destroy the dragon eggs. Phlan is safer — but the act weighs heavily on your conscience.", "combat-victory");
    state.xp += 200;
    state.gold += 80;
    writeLine(state.lang === "tr" ? "+200 XP ve +80 Altın (tapınak hazinesi)." : "+200 XP and +80 GP (cult treasure).", "text-gold");
    checkLevelUp();
    updateUI();
}

function leaveDragonEggs() {
    const room = DUNGEON["dragon_egg_chamber"];
    if (room.eggsDestroyed) {
        writeLine(state.lang === "tr" ? "Yumurtalar zaten yok edildi." : "The eggs have already been destroyed.");
        return;
    }
    room.eggsDestroyed = true; // Mark as handled regardless
    if (state.companion === "Cassyt") {
        writeLine(state.lang === "tr"
            ? "Cassyt derin bir nefes alır: 'Doğru karar. Onlara kötü davranıldı — bu onların suçu değil.'"
            : "Cassyt exhales: 'The right choice. They were conditioned to be evil — that is not their fault.'", "combat-victory");
    }
    writeLine(state.lang === "tr"
        ? "Yumurtaları olduğu gibi bırakıyorsunuz. Belki umutla büyüyebilirler."
        : "You leave the eggs untouched. Perhaps they can grow up differently.", "combat-victory");
    state.xp += 80;
    writeLine(state.lang === "tr" ? "+80 XP (erdemli karar)." : "+80 XP (righteous choice).", "text-gold");
    checkLevelUp();
    updateUI();
}

function tyrOffering() {
    if (state.currentRoom !== "sunken_temple") return;
    const room = DUNGEON["sunken_temple"];
    if (room.tyrOfferingDone) {
        writeLine(state.lang === "tr" ? "Tyr'e sunağı zaten kullandınız." : "You have already made your offering to Tyr.");
        return;
    }
    const offerAmt = 30;
    if (state.gold < offerAmt) {
        writeLine(state.lang === "tr" ? `Tyr'e adak sunmak için en az ${offerAmt} Altın gerekmektedir.` : `You need at least ${offerAmt} GP to make an offering to Tyr.`, "combat-log");
        return;
    }
    state.gold -= offerAmt;
    room.tyrOfferingDone = true;
    writeLine(state.lang === "tr"
        ? `${offerAmt} Altın sunuyorsunuz. Sunak altın ışıkla parlıyor. Tyr'in adalet sesini duyuyorsunuz: 'Savaşçı — kılıcın doğru darbeye rehberlik etsin.'`
        : `You offer ${offerAmt} GP. The altar blazes with golden light. A calm voice fills the chamber: 'Warrior — may your blade strike true in the name of justice.'`, "combat-victory");
    const roll3 = rollDice(3);
    if (roll3 === 1) {
        state.str += 3;
        writeLine(state.lang === "tr" ? "Tyr'in kutsaması: +3 GÜÇ!" : "Tyr's Blessing: +3 STR!", "text-gold");
    } else if (roll3 === 2) {
        state.hp = state.maxHp;
        state.maxHp += 5;
        writeLine(state.lang === "tr" ? "Tyr'in kutsaması: +5 Maksimum HP ve tam iyileşme!" : "Tyr's Blessing: +5 Max HP and full heal!", "text-gold");
    } else {
        state.weaponDamage += 2;
        writeLine(state.lang === "tr" ? `Tyr'in kutsaması: Silah hasarınız +2 arttı (şimdi d${state.weaponDamage})!` : `Tyr's Blessing: Weapon damage +2 (now d${state.weaponDamage})!`, "text-gold");
    }
    updateUI();
}

function holdBreath() {
    if (state.currentRoom !== "fungal_forest") {
        writeLine(state.lang === "tr" ? "Burada nefes tutmanıza gerek yok." : "You do not need to hold your breath here.");
        return;
    }
    state.holdingBreath = !state.holdingBreath;
    if (state.holdingBreath) {
        writeLine(state.lang === "tr"
            ? "Nefes tutuyorsunuz. Sporlar hasarı engellenecek — ama uzun süre dayanamayacaksınız."
            : "You hold your breath tight. Spore damage will be blocked — but you cannot maintain this for long.", "combat-victory");
    } else {
        writeLine(state.lang === "tr"
            ? "Nefes tutmayı bıraktınız. Sporlar tekrar tehlikeli."
            : "You release your breath. Spores are dangerous again.", "combat-log");
    }
    updateUI();
}

function sneakThroughOutpost() {
    if (state.currentRoom !== "drow_outpost") return;
    const roll = rollDice(20) + Math.floor((state.dex - 10) / 2);
    writeLine(state.lang === "tr" ? `Gizlilik Zarı: d20 + Mod = ${roll} (DC: 13)` : `Stealth check to sneak through the Drow Outpost: d20 + Mod = ${roll} (DC: 13)`, "system-msg");
    if (roll >= 13) {
        writeLine(state.lang === "tr"
            ? "Gölgeler arasında süzülüyorsunuz. Drow askerleri hiçbir şeyden habersiz. İkmal deposunu boşaltıyorsunuz!"
            : "You slip through the shadows. The Drow soldiers remain completely unaware. You raid the supply cache!", "combat-victory");
        const room = DUNGEON["drow_outpost"];
        if (room.items && room.items.length > 0) {
            const supplies = room.items.splice(0, room.items.length);
            supplies.forEach(s => {
                state.inventory.push(s);
                writeLine(state.lang === "tr" ? `${s.name} bulundu!` : `Found: ${s.name}!`, "text-gold");
            });
        }
        state.gold += 25;
        writeLine(state.lang === "tr" ? "+25 Altın (Drow kumbarası)." : "+25 GP (Drow coin pouch).", "text-gold");
        state.xp += 100;
        writeLine(state.lang === "tr" ? "+100 XP." : "+100 XP.", "text-gold");
        checkLevelUp();
    } else {
        writeLine(state.lang === "tr"
            ? "Sürçtünüz! Bir Drow sizi görüyor. Savaş kaçınılmaz!"
            : "You stumble! A Drow spots you. Combat is unavoidable!", "combat-log");
        const room = DUNGEON["drow_outpost"];
        if (room.monsters && room.monsters.length === 0) {
            room.monsters.push({ name: "Drow Warrior", hp: 30, maxHp: 30, ac: 15, xpAward: 300, damage: 7 });
        }
        state.combat = { ...room.monsters[0], skillUsed: false };
        if (MONSTER_ART[state.combat.name]) writeArt(MONSTER_ART[state.combat.name], "combat-log");
    }
    updateUI();
}

function freeDragon() {
    const room = DUNGEON["dragon_roost"];
    if (room.dragonFreed) {
        writeLine(state.lang === "tr" ? "Arvax zaten özgür." : "Arvax is already free.");
        return;
    }
    const hasKey = state.inventory.some(i => i.name === "Iron Key");
    if (!hasKey) {
        writeLine(state.lang === "tr"
            ? "Zincirleri açmak için bir Demir Anahtara ihtiyacınız var. Doomguide Glandon'dan Iron Key almayı unuttunuz mu?"
            : "You need an Iron Key to unlock the chains. Did you forget to get the Iron Key from Doomguide Glandon?", "combat-log");
        return;
    }
    const keyIdx = state.inventory.findIndex(i => i.name === "Iron Key");
    state.inventory.splice(keyIdx, 1);
    room.dragonFreed = true;
    state.allyDragon = true;
    writeLine(state.lang === "tr"
        ? "Demir Anahtarı kullanarak Arvax'ın zincirlerini açıyorsunuz. Bronz ejderha kanatlarını gererek derin bir nefes alıyor. 'BORÇ ÖDENDI. Ben Arvax — savaşçınızım.' Ejderha müttefikinize katıldı! (Savaşta her tur +8 ateş hasarı)"
        : "You use the Iron Key to unlock Arvax's chains. The bronze dragon spreads his wings and breathes deeply. 'DEBT PAID. I am Arvax — I fight at your side.' Arvax joined as a combat ally! (+8 fire damage per round in combat)", "combat-victory");
    updateUI();
}

function openBridgeChest() {
    const room = DUNGEON["blackfist_bridge"];
    if (!room || room.bridgeChestOpened) {
        writeLine(state.lang === "tr" ? "Kasa zaten açıldı." : "The chest has already been opened.");
        return;
    }
    const hasKey = state.inventory.some(i => i.name === "Merchant's Chest Key");
    if (!hasKey) {
        writeLine(state.lang === "tr"
            ? "Kasa kilitli. Kilidini açmak için Tüccarın Kasa Anahtarı gerekiyor."
            : "The chest is locked. You need the Merchant's Chest Key to open it.", "combat-log");
        return;
    }
    const keyIdx = state.inventory.findIndex(i => i.name === "Merchant's Chest Key");
    state.inventory.splice(keyIdx, 1);
    room.bridgeChestOpened = true;
    state.gold += 120;
    const randLoot = rollDice(2);
    if (randLoot === 1) {
        state.inventory.push({ name: state.lang === "tr" ? "İyileşme İksiri" : "Elixir of Healing", desc: "Restores 15 HP.", type: "potion", heal: 15 });
        writeLine(state.lang === "tr" ? "Kasadan 120 Altın ve İyileşme İksiri buldunuz!" : "You open the chest: 120 GP and an Elixir of Healing!", "text-gold");
    } else {
        writeLine(state.lang === "tr" ? "Kasadan 120 Altın buldunuz! Güzel bir soygun." : "You crack open the chest: 120 GP! A nice haul.", "text-gold");
    }
    updateUI();
}

function readTome() {
    const hasTome = state.inventory.some(i => i.type === "tome");
    if (!hasTome) {
        writeLine(state.lang === "tr" ? "Envanterinizde tome yok." : "You have no tome in your inventory.");
        return;
    }
    if (state.readTomeActive) {
        writeLine(state.lang === "tr" ? "Tome etkisi hâlâ aktif." : "The tome effect is still active.");
        return;
    }
    state.readTomeActive = true;
    state.int += 2;
    writeLine(state.lang === "tr"
        ? "Ejderha Büyü Tome'unu inceliyorsunuz. Ejderha rün dili beyninizde yanıyor. +2 Zeka (Kamp kuruncaya kadar aktif)."
        : "You study the Draconic Ritual Tome. The rune-script sears into your mind. +2 INT (active until you next camp).", "combat-victory");
    updateUI();
}


function handleDirectionClick(action) {
    if (!state.class) return;
    if (action === "look") {
        const cmd = state.lang === "tr" ? "bak" : "look";
        logCommand(cmd);
        handleCommand(cmd);
    } else {
        const cmd = state.lang === "tr" ? `git ${action}` : `go ${action}`;
        logCommand(cmd);
        handleCommand(cmd);
    }
}

function describeRoom() {
    const room = DUNGEON[state.currentRoom];
    writeLine(room.name, "room-title");

    if (ROOM_ART[state.currentRoom]) {
        writeArt(ROOM_ART[state.currentRoom]);
    }

    writeLine(room.description);

    if (state.companion === "Cassyt") {
        triggerCassytComment();
    }

    if (room.items && room.items.length > 0) {
        const itemNames = room.items.map(i => i.name).join(", ");
        const notice = state.lang === "tr" ? "Fark ettikleriniz:" : "You notice:";
        writeLine(`${notice} ${itemNames}`, "text-gold");
    }

    if (room.monsters && room.monsters.length > 0) {
        const monster = room.monsters[0];

        // Block combat starting if Jaxana is sleeping
        if (state.currentRoom === "jaxana_tomb" && monster.isSleeping) {
            writeLine(state.lang === "tr"
                ? "Jaxana kıvrılmış uyuyor. Göğsünün inip kalkışını görebiliyorsunuz. Ses yapmadan gizlice geçmeyi ('sneak past dragon') deneyin."
                : "Jaxana is sleeping soundly. Try to 'sneak past dragon' to slip through silently.");
        } else {
            state.combat = { ...monster, skillUsed: false };
            if (MONSTER_ART[monster.name]) {
                writeArt(MONSTER_ART[monster.name], "combat-log");
            }
            const enterCombatMsg = state.lang === "tr"
                ? `Vahşi bir ${monster.name} gölgelerin arasından fırlayarak yolunuzu kesiyor!`
                : `A wild ${monster.name} leaps from the shadows to block your path!`;
            writeLine(enterCombatMsg, "combat-log");
        }
    }

    updateUI();
}

function triggerCassytComment() {
    const comments = {
        cloister: {
            en: "Cassyt points to the fresco: 'This map is at least a century old! It shows the layout of the upper levels.'",
            tr: "Cassyt freski işaret ediyor: 'Bu harita en az bir asırlık! Üst katların yerleşimini gösteriyor.'"
        },
        first_families: {
            en: "Cassyt whispers: 'These dioramas represent Phlan's old wealthy nobles. Be careful, Glandon hates grave robbing!'",
            tr: "Cassyt fısıldıyor: 'Bu dioramalar Phlan'ın eski zengin soylularını temsil ediyor. Dikkatli olun, Glandon mezar hırsızlığından nefret eder!'"
        },
        bone_pit: {
            en: "Cassyt gasps: 'Don't slip! The pit is deep and those bones are sharp. Walk slowly!'",
            tr: "Cassyt soluğunu tutuyor: 'Kaymayın! Çukur derin ve o kemikler çok sivri. Yavaş yürüyün!'"
        },
        rickety_stairs: {
            en: "Cassyt clutches her holy symbol: 'This is a statue of Jergal, keeper of tombs. The stairs are rotted, step carefully!'",
            tr: "Cassyt heykeli gösterir: 'Bu, mezarların koruyucusu Jergal'ın heykeli. Merdivenler çürümüş, dikkatli basın!'"
        },
        sedrair_tomb: {
            en: "Cassyt warns: 'Sedrair II was paranoid. Her crown is definitely warded. Don't touch it unless you're incredibly skilled!'",
            tr: "Cassyt uyarıyor: 'Sedrair II aşırı şüpheciydi. Tacı kesinlikle büyülü tılsımla korunuyor. Yetenekli değilseniz dokunmayın!'"
        },
        talking_dead: {
            en: "Cassyt chatters: 'These skulls were enchanted with speak with dead ages ago. Ask them anything!'",
            tr: "Cassyt fısıldıyor: 'Bu kafatasları çağlar önce ölülerle konuşma büyüsüyle tılsımlanmış. Onlara dilediğinizi sorun!'"
        },
        crime_scenes: {
            en: "Cassyt shivers: 'Ugh, Phlan's dark history. These scenes show criminals being punished by their victims.'",
            tr: "Cassyt ürperiyor: 'Phlan'ın karanlık tarihi. Bu sahneler kurbanları tarafından cezalandırılan suçluları gösteriyor.'"
        },
        necropolis: {
            en: "Cassyt holds her lantern high: 'The Necropolis is huge. Rorreth's base must be right ahead. Be ready to fight!'",
            tr: "Cassyt fenerini havaya kaldırıyor: 'Nekropol çok büyük. Rorreth'in üssü hemen ileride olmalı. Savaşmaya hazır olun!'"
        },
        castle_courtyard: {
            en: "Cassyt gasps: 'We teleportered straight to Valjevo Keep! The Thayan Knight is armored like a fortress.'",
            tr: "Cassyt şaşırıyor: 'Doğrudan Valjevo Kalesi'ne ışınlandık! Thayan Şövalyesi kale gibi zırhlanmış.'"
        },
        pool_chamber: {
            en: "Cassyt screams: 'The Pool of Radiance! Stop Rorreth before he consumes the magic!'",
            tr: "Cassyt çığlık atıyor: 'Işıltı Havuzu! Saf büyüyü tüketmeden önce Rorreth'i durdurun!'"
        },
        shadow_rift: {
            en: "Cassyt shivers: 'The Shadowfell! Oh gods, it is freezing. Let's find Jaxana's Tomb and get out of here.'",
            tr: "Cassyt ürperiyor: 'Shadowfell! Tanrım, burası dondurucu. Jaxana'nın mezarını bulup buradan çıkalım.'"
        },
        astral_hearth: {
            en: "Cassyt holds her holy symbol high: 'Vanthrax the Arch-Lich! Kelemvor guide our strikes to close the rift!'",
            tr: "Cassyt sembolünü kaldırır: 'Arch-Lich Vanthrax! Kelemvor vuruşlarımızı yönlendirsin ve yırtığı kapatsın!'"
        }
    };

    if (comments[state.currentRoom]) {
        writeLine(comments[state.currentRoom][state.lang], "combat-victory");
    }
}

function restAtCamp() {
    const safeZones = ["graveyard", "welcomer_haven", "castle_courtyard", "citadel_gatehouse", "spire_entrance", "citadel_approach"];
    if (!safeZones.includes(state.currentRoom)) {
        writeLine(state.lang === "tr" ? "Burada kamp kuramazsınız!" : "You cannot camp in dangerous dungeons!");
        return;
    }

    state.hp = state.maxHp;

    // Reset tome buff on camp
    if (state.readTomeActive) {
        state.readTomeActive = false;
        state.int -= 2;
        writeLine(state.lang === "tr" ? "Tome buff uyku sırasında dağıldı. (+2 Zeka etkisi bitti)" : "The Tome's power fades as you sleep. (+2 INT expired)");
    }
    // Reset hold breath
    state.holdingBreath = false;

    writeLine(state.lang === "tr" ? "Kamp ateşi yakıp dinleniyorsunuz. Sağlığınız tamamen yenilendi." : "You build a cozy campfire and rest. Your health is completely restored.", "combat-victory");

    if (state.companion === "Cassyt") {
        const chats = [
            {
                en: "Cassyt sighs: 'My family died during the occupation of Phlan. The church of Kelemvor took me in when I had nothing. Glandon was like a father.'",
                tr: "Cassyt iç çeker: 'Ailem Phlan işgali sırasında öldü. Kelemvor kilisesi hiçbir şeyim yokken beni yanına aldı. Glandon bana baba gibi oldu.'"
            },
            {
                en: "Cassyt looks at the flames: 'Doomguide Yovir Glandon appears strict, but he once saved an entire orphanage from the Cult of the Dragon.'",
                tr: "Cassyt alevlere bakar: 'Doomguide Yovir Glandon sert görünür ama bir keresinde koca bir yetimhaneyi Ejderha Tarikatı'ndan kurtarmıştı.'"
            },
            {
                en: "Cassyt whispers: 'Rorreth was once a student of the high Thayans, but he was cast out when he attempted to connect to the Pool of Radiance...'",
                tr: "Cassyt fısıldar: 'Rorreth bir zamanlar Thayan akademisindeydi, ancak Işıltı Havuzu'na bağlanmaya çalıştığında kovuldu...'"
            }
        ];
        let roll = rollDice(3) - 1;
        writeLine(chats[roll][state.lang], "text-gold");
    }
    updateUI();
}

function sellTreasure(type) {
    let index = -1;
    let payout = 0;

    if (type === "Crown") {
        index = state.inventory.findIndex(i => i.name.includes("Crown") || i.name.includes("Tacı"));
        if (index !== -1) {
            payout = state.inventory[index].name.includes("Ruined") || state.inventory[index].name.includes("Kavrulmuş") ? 50 : 250;
        }
    } else if (type === "Ring") {
        index = state.inventory.findIndex(i => i.name.includes("Ring") || i.name.includes("Yüzük"));
        payout = 30;
    }

    if (index === -1) {
        writeLine(state.lang === "tr" ? "Satacak uygun bir hazineniz yok." : "You do not have this treasure to sell.");
        return;
    }

    const soldItem = state.inventory.splice(index, 1)[0];
    state.gold += payout;
    writeLine(state.lang === "tr"
        ? `${soldItem.name} eşyasını Todor'a ${payout} Altın karşılığında sattınız!`
        : `Sold ${soldItem.name} to Todor for ${payout} GP!`, "text-gold");
    updateUI();
}

function buyFromMerchant(itemType, cost) {
    if (state.gold < cost) {
        writeLine(TRANSLATIONS[state.lang].shop_no_gold);
        return;
    }

    if (itemType === "potion") {
        state.gold -= cost;
        state.inventory.push({
            name: state.lang === "tr" ? "İyileşme İksiri" : "Elixir of Healing",
            desc: "Restores 15 HP.",
            type: "potion",
            heal: 15
        });
        writeLine(state.lang === "tr" ? "İyileşme İksiri satın alındı!" : "Bought Elixir of Healing!", "text-gold");
    } else if (itemType === "plate") {
        state.gold -= cost;
        state.inventory.push({
            name: state.lang === "tr" ? "Yarım Plaka Zırh" : "Splint Mail",
            desc: "Improves defense. AC is set to 18.",
            type: "armor"
        });
        writeLine(state.lang === "tr" ? "Yarım Plaka Zırh satın alındı! (AC 18 olarak ayarlandı)" : "Bought Splint Mail! (AC boosted to 18)", "text-gold");
    } else if (itemType === "sword") {
        state.gold -= cost;
        state.weaponName = state.lang === "tr" ? "Thayan Çelik Kılıcı" : "Thayan Greatsword";
        state.weaponDamage = 12;
        writeLine(state.lang === "tr" ? "Thayan Çelik Kılıcı kuşanıldı! (Hasar 12'ye yükseldi)" : "Equipped Thayan Greatsword! (Damage set to 12)", "text-gold");
    }
    updateUI();
}

function solveRiddle(answer) {
    if (state.currentRoom === "whispering_vaults") {
        const room = DUNGEON["whispering_vaults"];
        if (!room.locked || !room.locked.north) return;

        if (answer === "echo") {
            delete room.locked.north;
            writeLine(state.lang === "tr"
                ? "Taş ağız gülümsüyor: 'Doğru cevap! Yankı.' Kuzey tünelinin kapısı yavaşça açılıyor."
                : "The stone mouth smiles: 'Correct. Echo.' The stone portal to the north grinds open!", "combat-victory");
        } else {
            writeLine(state.lang === "tr"
                ? "Taş ağız gürlüyor: 'Yanlış cevap!' Mahzende esen buz gibi rüzgar size 3 soğuk hasarı verdi."
                : "The stone mouth rasps: 'No, that is incorrect!' A chilly blast of wind inflicts 3 cold damage.", "combat-log");
            state.hp = Math.max(1, state.hp - 3);
        }
    } else if (state.currentRoom === "sanctum_gates") {
        const room = DUNGEON["sanctum_gates"];
        if (!room.locked || !room.locked.north) return;

        if (answer === "fire") {
            delete room.locked.north;
            writeLine(state.lang === "tr"
                ? "Taş ağız alevler saçarak gülüyor: 'Doğru cevap! Ateş.' Kapılar ardına kadar açıldı!"
                : "The stone mouth laughs, breathing sparks: 'Correct. Fire.' The heavy gate swings open!", "combat-victory");
        } else {
            writeLine(state.lang === "tr"
                ? "Taş ağız tıslıyor: 'Ateş olmayan yerde duman tütmez! Yanlış.' 4 yangın hasarı aldınız."
                : "The stone mouth rasps: 'No, that is incorrect!' A blast of ash deals 4 fire damage.", "combat-log");
            state.hp = Math.max(1, state.hp - 4);
        }
    }
    updateUI();
}

function pullLever(color) {
    const room = DUNGEON["thayan_lab"];
    if (!room.locked || !room.locked.north) return;

    if (color === "red" || color === "kırmızı") {
        writeLine(state.lang === "tr"
            ? "Kırmızı kolu çektiniz. Tavandan alev püskürdü! 5 yangın hasarı aldınız. Kollar sıfırlandı."
            : "You pull the Red Lever. Fire blasts from the ceiling! You take 5 fire damage. Levers reset.", "combat-log");
        state.hp = Math.max(1, state.hp - 5);
        state.blueLeverPulled = false;
        state.greenLeverPulled = false;
    } else if (color === "blue" || color === "mavi") {
        state.blueLeverPulled = true;
        writeLine(state.lang === "tr" ? "Mavi kolu çektiniz. Zeminden klik sesi geldi." : "You pull the Blue Lever. A click echoes in the floor.", "combat-victory");
    } else if (color === "green" || color === "yeşil") {
        state.greenLeverPulled = true;
        writeLine(state.lang === "tr" ? "Yeşil kolu çektiniz. Duvardan klik sesi geldi." : "You pull the Green Lever. A click echoes in the wall.", "combat-victory");
    }

    if (state.blueLeverPulled && state.greenLeverPulled) {
        delete room.locked.north;
        writeLine(state.lang === "tr"
            ? "Mavi ve Yeşil kol kombinasyonu çalıştı! Kuzeydeki ağır demir parmaklık yukarı kalktı!"
            : "The combination of Water and Earth worked! The steel portcullis grinds open to the north!", "combat-victory");
    }
    updateUI();
}

function sneakPastJaxana() {
    const room = DUNGEON["jaxana_tomb"];
    if (!room.monsters || room.monsters.length === 0 || !room.monsters[0].isSleeping) return;

    let dexMod = Math.floor((state.dex - 10) / 2);
    let roll = rollDice(20) + dexMod;
    writeLine(state.lang === "tr" ? `Ejderhanın yanından gizlice sızma zarı: d20 + Mod = ${roll} (DC: 15)` : `Stealth Roll to slip past Jaxana: d20 + Mod = ${roll} (DC: 15)`, "system-msg");

    if (roll >= 15) {
        writeLine(state.lang === "tr"
            ? "Sessizce ve yavaş adımlarla Jaxana'yı uyandırmadan yanından süzülüp geçtiniz!"
            : "With absolute silence, you step past the massive shadow claws. Jaxana remains asleep!", "combat-victory");
        // Remove monster to allow free walking
        room.monsters = [];
    } else {
        writeLine(state.lang === "tr"
            ? "HATA! Çıtırdayan bir kemiğe bastınız! Jaxana kükreyerek parıldayan mor gözlerini açtı!"
            : "FAIL! You stepped on a dry bone. Jaxana opens her glowing purple eyes and roars!", "combat-log");
        room.monsters[0].isSleeping = false;
        state.combat = { ...room.monsters[0], skillUsed: false };
        if (MONSTER_ART[state.combat.name]) {
            writeArt(MONSTER_ART[state.combat.name], "combat-log");
        }
    }
    updateUI();
}

function rescueBlackFistKnight() {
    const room = DUNGEON["torture_vaults"];
    if (room.knightRescued) return;

    if (state.class === "Rogue") {
        room.knightRescued = true;
        state.allyKnight = true;
        writeLine(state.lang === "tr" ? "Kafes kilidini maymuncukla kolayca açtınız! Sir Kevin ekibinize katıldı." : "You lockpick the cage effortlessly! Sir Kevin the Black Fist Knight joins your party.", "combat-victory");
    } else {
        let roll = rollDice(20) + Math.floor((state.str - 10) / 2);
        writeLine(state.lang === "tr" ? `Kafesi kırma zarı: d20 + Mod = ${roll} (DC: 12)` : `Rescuing Knight Check: d20 + Mod = ${roll} (DC: 12)`, "system-msg");
        if (roll >= 12) {
            room.knightRescued = true;
            state.allyKnight = true;
            writeLine(state.lang === "tr" ? "Kafes kapısını kırıp şövalyeyi kurtardınız! Sir Kevin ekibe katıldı." : "You break the hinges and rescue Sir Kevin! He joins your party.", "combat-victory");
        } else {
            writeLine(state.lang === "tr" ? "Kafesi açamadınız." : "Failed to open the cage.", "combat-log");
        }
    }
    updateUI();
}

function handleCombatCommand(input) {
    if (!state.combat) return;

    if (input === "flee") {
        writeLine(TRANSLATIONS[state.lang].flee_msg.replace("{enemy}", state.combat.name), "combat-log");
        state.combat = null;
        state.currentRoom = "graveyard";
        describeRoom();
        return;
    }

    let isSkillUsed = false;
    let skillDamageBonus = 0;

    if (input === "heal" && state.class === "Cleric") {
        const healAmt = rollDice(8) + Math.floor((state.int - 10) / 2);
        state.hp = Math.min(state.maxHp, state.hp + healAmt);
        writeLine(state.lang === "tr" ? `İyileşme duası okudunuz! ${healAmt} HP iyileştiniz.` : `You cast Healing Word! Restored ${healAmt} HP.`, "combat-victory");
        isSkillUsed = true;
    } else if (input === "double shot" && state.class === "Ranger") {
        skillDamageBonus = rollDice(6);
        writeLine(state.lang === "tr" ? "Yayınızdan iki oku aynı anda bırakıyorsunuz!" : "You loose two arrows in a double shot!", "combat-victory");
        isSkillUsed = true;
    } else if (input === "smite" && state.class === "Paladin") {
        skillDamageBonus = rollDice(8) + rollDice(8);
        writeLine(state.lang === "tr" ? "Silahınız kutsal enerjiyle parlıyor! Divine Smite!" : "Your weapon erupts in radiant fire! Divine Smite!", "combat-victory");
        isSkillUsed = true;
    } else if (input === "charge" && state.class === "Warrior") {
        skillDamageBonus = 4;
        writeLine(state.lang === "tr" ? "Düşmana doğru hücum ediyorsunuz!" : "You charge headlong into the enemy!", "combat-victory");
        isSkillUsed = true;
    } else if (input === "sneak attack" && state.class === "Rogue") {
        skillDamageBonus = 5;
        writeLine(state.lang === "tr" ? "Zayıf bir noktaya gizlice arkadan vuruyorsunuz!" : "You sneak behind to strike a vulnerable spot!", "combat-victory");
        isSkillUsed = true;
    } else if (input === "fireball" && state.class === "Mage") {
        skillDamageBonus = 6;
        writeLine(state.lang === "tr" ? "Büyük bir alev topu fırlatıyorsunuz!" : "You launch a blazing fireball!", "combat-victory");
        isSkillUsed = true;
    }

    if (isSkillUsed) {
        state.combat.skillUsed = true;
    }

    if (input === "attack" || isSkillUsed) {
        let hitRoll = rollDice(20);
        let strMod = Math.floor((state.str - 10) / 2);
        let dexMod = Math.floor((state.dex - 10) / 2);
        let intMod = Math.floor((state.int - 10) / 2);

        let attackBonus = (state.class === "Mage" || state.class === "Cleric") ? intMod : (state.class === "Rogue" || state.class === "Ranger" ? dexMod : strMod);
        let totalAttack = hitRoll + attackBonus;

        if (input === "attack") {
            if (state.class === "Warrior" || state.class === "Paladin") {
                const msg = state.lang === "tr" ? `Silahınızı kaldırıp büyük bir güçle savuruyorsunuz...` : `You raise your weapon and swing with heavy momentum...`;
                writeLine(msg);
            } else if (state.class === "Rogue" || state.class === "Ranger") {
                const msg = state.lang === "tr" ? `Hızlı adımlarla düşman savunmasına ani bir darbe indiriyorsunuz...` : `You close in rapidly, delivering a swift tactical strike...`;
                writeLine(msg);
            } else if (state.class === "Mage" || state.class === "Cleric") {
                const msg = state.lang === "tr" ? `Odak noktanızı doğrultup büyü enerjisi fırlatıyorsunuz...` : `You channel raw power, casting a crackling magic strike...`;
                writeLine(msg);
            }
        }

        writeLine(TRANSLATIONS[state.lang].combat_roll.replace("{roll}", hitRoll).replace("{mod}", attackBonus).replace("{total}", totalAttack).replace("{ac}", state.combat.ac), "system-msg");

        if (totalAttack >= state.combat.ac) {
            let dmg = rollDice(state.weaponDamage) + Math.max(0, attackBonus) + skillDamageBonus;

            // Check Sunfire Oil bonus
            if (state.sunfireOilEquipped) {
                dmg += 5;
                state.sunfireOilEquipped = false;
                writeLine(state.lang === "tr" ? "Silahınızdaki Sunfire Yağı parladı! (+5 Alev hasarı eklendi)" : "The Sunfire Oil on your weapon flares! (+5 fire damage added)", "text-gold");
            }

            state.combat.hp -= dmg;
            writeLine(TRANSLATIONS[state.lang].combat_hit.replace("{enemy}", state.combat.name).replace("{dmg}", dmg), "combat-victory");
        } else {
            writeLine(TRANSLATIONS[state.lang].combat_miss.replace("{enemy}", state.combat.name), "combat-log");
        }

        // Rescued Knight Kevin strikes as follow-up action
        if (state.allyKnight && state.combat.hp > 0) {
            let knightDmg = 4;
            state.combat.hp -= knightDmg;
            writeLine(state.lang === "tr" ? `Sir Kevin şövalye kılıcıyla vuruyor! ${state.combat.name} ${knightDmg} hasar aldı.` : `Sir Kevin strikes with his broadsword! Deal ${knightDmg} damage to ${state.combat.name}.`, "combat-victory");
        }

        // Arvax the Bronze Dragon breathes fire
        if (state.allyDragon && state.combat.hp > 0) {
            let dragonDmg = 8;
            state.combat.hp -= dragonDmg;
            writeLine(state.lang === "tr" ? `Arvax ağzını açıp ${dragonDmg} ateş hasarı veriyor! ${state.combat.name} alev içinde!` : `Arvax unleashes a gout of bronze dragonfire! ${dragonDmg} fire damage to ${state.combat.name}!`, "combat-victory");
        }

        if (state.combat.hp <= 0) {
            const xpGained = state.combat.xpAward;
            state.xp += xpGained;
            writeLine(TRANSLATIONS[state.lang].enemy_dead.replace("{enemy}", state.combat.name).replace("{xp}", xpGained), "combat-victory");

            if (state.combat.isGateBoss) {
                writeLine(state.lang === "tr"
                    ? "Yenilen düşman portalın kilidini açan büyüyü serbest bıraktı!"
                    : "The defeated boss triggers the portal locks to open!", "text-gold");

                const room = DUNGEON[state.currentRoom];
                if (room.locked && room.locked.north) {
                    delete room.locked.north;
                }
            }

            if (state.combat.isFinalBoss) {
                writeLine(TRANSLATIONS[state.lang].drake_defeat, "text-gold");
                inputEl.disabled = true;
                state.combat = null;
                DUNGEON[state.currentRoom].monsters = [];
                updateUI();
                return;
            }

            DUNGEON[state.currentRoom].monsters = [];
            state.combat = null;
            checkLevelUp();
            updateUI();
            return;
        }

        if (state.companion === "Cassyt") {
            triggerCassytCombatAssistance();
        }

        enemyCounterAttack();
    } else {
        writeLine(TRANSLATIONS[state.lang].combat_options_only);
    }
}

function triggerCassytCombatAssistance() {
    let roll = rollDice(3);
    if (roll === 1) {
        writeLine(state.lang === "tr" ? "Cassyt elini kaldırıp Kelemvor'a dua ediyor ve sizi kutsuyor! (Gelecek tur saldırı bonusunuz +2 artar)" : "Cassyt raises her hands and casts Bless! (+2 Attack bonus next turn)", "combat-victory");
        state.str += 1;
        state.dex += 1;
        state.int += 1;
        setTimeout(() => {
            state.str -= 1;
            state.dex -= 1;
            state.int -= 1;
        }, 10000);
    } else if (roll === 2) {
        let dmg = rollDice(6);
        state.combat.hp -= dmg;
        writeLine(state.lang === "tr" ? `Cassyt kutsal alev çağırıyor! ${state.combat.name} ${dmg} kutsal hasar aldı.` : `Cassyt casts Sacred Flame! Deal ${dmg} radiant damage to ${state.combat.name}.`, "combat-victory");
    } else {
        writeLine(state.lang === "tr" ? "Cassyt Kelemvor'un kutsal sembolünü gösterip bağırıyor: 'Geri çekilin yaratıklar!'" : "Cassyt raises her Kelemvor holy symbol: 'Turn back, foul abominations!'", "combat-victory");
        state.combat.ac = Math.max(8, state.combat.ac - 2);
    }
}

function enemyCounterAttack() {
    if (!state.combat) return;

    writeLine(TRANSLATIONS[state.lang].enemy_attack.replace("{enemy}", state.combat.name));
    let enemyHit = rollDice(20) + 2;
    writeLine(TRANSLATIONS[state.lang].enemy_roll.replace("{roll}", enemyHit).replace("{ac}", state.ac), "system-msg");

    if (enemyHit >= state.ac) {
        let enemyDmg = rollDice(state.combat.damage);
        state.hp -= enemyDmg;
        writeLine(TRANSLATIONS[state.lang].enemy_hit.replace("{enemy}", state.combat.name).replace("{dmg}", enemyDmg), "combat-log");

        if (state.hp <= 0) {
            writeLine(TRANSLATIONS[state.lang].player_dead, "combat-log");
            inputEl.disabled = true;
        }
    } else {
        writeLine(TRANSLATIONS[state.lang].enemy_miss.replace("{enemy}", state.combat.name), "combat-victory");
    }
    updateUI();
}

function checkLevelUp() {
    const xpNeeded = state.level * 100;
    if (state.xp >= xpNeeded) {
        state.level += 1;
        state.xp -= xpNeeded;
        state.maxHp += 6;
        state.hp = state.maxHp;

        state.str += 1;
        state.dex += 1;
        state.int += 1;

        writeLine(TRANSLATIONS[state.lang].lvl_up.replace("{level}", state.level).replace("{maxHp}", state.maxHp), "text-gold");
    }
}

function rollDice(sides) {
    return Math.floor(Math.random() * sides) + 1;
}

// Setup input listeners
inputEl.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        const cmd = inputEl.value;
        if (cmd) {
            logCommand(cmd);
            handleCommand(cmd);
            inputEl.value = "";
        }
    }
});

// Setup specific command overrides
window.useInventoryItem = useInventoryItem;
window.selectClass = selectClass;
window.setLanguage = setLanguage;

// Start Game
initDungeon();
renderBootArt();
updateUI();
