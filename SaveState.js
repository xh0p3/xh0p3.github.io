// Deterministic Lists for short password serialization
const ROOM_KEYS_LIST = Object.keys(DUNGEON_LOC).sort();

const CLASSES_LIST = ["Warrior", "Rogue", "Mage", "Cleric", "Ranger", "Paladin"];

const ALL_NPCS_LIST = ["yovir", "welcomers", "skulls", "todor", "brakk", "arvax"];

const STATE_FLAGS = [
    "gogglesEquipped",
    "readObeliskRunes",
    "blueLeverPulled",
    "greenLeverPulled",
    "allyKnight",
    "sunfireOilEquipped",
    "holdingBreath",
    "allyDragon",
    "tyrOfferingDone",
    "mirrorShattered",
    "readTomeActive",
    "yovirQuestOffered",
    "yovirQuestAccepted",
    "welcomersQuestOffered",
    "welcomersQuestAccepted",
    "arvaxQuestOffered",
    "cassytOfferActive"
];

const ADJECTIVES = [
    "happy", "sad", "swift", "brave", "calm", "angry", "silent", "loud",
    "bright", "dark", "gold", "iron", "rusty", "ancient", "magic", "cranky",
    "wild", "sleepy", "hungry", "clever", "proud", "noble", "grim", "shadow",
    "quick", "bold", "shy", "stone", "green", "blue", "red", "white"
];

const NOUNS = [
    "car", "woods", "bison", "crow", "wolf", "shield", "sword", "potion",
    "key", "dragon", "gate", "tomb", "grave", "chapel", "map", "altar",
    "chest", "rat", "ghoul", "zombie", "knight", "wizard", "lich", "drake",
    "bear", "hound", "path", "orb", "scroll", "tome", "staff", "ring"
];

// Dynamically compile all items that can exist in the game
const ALL_ITEM_TYPES_LIST = [];
for (const roomKey in DUNGEON_LOC) {
    DUNGEON_LOC[roomKey].items.forEach(i => {
        if (typeof i.name === "object") {
            if (i.name.en && !ALL_ITEM_TYPES_LIST.includes(i.name.en)) ALL_ITEM_TYPES_LIST.push(i.name.en);
            if (i.name.tr && !ALL_ITEM_TYPES_LIST.includes(i.name.tr)) ALL_ITEM_TYPES_LIST.push(i.name.tr);
        } else if (typeof i.name === "string" && !ALL_ITEM_TYPES_LIST.includes(i.name)) {
            ALL_ITEM_TYPES_LIST.push(i.name);
        }
    });
}
const EXTRA_ITEMS = [
    "Shield", "Kalkan",
    "Healing Potion", "İyileşme İksiri",
    "Elixir of Healing", "Goggles of Night", "Gece Gözlüğü",
    "Splint Mail", "Yarım Plaka Zırh",
    "Iron Key", "Demir Anahtar",
    "Bronze Key", "Bronz Anahtar"
];
EXTRA_ITEMS.forEach(name => {
    if (!ALL_ITEM_TYPES_LIST.includes(name)) {
        ALL_ITEM_TYPES_LIST.push(name);
    }
});
ALL_ITEM_TYPES_LIST.sort();

// Dynamically compile all monsters in the game
const ALL_MONSTERS_LIST = [];
ROOM_KEYS_LIST.forEach(roomKey => {
    DUNGEON_LOC[roomKey].monsters.forEach((m, monsterIndex) => {
        ALL_MONSTERS_LIST.push({ roomKey, monsterIndex, name: m.name });
    });
});

// Dynamically compile all items in rooms in the game
const ALL_ITEMS_LIST = [];
ROOM_KEYS_LIST.forEach(roomKey => {
    DUNGEON_LOC[roomKey].items.forEach((i, itemIndex) => {
        ALL_ITEMS_LIST.push({ roomKey, itemIndex, itemTemplate: i });
    });
});

// Dynamically compile all doors/locks in the game
const ALL_LOCKS_LIST = [];
ROOM_KEYS_LIST.forEach(roomKey => {
    const loc = DUNGEON_LOC[roomKey];
    if (loc.locked) {
        Object.keys(loc.locked).sort().forEach(dir => {
            ALL_LOCKS_LIST.push({ roomKey, dir });
        });
    }
});

