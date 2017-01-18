var roleUpgrader = require('role.upgrader');

var roleBuilder = {

	/** @param {Creep} creep **/
	run: function(creep) {

    if (creep.memory.working == true && creep.carry.energy == 0) {
      creep.memory.working = false;
    } else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
      creep.memory.working = true;
    }

    if (creep.memory.working == true) {
      var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);

      if (constructionSite != undefined) {
        if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
          creep.moveTo(constructionSite);
        }
      } else {
        roleUpgrader.run(creep);
      }
    } else {
      creep.moveTo(15,42);
      var source = Game.getObjectById('31ef07748aec3a4');
      if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
    }
	}
};

module.exports = roleBuilder;
