// 3D Model Viewer Module
class ThreeDModelViewer {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.canvas = null;
        this.isInitialized = false;
        this.isRotating = true;
        this.isVisible = false;
    }

    init(container) {
        if (this.isInitialized) return;
        if (!window.THREE) {
            console.error('Three.js not loaded');
            return;
        }

        this.canvas = container.querySelector('#three-canvas');
        if (!this.canvas) {
            console.error('Three.js canvas not found');
            return;
        }

        this.setupScene();
        this.setupModel();
        this.setupLighting();
        this.setupControls();
        this.startRenderLoop();
        this.isInitialized = true;
        this.isVisible = true;

        // Hide instructions when model loads
        setTimeout(() => {
            const instructions = container.querySelector('#three-instructions');
            if (instructions) {
                instructions.style.display = 'none';
            }
        }, 2000);
    }

    setupScene() {
        const rect = this.canvas.getBoundingClientRect();
        const aspect = rect.width / rect.height;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
        this.camera.position.set(8, 6, 8);
        this.camera.lookAt(0, 0, 0);

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true
        });

        this.renderer.setSize(rect.width, rect.height);
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }

    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);

        // Main directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 50;
        this.scene.add(directionalLight);

        // Process value indicator light
        const processLight = new THREE.PointLight(0x00ff88, 0.5, 20);
        processLight.position.set(0, 5, 0);
        this.scene.add(processLight);
    }

    setupModel() {
        const systemGroup = new THREE.Group();
        const pumpGroup = new THREE.Group();
        const valveGroup = new THREE.Group();
        const sensorGroup = new THREE.Group();
        const pipeGroup = new THREE.Group();

        // Create Pump (Main Component)
        const pumpGeometry = new THREE.CylinderGeometry(1.5, 1.5, 3, 8);
        const pumpMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x007BFF,
            transparent: true,
            opacity: 0.8
        });
        const pump = new THREE.Mesh(pumpGeometry, pumpMaterial);
        pump.position.set(-3, 1.5, 0);
        pump.castShadow = true;
        pumpGroup.add(pump);

        const pumpHousingGeometry = new THREE.CylinderGeometry(2, 2, 0.5, 16);
        const pumpHousingMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x0056B3,
            transparent: true,
            opacity: 0.9
        });
        const pumpHousing = new THREE.Mesh(pumpHousingGeometry, pumpHousingMaterial);
        pumpHousing.position.set(-3, 1.75, 0);
        pumpGroup.add(pumpHousing);

        // Create Valve (Gate Valve)
        const valveBodyGeometry = new THREE.BoxGeometry(1.5, 1, 2);
        const valveBodyMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x6F42C1,
            transparent: true,
            opacity: 0.8
        });
        const valveBody = new THREE.Mesh(valveBodyGeometry, valveBodyMaterial);
        valveBody.position.set(0, 0, 0);
        valveGroup.add(valveBody);

        // Valve stem
        const valveStemGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 8);
        const valveStemMaterial = new THREE.MeshPhongMaterial({ color: 0xcccccc });
        const valveStem = new THREE.Mesh(valveStemGeometry, valveStemMaterial);
        valveStem.position.set(0, 1.5, 0);
        valveGroup.add(valveStem);

        // Valve wheel with complete geometry
        const valveWheelGeometry = new THREE.TorusGeometry(0.8, 0.2, 8, 16);
        const valveWheelMaterial = new THREE.MeshPhongMaterial({ color: 0x28A745 });
        const valveWheel = new THREE.Mesh(valveWheelGeometry, valveWheelMaterial);
        valveWheel.position.set(0, 2.5, 0);
        valveWheel.castShadow = true;
        valveGroup.add(valveWheel);

        // Create Flow Sensor
        const sensorGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 8);
        const sensorMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x17A2B8,
            transparent: true,
            opacity: 0.8
        });
        const sensor = new THREE.Mesh(sensorGeometry, sensorMaterial);
        sensor.position.set(3, 0, 0);
        sensorGroup.add(sensor);

        // Sensor indicator lights
        const indicatorGeometry = new THREE.SphereGeometry(0.1, 8, 8);
        for (let i = 0; i < 4; i++) {
            const indicatorMaterial = new THREE.MeshPhongMaterial({ 
                color: i % 2 === 0 ? 0x28A745 : 0xFF6B35,
                emissive: i % 2 === 0 ? 0x004000 : 0x400000
            });
            const indicator = new THREE.Mesh(indicatorGeometry, indicatorMaterial);
            indicator.position.set(3 + Math.cos(i * Math.PI/2) * 1.2, 0.5 + Math.sin(i * Math.PI/2) * 0.3, Math.sin(i * Math.PI/2) * 1.2);
            sensorGroup.add(indicator);
        }

        // Create pipes connecting components
        const pipeGeometry = new THREE.CylinderGeometry(0.2, 0.2, 3, 8);
        const pipeMaterial = new THREE.MeshPhongMaterial({ color: 0x666666 });
        
        // Pump to valve pipe
        const pumpToValve = new THREE.Mesh(pipeGeometry, pipeMaterial);
        pumpToValve.position.set(-1.5, 0, 0);
        pumpToValve.rotation.z = Math.PI / 2;
        pipeGroup.add(pumpToValve);

        // Valve to sensor pipe
        const valveToSensor = new THREE.Mesh(pipeGeometry, pipeMaterial);
        valveToSensor.position.set(1.5, 0, 0);
        valveToSensor.rotation.z = Math.PI / 2;
        pipeGroup.add(valveToSensor);

        // Ground plane
        const groundGeometry = new THREE.PlaneGeometry(20, 20);
        const groundMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x333333,
            transparent: true,
            opacity: 0.3
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        this.scene.add(ground);

        systemGroup.add(pumpGroup, valveGroup, sensorGroup, pipeGroup);
        this.scene.add(systemGroup);

        // Store reference to valve wheel for animation
        this.valveWheel = valveWheel;
    }

    setupControls() {
        // Mouse controls for rotation
        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };
        let rotation = { x: 0, y: 0 };

        this.canvas.addEventListener('mousedown', (event) => {
            isDragging = true;
            previousMousePosition = { x: event.clientX, y: event.clientY };
        });

        this.canvas.addEventListener('mouseup', () => {
            isDragging = false;
        });

        this.canvas.addEventListener('mousemove', (event) => {
            if (isDragging) {
                const deltaX = event.clientX - previousMousePosition.x;
                const deltaY = event.clientY - previousMousePosition.y;

                rotation.y += deltaX * 0.005;
                rotation.x += deltaY * 0.005;

                this.camera.position.x = Math.cos(rotation.y) * 8;
                this.camera.position.z = Math.sin(rotation.y) * 8;
                this.camera.position.y = 6 + Math.sin(rotation.x) * 3;

                this.camera.lookAt(0, 0, 0);

                previousMousePosition = { x: event.clientX, y: event.clientY };
            }
        });

        // Zoom controls
        this.canvas.addEventListener('wheel', (event) => {
            event.preventDefault();
            const delta = event.deltaY > 0 ? 1.1 : 0.9;
            const scale = Math.max(3, Math.min(15, this.camera.position.length() * delta));
            
            const direction = this.camera.position.clone().normalize();
            this.camera.position.copy(direction.multiplyScalar(scale));
        });

        // Touch controls for mobile
        let touchStart = null;
        
        this.canvas.addEventListener('touchstart', (event) => {
            if (event.touches.length === 1) {
                touchStart = { x: event.touches[0].clientX, y: event.touches[0].clientY };
            }
        }, { passive: true });

        this.canvas.addEventListener('touchmove', (event) => {
            event.preventDefault();
            if (event.touches.length === 1 && touchStart) {
                const deltaX = event.touches[0].clientX - touchStart.x;
                const deltaY = event.touches[0].clientY - touchStart.y;

                rotation.y += deltaX * 0.005;
                rotation.x += deltaY * 0.005;

                this.camera.position.x = Math.cos(rotation.y) * 8;
                this.camera.position.z = Math.sin(rotation.y) * 8;
                this.camera.position.y = 6 + Math.sin(rotation.x) * 3;

                this.camera.lookAt(0, 0, 0);

                touchStart = { x: event.touches[0].clientX, y: event.touches[0].clientY };
            }
        });

        this.canvas.addEventListener('touchend', () => {
            touchStart = null;
        }, { passive: true });
    }

    startRenderLoop() {
        const animate = () => {
            if (this.isVisible) {
                // Animate valve wheel based on process value
                if (this.valveWheel && this.animationData) {
                    const { processValue, pidValue } = this.animationData;
                    const valveOpenPercent = Math.abs(processValue - pidValue) < 10 ? 0.8 : 0.3;
                    this.valveWheel.scale.setScalar(valveOpenPercent);
                }

                this.renderer.render(this.scene, this.camera);
            }
            requestAnimationFrame(animate);
        };
        animate();
    }

    updateAnimationData(data) {
        this.animationData = data;
    }

    resize() {
        if (!this.isInitialized) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const aspect = rect.width / rect.height;

        this.camera.aspect = aspect;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(rect.width, rect.height);
    }

    destroy() {
        if (this.renderer) {
            this.renderer.dispose();
        }
        this.isVisible = false;
        this.isInitialized = false;
    }
}

// Export for use in main script
window.ThreeDModelViewer = ThreeDModelViewer;