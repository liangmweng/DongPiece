let lvl = 1; 
let hp = 50; 
let maxHp = 50;
let beri = 10; 
let weapon = null; 
let headArmor = null;
let chestArmor = null;
let legArmor = null;
let island = 0;
let opponentsBeaten = 0;
let successfulDefend = false;

const button1 = document.querySelector("#button1"); 
const button2 = document.querySelector("#button2"); 
const button3 = document.querySelector("#button3"); 
const button4 = document.querySelector("#button4"); 
const button5 = document.querySelector("#button5"); 
const chat = document.querySelector("#chat"); 
const levelText= document.querySelector("#levelText"); 
const hpText= document.querySelector("#hpText"); 
const beriText= document.querySelector("#beriText"); 
const locationText = document.querySelector("#locationText");
const inventoryDiv = document.querySelector("#inventory"); 
const inventoryText= document.querySelector("#inventoryText"); 
const opponentStats= document.querySelector("#opponentStats"); 
const opponentName= document.querySelector("#opponentName"); 
const opponentLvl= document.querySelector("#opponentLvl"); 
const opponentAp= document.querySelector("#opponentAp"); 
const opponentHealth= document.querySelector("#opponentHealth"); 
const itemsList = document.querySelector("#itemsList");
const opponentImage = document.querySelector("#opponentImage");
const opponentPic = document.querySelector("#opponentPic");

button1.onclick = goStore; 
button2.onclick = fight; 
button3.onclick = openInventory; 
button4.onclick = leave; 

