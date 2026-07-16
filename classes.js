const CLASSES = {
    Warrior: { hp: 24, maxHp: 24, str: 16, dex: 12, int: 8, ac: 15, weaponName: { en: "Steel Broadsword", tr: "Çelik Kılıç" }, weaponDamage: 8, skills: ["Attack", "Charge"] },
    Rogue: { hp: 18, maxHp: 18, str: 11, dex: 17, int: 12, ac: 14, weaponName: { en: "Twin Daggers", tr: "Çift Hançer" }, weaponDamage: 6, skills: ["Attack", "Sneak Attack"] },
    Mage: { hp: 14, maxHp: 14, str: 8, dex: 13, int: 16, ac: 11, weaponName: { en: "Apprentice Staff", tr: "Asa" }, weaponDamage: 4, skills: ["Attack", "Fireball"] },
    Cleric: { hp: 20, maxHp: 20, str: 13, dex: 10, int: 15, ac: 16, weaponName: { en: "Blessed Mace", tr: "Kutsal Gürz" }, weaponDamage: 6, skills: ["Attack", "Heal"] },
    Ranger: { hp: 18, maxHp: 18, str: 12, dex: 16, int: 10, ac: 14, weaponName: { en: "Hunter Bow", tr: "Korucu Yayı" }, weaponDamage: 6, skills: ["Attack", "Double Shot"] },
    Paladin: { hp: 22, maxHp: 22, str: 15, dex: 9, int: 11, ac: 17, weaponName: { en: "Iron Claymore", tr: "Demir Çiftel" }, weaponDamage: 8, skills: ["Attack", "Smite"] }
};
