import Card from "../types/card";
import Supporter from "../types/supporter";

export const getCards = (): Card[] => {
    return [
        {
            name: "Prophet",
            description: "On Spawn: Pay 2 body parts to draw 1 card",
            type: "Unit",
            tags: ["Zombie"],
            cost: [0,2],
            attack: 1,
            defense: 2,
            quantity: 2
        },
        {
            name: "Doctor",
            description: "On Spawn: Pay 2 body parts to kill 1 ally and heal another ally completely (this removes poison)",
            type: "Unit",
            tags: ["Zombie"],
            cost: [0,2],
            attack: 2,
            defense: 1,
            quantity: 2
        },
        {
            name: "Horseman",
            description: "Rush - Spawn: Pay 3 body parts to spawn a knight (4/3 with Rush) instead",
            type: "Unit",
            tags: ["Zombie"],
            cost: [0,3],
            attack: 3,
            defense: 1,
            quantity: 2
        },
        {
            name: "Pawn",
            description: "-",
            type: "Unit",
            tags: ["Zombie"],
            cost: [0],
            attack: 2,
            defense: 2,
            quantity: 2
        },
        {
            name: "Plague Bearer",
            description: "On Hit: Poisons the target (poisoned units get -1 HP at the start of each round)",
            type: "Unit",
            tags: ["Zombie"],
            cost: [0],
            attack: 1,
            defense: 2,
            quantity: 2
        },
        {
            name: "Meat Colossus",
            description: "On Round start: Regenerate 1 missing HP",
            type: "Unit",
            tags: ["Zombie"],
            cost: [4],
            attack: 3,
            defense: 7,
            quantity: 2
        },
        {
            name: "Undertaker",
            description: "On Spawn: Play a unit from graveyard immediately. The played unit has no effects anymore and will be removed from the game once it dies",
            type: "Unit",
            tags: ["Zombie"],
            cost: [3],
            attack: 1,
            defense: 3,
            quantity: 2
        },
        {
            name: "Mage",
            description: "On Spawn: Cast a spell from the graveyard, the spell will afterwards be removed from the game",
            type: "Unit",
            tags: ["Zombie"],
            cost: [1],
            attack: 2,
            defense: 3,
            quantity: 2
        },
        {
            name: "Trebuchet",
            description: "On Spawn: Create an explosive torso in the enemy deck (once this is drawn it explodes and deals 1 damage to 2 random enemy units)",
            type: "Unit",
            tags: ["Machine"],
            cost: [0],
            attack: 0,
            defense: 2,
            quantity: 2
        },
        {
            name: "Explosive Torso",
            description: "On Draw: Deal 1 damage to 2 random units and remove this card from play. Draw a card.",
            type: "Unit",
            tags: ["Zombie"],
            cost: [0],
            attack: 0,
            defense: 1,
            quantity: 0
        },
        {
            name: "Flesh Ripper",
            description: "On Attack: Gains 1 body part",
            type: "Unit",
            tags: ["Zombie"],
            cost: [1],
            attack: 3,
            defense: 2,
            quantity: 2
        },
        {
            name: "Servant",
            description: "On Death: Draw a card",
            type: "Unit",
            tags: ["Zombie"],
            cost: [0],
            attack: 1,
            defense: 1,
            quantity: 2
        },
        {
            name: "Powder Monkey",
            description: "On Death: Deal 1 damage to all units and exile me",
            type: "Unit",
            tags: ["Zombie"],
            cost: [2],
            attack: 2,
            defense: 2,
            quantity: 2
        },
        {
            name: "General",
            description: "Aura: Give other allies +1 / +1",
            type: "Unit",
            tags: ["Zombie"],
            cost: [3],
            attack: 3,
            defense: 4,
            quantity: 2
        },
        {
            name: "Flesh Absorber",
            description: "On Spawn: Kill an ally to add his stats to mine",
            type: "Unit",
            tags: ["Zombie"],
            cost: [2],
            attack: 1,
            defense: 2,
            quantity: 2
        },
        {
            name: "Summoner",
            description: "On Spawn: Choose a unit to play from your deck",
            type: "Unit",
            tags: ["Zombie"],
            cost: [1],
            attack: 1,
            defense: 1,
            quantity: 2
        },
        {
            name: "Sniper",
            description: "On Spawn: Deal 2 damage to an enemy unit",
            type: "Unit",
            tags: ["Zombie"],
            cost: [2],
            attack: 2,
            defense: 1,
            quantity: 2
        },
        {
            name: "Leviathan",
            description: "Can only take 1 damage at a time",
            type: "Unit",
            tags: ["Zombie"],
            cost: [5],
            attack: 6,
            defense: 3,
            quantity: 2
        },
        {
            name: "Tesla Coil",
            description: "Reduces all body part costs by 1 and play as many cards as you want until the end of your turn",
            type: "Spell",
            tags: [""],
            cost: [2],
            quantity: 2
        },
        {
            name: "Ground Fog",
            description: "Increases the HP of your units by 1, last 2 rounds",
            type: "Spell",
            tags: [""],
            cost: [1],
            quantity: 2
        },
        {
            name: "Lending a hand",
            description: "Deal 2 damage to a unit or pay 2 body parts to deal 3 damage instead",
            type: "Spell",
            tags: [],
            cost: [0,2],
            quantity: 2
        },
        {
            name: "Rusty Knife",
            description: "Permanently increase the ATK of a unit by 1",
            type: "Spell",
            tags: [],
            cost: [0],
            quantity: 2
        },
        {
            name: "Decay",
            description: "Reduce the ATK of all enemy units by 1 for the rest of the round",
            type: "Spell",
            tags: [],
            cost: [1],
            quantity: 2
        },
        {
            name: "Harvest flesh",
            description: "Halve the HP of an ally unit to gain 2 body parts",
            type: "Spell",
            tags: [],
            cost: [0],
            quantity: 2
        },
        {
            name: "Explosive Arm",
            description: "Deal 1 damage to two different units or pay 4 body parts to deal 2 damage to two different units",
            type: "Spell",
            tags: [],
            cost: [0, 4],
            quantity: 2
        },
        {
            name: "Frankenstein's Monster",
            description: "On Spawn: Kill two of my supporters. Use up all body parts and add 1 ATK and 1 HP evenly to my stats (eg. 3 body parts = +2/+1)",
            type: "Boss",
            tags: ["Zombie"],
            cost: [0],
            attack: 8,
            defense: 8,
            quantity: 0
        }
    ];
}

