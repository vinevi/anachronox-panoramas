	let viewer = new PANOLENS.Viewer({
		autoHideControlBar: true,
		enableReticle: false,
	});

	let panoramas = [

		{
			"name": "Rowdy's - Boot's office",
			"cubemap": "panoramas/rowdys/01/cubemap/",
		},
		{
			"name": "Rowdy's - Bar counter",
			"cubemap": "panoramas/rowdys/02/cubemap/",
		},
		{
			"name": "Bricks Platform Area - Platform 1",
			"cubemap": "panoramas/bricksb/01/cubemap/",
		},
		{
			"name": "Hephaestus - Eco Bar",
			"cubemap": "panoramas/hephaestus/01/cubemap/",
		},
		{
			"name": "Hephaestus - Le Sommeil",
			"cubemap": "panoramas/hephaestus/02/cubemap/",
		},
		{
			"name": "Hephaestus - Rocket Coaster",
			"cubemap": "panoramas/hephaestus/03/cubemap/",
		},
		{
			"name": "Whitendon - Gates",
			"cubemap": "panoramas/whitendon/01/cubemap/",
		},
	];

	
	let currentPanorama;
	viewer.sceneReticle.visible = false;
	document.addEventListener('DOMContentLoaded', function(){
		let selectElement = document.querySelector('#cubemap-select');
		panoramas.forEach(function(panorama) {
			let optionElement = document.createElement('option');
			let name = panorama.name;
			optionElement.innerHTML = name;
			selectElement.appendChild(optionElement);
		})

		function loadCurrentPanorama() {
			let panoramaIndex = selectElement.selectedIndex;
			let panoramaInfo = panoramas[panoramaIndex];
			let cubemapPath = panoramaInfo.cubemap;
			if(cubemapPath) {
				let format = '.jpg';
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

		selectElement.addEventListener('change', loadCurrentPanorama);

		loadCurrentPanorama();
	});
