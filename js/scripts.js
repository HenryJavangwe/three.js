function init (){
    console.log('connected and rolling...')
    // setting up the scene, the camera(this will need field of view, aspect ratio and near/far clipping planes to be defined) and the renderer (to convert our 3d image to 2d so that we can be able to see it.)
    var scene = new THREE.Scene();
    
    var box = getBox(1, 1, 1);
    var plane = getPlane(4);

    // setting the box position and rotating the plane
    box.position.y = box.geometry.parameters.height/2;
    plane.rotation.x = Math.PI/2;
    // whatever object we create, we'll have to append it, for it to show on the scene.

    scene.add(box);
    scene.add(plane);

    var camera = new THREE.PerspectiveCamera(
        45, 
        window.innerWidth/window.innerHeight,
        1,
        1000
    );
    camera.position.x = 1;
    camera.position.y = 2;
    camera.position.z = 5;
    camera.lookAt(new THREE.Vector3(0, 0, 0))
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('webGl').appendChild(renderer.domElement);
    renderer.render(
        scene,
        camera
    )

    return scene;
}
// creating the box
function getBox(w, h, d){
    var geometry = new THREE.BoxGeometry(w, h, d);//we create the shape by defining the geometry and the material then we'll combine these two to create a mesh.
    var material = new THREE.MeshBasicMaterial({
        color: 0x00ff00
    });
    var mesh = new THREE.Mesh(
        geometry,
        material
    );

    return mesh;
}
// creating a plane -> works with only with and height so we'll pass a single argument
function getPlane(size){
    var geometry = new THREE.PlaneGeometry(size, size);//we create the shape by defining the geometry and the material then we'll combine these two to create a mesh.
    var material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        side: THREE.DoubleSide //by default 2d objects don't have their other side showing so we define that in-order to be able to see the other side.
    });
    var mesh = new THREE.Mesh(
        geometry,
        material
    );

    return mesh;
}

var scene = init();