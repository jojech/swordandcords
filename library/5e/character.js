import Roller from "../dice/dice";

export const skillsList = {
  athletics: 'stg',
  acrobatics: 'dxt',
  sleight_of_hand: 'dxt',
  stealth: 'dxt',
  history: 'int',
  arcana: 'int',
  investigation: 'int',
  religion: 'int',
  nature: 'int',
  perception: 'wis',
  insight: 'wis',
  animal_handling: 'wis',
  medicine: 'wis',
  survival: 'wis',
  persuasion: 'cha',
  performance: 'cha',
  deception: 'cha',
  intimidation: 'cha',
};

export class character {
  constructor({
    hp = false,
    stg = 10,
    dxt = 10,
    con = 10,
    int = 10,
    wis = 10,
    cha = 10,
    skills = [],
    proficiencies = [],
    saving_throws = [],
    lvl = 1,
    race = 'human',
    path = false,
    proficiency_bonus = 2,
    hd = [6], // hit dice
  }) {
    this.lvl  = lvl;
    this.stg  = stg;
    this.dxt  = dxt;
    this.con  = con;
    this.int  = int;
    this.wis  = wis;
    this.cha  = cha;
    this.race = race;
    this.class = path;
    this.proficiency_bonus = proficiency_bonus;

    this.hd = hd;
    this.hp = hp || this.generateHPTotal();
    
    this.skills = skills;
    this.proficiencies = proficiencies;
    this.saving_throws = saving_throws;

    this.equipment = [];

    this.roller = new Roller();
  }

  // HELPER STAT FUNCTIONS
  attack() {}
  dwAttack() {}
  skillCheck( skill, attr = false ) {
    let mod = 0;
    // PROFICIENCIES
    if ( typeof skillsList[skill] == 'undefined' ) {
      if ( attr ) mod += this.getModFromAttr(attr);

      if ( this.proficiencies.indexOf(skill) !== -1 ) mod += this.proficiency_bonus;
    }
    // TRADITIONAL SKILLS
    else {
      if ( !attr ) attr = skillsList[skill];

      mod = this.getModFromAttr(attr);

      if ( this.skills.indexOf(skill) !== -1 ) mod += this.proficiency_bonus;
    }

    return this.roller.quickRoll(20, 1, mod);
  }
  savingThrow( attr ) {
    let mod = 0;

    if ( this.saving_throws.indexOf(attr) !== -1 ) mod += this.proficiency_bonus;

    return this.roller.quickRoll(20, 1, mod);
  }
  getModFromAttr( attr ) {
    return 0;
  }
  generateHPTotal( method = 'roll' ) {
    this.roller.pools = [];

    this.hd.forEach(die => {
      this.roller.pool(die, 1, this.getModFromAttr('con'));
    });

    this.hp = this.roller.roll();

    console.log('HP GENERATED', this.hp);
  }

  // TURN BASED ACTIONS
  restoreActions() {
    this.actions = {
      action: true,
      free_action: true,
      bonus_action: true,
      reaction: true
    };
  }
  expendAction( type = 'action' ) {
    this.actions[type] = false;
  }

  // EQUIPMENT BASED FUNCTIONS
  /* 
    - EQUIPMENT SCHEMA
    {
      id: random hash,
      name: "My Father's Sword",
      proficiencies: ["martial_weapons", "broadsword"],
      equipped: true,
      damage: [6],
      mod: 0,
      attr: 'stg',
      range: false, INT
      long_range: false, INT
      other: {},
      size: 'hand',
      weight: 5,
      notes: "A sword passed down my family for generations made of the finest steel. Ruby inlaid in the pommel.",
    }
    - REQUIRED FIELDS
    {
      proficiencies: [],
      equipped: false,
      size: 'hand',
      weight: 1,
      attr: 'int',
      name: '',
    }
  */
  useEquipment( item, ) {

  }
  addEquipment( item ) {
    this.equipment.push(item);
  }
  // CHECK FOR IF FREE ACTION AVAILABLE
  // CHECK IF HAND/etc. AVAILABLE
  equip( id ) {
    let item = this.equipment.find(el => el.id == id);

    if ( item ) item.equipped = true;
    else console.log("Couldn't find item");
  }
  unequip( item ) {}
}