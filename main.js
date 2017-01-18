require('prototype.spawn')();
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleWallRepairer = require('role.wallRepairer');

module.exports.loop = function() {

  for (let name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
    }
  }

  for (let name in Game.creeps) {
    var creep = Game.creeps[name];
    if (creep.memory.role == 'harvester') {
      roleHarvester.run(creep);
    } else if (creep.memory.role == 'upgrader') {
      roleUpgrader.run(creep);
    } else if (creep.memory.role == 'builder') {
      roleBuilder.run(creep);
    } else if (creep.memory.role == 'repairer') {
      roleRepairer.run(creep);
    } else if (creep.memory.role == 'wallRepairer') {
      roleWallRepairer.run(creep);
    }
  }

  var towers = Game.rooms.W2N5.find(FIND_STRUCTURES, {
    filter: (s) => s.structureType == STRUCTURE_TOWER
  });
  for (let tower of towers) {
    var target = tower.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
    if (target != undefined) {
      tower.attack(target);
    }
  }

  var minHarvesters = 3;
  var minUpgraders = 1;
  var minBuilders = 1;
  var minRepairers = 1;
  var minWallRepairers = 0;

  var numHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
  var numUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
  var numBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
  var numRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');
  var numWallRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'wallRepairer');

  var energy = Game.spawns.EmtSpawn1.room.energyCapacityAvailable;
  var name = undefined;

  if (numHarvesters < minHarvesters) {
    name = Game.spawns.EmtSpawn1.createCustomCreep(energy, 'harvester');

    if (name == ERR_NOT_ENOUGH_ENERGY && numHarvesters == 0) {
      name = Game.spawns.EmtSpawn1.createCustomCreep(Game.spawns.EmtSpawn1.room.energyAvailable, 'harvester');
    }
  } else if (numUpgraders < minUpgraders) {
    name = Game.spawns.EmtSpawn1.createCustomCreep(energy, 'upgrader');
  } else if (numRepairers < minRepairers) {
    name = Game.spawns.EmtSpawn1.createCustomCreep(energy, 'repairer');
  } else if (numBuilders < minBuilders) {
    name = Game.spawns.EmtSpawn1.createCustomCreep(energy, 'builder');
  } else if (numWallRepairers < minWallRepairers) {
    name = Game.spawns.EmtSpawn1.createCustomCreep(energy, 'wallRepairer');
  } else {
    name = Game.spawns.EmtSpawn1.createCustomCreep(energy, 'builder');
  }

  if (!(name < 0)) {
    console.log('Spawned new creep: ' + name);
  }
};
