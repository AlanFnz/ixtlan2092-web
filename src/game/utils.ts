import { BUILDING_ID } from "../buildings/constants";

function isActiveToolIdValid(
  toolId: string
): toolId is keyof typeof BUILDING_ID {
  return Object.values(BUILDING_ID).includes(toolId as any);
}

export { isActiveToolIdValid };

