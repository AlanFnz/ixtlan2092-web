import { BUILDING_TYPE } from "../city/building/constants";

function isActiveToolIdValid(
  toolId: string
): toolId is keyof typeof BUILDING_TYPE {
  return Object.values(BUILDING_TYPE).includes(toolId as any);
}

export { isActiveToolIdValid };

