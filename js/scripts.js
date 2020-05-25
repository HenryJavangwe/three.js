function init (){
    console.log('connected and rolling...')
    // setting up the scene, the camera(this will need field of view, aspect ratio and near/far clipping planes to be defined) and the renderer (to convert our 3d image to 2d so that we can be able to see it.)
    var scene = new THREE.Scene();
    var geometry = new THREE.BoxGeometry(1, 1, 1);//we create the shape by defining the geometry and the material then we'll combine these two to create a mesh.
    var material = new THREE.MeshBasicMaterial({
        color: 0x00ff00
    });
    var mesh = new THREE.Mesh(
        geometry,
        material
    );
    scene.add(mesh);

    var camera = new THREE.PerspectiveCamera(
        45, 
        window.innerWidth/window.innerHeight,
        1,
        1000
    );
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('webGl').appendChild(renderer.domElement);
    renderer.render(
        scene,
        camera
    )
}

init();