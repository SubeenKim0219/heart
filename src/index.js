import { THREE, OrbitControls, GenerateCanvas, GLTFLoader } from "./study/settings";
let mixer; 

const canvas = GenerateCanvas();
let renderer, scene, camera, controls;

function init() {
	renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(
		40,
		window.innerWidth / window.innerHeight
		
	);
	camera.updateProjectionMatrix();

	renderer.shadowMap.enabled = true;

	camera.position.set(10, 0, 0);
	controls = new OrbitControls(camera, canvas);
	controls.enableDamping = true;
	controls.autoRotate = true;
	controls.autoRotateSpeed = 15;

	const directionalLight = new THREE.DirectionalLight(new THREE.Color("yellow"), 0.5);
	directionalLight.position.set(3, 2, 3);
	scene.add(directionalLight);

	const directionalLight2 = new THREE.DirectionalLight(new THREE.Color("yellow"), 0.5);
	directionalLight2.position.set(-3, 2, -3);
	scene.add(directionalLight2);

	const directionalLight3 = new THREE.DirectionalLight(new THREE.Color("yellow"), 0.5);
	directionalLight3.position.set(3, -2, -3);
	scene.add(directionalLight3);


	const directionalLight4 = new THREE.DirectionalLight(new THREE.Color("yellow"), 0.5);
	directionalLight4.position.set(-3, -2, 3);
	scene.add(directionalLight4);

	const ambLight = new THREE.AmbientLight(new THREE.Color("white"), 1);
	scene.add(ambLight);


	
    const loader = new GLTFLoader();
    loader.load("./gltf/material.glb", (gltf) => {
       const model = gltf.scene;
		scene.add(model);

		
		model.traverse((child) => {
			if(child.isMesh){
				child.castShadow = true;
				child.receiveShadow = true;
				child.material.roughness = 0.5;
			}
		});
		render();

    });
	// end gltf load
}


function render() {
	requestAnimationFrame(render);
	renderer.render(scene, camera);
	controls.update();
}

init();
