// Infantry troops
import ManAtArms  from './troops/man_at_arms.json'
import Guard      from './troops/guard.json'
import Paladin    from './troops/paladin.json'

// Cavalry troops
import Sentinel from './troops/sentinel.json'

// Ranged troops
import Rogue        from './troops/rogue.json'
import Archer       from './troops/archer.json'
import Crossbowman  from './troops/crossbowman.json'

// Artillery troops

// Mage troops

// Troops structure
const Troops = {

  // Infantry
  infantry: {
    name: "Infanterie",
    units: {
      maa:      ManAtArms,
      guard:    Guard,
      paladin:  Paladin
    }
  },

  // Cavalry
  cavalry: {
    name: "Cavalerie",
    units: {
      sentinel: Sentinel
    }
  },

  // Ranged
  ranged: {
    name: "À distance",
    units: {
      rogue:        Rogue,
      archer:       Archer,
      crossbowman:  Crossbowman
    }
  },

  // Artillery
  artillery: {
    name: "Artillerie",
    units: {}
  },

  // Mage
  mage: {
    name: "Magiciens",
    units: {}
  }
}

export default Troops