// Dynamic room flags checklist
const ALL_FLAGS_LIST = [
    { roomKey: "sedrair_tomb", prop: "crownStolen" },
    { roomKey: "shrine_mourning", prop: "altarUsed" },
    { roomKey: "crypt_ancients", prop: "chestLocked" },
    { roomKey: "torture_vaults", prop: "knightRescued" },
    { roomKey: "blackfist_bridge", prop: "bridgeChestOpened" },
    { roomKey: "dragon_egg_chamber", prop: "eggsDestroyed" },
    { roomKey: "dragon_roost", prop: "dragonFreed" },
    { roomKey: "sunken_temple", prop: "tyrOfferingDone" }
];

function binToHex(binStr) {
    let hex = "";
    // Pad to multiple of 4
    const padLen = (4 - (binStr.length % 4)) % 4;
    const padded = binStr + "0".repeat(padLen);
    for (let i = 0; i < padded.length; i += 4) {
        const chunk = padded.substring(i, i + 4);
        hex += parseInt(chunk, 2).toString(16);
    }
    return hex;
}

function hexToBin(hexStr, expectedLen) {
    let bin = "";
    for (let i = 0; i < hexStr.length; i++) {
        const val = parseInt(hexStr[i], 16);
        bin += val.toString(2).padStart(4, "0");
    }
    return bin.substring(0, expectedLen);
}

function generateWordPassword() {
    const adj1 = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    const noun1 = NOUNS[Math.floor(Math.random() * NOUNS.length)];
    const noun2 = NOUNS[Math.floor(Math.random() * NOUNS.length)];
    
    // Choose 2 or 3 words
    if (Math.random() > 0.5) {
        return `${adj1}-${noun1}`;
    } else {
        return `${adj1}-${noun1}-${noun2}`;
    }
}

function generateUniquePasswordKey() {
    let pwd;
    let attempts = 0;
    do {
        pwd = generateWordPassword();
        attempts++;
    } while (localStorage.getItem("MOC-SAVE-" + pwd) !== null && attempts < 100);
    return pwd;
}

function getRawSaveString() {
    const classIdx = CLASSES_LIST.indexOf(state.class) + 1;
    const companionIdx = state.companion === "Cassyt" ? 1 : 0;
    
    let flagsBitmask = 0;
    STATE_FLAGS.forEach((flag, index) => {
        if (state[flag]) {
            flagsBitmask |= (1 << index);
        }
    });

    const invItemIdxs = state.inventory.map(item => {
        const idx = ALL_ITEM_TYPES_LIST.indexOf(item.name);
        return idx !== -1 ? idx : 0;
    });

    let monsterBits = "";
    ALL_MONSTERS_LIST.forEach(item => {
        const room = DUNGEON[item.roomKey];
        const m = room ? room.monsters.find(mon => mon.name === item.name) : null;
        const alive = (m && m.hp > 0) ? "1" : "0";
        monsterBits += alive;
    });
    const monsterHex = binToHex(monsterBits);

    let itemBits = "";
    ALL_ITEMS_LIST.forEach(item => {
        const room = DUNGEON[item.roomKey];
        const template = item.itemTemplate;
        const enName = typeof template.name === "string" ? template.name : template.name.en;
        const trName = typeof template.name === "string" ? template.name : template.name.tr;
        const present = (room && room.items.some(i => i.name === enName || i.name === trName)) ? "1" : "0";
        itemBits += present;
    });
    const itemHex = binToHex(itemBits);

    let lockBits = "";
    ALL_LOCKS_LIST.forEach(item => {
        const room = DUNGEON[item.roomKey];
        const locked = (room && room.locked && room.locked[item.dir]) ? "1" : "0";
        lockBits += locked;
    });
    const lockHex = binToHex(lockBits);

    let specialFlagBits = "";
    ALL_FLAGS_LIST.forEach(item => {
        const room = DUNGEON[item.roomKey];
        const flagVal = (room && room[item.prop]) ? "1" : "0";
        specialFlagBits += flagVal;
    });
    const specialFlagHex = binToHex(specialFlagBits);

    const npcDialogueStr = ALL_NPCS_LIST.map(npc => {
        const val = state.npcDialogueIndices[npc];
        return val === undefined ? -2 : val;
    }).join(",");

    const parts = [
        classIdx,
        state.level,
        state.xp,
        state.hp,
        state.maxHp,
        state.gold,
        ROOM_KEYS_LIST.indexOf(state.currentRoom),
        ROOM_KEYS_LIST.indexOf(state.previousRoom),
        companionIdx,
        flagsBitmask,
        state.antitoxinDuration,
        invItemIdxs.join(","),
        monsterHex,
        itemHex,
        lockHex,
        specialFlagHex,
        npcDialogueStr
    ];

    return parts.join("-");
}

