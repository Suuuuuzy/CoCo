var recBuffers = [];
var outputSampleRate = 16000;
var inSampleRate;

this.onmessage = function(e) {
	switch (e.data.command) {
		case 'init':
			init(e.data.config);
			break;
		case 'record':
			record(e.data.buffer);
			break;
		case 'clear':
			clear();
			break;
	}
};

function init(config) {
	inSampleRate = config.sampleRate;
	outputBufferLength = config.outputBufferLength;
	outputSampleRate = config.outputSampleRate || outputSampleRate;
}

function record(inputBuffer) {
	var isSilent = true;

	for (var i = 0; i < inputBuffer[0].length; i++) {
		recBuffers.push((inputBuffer[0][i] + inputBuffer[1][i]) * 16383.0);
	}

	while (recBuffers.length * outputSampleRate / inSampleRate > outputBufferLength) {
		var result = new Int16Array(outputBufferLength);

		var bin = 0;
		var num = 0;
		var indexIn = 0;
		var indexOut = 0;

		while (indexIn < outputBufferLength) {
			bin = 0;
			num = 0;

			while (indexOut < Math.min(recBuffers.length, (indexIn + 1) * inSampleRate / outputSampleRate)) {
				bin += recBuffers[indexOut];
				num += 1;
				indexOut++;
			}

			result[indexIn] = bin / num;

			if (isSilent && (result[indexIn] != 0)) {
				isSilent = false;
			}

			indexIn++;
		}

		if (!isSilent) {
			var output = {};
			output.command = 'newBuffer';
			output.data = result;
			this.postMessage(output);
		}

		recBuffers = recBuffers.slice(indexOut);
	}
}

function clear() {
	recBuffers = [];
}