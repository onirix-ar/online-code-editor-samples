# Embed SDK limiting transformation controls to specific elements 

From version v1.10.0 of Onirix Embed SDK it is possible to decide which elements react to the transformation controls (movement, scale and rotation).

Onirix EmbedSDK provides two actions:

- `setTransformControlsAllowlist([...elementsOids])` Allows you to specify the elements that accept the transformation controls. Only the elements whose oid is passed as a parameter can be modified by the user with the usual transformation gestures (move, rotate and scale).
- `setTransformControlsBlocklist([...elementsOids])` Allows to specify the elements that do NOT accept the transformation controls. Only the elements whose oid is NOT passed as a parameter can be modified by the user with the usual transformation gestures (move, rotate and scale).

Both actions are opposites. Therefore, each time we call one of them, all previous possible calls are cancelled.

If the project does not allow transformation gestures, these two actions will have no effect.

