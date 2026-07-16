function startCombat(monsters) {
    if (!Array.isArray(monsters)) {
        monsters = [monsters];
    }

    const activeMonsters = monsters.map((m, index) => ({
        ...m,
        id: index + 1
    }));

    state.combat = {
        monsters: activeMonsters,
        skillUsed: false
    };

    activeMonsters.forEach(m => {
        if (MONSTER_ART[m.name]) {
            writeArt(MONSTER_ART[m.name], "combat-log");
        }
    });

    const names = activeMonsters.map(m => `${m.name} (#${m.id}, ${m.hp} HP)`).join(", ");
    const enterCombatMsg = state.lang === "tr"
        ? `Savaş başladı! Karşınızda: ${names}`
        : `Combat begins! You face: ${names}`;
    writeLine(enterCombatMsg, "combat-log");
    
    updateUI();
}

function triggerCassytComment() {
    const comments = {
        graveyard: {
            en: "Cassyt looks around: 'The chapel gardens are usually peaceful, but the catacomb gates are cold today.'",
            tr: "Cassyt etrafa bakıyor: 'Tapınak bahçeleri normalde huzurludur, ancak mahzen kapıları bugün soğuk esiyor.'"
        },
        cloister: {
            en: "Cassyt points to the fresco: 'This map is at least a century old! It shows the layout of the upper levels.'",
            tr: "Cassyt freski işaret ediyor: 'Bu harita en az bir asırlık! Üst katların yerleşimini gösteriyor.'"
        },
        first_families: {
            en: "Cassyt whispers: 'These dioramas represent Phlan's old wealthy nobles. Be careful, Glandon hates grave robbing!'",
            tr: "Cassyt fısıldıyor: 'Bu dioramalar Phlan'ın eski zengin soylularını temsil ediyor. Dikkatli olun, Glandon mezar hırsızlığından nefret eder!'"
        },
        banquet_hall: {
            en: "Cassyt gasps: 'The smell of rot is overwhelming. Look at the long table... it was once for funeral dinners.'",
            tr: "Cassyt burnunu tutuyor: 'Çürüme kokusu ezici. Uzun masaya bakın... bir zamanlar cenaze yemekleri içindi.'"
        },
        embalming_vault: {
            en: "Cassyt stays close: 'Watch out! The embalming chemicals here are volatile. Don't touch the jars.'",
            tr: "Cassyt yakın duruyor: 'Dikkat edin! Buradaki mumyalama kimyasalları uçucu. Kavanozlara dokunmayın.'"
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
        crystal_cavern: {
            en: "Cassyt looks up: 'These glowing crystals are beautiful, but they hide monsters in the dark walls.'",
            tr: "Cassyt yukarı bakıyor: 'Bu parıldayan kristaller çok güzel, ancak karanlık duvarlarında canavarlar barındırıyor.'"
        },
        shrine_mourning: {
            en: "Cassyt bows: 'This is the shrine of Jergal. Let's pray to receive the keeper's blessing.'",
            tr: "Cassyt eğilir: 'Bu Jergal'ın tapınağı. Koruyucunun kutsamasını almak için dua edelim.'"
        },
        thayan_lab: {
            en: "Cassyt sneers: 'Thayan alchemy... corrupting the natural cycle of life and death. The levers block the gate.'",
            tr: "Cassyt homurdanıyor: 'Thayan simyası... yaşam ve ölümün doğal döngüsünü bozuyor. Kollar kapıyı kapatmış.'"
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
        mourning_abyss: {
            en: "Cassyt shivers: 'The abyss whispers with the screams of lost souls. Keep your weapons ready.'",
            tr: "Cassyt ürperiyor: 'Uçurum kayıp ruhların çığlıklarıyla fısıldıyor. Silahlarınızı hazır tutun.'"
        },
        jaxana_tomb: {
            en: "Cassyt whispers: 'Jaxana, the Shadow Dragon! Move silently, a single wrong step will wake her.'",
            tr: "Cassyt fısıldıyor: 'Jaxana, Gölge Ejderhası! Sessizce ilerleyin, tek bir yanlış adım onu uyandırır.'"
        },
        citadel_gatehouse: {
            en: "Cassyt alerts: 'We are at the Citadel Barbican. The Thayans are reinforcing this gate. Walk carefully.'",
            tr: "Cassyt uyarıyor: 'Kale Barbicanındayız. Thayanlar bu kapıyı tahkim ediyor. Dikkatli yürüyün.'"
        },
        garrison_barracks: {
            en: "Cassyt sighs: 'The Thayan Arch-Mage has set traps here. He is preparing a ritual spell!'",
            tr: "Cassyt iç çeker: 'Thayan Başbüyücüsü buraya tuzaklar kurmuş. Bir ritüel büyüsü hazırlıyor!'"
        },
        torture_vaults: {
            en: "Cassyt points: 'Sir Kevin is caged there! We must rescue him, he is a true knight of Phlan.'",
            tr: "Cassyt işaret ediyor: 'Sir Kevin orada kafeste! Onu kurtarmalıyız, o Phlan'ın gerçek bir şövalyesi.'"
        },
        sanctum_gates: {
            en: "Cassyt looks at the carvings: 'The stone mouth is posing a riddle. Feed it fire to swing the gate open!'",
            tr: "Cassyt oymalara bakıyor: 'Taş ağız bilmece soruyor. Kapının açılması için ona ateş verin!'"
        },
        alchemy_chamber: {
            en: "Cassyt holds a bottle: 'Sunfire Oil. Useful stuff to ignite our strikes. Take it quickly.'",
            tr: "Cassyt bir şişe tutuyor: 'Güneşateşi Yağı. Vuruşlarımızı alevlendirmek için yararlı. Çabucak alın.'"
        },
        astral_hearth: {
            en: "Cassyt holds her holy symbol high: 'Vanthrax the Arch-Lich! Kelemvor guide our strikes to close the rift!'",
            tr: "Cassyt sembolünü kaldırır: 'Arch-Lich Vanthrax! Kelemvor vuruşlarımızı yönlendirsin ve yırtığı kapatsın!'"
        },
        drowned_plaza: {
            en: "Cassyt wades through the water: 'Phlan is flooded! Look at the plaza... a Water Elemental is churning the fountain.'",
            tr: "Cassyt suyun içinde yürüyor: 'Phlan su altında! Meydana bakın... çeşmede bir Su Elementali dolanıyor.'"
        },
        blackfist_bridge: {
            en: "Cassyt looks over the rail: 'The canal water is rising. There is a locked merchant chest chained to the bridge!'",
            tr: "Cassyt parmaklıktan bakıyor: 'Kanal suları yükseliyor. Köprüye zincirlenmiş kilitli bir tüccar kasası var!'"
        },
        sunken_temple: {
            en: "Cassyt smiles: 'A flooded temple of Tyr, god of justice. The altar still glows. Offer gold for a blessing!'",
            tr: "Cassyt gülümsüyor: 'Adalet tanrısı Tyr'in batık tapınağı. Sunak hala parlıyor. Kutsanmak için altın adayın!'"
        },
        harbor_docks: {
            en: "Cassyt clenches her fists: 'Pirate Captain Brakk and his Welcomers control these docks now. Watch out!'",
            tr: "Cassyt yumruklarını sıkıyor: 'Korsan Kaptan Brakk ve adamları bu iskeleleri yönetiyor. Dikkat edin!'"
        },
        spire_entrance: {
            en: "Cassyt shudders: 'This obsidian Spire crackles with pure corruption. The Black Fist guards are mind-controlled!'",
            tr: "Cassyt ürperiyor: 'Bu obsidyen Kule yozlaşmayla çatırdıyor. Black Fist muhafızlarının zihinleri kontrol altında!'"
        },
        mirror_maze: {
            en: "Cassyt covers her eyes: 'Ayna Labirenti... Don't look at the false deaths. Find the correct focus mirror and shatter it!'",
            tr: "Cassyt gözlerini kapatıyor: 'Ayna Labirenti... Sahte ölümlere bakmayın. Doğru odak aynasını bulup kırın!'"
        },
        soul_forge: {
            en: "Cassyt gasps: 'Captain Stedd! The Thayans corrupted him too. We must defeat him to save Phlan.'",
            tr: "Cassyt haykırıyor: 'Kaptan Stedd! Thayanlar onu da yozlaştırmış. Phlan'ı kurtarmak için onu yenmeliyiz.'"
        },
        cultist_antechamber: {
            en: "Cassyt warns: 'Dragon Cult symbols are everywhere. High Priest Naergoth is conducting rituals ahead.'",
            tr: "Cassyt uyarıyor: 'Ejderha Tarikatı sembolleri her yerde. Başrahip Naergoth ileride ritüeller yönetiyor.'"
        },
        dragon_egg_chamber: {
            en: "Cassyt whispers: 'Red dragon eggs... If they hatch, Phlan will burn. But they are innocent. What should we do?'",
            tr: "Cassyt fısıldıyor: 'Kırmızı ejderha yumurtaları... Çatlarlarsa Phlan yanacak. Ama masumlar. Ne yapmalıyız?'"
        },
        high_priest_sanctum: {
            en: "Cassyt shouts: 'Naergoth the High Priest! Stop the Draconic Rite before it is too late!'",
            tr: "Cassyt bağırıyor: 'Başrahip Naergoth! Çok geç olmadan Ejderha Ritüelini durdurun!'"
        },
        underdark_entrance: {
            en: "Cassyt holds her breath: 'The Underdark. Deep, dark, and dangerous. Drow scouts are patrolling the cliffs.'",
            tr: "Cassyt nefes alıyor: 'Karanlık Altı. Derin, karanlık ve tehlikeli. Drow izcileri uçurumlarda devriye geziyor.'"
        },
        fungal_forest: {
            en: "Cassyt holds her sleeve to her mouth: 'Spores! Hold your breath or drink antitoxin, otherwise they will poison us!'",
            tr: "Cassyt kolunu ağzına tutuyor: 'Sporlar! Nefesinizi tutun ya da panzehir için, yoksa bizi zehirleyecekler!'"
        },
        drow_outpost: {
            en: "Cassyt whispers: 'Drow Outpost. We can sneak through to grab their provisions if we walk quietly.'",
            tr: "Cassyt fısıldıyor: 'Drow Karakolu. Sessizce yürürsek malzemelerini almak için sızabiliriz.'"
        },
        spider_lair: {
            en: "Cassyt screams: 'Lolth's Spider Avatar! Giant webs are everywhere, watch your footing!'",
            tr: "Cassyt çığlık atıyor: 'Lolth'un Örümcek Avatarı! Her yerde dev ağlar var, nereye bastığınıza dikkat edin!'"
        },
        citadel_approach: {
            en: "Cassyt points upward: 'The Floating Citadel of Severin! We must climb the sky stairs to face the champion.'",
            tr: "Cassyt yukarıyı işaret ediyor: 'Severin'in Yüzen Kalesi! Şampiyonla yüzleşmek için gökyüzü merdivenlerini tırmanmalıyız.'"
        },
        dragon_roost: {
            en: "Cassyt whispers: 'Arvax, the bronze dragon! He is chained and enslaved. If we free him, he will help us!'",
            tr: "Cassyt fısıldıyor: 'Arvax, tunç ejderha! Zincirlenmiş ve esir edilmiş. Onu serbest bırakırsak bize yardım eder!'"
        },
        throne_chamber: {
            en: "Cassyt holds her symbol high: 'Severin Silrajin! The Champion of the Dragon Queen. This is the final battle!'",
            tr: "Cassyt sembolünü kaldırıyor: 'Severin Silrajin! Ejderha Kraliçesi'nin Şampiyonu. Bu son savaş!'"
        }
    };

    if (comments[state.currentRoom]) {
        writeLine(comments[state.currentRoom][state.lang], "combat-victory");
    }
}


function checkDefeatedMonsters() {
    if (!state.combat) return false;

    state.combat.monsters.forEach(m => {
        if (m.hp <= 0 && !m.defeatedChecked) {
            m.defeatedChecked = true;
            const xpGained = m.xpAward;
            state.xp += xpGained;
            writeLine(TRANSLATIONS[state.lang].enemy_dead.replace("{enemy}", `${m.name} (#${m.id})`).replace("{xp}", xpGained), "combat-victory");

            if (m.isGateBoss) {
                writeLine(state.lang === "tr"
                    ? "Yenilen düşman portalın kilidini açan büyüyü serbest bıraktı!"
                    : "The defeated boss triggers the portal locks to open!", "text-gold");

                const room = DUNGEON[state.currentRoom];
                if (room.locked) {
                    for (const dir in room.locked) {
                        delete room.locked[dir];
                    }
                }
            }

            if (m.isFinalBoss) {
                writeLine(TRANSLATIONS[state.lang].drake_defeat, "text-gold");
                inputEl.disabled = true;
                state.combat = null;
                DUNGEON[state.currentRoom].monsters = [];
                updateUI();
            }
        }
    });

    if (!state.combat) return true;

    const allDefeated = state.combat.monsters.every(m => m.hp <= 0);
    if (allDefeated) {
        DUNGEON[state.currentRoom].monsters = [];
        state.combat = null;
        checkLevelUp();
        updateUI();
        return true;
    }

    return false;
}

function handleCombatCommand(input) {
    if (!state.combat) return;

    if (input === "flee") {
        const names = state.combat.monsters.filter(m => m.hp > 0).map(m => m.name).join(", ");
        writeLine(TRANSLATIONS[state.lang].flee_msg.replace("{enemy}", names), "combat-log");
        
        // Parting strike damage (minimum 1 HP remaining)
        const partingDmg = rollDice(6);
        state.hp = Math.max(1, state.hp - partingDmg);
        
        // Gold loss
        const goldLost = Math.min(state.gold, 15);
        state.gold -= goldLost;

        // XP loss
        const xpLost = Math.min(state.xp, 30);
        state.xp -= xpLost;

        writeLine(state.lang === "tr"
            ? `Panik içinde kaçarken ${partingDmg} fırsat hasarı aldınız, ${goldLost} Altın düşürdünüz ve ${xpLost} XP kaybettiniz.`
            : `You suffer a parting opportunity attack! You take ${partingDmg} damage, drop ${goldLost} GP, and lose ${xpLost} XP.`, "combat-log");

        state.combat = null;
        state.currentRoom = state.previousRoom || "graveyard";
        describeRoom();
        return;
    }

    // Parse target ID if present
    let targetId = 1;
    const parts = input.split(" ");
    let combatAction = parts[0];
    const targetSpec = parts[parts.length - 1];
    const parsedId = parseInt(targetSpec);
    const hasTargetId = !isNaN(parsedId) && parts.length > 1;

    if (hasTargetId) {
        targetId = parsedId;
        combatAction = parts.slice(0, -1).join(" ");
    } else {
        const firstAlive = state.combat.monsters.find(m => m.hp > 0);
        if (firstAlive) {
            targetId = firstAlive.id;
        }
    }

    let isSkillUsed = false;
    let skillDamageBonus = 0;
    let isFireball = false;

    if (combatAction === "heal" && state.class === "Cleric") {
        const healAmt = rollDice(8) + Math.floor((state.int - 10) / 2);
        state.hp = Math.min(state.maxHp, state.hp + healAmt);
        writeLine(state.lang === "tr" ? `İyileşme duası okudunuz! ${healAmt} HP iyileştiniz.` : `You cast Healing Word! Restored ${healAmt} HP.`, "combat-victory");
        isSkillUsed = true;
    } else if (combatAction === "double shot" && state.class === "Ranger") {
        skillDamageBonus = rollDice(6);
        writeLine(state.lang === "tr" ? "Yayınızdan iki oku aynı anda bırakıyorsunuz!" : "You loose two arrows in a double shot!", "combat-victory");
        isSkillUsed = true;
    } else if (combatAction === "smite" && state.class === "Paladin") {
        skillDamageBonus = rollDice(8) + rollDice(8);
        writeLine(state.lang === "tr" ? "Silahınız kutsal enerjiyle parlıyor! Divine Smite!" : "Your weapon erupts in radiant fire! Divine Smite!", "combat-victory");
        isSkillUsed = true;
    } else if (combatAction === "charge" && state.class === "Warrior") {
        skillDamageBonus = 4;
        writeLine(state.lang === "tr" ? "Düşmana doğru hücum ediyorsunuz!" : "You charge headlong into the enemy!", "combat-victory");
        isSkillUsed = true;
    } else if (combatAction === "sneak attack" && state.class === "Rogue") {
        skillDamageBonus = 5;
        writeLine(state.lang === "tr" ? "Zayıf bir noktaya gizlice arkadan vuruyorsunuz!" : "You sneak behind to strike a vulnerable spot!", "combat-victory");
        isSkillUsed = true;
    } else if (combatAction === "fireball" && state.class === "Mage") {
        isFireball = true;
        isSkillUsed = true;
        writeLine(state.lang === "tr" ? "Büyük bir alev topu fırlatıyorsunuz!" : "You launch a blazing fireball!", "combat-victory");
    }

    if (isSkillUsed) {
        state.combat.skillUsed = true;
    }

    if (combatAction === "attack" || isSkillUsed) {
        // Resolve Mage's Fireball AoE separately
        if (isFireball) {
            const intMod = Math.floor((state.int - 10) / 2);
            const dmg = rollDice(8) + rollDice(8) + intMod;
            state.combat.monsters.forEach(m => {
                if (m.hp > 0) {
                    m.hp -= dmg;
                    writeLine(state.lang === "tr"
                        ? `Ateş topu ${m.name} (#${m.id}) hedefini yaktı! ${dmg} alev hasarı.`
                        : `Fireball erupts engulfing ${m.name} (#${m.id})! Deals ${dmg} fire damage.`, "combat-victory");
                }
            });
        } else {
            // Single target resolution
            const activeMonster = state.combat.monsters.find(m => m.id === targetId && m.hp > 0) || state.combat.monsters.find(m => m.hp > 0);
            if (!activeMonster) {
                writeLine(state.lang === "tr" ? "Geçersiz hedef." : "Invalid target.");
                return;
            }

            let hitRoll = rollDice(20);
            let strMod = Math.floor((state.str - 10) / 2);
            let dexMod = Math.floor((state.dex - 10) / 2);
            let intMod = Math.floor((state.int - 10) / 2);

            let attackBonus = (state.class === "Mage" || state.class === "Cleric") ? intMod : (state.class === "Rogue" || state.class === "Ranger" ? dexMod : strMod);
            let totalAttack = hitRoll + attackBonus;

            if (combatAction === "attack") {
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

            writeLine(TRANSLATIONS[state.lang].combat_roll.replace("{roll}", hitRoll).replace("{mod}", attackBonus).replace("{total}", totalAttack).replace("{ac}", activeMonster.ac), "system-msg");

            if (totalAttack >= activeMonster.ac) {
                let dmg = rollDice(state.weaponDamage) + Math.max(0, attackBonus) + skillDamageBonus;

                if (state.sunfireOilEquipped) {
                    dmg += 5;
                    state.sunfireOilEquipped = false;
                    writeLine(state.lang === "tr" ? "Silahınızdaki Sunfire Yağı parladı! (+5 Alev hasarı eklendi)" : "The Sunfire Oil on your weapon flares! (+5 fire damage added)", "text-gold");
                }

                activeMonster.hp -= dmg;
                writeLine(TRANSLATIONS[state.lang].combat_hit.replace("{enemy}", `${activeMonster.name} (#${activeMonster.id})`).replace("{dmg}", dmg), "combat-victory");
            } else {
                writeLine(TRANSLATIONS[state.lang].combat_miss.replace("{enemy}", `${activeMonster.name} (#${activeMonster.id})`), "combat-log");
            }
        }

        // Rescued Knight Kevin strikes as follow-up action
        if (state.allyKnight) {
            const firstAlive = state.combat.monsters.find(m => m.hp > 0);
            if (firstAlive) {
                let knightDmg = 4;
                firstAlive.hp -= knightDmg;
                writeLine(state.lang === "tr" ? `Sir Kevin şövalye kılıcıyla vuruyor! ${firstAlive.name} (#${firstAlive.id}) ${knightDmg} hasar aldı.` : `Sir Kevin strikes with his broadsword! Deal ${knightDmg} damage to ${firstAlive.name} (#${firstAlive.id}).`, "combat-victory");
            }
        }

        // Arvax the Bronze Dragon breathes fire
        if (state.allyDragon) {
            const firstAlive = state.combat.monsters.find(m => m.hp > 0);
            if (firstAlive) {
                let dragonDmg = 8;
                firstAlive.hp -= dragonDmg;
                writeLine(state.lang === "tr" ? `Arvax ağzını açıp ${dragonDmg} ateş hasarı veriyor! ${firstAlive.name} (#${firstAlive.id}) alev içinde!` : `Arvax unleashes a gout of bronze dragonfire! ${dragonDmg} fire damage to ${firstAlive.name} (#${firstAlive.id})!`, "combat-victory");
            }
        }

        if (checkDefeatedMonsters()) return;

        if (state.companion === "Cassyt") {
            triggerCassytCombatAssistance();
            if (checkDefeatedMonsters()) return;
        }

        enemyCounterAttack();
    } else {
        writeLine(TRANSLATIONS[state.lang].combat_options_only);
    }
}

function triggerCassytCombatAssistance() {
    let roll = rollDice(3);
    const target = state.combat.monsters.find(m => m.hp > 0);
    if (!target) return;

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
        target.hp -= dmg;
        writeLine(state.lang === "tr" ? `Cassyt kutsal alev çağırıyor! ${target.name} (#${target.id}) ${dmg} kutsal hasar aldı.` : `Cassyt casts Sacred Flame! Deal ${dmg} radiant damage to ${target.name} (#${target.id}).`, "combat-victory");
    } else {
        writeLine(state.lang === "tr" ? "Cassyt Kelemvor'un kutsal sembolünü gösterip bağırıyor: 'Geri çekilin yaratıklar!'" : "Cassyt raises her Kelemvor holy symbol: 'Turn back, foul abominations!'", "combat-victory");
        target.ac = Math.max(8, target.ac - 2);
    }
}

function enemyCounterAttack() {
    if (!state.combat) return;

    state.combat.monsters.forEach(m => {
        if (m.hp > 0) {
            writeLine(TRANSLATIONS[state.lang].enemy_attack.replace("{enemy}", `${m.name} (#${m.id})`));
            let enemyHit = rollDice(20) + 2;
            writeLine(TRANSLATIONS[state.lang].enemy_roll.replace("{roll}", enemyHit).replace("{ac}", state.ac), "system-msg");

            if (enemyHit >= state.ac) {
                let enemyDmg = rollDice(m.damage);
                state.hp = Math.max(0, state.hp - enemyDmg);
                writeLine(TRANSLATIONS[state.lang].enemy_hit.replace("{enemy}", `${m.name} (#${m.id})`).replace("{dmg}", enemyDmg), "combat-log");

                if (state.hp <= 0) {
                    writeLine(TRANSLATIONS[state.lang].player_dead, "combat-log");
                    inputEl.disabled = true;
                }
            } else {
                writeLine(TRANSLATIONS[state.lang].enemy_miss.replace("{enemy}", `${m.name} (#${m.id})`), "combat-victory");
            }
        }
    });
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
