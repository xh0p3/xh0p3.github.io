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

    // Calculate equipped items
    let armorText = state.lang === "tr" ? "Deri Zırh" : "Leather Armor";
    if (hasPlate) {
        armorText = state.lang === "tr" ? "Yarım Plaka Zırh" : "Splint Mail";
    }
    if (hasShield) {
        armorText += " + " + (state.lang === "tr" ? "Kalkan" : "Shield");
    }

    let gearList = [];
    if (state.gogglesEquipped) {
        gearList.push(state.lang === "tr" ? "Gece Gözlüğü" : "Goggles of Night");
    }
    if (hasCloakOfSpiders) {
        gearList.push(state.lang === "tr" ? "Örümcek İpeği Pelerini" : "Spider Silk Cloak");
    }
    if (state.sunfireOilEquipped) {
        gearList.push(state.lang === "tr" ? "Güneşateşi Yağı (Silah)" : "Sunfire Oil (Weapon)");
    }
    let gearText = gearList.length > 0 ? gearList.join(", ") : (state.lang === "tr" ? "Yok" : "None");

    let allyList = [];
    if (state.companion === "Cassyt") {
        allyList.push("Cassyt");
    }
    if (state.allyKnight) {
        allyList.push("Sir Kevin");
    }
    if (state.allyDragon) {
        allyList.push(state.lang === "tr" ? "Arvax (Ejderha)" : "Arvax (Dragon)");
    }
    let allyText = allyList.length > 0 ? allyList.join(", ") : (state.lang === "tr" ? "Yok" : "None");

    document.getElementById("wear-weapon").textContent = state.weaponName;
    document.getElementById("wear-armor").textContent = armorText;
    document.getElementById("wear-gear").textContent = gearText;
    document.getElementById("wear-allies").textContent = allyText;

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

    if (state.cassytOfferActive) {
        const inviteOptions = [
            { cmd: "invite cassyt", label: state.lang === "tr" ? "Cassyt'i davet et" : "invite cassyt" },
            { cmd: "do not invite", label: state.lang === "tr" ? "davet etme" : "do not invite" }
        ];
        inviteOptions.forEach(opt => {
            const chip = document.createElement("span");
            chip.className = "chip";
            chip.textContent = opt.label;
            chip.onclick = () => {
                logCommand(opt.label);
                handleCommand(opt.cmd);
            };
            chipsContainer.appendChild(chip);
        });
        return;
    }

    if (state.yovirQuestOffered) {
        const questOptions = [
            { cmd: "accept quest", label: state.lang === "tr" ? "görevi kabul et" : "accept quest" },
            { cmd: "decline quest", label: state.lang === "tr" ? "görevi reddet" : "decline quest" }
        ];
        questOptions.forEach(opt => {
            const chip = document.createElement("span");
            chip.className = "chip";
            chip.textContent = opt.label;
            chip.onclick = () => {
                logCommand(opt.label);
                handleCommand(opt.cmd);
            };
            chipsContainer.appendChild(chip);
        });
        return;
    }

    if (state.welcomersQuestOffered) {
        const questOptions = [
            { cmd: "accept welcomers", label: state.lang === "tr" ? "kaçakçılara yardım et" : "accept welcomers" },
            { cmd: "decline welcomers", label: state.lang === "tr" ? "kaçakçıları reddet" : "decline welcomers" }
        ];
        questOptions.forEach(opt => {
            const chip = document.createElement("span");
            chip.className = "chip";
            chip.textContent = opt.label;
            chip.onclick = () => {
                logCommand(opt.label);
                handleCommand(opt.cmd);
            };
            chipsContainer.appendChild(chip);
        });
        return;
    }

    if (state.arvaxQuestOffered) {
        const questOptions = [
            { cmd: "accept quest", label: state.lang === "tr" ? "görevi kabul et" : "accept quest" },
            { cmd: "decline quest", label: state.lang === "tr" ? "görevi reddet" : "decline quest" }
        ];
        questOptions.forEach(opt => {
            const chip = document.createElement("span");
            chip.className = "chip";
            chip.textContent = opt.label;
            chip.onclick = () => {
                logCommand(opt.label);
                handleCommand(opt.cmd);
            };
            chipsContainer.appendChild(chip);
        });
        return;
    }

    const room = DUNGEON[state.currentRoom];
    let options = [];

    if (state.combat) {
        const fleeCmd = state.lang === "tr" ? "kaç" : "flee";
        const aliveMonsters = state.combat.monsters.filter(m => m.hp > 0);

        if (!state.combat.skillUsed) {
            options = [];
            
            // Mage's fireball is AoE and doesn't need target specification
            if (state.class === "Mage") {
                const skillCmd = getSkillCommand();
                const skillLbl = getSkillTranslation();
                options.push({ cmd: skillCmd, label: skillLbl });
            } else if (state.class === "Cleric") {
                // Cleric's heal is self target and doesn't need enemy target
                const skillCmd = getSkillCommand();
                const skillLbl = getSkillTranslation();
                options.push({ cmd: skillCmd, label: skillLbl });
            } else {
                // Other classes target specific enemies
                aliveMonsters.forEach(m => {
                    const targetName = `${m.name} (#${m.id})`;
                    const skillCmd = `${getSkillCommand()} ${m.id}`;
                    const skillLbl = `${getSkillTranslation()} -> ${targetName}`;
                    options.push({ cmd: skillCmd, label: skillLbl });
                });
            }
            options.push(fleeCmd);
        } else {
            options = [];
            aliveMonsters.forEach(m => {
                const targetName = `${m.name} (#${m.id})`;
                const attackCmd = `attack ${m.id}`;
                const attackLbl = `${state.lang === "tr" ? "saldır" : "attack"} -> ${targetName}`;
                options.push({ cmd: attackCmd, label: attackLbl });
            });
            options.push(fleeCmd);
        }
    } else {
        const lookCmd = state.lang === "tr" ? "bak" : "look";
        options = [lookCmd];

        const addedRooms = new Set();
        for (const dir in room.exits) {
            const targetRoom = room.exits[dir];
            if (addedRooms.has(targetRoom)) continue;
            addedRooms.add(targetRoom);

            // Skip showing the east exit chip in jaxana_tomb if she is still sleeping or alive
            if (state.currentRoom === "jaxana_tomb" && dir === "east" && room.monsters && room.monsters.length > 0) {
                continue;
            }

            // Skip showing the north exit chip in whispering_vaults if riddle is not solved
            if (state.currentRoom === "whispering_vaults" && dir === "north" && room.locked && room.locked.north) {
                continue;
            }

            // Skip showing the north exit chip in thayan_lab if levers not solved
            if (state.currentRoom === "thayan_lab" && dir === "north" && room.locked && room.locked.north) {
                continue;
            }

            // Skip showing the north exit chip in sanctum_gates if riddle not solved
            if (state.currentRoom === "sanctum_gates" && dir === "north" && room.locked && room.locked.north) {
                continue;
            }

            // Skip showing the north exit chip in mirror_maze if focus mirror is not broken
            if (state.currentRoom === "mirror_maze" && dir === "north" && !state.mirrorShattered) {
                continue;
            }

            const goCmd = state.lang === "tr" ? `git ${dir}` : `go ${dir}`;
            const labelMap = DUNGEON_LOC[state.currentRoom].exitLabels;
            let displayLabel = labelMap && labelMap[dir] ? labelMap[dir][state.lang] : `${state.lang === "tr" ? "git" : "go"} ${dir}`;

            options.push({ cmd: goCmd, label: displayLabel });
        }

        if (room.npcs && room.npcs.length > 0) {
            room.npcs.forEach(n => {
                const npcKey = n.toLowerCase();
                const isExhausted = state.npcDialogueIndices[npcKey] === -1;
                if (!isExhausted) {
                    const talkCmd = state.lang === "tr" ? "konuş" : "talk";
                    options.push(`${talkCmd} ${npcKey}`);
                }
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

        // Add save chip
        options.push(state.lang === "tr" ? "kaydet" : "save");
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
    state.previousRoom = "graveyard";
    state.combat = null;
    state.npcDialogueIndices = {};
    state.companion = null;
    state.gogglesEquipped = false;
    state.readObeliskRunes = false;
    state.blueLeverPulled = false;
    state.greenLeverPulled = false;
    state.allyKnight = false;
    state.sunfireOilEquipped = false;
    state.yovirQuestOffered = false;
    state.yovirQuestAccepted = false;
    state.welcomersQuestOffered = false;
    state.welcomersQuestAccepted = false;
    state.arvaxQuestOffered = false;
    state.antitoxinDuration = 0;
    state.cassytOfferActive = false;

    document.getElementById("class-select-screen").classList.remove("hidden");
    document.getElementById("char-stats-info").classList.add("hidden");
    inputEl.removeAttribute("disabled");

    initDungeon();
    renderBootArt();
    updateUI();
}