let inventory = []; 
let ownedWeapons = [];
let ownedArmor = []; 
let healthPotions = [];

  const islands = [
    {
      name: "Dawn Island",
      opponents: [
          {
            name: "Alvida — The Crimson Iron Mace", 
            level: 1, 
            health: 75, 
            defaultHealth: 75,
            ap: 5, 
            beri: 60, 
            "description": "A boastful and ruthless pirate captain, Alvida wields a massive iron mace with devastating force. Obsessed with her beauty and feared by her crew, she relies on brute strength to crush her enemies. Beneath her vanity lies a dangerous ambition.",
            url: "https://preview.redd.it/i-thought-alvida-was-supposed-to-be-ugly-shorty-stunning-v0-hqftkqvyridb1.jpeg?width=720&format=pjpg&auto=webp&s=9646060d446c67284c1d189f7b4ec74eeade462b"
          },
          {
            name: "Captain Morgan — The Iron-Handed Tyrant", 
            level: 3, 
            health: 165, 
            defaultHealth: 165,
            ap: 9, 
            beri: 115, 
            "description": "A ruthless Marine officer, Captain Morgan rules Shells Town through fear and intimidation. Armed with a powerful axe arm and overwhelming strength, he crushes anyone who dares to challenge his authority. His arrogance, however, may prove to be his greatest weakness.",
            url: "https://lh7-us.googleusercontent.com/tdZEpztfuuQNsWIurMf55_FJ_XEYIxlPZdV-O9ZahMS10eKmfd1v5V6Rx7KAzjz9oPd1BHNIgX2NQemddyf1YvEFtRbY8V9CHhtTfgl0WzA_HUeNM3ObqHqn9E2Vn0W06yiDWndqQkp4hamp0iY0VQ"
          }
        ],
      armor: [
          { 
            name: "Cloth Shirt", 
            type: "armor",
            armorType: "chest",
            defence: 10,
            price: 25, 
          }, 
          { 
            name: "Cloth Pants",
            type: "armor",
            armorType: "leg",
            defence: 8,
            price: 20, 
          }, 
          { 
            name: "Cloth Hat", 
            type: "armor",
            armorType: "head",
            defence: 5,
            price: 18, 
          } 
        ],
      weapons: [
          { 
            name: "Stick", 
            type: "weapon",
            price: 5, 
            dmg: 10, 
          }, 
          { 
            name: "Nunchucks", 
            type: "weapon",
            price: 20, 
            dmg: 22, 
          }, 
        ],
        potions: [
          { 
            name: "Health Potion(50Hp)", 
            type: "potion",
            heal: 50,
            price: 25, 
          } 
        ]    
    },
    {
      name: "Alabasta",
      opponents: [
          {
            name: "Mr. 2 — Bon Kurei-SAMA", 
            level: 10, 
            health: 275, 
            defaultHealth: 275,
            ap: 25, 
            beri: 170, 
            "description": "A flamboyant and cunning fighter, Bon Kurei wields the Okama Kenpō with deadly grace. His Mane Mane no Mi allows him to shapeshift, making him a master of disguise and trickery. Loyal to friends and fearless in battle, his eccentric style hides a heart of true courage.",
            url: "https://i.pinimg.com/170x/d6/85/5d/d6855debce47d9fe6ae08783d3c0f76f.jpg"
          },
          {
            name: "Mr. 1 — Daz Bones", 
            level: 14, 
            health: 430, 
            defaultHealth: 430,
            ap: 39, 
            beri: 220, 
            "description": "A cold and ruthless assassin, Daz Bones is known as “Mr. 1” of Baroque Works. Thanks to the Supa Supa no Mi, his entire body can turn into blades, making him a living weapon. With unmatched durability and deadly precision, he is a relentless warrior who cuts down foes without hesitation.",
            url: "https://i.pinimg.com/736x/bc/25/2c/bc252c7b2ba4fc59d5976612dda87266.jpg"
          },
          {
            name: "Mr. 0 — \"Desert King\" Sir Croco D. ile", 
            level: 20, 
            health: 625, 
            defaultHealth: 625,
            ap: 50, 
            beri: 400, 
            "description": "The cunning head of Baroque Works and boss of Bon Kurei and Daz Bones. Wielding the Sand-Sand Fruit, he drains life and shapes deserts into weapons. A ruthless mastermind whose ambition buries all who oppose him.",
            url: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/07/Usopp-Imitating-Crocodile-Cropped.jpg?q=50&fit=crop&w=825&dpr=1.5"
          }
        ],
      armor: [
          { 
            name: "Leather Vest", 
            type: "armor",
            armorType: "chest",
            defence: 33,
            price: 55, 
          }, 
          { 
            name: "Leather Leggings", 
            type: "armor",
            armorType: "leg",
            defence: 27,
            price: 40
          }, 
          { 
            name: "Leather Helmet", 
            type: "armor",
            armorType: "head",
            defence: 19,
            price: 35 
          } 
        ],
      weapons: [
          { 
            name: "Knife", 
            type: "weapon",
            price: 85,
            dmg: 34, 
          }, 
          { 
            name: "Dagger", 
            type: "weapon",
            price: 165,
            dmg: 55, 
          }, 
        ],
        potions: [
          { 
            name: "Health Potion(75Hp)", 
            type: "potion",
            heal: 75,
            price: 35, 
          } 
        ]
      },
      {
      name: "Skypiea",
      opponents: [
          {
            name: "Nola — Master of the Sky", 
            level: 24, 
            health: 800, 
            defaultHealth: 920,
            ap: 62, 
            beri: 1100, 
            "description": "A colossal sky serpent dwelling in Skypiea's Upper Yard. Revered and feared by the Shandians, Nola's massive size and strength make her a living force of nature. Though terrifying, she is bound to the land's history and its people.",
            url: "https://i.pinimg.com/736x/ba/66/06/ba66064cf7476f31ff68af33da310c16.jpg"
          },
          {
            name: "GO D. Eneru — \"God\"", 
            level: 30, 
            health: 1175, 
            defaultHealth: 1375,
            ap: 85, 
            beri: 1725, 
            "description": "Self-proclaimed god of Skypiea, ruling with lightning and fear. Wielding the power of the Rumble-Rumble Fruit, he strikes with divine speed and devastating thunder. Arrogant and godlike, he sees all beneath him as mere mortals to be judged.",
            url: "https://i.pinimg.com/1200x/f3/ba/1d/f3ba1d7356ba14517bddb199e7016470.jpg"
          }
        ],
      armor: [
          { 
            name: "Bronze Chestplate", 
            type: "armor",
            armorType: "chest",
            defence: 55,
            price: 670, 
          }, 
          { 
            name: "Bronze Leggings", 
            type: "armor",
            armorType: "leg",
            defence: 39,
            price: 580,
          }, 
          { 
            name: "Bronze Helmet", 
            type: "armor",
            armorType: "head",
            defence: 26,
            price: 465, 
          } 
        ],
      weapons: [
          { 
            name: "Spear", 
            type: "weapon",
            price: 400,
            dmg: 89, 
          }, 
          { 
            name: "Broadsword", 
            type: "weapon",
            price: 690,
            dmg: 115, 
          }, 
        ],
        potions: [
          { 
            name: "Health Potion(125Hp)", 
            type: "potion",
            heal: 125,
            price: 65, 
          } 
        ]
      },
      {
        name: "Water 7 & Enies Lobby",
        opponents: [
          {
            name: "General Franky — \"Cyborg\"", 
            level: 24, 
            health: 1400, 
            defaultHealth: 1400,
            ap: 92, 
            beri: 2200, 
            "description": "A cyborg shipwright powered by cola and unshakable spirit. Combining raw strength with inventive weapons, he turns his own body into an arsenal. Loud, flashy, and loyal, Franky is both a fighter and a builder who crafts dreams into steel.",
            url: "https://i.pinimg.com/736x/b8/a9/5f/b8a95fad28e155f3399ae15f4c9bc849.jpg"
          },
          {
            name: "Rob Lucci — \"Massacre Weapon\"", 
            level: 30, 
            health: 1800, 
            defaultHealth: 1800,
            ap: 99, 
            beri: 2700, 
            "description": "The most feared assassin of CP9, trained as a weapon since childhood. With the Cat-Cat Fruit: Leopard Model, he blends ruthless precision with beastly power. Silent and merciless, Lucci lives only for absolute justice.",
            url: "https://i.redd.it/mgemgodb7ck91.jpg"
          },
          {
            name: "Spandam — \"Chicken\"", 
            level: 1, 
            health: 10000, 
            defaultHealth: 10000,
            ap: 1, 
            beri: 10, 
            "description": "This guy sucks, is weak as hell, and just sucks in general.",
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2qbbQo2tL0KeYg0z2rYzTEQXX0odXpdMJfaRCudap4eGp5QAuO5J6Od9yy8XxwohUczc&usqp=CAU"
          }
        ],
        armor: [
          { 
            name: "Flak Chestplate", 
            type: "armor",
            armorType: "chest",
            defence: 105,
            price: 1070, 
          }, 
          { 
            name: "Flak Leggings", 
            type: "armor",
            armorType: "leg",
            defence: 92,
            price: 890,
          }, 
          { 
            name: "Flak Helmet", 
            type: "armor",
            armorType: "head",
            defence: 80,
            price: 755, 
          } 
        ],
        weapons: [
          { 
            name: "Sandai Kitetsu", 
            type: "weapon",
            price: 800,
            dmg: 150, 
          }, 
          { 
            name: "Wado Ichimonji", 
            type: "weapon",
            price: 1360,
            dmg: 215, 
          }, 
        ],
        potions: [
          { 
            name: "Health Potion(250Hp)", 
            type: "potion",
            heal: 250,
            price: 155, 
          } 
        ]
      },
      {
        name: "Thriller Bark",
        opponents: [
          {
            name: "Gekko Moria — Royal Shichibukai", 
            level: 30, 
            health: 1950, 
            defaultHealth: 1950,
            ap: 89, 
            beri: 1900, 
            "description": "Warlord of the Sea and master of shadows. With the Shadow-Shadow Fruit, he steals the strength of others to command an army of zombies. Once mighty, now lazy and overindulgent, he hides weakness behind dark powers and endless minions.",
            url: "https://preview.redd.it/lets-not-forget-that-every-moria-upscale-is-a-blackbeard-v0-376rshj1p77f1.jpeg?auto=webp&s=45b8048bdec2d0718d79a58410cf0c8b54702fa3"
          },
        ],
        armor: [
          { 
            name: "Flak Chestplate", 
            type: "armor",
            armorType: "chest",
            defence: 105,
            price: 1070, 
          }, 
          { 
            name: "Flak Leggings", 
            type: "armor",
            armorType: "leg",
            defence: 92,
            price: 890,
          }, 
          { 
            name: "Flak Helmet", 
            type: "armor",
            armorType: "head",
            defence: 80,
            price: 755, 
          } 
        ],
        weapons: [ 
          { 
            name: "Wado Ichimonji", 
            type: "weapon",
            price: 1360,
            dmg: 215, 
          },
          { 
            name: "Shisui", 
            type: "weapon",
            price: 1500,
            dmg: 265, 
          }, 
        ],
        potions: [
          { 
            name: "Health Potion(250Hp)", 
            type: "potion",
            heal: 250,
            price: 155, 
          } 
        ]
      },
      {
        name: "Impel Down",
        opponents: [
          {
            name: "Magellan — \"Diarrhea man\"", 
            level: 39, 
            health: 2450, 
            defaultHealth: 2450,
            ap: 111, 
            beri: 2600, 
            "description": "The fearsome warden of Impel Down, cloaked in lethal poison. With the Venom-Venom Fruit, he can flood entire battlefields with deadly toxins. Though powerful enough to crush most foes, his weakness lies in his constant stomach troubles.",
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUbHPC3tMWzWLNH1-J3Q6HDEiQRGxG-ukgiFsLjLx1QA&s=10"
          },
          {
            name: "Bagī-SAMA — \"Buggy D. Clown\"", 
            level: 45, 
            health: 2900, 
            defaultHealth: 2900,
            ap: 125, 
            beri: 3300, 
            "description": "A legendary pirate whose name shakes the seas. Master of the Chop-Chop Fruit, he rends himself into pieces and dances through blades unharmed. With charisma that bends crowds and luck that defies death itself, Buggy has risen from clown to conqueror—an unpredictable force feared and revered across the Grand Line.",
            url: "https://preview.redd.it/small-buggy-looks-creepy-in-live-action-v0-qqraca1chklb1.jpg?width=640&crop=smart&auto=webp&s=f9294187bfa8cb42ed40cb995d42e6a6592106c5"
          },
        ],
        armor: [
          { 
            name: "Iron Chestplate", 
            type: "armor",
            armorType: "chest",
            defence: 175,
            price: 2055, 
          }, 
          { 
            name: "Iron Leggings", 
            type: "armor",
            armorType: "leg",
            defence: 155,
            price: 1790,
          }, 
          { 
            name: "Iron Helmet", 
            type: "armor",
            armorType: "head",
            defence: 129,
            price: 1600, 
          } 
        ],
        weapons: [ 
          { 
            name: "Enma", 
            type: "weapon",
            price: 2000,
            dmg: 299, 
          },
          { 
            name: "Yoru", 
            type: "weapon",
            price: 2500,
            dmg: 345, 
          }, 
        ],
        potions: [
          { 
            name: "Health Potion(500Hp)", 
            type: "potion",
            heal: 500,
            price: 395, 
          } 
        ]
      },
      {
        name: "Marineford",
        opponents: [
          {
            name: "Akainu — \"Buggy D. Clown\"", 
            level: 50, 
            health: 4000, 
            defaultHealth: 4000,
            ap: 150, 
            beri: 5900, 
            "description": "The ultimate enforcer of Absolute Justice and current Fleet Admiral of the Marines. Wielding the Magma-Magma Fruit, his blows erupt like volcanoes, reducing fleets and islands alike to ash. Unyielding and merciless, Akainu embodies the Navy’s iron will, standing as the final wall between pirates and their freedom. A force of nature in human form, to face him is to battle the wrath of the earth itself.",
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6K06FOHElNKYvDcSGACkjxDE3B51chEwSVGYLmjAkLQ&s=10"
          },
        ],
        armor: [
          { 
            name: "Tek Chestplate", 
            type: "armor",
            armorType: "chest",
            defence: 300,
            price: 4000, 
          }, 
          { 
            name: "Tek Leggings", 
            type: "armor",
            armorType: "leg",
            defence: 295,
            price: 3999,
          }, 
          { 
            name: "Tek Helmet", 
            type: "armor",
            armorType: "head",
            defence: 280,
            price: 3998, 
          } 
        ],
        weapons: [ 
          { 
            name: "Yoru", 
            type: "weapon",
            price: 2500,
            dmg: 345, 
          }, 
          { 
            name: "Sabo's Pipe", 
            type: "weapon",
            price: 4500,
            dmg: 555, 
          },
        ],
        potions: [
          { 
            name: "Health Potion(1000Hp)", 
            type: "potion",
            heal: 1000,
            price: 800, 
          } 
        ]
      },
  ]

  const locations = [ 
    { 
      name: "town", 
      "button-text": ["Store", "Fight", "Inventory"], 
      "button-functions": [goStore, fight, openInventory], 
      "chat-text": "You are in town"  
    }, 
    { 
      name: "store", 
      "button-text": ["Purchase Armor", "Purchase Items", "Sell Items"], 
      "button-functions": [purchaseArmor, purchaseItems, sellItems], 
      "chat-text": "You enter the store. \nWhat would you like to do?" 
    }, 
    { 
      name: "arena", "button-text": ["Attack", "Defend", "Heal"], 
        "button-functions": [attack, defend, heal], 
        "chat-text": ""
    }, 
  ]

  const purchaseMenu = [
      [ 
        {  
          name: "Dawn Island Armor", 
          "button-text": ["Purchase Cloth Shirt", "Purchase Cloth Pants", "Purchase Cloth Hat"], 
          "button-functions": [() => purchase(islands[0].armor[0]), () => purchase(islands[0].armor[1]), () => purchase(islands[0].armor[2])], 
          "chat-text": "Armor\n\nCloth Shirt - 25 Beri, 10 Defence \nCloth Pants - 20 Beri, 8 Defence \nCloth Hat - 18 Beri, 5 Defence" 
        }, 
        { 
          name: "Dawn Island Items", 
          "button-text": ["Purchase Stick", "Purchase Nunchucks", "Purchase Health Potion"], 
          "button-functions": [() => purchase(islands[0].weapons[0]), () => purchase(islands[0].weapons[1]), () => purchase(islands[0].potions[0])], 
          "chat-text": "Items\n\nStick - 5 Beri, 10 Dmg \nNunchucks - 20 Beri, 22 Dmg \nHealth Potion(50Hp) - 25 Beri, Heals 50 Hp" 
        },
      ],
      [
        {
          name: "Alabasta Armor", 
          "button-text": ["Purchase Leather Vest", "Purchase Leather Leggings", "Purchase Leather Helmet"], 
          "button-functions": [() => purchase(islands[1].armor[0]), () => purchase(islands[1].armor[1]), () => purchase(islands[1].armor[2])], 
          "chat-text": "Armor\n\nLeather Vest - 55 Beri, 33 Defence \nLeather Leggings - 40 Beri, 27 Defence \nLeather Helmet - 35 Beri, 19 Defence"
        },
        {
          name: "Alabasta Items", 
          "button-text": ["Purchase Knife", "Purchase Dagger", "Purchase Health Potion"], 
          "button-functions": [() => purchase(islands[1].weapons[0]), () => purchase(islands[1].weapons[1]), () => purchase(islands[1].potions[0])], 
          "chat-text": "Items\n\nKnife - 85 Beri, 34 Dmg \nDagger - 165 Beri, 55 Dmg \nHealth Potion(75Hp) - 35 Beri, Heals 75 Hp" 
        }
      ],
      [
        {
          name: "Skypiea Armor", 
          "button-text": ["Purchase Bronze Chestplate", "Purchase Bronze Leggings", "Purchase Bronze Helmet"], 
          "button-functions": [() => purchase(islands[2].armor[0]), () => purchase(islands[2].armor[1]), () => purchase(islands[2].armor[2])], 
          "chat-text": "Armor\n\nBronze Chestplate - 670 Beri, 55 Defence \nBronze Leggings - 580 Beri, 39 Defence \nBronze Helmet - 465 Beri, 26 Defence"
        },
        {
          name: "Skypiea Items", 
          "button-text": ["Purchase Spear", "Purchase Broadsword", "Purchase Health Potion"], 
          "button-functions": [() => purchase(islands[2].weapons[0]), () => purchase(islands[2].weapons[1]), () => purchase(islands[2].potions[0])], 
          "chat-text": "Items\n\nSpear - 400 Beri, 89 Dmg \nBroadsword - 690 Beri, 115 Dmg \nHealth Potion(125Hp) - 65 Beri, Heals 125 Hp" 
        }
      ],
      [
        {
          name: "Water7 Armor", 
          "button-text": ["Purchase Flak Chestplate", "Purchase Flak Leggings", "Purchase Flak Helmet"], 
          "button-functions": [() => purchase(islands[3].armor[0]), () => purchase(islands[3].armor[1]), () => purchase(islands[3].armor[2])], 
          "chat-text": "Armor\n\nFlak Chestplate - 1070 Beri, 105 Defence \nFlak Leggings - 890 Beri, 92 Defence \nFlak Helmet - 755 Beri, 80 Defence"
        },
        {
          name: "Water7 Items", 
          "button-text": ["Purchase Sandai Kitetsu", "Purchase Wado Ichimonji", "Purchase Health Potion"], 
          "button-functions": [() => purchase(islands[3].weapons[0]), () => purchase(islands[3].weapons[1]), () => purchase(islands[3].potions[0])], 
          "chat-text": "Items\n\nSandai Kitetsu - 800 Beri, 150 Dmg \nWado Ichimonji - 1360 Beri, 215 Dmg \nHealth Potion(250Hp) - 155 Beri, Heals 250 Hp" 
        }
      ],
      [
        {
          name: "Thriller Bark Armor", 
          "button-text": ["Purchase Flak Chestplate", "Purchase Flak Leggings", "Purchase Flak Helmet"], 
          "button-functions": [() => purchase(islands[4].armor[0]), () => purchase(islands[4].armor[1]), () => purchase(islands[4].armor[2])], 
          "chat-text": "Armor\n\nFlak Chestplate - 1070 Beri, 105 Defence \nFlak Leggings - 890 Beri, 92 Defence \nFlak Helmet - 755 Beri, 80 Defence"
        },
        {
          name: "Thriller Bark Items", 
          "button-text": ["Purchase Wado Ichimonji", "Purchase Shisui", "Purchase Health Potion"], 
          "button-functions": [() => purchase(islands[4].weapons[0]), () => purchase(islands[4].weapons[1]), () => purchase(islands[4].potions[0])], 
          "chat-text": "Items\n\nWado Ichimonji - 1360 Beri, 215 Dmg, 150 Dmg \nShishui - 1500 Beri, 265 Dmg \nHealth Potion(250Hp) - 155 Beri, Heals 250 Hp" 
        }
      ],
      [
        {
          name: "Impel Down Armor", 
          "button-text": ["Purchase Iron Chestplate", "Purchase Iron Leggings", "Purchase Iron Helmet"], 
          "button-functions": [() => purchase(islands[5].armor[0]), () => purchase(islands[5].armor[1]), () => purchase(islands[5].armor[2])], 
          "chat-text": "Armor\n\nIron Chestplate - 2055 Beri, 175 Defence \nIron Leggings - 1790 Beri, 155 Defence \nIron Helmet - 1600 Beri, 129 Defence"
        },
        {
          name: "Impel Down Items", 
          "button-text": ["Purchase Enma", "Purchase Yoru", "Purchase Health Potion"], 
          "button-functions": [() => purchase(islands[5].weapons[0]), () => purchase(islands[5].weapons[1]), () => purchase(islands[5].potions[0])], 
          "chat-text": "Items\n\nEnma - 2000 Beri, 299 Dmg \nYoru - 2500 Beri, 345 Dmg \nHealth Potion(500Hp) - 395 Beri, Heals 500 Hp" 
        }
      ],
      [
        {
          name: "Marineford Armor", 
          "button-text": ["Purchase Tek Chestplate", "Purchase Tek Leggings", "Purchase Tek Helmet"], 
          "button-functions": [() => purchase(islands[6].armor[0]), () => purchase(islands[6].armor[1]), () => purchase(islands[6].armor[2])], 
          "chat-text": "Armor\n\nTek Chestplate - 4000 Beri, 300 Defence \nTek Leggings - 3999 Beri, 295 Defence \nTek Helmet - 3998 Beri, 280 Defence"
        },
        {
          name: "Marineford Items", 
          "button-text": ["Purchase Enma", "Purchase Yoru", "Purchase Health Potion"], 
          "button-functions": [() => purchase(islands[6].weapons[0]), () => purchase(islands[6].weapons[1]), () => purchase(islands[6].potions[0])], 
          "chat-text": "Items\n\nYoru - 2500 Beri, 345 Dmg \nSabo's Pipe - 4500 Beri, 555 Dmg \nHealth Potion(1000Hp) - 800 Beri, Heals 1000 Hp" 
        }
      ],
    ] 
    
    function buttonAction(thing) {
      button1.innerText = thing["button-text"][0];
      button2.innerText = thing["button-text"][1]; 
      button3.innerText = thing["button-text"][2]; 
      button1.onclick = thing["button-functions"][0]; 
      button2.onclick = thing["button-functions"][1]; 
      button3.onclick = thing["button-functions"][2]; 
      chat.innerText = thing["chat-text"]; 
    } 
    
    function leave(){ 
      buttonAction(locations[0]);
      button1.style.display = "inline-block";
      button1.style.order = 0;
      button2.style.display = "inline-block"; 
      button3.style.display = "inline-block"; 
      button4.style.display = "none";
      itemsList.style.display = "none";
      opponentStats.style.display = "none"; 
      chat.innerText = "You return to the town square."; 
      if(opponentsBeaten === islands[island].opponents.length) { 
        button2.innerText = "Set Sail"; 
        button2.onclick = setSail; 
      } 
    } 
    
    function goStore(){ 
      buttonAction(locations[1]); 
      button4.style.display = "inline-block"; 
    } 

    function openInventory() { 
      inventoryString = ""; 
      for(i = 0; i <= inventory.length - 1; i++) { 
        inventoryString = inventoryString + inventory[i].name + "\n"; 
      } 

      inventoryText.innerText = inventoryString; 
      inventoryDiv.style.display ="block"; 
      button2.innerText = "Close Inventory"; 
      button1.innerText = "Heal"; 
      button3.style.display = "none"; 
      button2.onclick = closeInventory; 
      button1.onclick = heal;
    } 
    
    function closeInventory() { 
      inventoryDiv.style.display = "none"; 
      button3.style.display = "inline-block"; 
      buttonAction(locations[0]);
      leave(); 
    } 
    
    function purchaseArmor(){ 
      buttonAction(purchaseMenu[island][0]);
      button4.style.display = "inline-block"; 
    } 
    
    function purchaseItems() { 
      buttonAction(purchaseMenu[island][1]) 
      button4.style.display = "inline-block"; 
    } 
    
    function sellItems() { 
      let item = itemsList.value;
      button1.onclick = ()=>{
          let item = itemsList.value;
          sell(item);
        }

      button1.innerText = "Sell";
      button1.style.order = 2;
      button2.style.display = "none";
      button3.style.display = "none";
      button4.style.order = 3;
      itemsList.style.display = "inline-block";
    } 

    function sell(item){
    itemsList.remove(itemsList.selectedIndex);
      for(let i = 0; i <= inventory.length - 1; i++){
        if(item === inventory[i].name){
          const sellPrice = inventory[i].price;
          beri += sellPrice;
          beriText.innerText = "Beri: " + beri;
          
          let soldItem  = inventory.splice(i, 1)[0];

          if(chestArmor && soldItem.armorType === "chest"){
            let stillHasChest = inventory.some(it => it.name === chestArmor.name && it.armorType === "chest");
              if(!stillHasChest){
                hp -= soldItem.defence;
                maxHp -= soldItem.defence;
                chestArmor = null;
              }
          }
          else if(legArmor && soldItem.armorType === "leg"){
            let stillHasLeg = inventory.some(it => it.name === legArmor.name && it.armorType === "leg");
            if(!stillHasLeg){
              hp -= soldItem.defence;
              maxHp -= soldItem.defence;
              legArmor = null;
            }
          }
          else if(headArmor && soldItem.armorType === "head"){
            let stillHasHead = inventory.some(it => it.name === headArmor.name && it.armorType === "head");
            if(!stillHasHead){
              hp -= soldItem.defence;
              maxHp -= soldItem.defence;
              headArmor = null;
            }
          }
          else if(soldItem.type === "weapon"){
            for(let i = 0; i <= ownedWeapons.length - 1; i++){
              if(ownedWeapons[i] === soldItem){
              ownedWeapons.splice(i,1);
              weapon = ownedWeapons[0];
              break;
              }
            }
          }
          else if(soldItem.type === "potion"){
            for(let i = 0; i <= healthPotions.length - 1; i++){
              if(healthPotions[i] === soldItem){
              healthPotions.splice(i,1);
              break;
              }
            }
          }
          hpText.innerText = "Hp: " + hp + "/" + maxHp;
          break;
        }
        else{}
      }
    }
    
    function purchase(item){ 
      if(beri >= item.price){ 
        beri -= item.price; 
        beriText.innerText = "Beri: " + beri; 
        addToInventory(item); 
        if(item.type === "weapon"){
          ownedWeapons.push(item);
          if(!weapon || weapon === null){
            weapon = item;
          }
          equipStrongestWeapon();
        } 
        else if(item.type === "armor"){
          ownedArmor.push(item); 
          if(item.armorType === "chest"){
            if(chestArmor === null){
              chestArmor = item;
              maxHp += item.defence;
              hp += chestArmor.defence;
            }
              if(chestArmor.defence < item.defence){
                  maxHp -= chestArmor.defence;
                  hp -= chestArmor.defence;
                  chestArmor = item;
                  maxHp += item.defence;
                  hp += chestArmor.defence;
                }
          } 
        else if(item.armorType === "leg"){
            if(legArmor === null){
              legArmor = item;
              maxHp += item.defence;
              hp += legArmor.defence;
            }
              if(legArmor.defence < item.defence){
                  maxHp -= legArmor.defence;
                  hp -= legArmor.defence;
                  legArmor = item;
                  maxHp += item.defence;
                  hp += item.defence;
                }
          }
        else if(item.armorType === "head"){
            if(headArmor === null){
              headArmor = item;
              maxHp += item.defence;
              hp += headArmor.defence;
            }
              if(headArmor.defence < item.defence){
                  maxHp -= headArmor.defence;
                  hp -= headArmor.defence;
                  headArmor = item;
                  maxHp += item.defence;
                  hp += item.defence;
                }
          }
        }
        else if(item.type === "potion"){
          healthPotions.push(item);
          chat.innerText = "You purchased " + item.name;
        }

        chat.innerText = "You purchased " + item.name;
        hpText.innerText = "Hp: " + hp + "/" + maxHp;
      }  
      else{ 
        chat.innerText = "You do not have enough Beri!" 
      }
    } 
    
    function addToInventory(item){ 
      inventory.push(item); 
      let thing = new Option(item.name);
      itemsList.appendChild(thing)
    } 

    function equipStrongestWeapon(){
      if(ownedWeapons.length > 1){
        return;
      }
      let strongestWeapon = ownedWeapons[0];
      for(let i = 1; i <= ownedWeapons.length - 1; i++){
        if(ownedWeapons[i].dmg > strongestWeapon.dmg){
          strongestWeapon = ownedWeapons[i];
        }
      }
      weapon = strongestWeapon;
    }

    function fight(){
      equipStrongestWeapon(); 
      if(!weapon || weapon === null){
        chat.innerText = "You do not have a weapon! Purchase one before fighting!"
      }
      else{
        let opponent = islands[island].opponents[opponentsBeaten];
        buttonAction(locations[2]); 
        chat.innerText = "You run into " + islands[island].opponents[opponentsBeaten].name + "\n\n" + islands[island].opponents[opponentsBeaten].description;
        opponentPic.src = islands[island].opponents[opponentsBeaten].url;
        opponentImage.style.display = "block";
        opponentStats.style.display = "block"; 
        opponentName.innerText = opponent.name; 
        opponentLvl.innerText = "Lvl: " + opponent.level; 
        opponentAp.innerText = "Ap: " + opponent.ap; 
        opponentHealth.innerText = "Hp: " + opponent.health + "/" + opponent.defaultHealth; 
      } 
    } 
    
    function attack(){ 
      opponentImage.style.display = "none";
      let opponent = islands[island].opponents[opponentsBeaten];

      let msg = ""; 
      let dmgDealt = Math.floor(weapon.dmg + (0.5 + Math.random()) * lvl); 
      opponent.health -= dmgDealt; 
      msg += "You dealt " + dmgDealt + " damage!"; 
      if(opponent.health <= 0){ 
        opponentsBeaten++;
        lvl = opponent.level + Math.floor(1 + (Math.random() * (opponent.level / 3)));
        baseHp = hp;
        hp += Math.floor((lvl + 10) * 6.3);
        maxHp += Math.floor((lvl + 10) * 6.3);
        button1.style.display = "none"; 
        button2.style.display = "none"; 
        button3.style.display = "none"; 
        opponent.health = 0;
        let beriDropped = Math.floor(opponent.beri + (Math.random() * opponent.level * 25)); 
        msg += "\n You have defeated the enemy!\n" + opponent.name + " dropped " + beriDropped + " beri."; 
        beri += beriDropped; 
        beriText.innerText = "Beri: " + beri;
        levelText.innerText = "Lvl: " + lvl;
        hpText.innerText = "Hp: " + hp + "/" + maxHp;
        button4.style.display = "inline-block";
      } 
      else if(successfulDefend === false){
        let opponentDmg = Math.floor(opponent.level + ((0.5 + Math.random()) * opponent.ap));
        msg += "\nOpponent dealt: " + opponentDmg + " damage!"; 
        hp -= opponentDmg; if (hp <= 0) { hp = 0; 
          hpText.innerText = "Hp: " + hp + "/" + maxHp; 
          opponentHealth.innerText = "Hp: " + opponent.health + "/" + opponent.defaultHealth; 
          msg += "\nYou were defeated!";
          chat.innerText = msg;
          endGame(); 
        } 
        else{} 
      }
      else{}
      successfulDefend = false;
      chat.innerText = msg; 
      hpText.innerText = "Hp: " + hp + "/" + maxHp; 
      opponentHealth.innerText = "Hp: " + opponent.health + "/" + opponent.defaultHealth; 
    } 
    
    function defend(){ 
      opponentImage.style.display = "none";
      chat.innerText = "Pick a number"; 
      button1.innerText = "1"; 
      button2.innerText = "2"; 
      button3.innerText = "3"; 
      button1.onclick = () => roll(1); 
      button2.onclick = () => roll(2); 
      button3.onclick = () => roll(3); 
    } 
    
    function roll(num){ 
      randomNumber = Math.floor(Math.random() * 3) + 1; 
      if(num !== randomNumber){ 
        buttonAction(locations[2]); 
        chat.innerText = "You successfully blocked! \n You will take no damage from " + islands[island].opponents[opponentsBeaten].name + "'s next attack!";
        successfulDefend = true;
      } 
      else{
        if(successfulDefend === true){
            buttonAction(locations[2]); 
            chat.innerText = "You were unable to dodge but took no damage!";
          }
        else{
          let opponent = islands[island].opponents[opponentsBeaten];
          let opponentDmg = Math.floor(opponent.ap + (0.5 + Math.random()) * lvl); 
          buttonAction(locations[2]); 
          chat.innerText = "You were unable to dodge!\nOpponent dealt " + opponentDmg +" damage";
          hp -= opponentDmg;
          if(hp <= 0){
            hp = 0;
            chat.innerText += "You were defeated!";
            endGame(); 
          }
          hpText.innerText = "Hp: " + hp + "/" + maxHp;
        }
        successfulDefend = false;  
      } 
    } 
    
    function heal(){
      opponentImage.style.display = "none";
      if(healthPotions.length > 0){
        let potion = healthPotions[0];

        for (var i = 0; i < itemsList.options.length; i++) {
          if (itemsList.options[i].text === potion.name) {
            itemsList.remove(i);
            break;
          }
        }

        healthPotions.splice(0,1);
        hp += potion.heal;
        if(hp >= maxHp)
        {
          hp = maxHp;
        }
        remove(potion.name);
        chat.innerText = "You used a " + potion.name;
        hpText.innerText = "Hp: " + hp + "/" + maxHp;
      }
      else
      {
        chat.innerText = "You have no health potions!"
      }
    } 

    function remove(item){
      for(let i = 0; i <= inventory.length - 1; i++){
        if(item === inventory[i].name){
          inventory.splice(i, 1);
          let inventoryString = ""; 
          for(i = 0; i <= inventory.length - 1; i++) { 
            inventoryString = inventoryString + inventory[i].name + "\n"; 
          }
          inventoryText.innerText = inventoryString;
          break;
        }
      }
    }
    
    function endGame(){ 
      button1.innerText = "Restart"; 
      button2.style.display = "none"; 
      button3.style.display = "none"; 
      button1.onclick = restartGame;
    } 
      
    function restartGame(){ 
      lvl = 1; 
      hp = 50; 
      maxHp = 50;
      beri = 10; 
      weapon = null; 
      headArmor = null;
      chestArmor = null;
      legArmor = null;
      island = 0;
      opponentsBeaten = 0;
      inventory = [];
      ownedWeapons = [];
      healthPotions = [];
      resetOpponentHealth();

      leave();
      levelText.innerText = "Lvl: 1";
      hpText.innerText = "Hp: 50/50";
      beriText.innerText = "Beri: 10";
      chat.innerText = "Welcome Dong Wei Hu! Explore the world of DongPiece by sailing the seas as a pirate!"; 
      inventoryText.innerText = "";
      itemsList.options.length = 0;
      opponentImage.style.display = "none";
    }
      
    function setSail(){ 
      island++;
      if(island >= islands.length)
      {
        endGame();
        chat.innerText = "You have found the Dong Piece — King of Dongs!";
      }
      else{
        opponentsBeaten = 0;
        buttonAction(locations[0]);
        locationText.innerText = "Location: " + islands[island].name;
        chat.innerText = "You set sail! You arrived at " + islands[island].name + "."; 
      }
    }

    function resetOpponentHealth()
    {
      for(i = 0; i <= islands.length - 1; i++)
      {
        for(j = 0; j <= islands[i].opponents.length - 1; j++)
        {
          islands[i].opponents[j].health = islands[i].opponents[j].defaultHealth;
        }
      }
    }