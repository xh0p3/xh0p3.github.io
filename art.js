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
