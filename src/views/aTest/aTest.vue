<template>
  <div class="a-test">
    <div id="container"></div>
  </div>
</template>

<script>
import * as Three from "three";

export default {
  name: "aTest",
  data() {
    return {
      scene: null,
      camera: null,
      cube: null,
      renderer: null,
    };
  },
  filters: {},
  async mounted() {},
  created() {
    // this.createModel();
  },
  mounted() {
    this.init();
    this.animate();
  },
  methods: {
    init: function () {
      let container = document.getElementById("container");

      this.camera = new Three.PerspectiveCamera(
        70,
        container.clientWidth / container.clientHeight,
        0.01,
        10
      );
      this.camera.position.z = 1;

      this.scene = new Three.Scene();

      let geometry = new Three.BoxGeometry(0.2, 0.2, 0.2);
      let material = new Three.MeshNormalMaterial();

      this.mesh = new Three.Mesh(geometry, material);
      this.scene.add(this.mesh);

      this.renderer = new Three.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);
    },
    animate: function () {
      requestAnimationFrame(this.animate);
      this.mesh.rotation.x += 0.01;
      this.mesh.rotation.y += 0.02;
      this.renderer.render(this.scene, this.camera);
    },
  },
};
</script>

<style lang="scss" scoped>
.a-test {
  width: 100%;
  color: #fff;
}
#container {
  width: 100%;
  height: 400px;
}
</style>