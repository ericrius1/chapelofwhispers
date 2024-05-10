import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const rotationVector = new THREE.Vector3();

const euler = new THREE.Euler(0, 0, 0, "YXZ");
export default function GamepadControls({ object }) {
  const gamepad = useRef(null);

  console.log("GAME PAD MOUNTED");

  const turnSpeed = useRef(1);
  const pitchSpeed = useRef(0.7);
  const maxRollSpeed = useRef(1.5);
  const rollSpeed = useRef(maxRollSpeed.current);
  const boostFactor = useRef(1.7);
  const baseFlySpeed = useRef(0.2);
  const bankFactor = useRef(0.6);

  useEffect(() => {
    window.addEventListener("gamepadconnected", (e) => {
      gamepad.current = e.gamepad;
      console.log(e);
    });
    window.addEventListener("gamepaddisconnected", (e) => {
      console.log(e);
    });

    return () => {
      window.removeEventListener("gamepadconnected", (e) => {
        console.log(e);
      });
      window.removeEventListener("gamepaddisconnected", (e) => {
        console.log(e);
      });
    };
  }, []);

  useFrame(({ camera }, delta) => {
    if (!gamepad.current) return;
    gamepad.current = navigator.getGamepads()[0];
    const forwardBackward = -gamepad.current.axes[1]; // Axis 1 for forward and backward movement, reversed
    let speed = -baseFlySpeed.current * forwardBackward;

    const boost = gamepad.current.buttons[5].value;
    if (boost > 0) {
      speed *= boostFactor.current * boost;
    }
    object.current.translateZ(speed);

    gamepad.current.buttons.forEach((button, index) => {
      if (button.value > 0) {
        // console.log(`Button ${index}: ${button.value}`);
      }
    });

    if (gamepad.current.buttons[6].value > 0) {
      console.log("Roll");
      rollSpeed.current =
        maxRollSpeed.current * gamepad.current.buttons[6].value;
    } else if (gamepad.current.buttons[7].value > 0) {
      console.log("Roll");
      rollSpeed.current =
        -maxRollSpeed.current * gamepad.current.buttons[7].value;
    } else {
      rollSpeed.current = 0;
    }
    // console.log(leftRight);

    const leftRight = gamepad.current.axes[2];
    // console.log(leftRight);

    const upDown = gamepad.current.axes[3];

    const yRotation = Math.pow(leftRight, 3) * turnSpeed.current;
    const xRotation = Math.pow(upDown, 3) * pitchSpeed.current;
    const zRotation = -leftRight * bankFactor.current;
    rotationVector.set(xRotation, -yRotation, zRotation);
    euler.y += rotationVector.y * delta;
    euler.x += rotationVector.x * delta;

    euler.z = rotationVector.z;
    // euler.z += rollSpeed.current * delta;

    euler.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.x)); // Clamp euler.x to prevent gimbal lock
    // euler.setFromQuaternion(object.current.quaternion);
    object.current.quaternion.setFromEuler(euler);
  });

  return <></>;
}
