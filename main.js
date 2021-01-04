	let viewer = new PANOLENS.Viewer({
		autoHideControlBar: true,
		enableReticle: false,
	});

	let stereo = new PANOLENS.Stereo(0);

	let panoramas = [
		{
			"name": "Whitendon",
			"cubemap": "panoramas/whitendon/01/cubemap/",
			"stereo": "panoramas/whitendon/01/whitendon_01.png"
		},
		{
			"name": "Rowdys - Boot's office",
			"cubemap": "panoramas/rowdys/01/cubemap/",
			"stereo": "panoramas/rowdys/01/rowdys_01.png"
		}
	];

	
	let currentPanorama;
	viewer.sceneReticle.visible = false;
	document.addEventListener('DOMContentLoaded', function(){
		let panoramaControls = document.querySelector('#panorama-controls');
		let selectElement = panoramaControls.querySelector('#cubemap-select');
		let stereoCheckbox = panoramaControls.querySelector('input#stereo');
		panoramas.forEach(function(panorama) {
			let optionElement = document.createElement('option');
			let name = panorama.name;
			optionElement.innerHTML = name;
			selectElement.appendChild(optionElement);
		})

		function loadCurrentPanorama() {
			let isStereo = stereoCheckbox.checked;
			let panoramaIndex = selectElement.selectedIndex;
			let panoramaInfo = panoramas[panoramaIndex];
			if (isStereo) {
				let stereoPath = panoramaInfo.stereo;
				if(stereoPath) {
					if(currentPanorama) {
						viewer.remove(currentPanorama);
					}
					currentPanorama = new PANOLENS.StereoImagePanorama(stereoPath, stereo);
					viewer.add(currentPanorama);
					viewer.setPanorama(currentPanorama);
				}
			} else {
				let cubemapPath = panoramaInfo.cubemap;
				if(cubemapPath) {
					let format = '.png';
					if(currentPanorama) {
						viewer.remove(currentPanorama);
					}
					currentPanorama = new PANOLENS.CubePanorama([
						cubemapPath + 'posx' + format,
						cubemapPath + 'negx' + format,
						cubemapPath + 'posy' + format,
						cubemapPath + 'negy' + format,
						cubemapPath + 'posz' + format,
						cubemapPath + 'negz' + format
					]);
					viewer.add(currentPanorama);
					viewer.setPanorama(currentPanorama);
				}
			}
		}

		selectElement.addEventListener('change', loadCurrentPanorama);
		stereoCheckbox.addEventListener('change', loadCurrentPanorama);

		loadCurrentPanorama();
	});
