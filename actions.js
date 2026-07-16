function handleCommand(cmdText) {
    const input = cmdText.trim().toLowerCase();
    if (!input) return;

    if (state.class && state.hp <= 0) {
        if (input === "restart" || input === "yeniden başlat" || input === "restart game") {
            restartGame();
        }
        return;
    }

    // Save and Load State Commands
    if (input === "save" || input === "kaydet") {
        generateSavePassword();
        return;
    }
    if (input.startsWith("load ") || input.startsWith("yükle ")) {
        const password = cmdText.trim().substring(input.indexOf(" ") + 1);
        loadSavePassword(password);
        return;
    }
    if (input === "load" || input === "yükle") {
        writeLine(state.lang === "tr"
            ? "Lütfen kayıt şifresini girin. Örn: 'yükle MOC-ey...'"
            : "Please specify the save password. E.g.: 'load MOC-ey...'", "combat-log");
        return;
    }

    // Cassyt invite offer checks
    if (state.cassytOfferActive) {
        if (input === "invite cassyt" || input === "invite" || input === "cassyt'i davet et" || input === "davet et") {
            state.companion = "Cassyt";
            writeLine(state.lang === "tr" ? "Cassyt gülümsüyor ve ekibinize katılıyor!" : "Cassyt smiles and joins your party!", "combat-victory");
            state.cassytOfferActive = false;
            state.npcDialogueIndices["yovir"] = -1; // Exhausted
        } else if (input === "do not invite" || input === "davet etme" || input === "do not invite cassyt") {
            state.companion = null;
            writeLine(state.lang === "tr" 
                ? "Yalnız gitmeye karar verdiniz. Cassyt hayal kırıklığına uğramış görünüyor ama başıyla onaylıyor: 'Kelemvor sizi korusun.'" 
                : "You decide to go alone. Cassyt looks disappointed but nods: 'May Kelemvor protect you.'", "combat-victory");
            state.cassytOfferActive = false;
            state.npcDialogueIndices["yovir"] = -1; // Exhausted
        } else {
            writeLine(state.lang === "tr" 
                ? "Lütfen Cassyt'i davet edin ('invite cassyt') ya da davet etmeyin ('do not invite')." 
                : "Please invite Cassyt ('invite cassyt') or decline ('do not invite').");
        }
        updateUI();
        return;
    }

    // Quest offer checks
    if (state.yovirQuestOffered) {
        if (input === "accept quest" || input === "accept" || input === "görevi kabul et" || input === "kabul") {
            state.yovirQuestOffered = false;
            state.yovirQuestAccepted = true;
            
            const dialogues = NPC_DIALOGUES_LOC["yovir"][state.lang];
            writeLine(dialogues[3], "combat-victory");

            state.inventory.push({
                name: "Iron Key",
                desc: "A heavy iron key. Unlocks the banquet hall shaft gate.",
                type: "key"
            });
            writeLine(state.lang === "tr" ? "Demir Anahtar envantere eklendi!" : "Iron Key added to inventory!", "text-gold");
            
            state.cassytOfferActive = true;
        } else if (input === "decline quest" || input === "decline" || input === "görevi reddet" || input === "reddet") {
            state.yovirQuestOffered = false;
            writeLine(state.lang === "tr"
                ? "Görevi reddettiniz. Glandon iç çekiyor: 'Kararınıza saygı duyuyorum. Fikriniz değişirse buradayım.'"
                : "You declined the quest. Glandon sighs: 'I respect your choice. If you change your mind, I will be here.'", "combat-log");
            state.npcDialogueIndices["yovir"] = 2; // Offer again
        } else {
            writeLine(state.lang === "tr" ? "Lütfen görevi kabul edin ('accept') veya reddedin ('decline')." : "Please accept or decline the quest.");
        }
        updateUI();
        return;
    }

    if (state.welcomersQuestOffered) {
        if (input === "accept welcomers" || input === "accept" || input === "kaçakçılara yardım et" || input === "kabul") {
            state.welcomersQuestOffered = false;
            state.welcomersQuestAccepted = true;
            state.gold += 80;
            writeLine(state.lang === "tr"
                ? "Görevi kabul ettiniz! Kaçakçılara yardım etmeyi kabul ettiğiniz için size 80 Altın verip kaçtılar."
                : "You accepted the quest! The smugglers reward you with 80 GP and head for the exit.", "combat-victory");
            state.npcDialogueIndices["welcomers"] = -1; // Exhausted
        } else if (input === "decline welcomers" || input === "decline" || input === "kaçakçıları reddet" || input === "reddet") {
            state.welcomersQuestOffered = false;
            writeLine(state.lang === "tr"
                ? "Görevi reddettiniz. Kaçakçılar söyleniyor: 'Pekala, başımızın çaresine bakarız.'"
                : "You declined the quest. The smugglers grumble: 'Fine, we'll find our own way out.'", "combat-log");
            state.npcDialogueIndices["welcomers"] = 2; // Offer again
        } else {
            writeLine(state.lang === "tr" ? "Lütfen kabul edin ('accept') veya reddedin ('decline')." : "Please accept or decline.");
        }
        updateUI();
        return;
    }

    if (state.arvaxQuestOffered) {
        if (input === "accept quest" || input === "accept" || input === "free dragon" || input === "ejderhayı serbest bırak" || input === "kabul") {
            state.arvaxQuestOffered = false;
            const hasKey = state.inventory.some(i => i.name === "Iron Key");
            if (!hasKey) {
                writeLine(state.lang === "tr"
                    ? "Arvax'ın kurtuluşunu kabul ettiniz, ancak zincirlerini açmak için bir Demir Anahtara ihtiyacınız var!"
                    : "You accept Arvax's quest, but you need the Iron Key to unlock his chains!", "combat-log");
                state.npcDialogueIndices["arvax"] = 1; // Can offer again
            } else {
                const keyIdx = state.inventory.findIndex(i => i.name === "Iron Key");
                state.inventory.splice(keyIdx, 1);
                const room = DUNGEON["dragon_roost"];
                room.dragonFreed = true;
                state.allyDragon = true;
                writeLine(state.lang === "tr"
                    ? "Görevi kabul ettiniz! Demir Anahtarı kullanarak Arvax'ın zincirlerini açıyorsunuz. Bronz ejderha müttefikinize katıldı!"
                    : "You accepted the quest! You use the Iron Key to free Arvax. The bronze dragon joins as a combat ally!", "combat-victory");
                state.npcDialogueIndices["arvax"] = -1; // Exhausted
            }
        } else if (input === "decline quest" || input === "decline" || input === "ejderhayı reddet" || input === "reddet") {
            state.arvaxQuestOffered = false;
            writeLine(state.lang === "tr"
                ? "Görevi reddettiniz. Arvax zincirleri içinde inliyor ve kafasını çeviriyor."
                : "You declined the quest. Arvax rumbles sadly and turns his massive head away.", "combat-log");
            state.npcDialogueIndices["arvax"] = 1; // Can offer again
        } else {
            writeLine(state.lang === "tr" ? "Lütfen kabul edin ('accept') veya reddedin ('decline')." : "Please accept or decline.");
        }
        updateUI();
        return;
    }

    let combatInput = input;
    if (state.combat) {
        // Parse base action and target ID
        const parts = input.split(" ");
        let baseAction = parts[0];
        const targetSpec = parts[parts.length - 1];
        const hasTargetId = !isNaN(parseInt(targetSpec)) && parts.length > 1;

        if (hasTargetId) {
            baseAction = parts.slice(0, -1).join(" ");
        }

        // Translate Turkish base action
        let transAction = baseAction;
        if (baseAction === "saldır") transAction = "attack";
        if (baseAction === "kaç") transAction = "flee";
        if (baseAction === "iyileş") transAction = "heal";
        if (baseAction === "çift atış") transAction = "double shot";
        if (baseAction === "darbe") transAction = "smite";
        if (baseAction === "hücum") transAction = "charge";
        if (baseAction === "gizli saldırı") transAction = "sneak attack";
        if (baseAction === "ateş topu") transAction = "fireball";

        combatInput = hasTargetId ? `${transAction} ${targetSpec}` : transAction;

        const classSkill = getSkillCommand();
        if (!state.combat.skillUsed && transAction === "attack") {
            const err = state.lang === "tr"
                ? `Önce sınıf yeteneğinizi (${getSkillTranslation()}) kullanmalısınız!`
                : `You must use your class-specific skill (${classSkill}) first!`;
            writeLine(err, "combat-log");
            return;
        }

        if (state.combat.skillUsed && transAction === classSkill) {
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

    // Graveyard exit block until quest accepted (Floor 1 entrance)
    if (state.currentRoom === "graveyard" && (dir === "south" || dir === "down") && !state.yovirQuestAccepted) {
        writeLine(state.lang === "tr"
            ? "Doomguide Glandon, siz onun görevini kabul edene kadar mahzenlere girmenizi yasakladı!"
            : "Doomguide Glandon has forbidden entry to the catacombs until you accept his quest!", "combat-log");
        return;
    }

    // Shadow dragon block (Floor 5)
    if (state.currentRoom === "jaxana_tomb" && dir === "east" && room.monsters && room.monsters.length > 0) {
        writeLine(state.lang === "tr"
            ? "Jaxana yolu kapatıyor! Önce yanından gizlice sızmalısınız ('sneak past dragon') veya onunla savaşmalısınız."
            : "Jaxana blocks the portal! You must sneak past her ('sneak past dragon') or defeat her first.", "combat-log");
        return;
    }

    // Mirror maze block (Floor 10)
    if (state.currentRoom === "mirror_maze" && dir === "north" && !state.mirrorShattered) {
        writeLine(state.lang === "tr"
            ? "Aynalardaki yansımalarınız yolunuzu kesiyor! Odak Aynayı kırmalısınız ('shatter mirror')."
            : "Your reflections block the path! You must shatter the focus mirror ('shatter mirror') first.", "combat-log");
        return;
    }

    // Whispering Vaults riddle block (Floor 3)
    if (state.currentRoom === "whispering_vaults" && dir === "north" && room.locked && room.locked.north) {
        writeLine(state.lang === "tr"
            ? "Kuzey geçidi kapalı! Geçmek için taş ağzın bilmecesini çözmelisiniz ('answer ...')."
            : "The north passage is closed! You must solve the stone mouth's riddle to pass ('answer ...').", "combat-log");
        return;
    }

    // Thayan Lab levers block (Floor 4)
    if (state.currentRoom === "thayan_lab" && dir === "north" && room.locked && room.locked.north) {
        writeLine(state.lang === "tr"
            ? "Demir parmaklıklar kapalı! Geçmek için kolların doğru kombinasyonunu bulmalısınız ('pull ...')."
            : "The portcullis is closed! You must find the correct lever combination to pass ('pull ...').", "combat-log");
        return;
    }

    // Sanctum Gates riddle block (Floor 6)
    if (state.currentRoom === "sanctum_gates" && dir === "north" && room.locked && room.locked.north) {
        writeLine(state.lang === "tr"
            ? "Büyük Tapınak Kapıları kapalı! Geçmek için taş ağzın bilmecesini çözmelisiniz ('answer ...')."
            : "The Sanctum Gates are closed! You must solve the stone mouth's riddle to pass ('answer ...').", "combat-log");
        return;
    }

    // Runic vault gate check
    if (room.exits[dir] === "secret_vault") {
        if (!state.readObeliskRunes) {
            writeLine(state.lang === "tr"
                ? "Taş duvarın üzerindeki rünleri okuyamıyorsunuz. Önce Dikilitaş Odası'nda 'read runes' yazın!"
                : "The heavy stone wall is locked by glowing Celestial runes. You cannot decipher them yet! Read the Obelisk first.", "combat-log");
            return;
        } else {
            if (room.locked && room.locked[dir] === "Celestial Runes") {
                delete room.locked[dir];
            }
        }
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

    // Fungal forest spore poison damage (Chapter 12)
    if ((state.currentRoom === "fungal_forest" || nextRoomKey === "fungal_forest") && !state.holdingBreath && (!state.antitoxinDuration || state.antitoxinDuration <= 0)) {
        state.hp = Math.max(1, state.hp - 2);
        writeLine(state.lang === "tr"
            ? "Mantar sporlarını soludunuz! 2 zehir hasarı aldınız."
            : "You inhale the toxic spores! You take 2 poison damage.", "combat-log");
    }

    state.previousRoom = state.currentRoom;
    state.currentRoom = nextRoomKey;

    if (state.antitoxinDuration > 0) {
        state.antitoxinDuration--;
    }

    rollRandomEncounter(nextRoomKey);

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

    if (state.npcDialogueIndices[npcKey] === -1) {
        writeLine(state.lang === "tr" ? "Söyleyecek başka bir şeyleri yok." : "They have nothing more to say.");
        return;
    }

    if (npcKey === "yovir") {
        if (state.yovirQuestAccepted) {
            if (state.companion === "Cassyt") {
                writeLine(state.lang === "tr"
                    ? "Doomguide Yovir Glandon başıyla onaylar: 'Kelemvor sizi ve Cassyt'i korusun.'"
                    : "Doomguide Yovir Glandon nods: 'May Kelemvor protect you and Cassyt.'", "combat-victory");
                return;
            } else {
                writeLine(state.lang === "tr"
                    ? "Doomguide Yovir Glandon soruyor: 'Çırak Cassyt hala size rehberlik etmeye istekli. Onu ekibinize davet etmek istiyor musunuz?' (Cassyt'i davet et / Davet etme)"
                    : "Doomguide Yovir Glandon asks: 'Acolyte Cassyt is still willing to guide you. Do you want to invite her to join your party now?' (Invite Cassyt / Do not invite)", "text-gold");
                state.cassytOfferActive = true;
                updateUI();
                return;
            }
        }

        if (state.npcDialogueIndices[npcKey] === undefined) state.npcDialogueIndices[npcKey] = 0;
        const idx = state.npcDialogueIndices[npcKey];
        const dialogues = NPC_DIALOGUES_LOC[npcKey][state.lang];
        writeLine(dialogues[idx], "combat-victory");

        if (idx === 1) {
            state.inventory.push({
                name: state.lang === "tr" ? "Gece Gözlüğü" : "Goggles of Night",
                desc: "Gives darkvision. AC +1.",
                type: "ring"
            });
            state.gogglesEquipped = true;
            writeLine(state.lang === "tr" ? "Gece Gözlüğü kuşanıldı! (AC +1)" : "Goggles of Night equipped! (AC +1)", "text-gold");
        }

        if (idx === 2) {
            state.yovirQuestOffered = true;
            writeLine(state.lang === "tr"
                ? "Doomguide Glandon soruyor: 'Görevi kabul edip mahzenleri temizlemeyi onaylıyor musunuz?' (Kabul et / Reddet)"
                : "Doomguide Glandon asks: 'Do you accept the mission to cleanse the catacombs and save Phlan?' (Accept / Decline)", "text-gold");
            return; // Wait for accept/decline response without advancing index
        }

        if (idx >= dialogues.length - 1) {
            state.npcDialogueIndices[npcKey] = -1; // Exhausted
        } else {
            state.npcDialogueIndices[npcKey] = idx + 1;
        }
    } else {
        const dialogues = NPC_DIALOGUES_LOC[npcKey] && NPC_DIALOGUES_LOC[npcKey][state.lang];
        if (!dialogues) return;
        if (state.npcDialogueIndices[npcKey] === undefined) state.npcDialogueIndices[npcKey] = 0;
        const idx = state.npcDialogueIndices[npcKey];
        writeLine(dialogues[idx], "combat-victory");
        
        if (npcKey === "welcomers" && idx === 2) {
            state.welcomersQuestOffered = true;
            writeLine(state.lang === "tr"
                ? "Kaçakçılar soruyor: 'Bize yardım edecek misiniz?' (Yardım et / Reddet)"
                : "The smugglers ask: 'Will you help us escape?' (Accept / Decline)", "text-gold");
        }

        if (npcKey === "arvax" && idx === 1) {
            state.arvaxQuestOffered = true;
            writeLine(state.lang === "tr"
                ? "Arvax soruyor: 'Beni zincirlerimden kurtaracak mısın?' (Ejderhayı serbest bırak / Reddet)"
                : "Arvax asks: 'Will you unlock my chains?' (Free dragon / Decline)", "text-gold");
        }

        if (idx >= dialogues.length - 1) {
            if (npcKey !== "welcomers" && npcKey !== "arvax") {
                state.npcDialogueIndices[npcKey] = -1; // Exhausted
            }
        } else {
            state.npcDialogueIndices[npcKey] = idx + 1;
        }
    }
}

function useInventoryItem(index) {
    const item = state.inventory[index];
    if (!item) return;
    if (item.type === "potion") {
        state.inventory.splice(index, 1);
        if (item.antitoxin) {
            state.antitoxinDuration = 3;
            writeLine(state.lang === "tr"
                ? "Drow Panzehiri içtiniz! Bir sonraki 3 oda boyunca spor zehrine karşı bağışıklık kazandınız."
                : "You drink the Drow Antitoxin! You gain immunity to spore poison for the next 3 rooms.", "combat-victory");
        } else {
            const heal = item.heal || 10;
            const oldHp = state.hp;
            state.hp = Math.min(state.maxHp, state.hp + heal);
            writeLine(TRANSLATIONS[state.lang].potion_use.replace("{name}", item.name).replace("{heal}", state.hp - oldHp));
        }
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
        startCombat(room.monsters);
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

    let desc = room.description;

    // Dynamic flavor text updates based on puzzle/rescue/looting states
    if (state.currentRoom === "torture_vaults" && room.knightRescued) {
        desc = state.lang === "tr"
            ? "Zindan İşkence Odaları. Merkezdeki demir kafes şimdi boş ve kapısı açık duruyor. Sir Kevin kurtarıldı. Kuzey, Tapınak Kapılarına gidiyor. Batı, Kışlaya dönüyor."
            : "Citadel Torture Vaults. The iron cage in the center stands empty and open. Sir Kevin has been rescued. North leads to the Sanctum Gates. West returns to Barracks.";
    } else if (state.currentRoom === "dragon_roost" && room.dragonFreed) {
        desc = state.lang === "tr"
            ? "Ejderha Ağılı. Arvax'ı bağlayan ağır zincirler şimdi kırılmış ve yerde yatıyor. Tunç ejderha artık özgür. Doğu, Taht Odasına çıkıyor. Güney, Kale Yaklaşımına dönüyor."
            : "The Dragon's Roost. The heavy chains that bound Arvax lie broken on the floor. The bronze dragon is free. East leads to the Throne Chamber. South returns to Citadel Approach.";
    } else if (state.currentRoom === "crypt_ancients" && !room.chestLocked) {
        desc = state.lang === "tr"
            ? "Kat 2: Kadimlerin Mezarı. Merkezdeki demir sandık açılmış ve boşaltılmış. Batı tüneli daha derin mezarlara açılıyor."
            : "Floor 2: Crypt of the Ancients. The iron chest at the center has been opened and emptied. The west tunnel leads deeper into the tombs.";
    } else if (state.currentRoom === "blackfist_bridge" && room.bridgeChestOpened) {
        desc = state.lang === "tr"
            ? "Black Fist Köprüsü. Taş köprü sel basmış kanalı geçiyor. Küpeşteye zincirlenmiş demir sandık açılmış ve boşaltılmış. Kuzey, Liman İskelelerine çıkıyor. Batı, Meydana döner."
            : "The Blackfist Bridge. A stone bridge spans the flooded canal. The iron chest chained to the railing has been unlocked and emptied. North leads to the Harbor Docks. West returns to the Plaza.";
    } else if (state.currentRoom === "dragon_egg_chamber" && room.eggsDestroyed) {
        desc = state.lang === "tr"
            ? "Ejderha Yumurtası Odası. Yuva sadece kırılmış siyah yumurta kabukları ve külden ibaret. Batı, Ön Odaya döner."
            : "The Dragon Egg Chamber. The nest contains only shattered black eggshells and cold ash. West returns to the Antechamber.";
    } else if (state.currentRoom === "sedrair_tomb" && room.crownStolen) {
        desc = state.lang === "tr"
            ? "Sedrair'in Mezarı. Kraliçe Sedrair II'nin lahti boş duruyor, altın tacı yerinden alınmış. Batı, Dikilitaş Odasına dönüyor."
            : "Tomb of Sedrair II. Queen Sedrair II's sarcophagus lies bare, her golden crown taken. West returns to the Obelisk Room.";
    } else if (state.currentRoom === "shrine_mourning" && room.altarUsed) {
        desc = state.lang === "tr"
            ? "Yas Tapınağı. Jergal'ın sunağı şimdi sönük ve soğuk. Doğu, Uçuruma dönüyor."
            : "Shrine of Mourning. The altar of Jergal is now dim and cold. East returns to the Abyss.";
    } else if (state.currentRoom === "whispering_vaults" && (!room.locked || !room.locked.north)) {
        desc = state.lang === "tr"
            ? "Fısıldayan Mahzenler. Taş ağız sessiz ve açık duruyor. Kuzey tüneli açık. Güney, Uçuruma döner."
            : "The Whispering Vaults. The stone mouth is silent and open. The north tunnel is passable. South returns to the Abyss.";
    } else if (state.currentRoom === "sanctum_gates" && (!room.locked || !room.locked.north)) {
        desc = state.lang === "tr"
            ? "Kat 6: Tapınak Kapıları. Devasa obsidyen kemerli yol. Taş ağız sessiz, ağır parmaklıklar yukarı kalkmış. Kuzey, Astral Ocak'a gidiyor. Güney, İşkence Mahzenlerine döner."
            : "Floor 6: The Sanctum Gates. A massive obsidian archway. The stone mouth is silent and the heavy gates are open. North leads to the Astral Hearth. South returns to the Torture Vaults.";
    } else if (state.currentRoom === "thayan_lab" && (!room.locked || !room.locked.north)) {
        desc = state.lang === "tr"
            ? "Thayan Laboratuvarı. Demir parmaklıklar yukarı kalkmış, Işıltı Havuzu Odası'na giden yol açık. Güney, Avluya döner."
            : "Thayan Laboratory. The portcullis is raised, leaving the way to the Pool of Radiance open. South returns to the Courtyard.";
    }

    writeLine(desc);

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
            startCombat(room.monsters);
        }
    }

    updateUI();
}

function rollRandomEncounter(roomKey) {
    const safeZones = ["graveyard", "welcomer_haven", "castle_courtyard", "spire_entrance", "citadel_approach"];
    if (safeZones.includes(roomKey)) return;

    const roll = rollDice(20);
    const room = DUNGEON[roomKey];
    if (!room) return;

    // We do not want to trigger another encounter if the room already has monsters or combat is active
    if ((room.monsters && room.monsters.length > 0) || state.combat) return;

    writeLine(state.lang === "tr"
        ? `[Karşılaşma Zarı: ${roll} (d20)]`
        : `[Encounter Roll: ${roll} (d20)]`, "system-msg");

    switch (roll) {
        case 1: { // Spike Trap
            const dmg = rollDice(6);
            state.hp = Math.max(1, state.hp - dmg);
            writeLine(state.lang === "tr"
                ? `[Tuzağa Yakalandınız!] Gizli bir plakaya bastınız! Duvardan fırlayan dikenler size ${dmg} delici hasar verdi!`
                : `[Trap triggered!] You step on a hidden pressure plate! Spikes shoot from the wall, dealing ${dmg} piercing damage!`, "combat-log");
            break;
        }
        case 2: { // Thief Shadow
            const goldLost = Math.min(state.gold, rollDice(6) + 2);
            state.gold -= goldLost;
            writeLine(state.lang === "tr"
                ? `[Hırsız!] Sinsi bir gölge kesenizi kesti! ${goldLost} Altın kaybettiniz.`
                : `[Thief!] A sneaky shadow cuts your purse! You lose ${goldLost} GP.`, "combat-log");
            break;
        }
        case 3: { // Ambush
            const isUpper = [
                "cloister", "first_families", "banquet_hall", "embalming_vault", "bone_pit",
                "rickety_stairs", "sedrair_tomb", "talking_dead", "crime_scenes", "necropolis",
                "crystal_cavern", "shrine_mourning", "thayan_lab", "pool_chamber", "shadow_rift",
                "mourning_abyss", "jaxana_tomb", "citadel_gatehouse", "garrison_barracks", "torture_vaults",
                "sanctum_gates", "alchemy_chamber", "astral_hearth"
            ].includes(roomKey);

            const ambushMonster = isUpper ? {
                name: state.lang === "tr" ? "Gezgin İskelet" : "Roaming Skeleton",
                hp: 15,
                maxHp: 15,
                ac: 12,
                xpAward: 100,
                damage: 5
            } : {
                name: state.lang === "tr" ? "Thayan Muhafızı" : "Thayan Guard",
                hp: 25,
                maxHp: 25,
                ac: 14,
                xpAward: 200,
                damage: 7
            };

            if (!room.monsters) room.monsters = [];
            room.monsters.push(ambushMonster);

            writeLine(state.lang === "tr"
                ? `[Pusu!] ${ambushMonster.name} gölgelerden fırlayıp size saldırdı!`
                : `[Ambush!] A ${ambushMonster.name} leaps from the darkness to attack you!`, "combat-log");
            break;
        }
        case 4: { // Toxic Gas
            state.hp = Math.max(1, state.hp - 4);
            writeLine(state.lang === "tr"
                ? `[Zehirli Gaz!] Bir çatlaktan sızan zehirli gazı soludunuz! 4 zehir hasarı aldınız.`
                : `[Toxic Gas!] You inhale toxic spores leaking from a crack! You take 4 poison damage.`, "combat-log");
            break;
        }
        case 5: { // Rickety Floor
            state.hp = Math.max(1, state.hp - 3);
            writeLine(state.lang === "tr"
                ? `[Çürük Zemin!] Altınızdaki taşlar çöktü! Düştünüz ve 3 darbe hasarı aldınız.`
                : `[Rickety Floor!] The floor crumbles beneath your feet! You stumble and take 3 bludgeoning damage.`, "combat-log");
            break;
        }
        // 6-14 do nothing
        case 15: { // Discarded Purse
            const goldGained = rollDice(10) + 5;
            state.gold += goldGained;
            writeLine(state.lang === "tr"
                ? `[Hazine!] Yerde içinde ${goldGained} Altın olan terk edilmiş bir kese buldunuz!`
                : `[Treasure!] You spot a discarded coin purse on the ground containing ${goldGained} GP!`, "text-gold");
            break;
        }
        case 16: { // Healing Elixir
            state.inventory.push({
                name: state.lang === "tr" ? "İyileşme İksiri" : "Elixir of Healing",
                desc: "Restores 15 HP.",
                type: "potion",
                heal: 15
            });
            writeLine(state.lang === "tr"
                ? `[Hazine!] Duvar oyuğunda eski bir İyileşme İksiri buldunuz!`
                : `[Treasure!] You find a dusty Elixir of Healing tucked in a wall crevice!`, "text-gold");
            break;
        }
        case 17: { // Ancient Shrine
            const healAmt = rollDice(8) + 2;
            state.hp = Math.min(state.maxHp, state.hp + healAmt);
            writeLine(state.lang === "tr"
                ? `[Kutsal Sunak!] Lathander'ın küçük bir sunağı karanlıkta parlıyor. ${healAmt} HP iyileştiniz.`
                : `[Sacred Shrine!] A small shrine of Lathander glows in the dark, restoring ${healAmt} HP.`, "combat-victory");
            break;
        }
        case 18: { // Sunfire Oil
            state.sunfireOilEquipped = true;
            writeLine(state.lang === "tr"
                ? `[Güneşateşi Yağı!] Yerde bir Güneşateşi Yağı şişesi buldunuz ve silahınıza sürdünüz! Bir sonraki vuruşunuz +5 alev hasarı verecek.`
                : `[Sunfire Oil!] You find a vial of Sunfire Oil on the floor and apply it! Your next strike deals +5 fire damage.`, "text-gold");
            break;
        }
        case 19: { // Combat Scroll
            state.xp += 40;
            writeLine(state.lang === "tr"
                ? `[Bilgi Parşömeni!] Savaş taktikleri içeren eski bir parşömen okuyup 40 XP kazandınız.`
                : `[Tome of Lore!] You read an old scroll of battle tactics and gain 40 XP.`, "combat-victory");
            checkLevelUp();
            break;
        }
        case 20: { // Kelemvor's Blessing
            state.hp = state.maxHp;
            writeLine(state.lang === "tr"
                ? `[Kelemvor'un Kutsaması!] İlahi bir ışık üzerinize yayılıyor ve tüm sağlığınızı yeniliyor!`
                : `[Blessing of Kelemvor!] A warm divine light washes over you, fully restoring your HP!`, "combat-victory");
            break;
        }
        default: {
            writeLine(state.lang === "tr"
                ? "Herhangi bir olay yaşanmadan koridorlardan güvenle geçiyorsunuz."
                : "You navigate the dark corridors safely without incident.", "combat-victory");
            break;
        }
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

        if (answer === "echo" || answer === "yankı") {
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

        if (answer === "fire" || answer === "ateş") {
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
        startCombat(room.monsters);
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

