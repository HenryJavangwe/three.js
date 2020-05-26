function init (){
    console.log('connected and rolling...')
    // setting up the scene, the camera(this will need field of view, aspect ratio and near/far clipping planes to be defined) and the renderer (to convert our 3d image to 2d so that we can be able to see it.)
    var scene = new THREE.Scene();
    
    var box = getBox(1, 1, 1);
    var plane = getPlane(4);

    plane.name = 'plane-1';//after we name an obj we can locate it by calling the get obj by name method on he parent obj.

    // setting the box position and rotating the plane
    box.position.y = box.geometry.parameters.height/2;
    plane.rotation.x = Math.PI/2;
    plane.position.y = 1;

    // whatever object we create, we'll have to append it, for it to show on the scene.

    plane.add(box);//adding the box to the plane makes the box a child to the plane.
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
    update( renderer, scene, camera); //instead of calling the renderer.render method to update out scene, we'll be calling out the update function

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

// update function that'll handle our updates in the animation

function update (renderer, scene, camera){//inside the update function is where we'll execute the renderer.render method
    renderer.render(
        scene,
        camera
    );
    //getting the obj by name
    var plane = scene.getObjectByName('plane-1');
    // plane.rotation.x += 0.05;
    plane.rotation.y += 0.002;
    plane.rotation.z += 0.002;

    scene.traverse(function(child){
        child.scale.x+= 0.001;
    })
    // the request animation will take a call back that'll bee calling the update function in a recursive manner
    requestAnimationFrame(function(){
        update(renderer, scene, camera);
    })
}

var scene = init();