import { Component, NgZone } from '@angular/core';
import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';
@Component({
  selector: 'app-three-avatar',
  templateUrl: './three-avatar.component.html',
  styleUrls: ['./three-avatar.component.scss']
})
export class ThreeAvatarComponent {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private avatar!: THREE.Object3D; // Change the type to Object3D

  constructor(private ngZone: NgZone) { }

  ngOnInit() {
    // this.initThree();
    // this.loadAvatar();
    // this.animate();
  }

  ngOnDestroy() {
    // Clean up resources
  }

  private initThree() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector('div')?.appendChild(this.renderer.domElement);

    this.camera.position.z = 5;

    window.addEventListener('resize', () => this.onWindowResize(), false);
  }

  private loadAvatar() {
    const loader = new GLTFLoader();
    loader.load(
      'path/to/your/avatar.gltf', // Replace with the path to your GLTF model
      (gltf: any) => {
        this.avatar = gltf.scene;
        this.scene.add(this.avatar);
      },
      undefined,
      (error: any) => {
        console.error('Error loading avatar', error);
      }
    );
  }

  private animate() {
    this.ngZone.runOutsideAngular(() => {
      const animateFn = () => {
        requestAnimationFrame(animateFn);
        if (this.avatar) {
          this.avatar.rotation.x += 0.01;
          this.avatar.rotation.y += 0.01;
        }
        this.renderer.render(this.scene, this.camera);
      };
      animateFn();
    });
  }

  private onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
