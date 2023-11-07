import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import * as THREE from 'three';
// import GLTFLoader from 'three-gltf-loader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
@Component({
  selector: 'app-three-avatar',
  templateUrl: './three-avatar.component.html',
  styleUrls: ['./three-avatar.component.scss']
})
export class ThreeAvatarComponent {
  @ViewChild('rendererContainer', { static: true }) rendererContainer!: ElementRef;
  public scene!: THREE.Scene;
  public camera!: THREE.PerspectiveCamera;
  public renderer!: any;
  public controls!: OrbitControls;
  public loader: GLTFLoader;

  // public camera
  constructor() {
    this.loader = new GLTFLoader()

  }

  ngAfterViewInit(): void {
    this.initThree();
  }

  initThree() {
    // Initialize scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff)

    // Initialize camera
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(- 1.8, 0.6, 2.7);

    // Initialize renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    // Initialize OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.addEventListener('change', () => {
      this.renderer.render(this.scene, this.camera);
    });
    this.controls.enableZoom = true
    this.controls.update();


    // Load 3D model
    this.loader.load('../../assets/samanta_03.glb', (gltf) => {
      const model = gltf.scene;
      model.position.set(0, 1, 0);
      this.scene.add(model);

      // Add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff);
      this.scene.add(ambientLight);

      // Start the animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        console.log("running");
      };
      animate();

    }, undefined, (error) => {
      console.error('Error loading GLTF:', error);
    });
  }
}
