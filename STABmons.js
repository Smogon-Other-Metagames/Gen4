	{
		ruleset: ['[Gen 4] OU'],
		banlist: ['Belly Drum', 'BrightPowder'],
		validateSet: function (set, teamHas) {
			if (!this.validateSet(set)) return this.validateSet(set, teamHas);
			let excludedMoves = {'acupressure': 1, 'chatter': 1, 'sketch': 1};
			let template = this.tools.getTemplate(set.species);
			template = Object.assign({}, template);
			if (!template.learnset && template.baseSpecies !== template.species) template.eventPokemon = this.tools.getTemplate(template.baseSpecies).eventPokemon;
			template.learnset = Object.assign({}, template.learnset);
			let types = {
				'Shaymin': ['Grass', 'Flying'],
			}[template.baseSpecies] || template.types;
			for (let id in this.tools.data.Movedex) {
				if (excludedMoves[id]) continue;
				let move = this.tools.getMove(id);
				if (move.gen < 7 && types.includes(move.type)) template.learnset[id] = ['3T', '4T'];
			}
			for (let prevo = template; prevo.prevo; ) {
				prevo = prevo.prevo = Object.assign({}, this.tools.getTemplate(prevo.prevo));
				prevo.learnset = Object.assign({}, prevo.learnset);
				types = prevo.types;
				for (let id in this.tools.data.Movedex) {
					if (excludedMoves[id]) continue;
					let move = this.tools.getMove(id);
					if (move.gen < 7 && types.includes(move.type)) prevo.learnset[id] = ['3T', '4T'];
				}
			}
			return this.validateSet(set, teamHas, template);
		},
	},
