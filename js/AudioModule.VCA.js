AudioModule.VCA = (function() {

	// Constructor
	var VCA = function() {
		AudioModule.construct(this, "VCA");

		this.processor = AudioModule.context.createGain();

		this.setGain(0.7);
	};
	

	// Accessors
	VCA.prototype.setGain = function(gain) {
		this.forEachProcessor( function(processor, module) {
			processor.gain.value = gain;
		});
	}


	// UX Building
	VCA.prototype.buildUI = function() {

		this.spawnWidget(
			'VCA', 

			'<div class="websynth-input">'+
				'<label>Gain</label>'+
				'<div class="gain-fader"></div>'+
				'<div class="gain-value">'+this.processor.gain.value.toFixed(2)+'</div>'+
			'</div>',
			
			function($uiItem, module) {
				$uiItem.find('.gain-fader').slider({
					value: Math.floor(100 * module.processor.gain.value),
					change: function( event, ui ) {
						var parsedValue = ui.value / 100;
						module.setGain(parsedValue);
						$uiItem.find('.gain-value').text(parsedValue.toFixed(2));
					}
				});
			}
		);
	}

	
	// Export VCA
	return VCA;
})();