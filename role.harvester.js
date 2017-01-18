var roleHarvester = {

  run: function(creep) {

    if (creep.memory.working == true && creep.carry.energy == 0) {
      creep.memory.working = false;
    } else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
      creep.memory.working = true;
    }

    if (creep.memory.working == true) {
      if (Game.spawns.EmtSpawn1.energy < Game.spawns.EmtSpawn1.energyCapacity) {
        if (creep.transfer(Game.spawns.EmtSpawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(Game.spawns.EmtSpawn1);
        }
      } else {
        var target = creep.room.find(FIND_STRUCTURES, {
          filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION)
          }
        });

        if (target.energy < target.energyCapacity) {
          if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
          }
        }
      }
    } else {
      var sources = creep.pos.findClosestByPath(FIND_SOURCES);
      if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources);
      }
    }
  }
};

module.exports = roleHarvester;