export const getSupporters = (): Supporter[] => {
    return [
        {
            name: "Henry Clerval",
            level_0_text: "Revive 3 units to unlock level 1",
            level_0_counter: 3,
            level_1_text: "Costs of reviving allies -1, revive 3 units to unlock level 2",
            level_1_counter: 3,
            level_2_text: "Costs of reviving allies -2, revive 4 units to unlock level 3",
            level_2_counter: 4,
            level_3_text: "Costs of reviving allies -3",
            counter: 0
        },
        {
            name: "William Frankenstein",
            level_0_text: "Kill 4 enemy units to unlock level 1",
            level_0_counter: 4,
            level_1_text: "Killing an enemy gives the killing unit +1 attack, kill 8 enemy units to unlock level 2",
            level_1_counter: 8,
            level_2_text: "Killing an enemy gives the killing unit +2 attack, kill 12 enemy units to unlock level 3",
            level_2_counter: 12,
            level_3_text: 'All your units have "Rush" and they get +3 attack after killing an enemy',
            counter: 0
        },
        {
            name: "Elizabeth Lavenza",
            level_0_text: "Draw 5 cards to unlock level 1",
            level_0_counter: 5,
            level_1_text: "Pay 2 body parts to put a card from your hand into the deck and draw a new card, draw 5 cards to unlock level 2",
            level_1_counter: 5,
            level_2_text: "Pay 1 body part to put a card from your hand into the deck and draw a new card, draw 10 cards to unlock level 3",
            level_2_counter: 10,
            level_3_text: "Pay 1 body part to draw a card",
            counter: 0
        },
    ]
}

export const getCardByName = (cardName: string):Card |undefined => {
    return getCards().find(card => card.name === cardName);
}