export class Die {
  constructor( size = 6 ) {
    this.size = parseInt(size);

    if ( !this.size ) this.size = 6;
  }

  roll() {
    let result = Math.ceil(Math.random() * this.size);

    console.log(`d${this.size} rolled -> ${result}`);

    return {size: this.size, result: result};
  }
}

export class Mod {
  constructor(mod) {
    this.mod = mod;
  }

  roll() {
    console.log(`Modifier ${this.mod}`);
    return {size: false, result: this.mod};
  }
}

export default class Roller {
  constructor() {
    this.pools = [];

    this.log = [];
  }

  pool( size = 6, qty = 1, mod = 0 ) {
    let i    = 0,
        pool = [];

    while ( i < qty ) {
      pool.push(new Die(size));
      
      i++;
    }

    if ( mod != 0 ) {
      mod = parseInt(mod);

      pool.push(new Mod(mod));
    }

    this.pools.push(pool);

    return pool;
  }

  roll( clearLog = true ) {
    if ( clearLog ) this.log = [];

    let total = 0;

    this.pools.forEach(pool => {
      pool.forEach(item => {
        let { size, result } = item.roll();

        this.log.push({size, result});

        total += result;
      });
    });

    console.log('Total ', total);

    console.log(this.log);

    return total;
  }

  quickRoll(size = 6, qty = 1, mod = 0) {
    this.pools = [];

    this.pool(size, qty, mod);

    return this.roll();
  }
}