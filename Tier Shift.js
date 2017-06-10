	{
		ruleset: ['[Gen 4] OU'],
		onModifyTemplate: function (template, target, source, effect) {
			if (source) return;
			if (target.set.ability in {'Drizzle': 1, 'Drought': 1, 'Shadow Tag': 1}) return;

			if (!template.abilities) return false;

			let boosts = {
				'UU': 5,
				'BL2': 5,
				'RU': 10,
				'BL3': 10,
				'NU': 10,
				'BL4': 10,
				'PU': 10,
				'NFE': 10,
				'LC Uber': 10,
				'LC': 10,
			};
			let tier = template.tier;
			if (target.set.item) {
				let item = this.getItem(target.set.item);
				if (item.megaEvolves === template.species) tier = this.getTemplate(item.megaStone).tier;
			}
			if (!(tier in boosts)) return;

			let boost = target.set.moves.includes('chatter') ? 15 : boosts[tier];
			template = Object.assign({}, template);
			template.baseStats = Object.assign({}, template.baseStats);
			for (let statName in template.baseStats) {
				template.baseStats[statName] = this.clampIntRange(template.baseStats[statName] + boost, 1, 255);
			}
			return template;
		},
	},
