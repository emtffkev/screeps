var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder')

module.exports.loop = function() {

  var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
  var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
  var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

  if (harvesters.length < 3) {
    var newName = Game.spawns['EmtSpawn1'].createCreep([WORK,CARRY, CARRY, MOVE, MOVE], undefined, {
      role: 'harvester',
      working: true
    });
    console.log('Currently ' + harvesters.length + ' harvesters.');
  } else if (builders.length < 1) {
    var newName = Game.spawns['EmtSpawn1'].createCreep([WORK, CARRY, MOVE], undefined, {
      role: 'builder',
      working: true
    });
  } else if (upgraders.length < 1) {
    var newName = Game.spawns['EmtSpawn1'].createCreep([WORK, CARRY, MOVE], undefined, {
      role: 'upgrader',
      working: true
    });
  }

  for (var name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
    }
  }

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    if (creep.memory.role == 'harvester') {
      roleHarvester.run(creep);
    }
    if (creep.memory.role == 'upgrader') {
      roleUpgrader.run(creep);
    }
    if (creep.memory.role == 'builder') {
      roleBuilder.run(creep);
    }
  }
}