function generateSavePassword() {
    if (state.combat) {
        writeLine(state.lang === "tr"
            ? "Savaş sırasında oyun kaydedilemez!"
            : "You cannot save the game during combat!", "combat-log");
        return null;
    }

    try {
        const rawStr = getRawSaveString();
        const base64 = btoa(rawStr).replace(/=+$/, "");
        
        // Generate a 2-3 word password key
        const wordKey = generateUniquePasswordKey();
        
        // Store in localStorage
        localStorage.setItem("MOC-SAVE-" + wordKey, base64);

        writeLine(state.lang === "tr"
            ? "Oyun başarıyla kaydedildi! İşte kayıt şifreniz:"
            : "Game saved successfully! Here is your save state password:", "combat-victory");
        writeLine(wordKey, "text-gold");
        writeLine(state.lang === "tr"
            ? "Geri yüklemek için istediğiniz zaman 'yükle [şifre]' yazın."
            : "To restore your progress at any time, type 'load [password]'.", "system-msg");
        return wordKey;
    } catch (e) {
        console.error("Save failed:", e);
        writeLine(state.lang === "tr"
            ? "Kayıt şifresi oluşturulurken bir hata oluştu."
            : "An error occurred while generating the save password.", "combat-log");
        return null;
    }
}

function loadSavePassword(password) {
    if (state.combat) {
        writeLine(state.lang === "tr"
            ? "Savaş sırasında oyun yüklenemez!"
            : "You cannot load a game during combat!", "combat-log");
        return false;
    }

    let cleanPwd = password.trim();
    let base64Data = "";

    // If it's a word-based password key, retrieve from localStorage
    if (!cleanPwd.startsWith("MOC-") && cleanPwd.includes("-") && !cleanPwd.includes("/")) {
        const saved = localStorage.getItem("MOC-SAVE-" + cleanPwd);
        if (saved) {
            base64Data = saved;
        } else {
            writeLine(state.lang === "tr"
                ? `Bu şifre için kayıtlı bir oyun bulunamadı: ${cleanPwd}`
                : `No save state found for password: ${cleanPwd}`, "combat-log");
            return false;
        }
    } else {
        // Otherwise, treat as direct base64 data
        if (cleanPwd.startsWith("MOC-")) {
            cleanPwd = cleanPwd.substring(4);
        }
        base64Data = cleanPwd;
    }

    try {
        const rawStr = atob(base64Data);
        const parts = rawStr.split("-");

        if (parts.length < 17) {
            throw new Error("Invalid password format");
        }

        const classIdx = parseInt(parts[0]);
        const level = parseInt(parts[1]);
        const xp = parseInt(parts[2]);
        const hp = parseInt(parts[3]);
        const maxHp = parseInt(parts[4]);
        const gold = parseInt(parts[5]);
        const roomIdx = parseInt(parts[6]);
        const prevRoomIdx = parseInt(parts[7]);
        const companionIdx = parseInt(parts[8]);
        const flagsBitmask = parseInt(parts[9]);
        const antitoxinDuration = parseInt(parts[10]);
        
        const invIdxsStr = parts[11];
        const invItemIdxs = invIdxsStr ? invIdxsStr.split(",").map(x => parseInt(x)) : [];

        const monsterHex = parts[12];
        const itemHex = parts[13];
        const lockHex = parts[14];
        const specialFlagHex = parts[15];
        
        const npcIdxsStr = parts[16];
        const npcIdxs = npcIdxsStr.split(",").map(x => parseInt(x));

        // Restore player state properties
        state.class = classIdx === 0 ? null : CLASSES_LIST[classIdx - 1];
        state.level = level;
        state.xp = xp;
        state.hp = hp;
        state.maxHp = maxHp;
        state.gold = gold;
        state.currentRoom = ROOM_KEYS_LIST[roomIdx];
        state.previousRoom = ROOM_KEYS_LIST[prevRoomIdx];
        state.companion = companionIdx === 1 ? "Cassyt" : null;
        state.antitoxinDuration = antitoxinDuration;

        // Restore global state flags
        STATE_FLAGS.forEach((flag, index) => {
            state[flag] = !!(flagsBitmask & (1 << index));
        });

        // Restore weapon/armor from class templates
        if (state.class) {
            state.weaponName = CLASSES[state.class].weaponName[state.lang];
            state.weaponDamage = CLASSES[state.class].weaponDamage;
            state.skills = [...CLASSES[state.class].skills];
            state.ac = CLASSES[state.class].ac;
        } else {
            state.weaponName = "Fists";
            state.weaponDamage = 4;
            state.skills = [];
            state.ac = 10;
        }

        // Restore inventory items
        state.inventory = [];
        invItemIdxs.forEach(idx => {
            const name = ALL_ITEM_TYPES_LIST[idx];
            if (!name) return;
            // Construct item details from templates in DUNGEON_LOC
            let foundItem = null;
            for (const rKey in DUNGEON_LOC) {
                const locItem = DUNGEON_LOC[rKey].items.find(i => (typeof i.name === "string" ? i.name : i.name[state.lang]) === name);
                if (locItem) {
                    foundItem = {
                        name: typeof locItem.name === "string" ? locItem.name : locItem.name[state.lang],
                        desc: typeof locItem.desc === "string" ? locItem.desc : locItem.desc[state.lang],
                        type: locItem.type,
                        heal: locItem.heal,
                        acBonus: locItem.acBonus,
                        damageOverride: locItem.damageOverride,
                        antitoxin: locItem.antitoxin,
                        palOnly: locItem.palOnly
                    };
                    break;
                }
            }
            if (!foundItem) {
                foundItem = { name: name, desc: "", type: "loot" };
                if (name === "Shield" || name === "Kalkan") {
                    foundItem.type = "shield";
                    foundItem.acBonus = 1;
                } else if (name === "Healing Potion" || name === "İyileşme İksiri") {
                    foundItem.type = "potion";
                    foundItem.heal = 15;
                }
            }
            state.inventory.push(foundItem);
        });

        // Re-calculate AC
        const hasShield = state.inventory.some(i => i.type === "shield");
        const hasPlate = state.inventory.some(i => i.name === "Splint Mail" || i.name === "Yarım Plaka Zırh");
        const hasCloakOfSpiders = state.inventory.some(i => i.name === "Spider Silk Cloak");
        let acBonus = hasShield ? 1 : 0;
        if (hasPlate) acBonus += 3;
        if (hasCloakOfSpiders) acBonus += 2;
        if (state.gogglesEquipped) acBonus += 1;
        
        if (state.class) {
            state.ac = CLASSES[state.class].ac + acBonus;
        } else {
            state.ac = 10 + acBonus;
        }

        // Initialize dungeon
        initDungeon();

        // Restore monsters checklist
        const monsterBin = hexToBin(monsterHex, ALL_MONSTERS_LIST.length);
        ALL_MONSTERS_LIST.forEach((item, index) => {
            const room = DUNGEON[item.roomKey];
            if (room) {
                const m = room.monsters.find(mon => mon.name === item.name);
                if (m) {
                    const isAlive = monsterBin[index] === "1";
                    if (!isAlive) {
                        m.hp = 0;
                        m.defeatedChecked = true;
                    }
                }
            }
        });

        // Restore items taken checklist
        const itemBin = hexToBin(itemHex, ALL_ITEMS_LIST.length);
        ALL_ITEMS_LIST.forEach((item, index) => {
            const room = DUNGEON[item.roomKey];
            if (room) {
                const isPresent = itemBin[index] === "1";
                if (!isPresent) {
                    const template = item.itemTemplate;
                    const enName = typeof template.name === "string" ? template.name : template.name.en;
                    const trName = typeof template.name === "string" ? template.name : template.name.tr;
                    room.items = room.items.filter(i => i.name !== enName && i.name !== trName);
                }
            }
        });

        // Restore locks checklist
        const lockBin = hexToBin(lockHex, ALL_LOCKS_LIST.length);
        ALL_LOCKS_LIST.forEach((item, index) => {
            const room = DUNGEON[item.roomKey];
            if (room && room.locked) {
                const isLocked = lockBin[index] === "1";
                if (!isLocked) {
                    delete room.locked[item.dir];
                }
            }
        });

        // Restore special room flags
        const specialFlagBin = hexToBin(specialFlagHex, ALL_FLAGS_LIST.length);
        ALL_FLAGS_LIST.forEach((item, index) => {
            const room = DUNGEON[item.roomKey];
            if (room) {
                room[item.prop] = specialFlagBin[index] === "1";
            }
        });

        // Restore NPC dialogue indices
        ALL_NPCS_LIST.forEach((npc, index) => {
            const val = npcIdxs[index];
            if (val === -2) {
                delete state.npcDialogueIndices[npc];
            } else {
                state.npcDialogueIndices[npc] = val;
            }
        });

        writeLine(state.lang === "tr"
            ? "Kayıt başarıyla yüklendi!"
            : "Save state loaded successfully!", "combat-victory");

        updateUI();
        describeRoom();
        return true;
    } catch (e) {
        console.error("Load failed:", e);
        writeLine(state.lang === "tr"
            ? "Geçersiz şifre! Kayıt yüklenemedi."
            : "Invalid password! Failed to load save state.", "combat-log");
        return false;
    }
}
