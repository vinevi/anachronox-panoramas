(function(){
	let viewer = new PANOLENS.Viewer({
		autoHideControlBar: true,
		enableReticle: false,
	});
	let stereo = new PANOLENS.Stereo( 0.4 );
	viewer.sceneReticle.visible = false;
	document.addEventListener('DOMContentLoaded', function(){
		let selectElement = document.querySelector('#cubemap-select');
		let options = selectElement.querySelectorAll('option');
		let panoramas = [];
		options.forEach(function(option){
			let path = option.dataset.path;
			console.log(path);
			let panorama = new PANOLENS.StereoImagePanorama(path, stereo);
			viewer.add(panorama);
			panoramas.push(panorama);
		});
		selectElement.addEventListener('change', function(event){
			let index = event.target.selectedIndex;
			viewer.setPanorama(panoramas[index]);
			viewer.disableReticleControl();
		});
	});
})();
