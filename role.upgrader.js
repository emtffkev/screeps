var harvesting = false;
var roleUpgrader = {

	/** @param {Creep} creep **/
	run: function(creep) {

		if (harvesting) {
			if (creep.carry.energy < creep.carryCapacity) {
				var sources = creep.room.find(FIND_SOURCES);
				if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(sources[0]);
				}
			} else {
				harvesting = false;
				creep.say('Upgrading!');
			}
		} else {
			if (creep.carry.energy == 0) {
				harvesting = true;
			} else {
				if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
					creep.moveTo(creep.room.controller);
				}
			}
		}
	}
};

module.exports = roleUpgrader;
